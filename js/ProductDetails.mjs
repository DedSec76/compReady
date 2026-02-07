import { renderCardProduct, renderWithTemplate } from './ui.mjs'

export default class ProductDetails {

    constructor(id_product, dataSource) {
        this.id_product = id_product
        this.dataSource = dataSource
        this.product = {}
        this.element = document.querySelector(".product-card")
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.id_product)
        console.log(this.product.rating.rate)
        this.renderProductDetails(this.product)
    }
    renderProductDetails(product){
        renderWithTemplate(renderCardProduct(product), this.element)
    }
}