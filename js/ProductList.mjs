import { filterDummy, filterFakeStore, renderComparison, renderSingleComparison } from "./ui.mjs"
import { normalizeProducts } from "./utils.mjs"
import StorageManager from "./localStorage.mjs"

export default class ProductList {
    constructor({dataSource, listElement, radioCategory, input_search}) {
        this.dataSource = dataSource
        this.listElement = listElement
        this.radioCategory = radioCategory
        this.input_search = input_search
    }

    async init() {
        const data = await this.dataSource.loadProducts()
        
        this.fake = data.fakeProducts.map(i => normalizeProducts(i, "FakeStore"));
        this.dummy = data.dummyProducts.map(i => normalizeProducts(i, "DummyJSON"));

        this.searchItem()
        this.renderCategory()
    }
        
    renderCategory() {
        this.radioCategory.forEach((radio) => {
            radio.addEventListener("change", () => {
                let value = radio.value
                
                const fakefil = filterFakeStore(value, this.fake)
                const dummyfil = filterDummy(value, this.dummy)
                
                renderComparison(this.listElement, fakefil, dummyfil)
            
                this.filterPrice(fakefil, dummyfil)
                this.addToCompare(fakefil, dummyfil)
            })
        }) 
    }

    addToCompare(fakefil, dummyfil) {
        this.btnCompare = this.listElement.querySelectorAll(".card__btn")
        
        this.btnCompare.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                const pair = {
                    fake: fakefil[index],
                    dummy: dummyfil[index]
                }
                actionAdd(pair)
            })
        })

        function actionAdd(pair) {
            StorageManager.savePair(pair)
            StorageManager.saveLastPair(pair)
            location.href = "./compare.html";
            StorageManager.incrementCompareCount();
        }
        
    }

    /* Search Item */

    findItems(title) {
        const fakeItem = this.fake.find(item => 
            item.title.toLowerCase().includes(title)
        );

        const dummyItem = this.dummy.find(item => 
            item.title.toLowerCase().includes(title)
        );
        
        
        return { fakeItem, dummyItem }
    }

    searchItem() {
        input_search.addEventListener("input", e => {
            const title = e.target.value.trim().toLowerCase();

            if (!title) {
                this.listElement.innerHTML = ""
                return;
            }
            const { fakeItem, dummyItem } = this.findItems(title)
            

            if (!fakeItem || !dummyItem) {
                this.renderNotFound();
                return;
            }

            this.renderResult(fakeItem, dummyItem)
        })
    }
    
    renderNotFound() {
        this.listElement.innerHTML = "<h2>Item not found</h2>"
    }

    renderResult(fake, dummy) {
        this.listElement.innerHTML = ""
        renderSingleComparison(this.listElement, fake, dummy)
        this.attachCompare(fake, dummy)
    }

    attachCompare(fake, dummy) {
        const btnCompare = this.listElement.querySelector(".card__btn")
        if (!btnCompare) return;

        btnCompare.addEventListener("click", () => {
            const pair = {
                fake: fake,
                dummy: dummy
            }

            StorageManager.savePair(pair)
            location.href = "./compare.html";
            StorageManager.incrementCompareCount();
        });
    }

    /* Filter Price */
    filterPrice(fakefil, dummyfil) {
        const minPrice = document.querySelector("input[name='min_price']")
        const maxPrice = document.querySelector("input[name='max_price']")

        this.fakeOriginal = [...fakefil]
        this.dummyOriginal = [...dummyfil]

        ;[minPrice, maxPrice].forEach(input => {
            input.addEventListener("keyup", () => {
                let valueMin = minPrice.value ? Number(minPrice.value) : 0
                let valueMax = maxPrice.value ? Number(maxPrice.value) : Infinity

                const filteredFake = this.fakeOriginal.filter(i => i.price >= valueMin && i.price <= valueMax)
                const filteredDummy = this.dummyOriginal.filter(i => i.price >= valueMin && i.price <= valueMax)

                renderComparison(this.listElement, filteredFake, filteredDummy)
                this.addToCompare(filteredFake, filteredDummy)
            })
        })
        
    }
}