import ExternalServices from "./ExternalServices.mjs"
import ProductList from "./ProductList.mjs"
import { renderHeaderFooter } from "./ui.mjs"

renderHeaderFooter()

const listElement = document.querySelector(".products")
const dataSource = new ExternalServices()

const products = new ProductList(dataSource, listElement)
products.init()

