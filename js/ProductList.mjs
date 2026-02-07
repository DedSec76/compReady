import { filterDummy, filterFakeStore, renderComparison } from "./ui.mjs"
import { getLocalStorage, setLocalStorage } from "./utils.mjs"

export default class ProductList {
    constructor(dataSource, listElement) {
        this.dataSource = dataSource
        this.listElement = listElement
    }

    async init() {
        const data = await this.dataSource.loadProducts()

        this.renderCategory(data)
    }
        
    renderCategory(data) {
        const choices = document.querySelectorAll('input[name="category"]')
        
        choices.forEach(radio => {
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
            location.href = "compare.html";
        }
        
    }
}