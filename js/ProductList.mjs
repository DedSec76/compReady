import { filterDummy, filterFakeStore, renderComparison, renderSingleComparison } from "./ui.mjs"
import { normalizeProducts, setLocalStorage } from "./utils.mjs"

export default class ProductList {
    constructor(dataSource, listElement) {
        this.dataSource = dataSource
        this.listElement = listElement
    }

    async init() {
        const data = await this.dataSource.loadProducts()

        this.searchItem(data)
        this.renderCategory(data)
    }
        
    renderCategory(data) {
        const choices = document.querySelectorAll('input[name="category"]')
        
        choices.forEach((radio) => {
            radio.addEventListener("change", () => {
                let value = radio.value
                
                const fakefil = filterFakeStore(value, data.fakeProducts)
                const dummyfil = filterDummy(value, data.dummyProducts)

                renderComparison(this.listElement, fakefil, dummyfil)
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
            setLocalStorage("comparePair", pair)
            location.href = "./compare.html";
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
                    setLocalStorage("comparePair", pair)
                    location.href = "./compare.html";
                }
            }
        })
    }
}