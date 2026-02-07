import { renderHeaderFooter } from "./ui.mjs";
import { getLocalStorage } from "./utils.mjs";
import CompareProducts from "./CompareProducts.mjs"

renderHeaderFooter()

const pair = getLocalStorage("comparePair")
const container = document.querySelector(".compare-products")

if (!pair) {
    location.href = "/"
}

const compareProducts = new CompareProducts(pair, container)
compareProducts.init()