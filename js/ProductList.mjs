import { filterDummy, filterFakeStore, renderComparison, renderSingleComparison } from "./ui.mjs"
import { normalizeProducts } from "./utils.mjs"
import StorageManager from "./localStorage.mjs"

export default class ProductList {
    constructor(dataSource, listElement) {
        this.dataSource = dataSource
        this.listElement = listElement
    }

    async init() {
        const data = await this.dataSource.loadProducts()
        
        this.fake = data.fakeProducts
        this.dummy = data.dummyProducts

        this.searchItem(data)
        this.renderCategory()
    }
        
    renderCategory() {
        const choices = document.querySelectorAll('input[name="category"]')
        
        choices.forEach((radio) => {
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
        const btnCompare = document.querySelectorAll(".card__btn")

        btnCompare.forEach((btn, index) => {
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
            location.href = "./compare.html";
            StorageManager.incrementCompareCount();
        }
        
    }

    searchItem(data) {
        const nav_search = document.getElementById("input_search")
        nav_search.addEventListener("input", e => {
            let title = e.target.value
            
            const fake = normalizeProducts(data.fakeProducts.find(item => item.title.includes(title)))
            const dummy = normalizeProducts(data.dummyProducts.find(item => item.title.includes(title)))
            
            renderSingleComparison(this.listElement, fake, dummy)
            toCompare()

            function toCompare() {
                const btnCompare = document.querySelector(".card__btn")
                btnCompare.addEventListener("click", () => {
                    const pair = {
                        fake: fake,
                        dummy: dummy
                    }
                    actionAdd(pair)
                })
                function actionAdd(pair) {
                    StorageManager.savePair(pair)
                    location.href = "./compare.html";
                }
            }
        })
    }

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
            })
        })
        
    }
}