import { renderHeaderFooter } from "./ui.mjs";
import { getLocalStorage } from "./utils.mjs";
import CompareProducts from "./CompareProducts.mjs"

renderHeaderFooter()

const pair = getLocalStorage("comparePair")

if (!pair) {
    location.href = "./index.html";
}

const compareProducts = new CompareProducts({
                            pair, 
                            container: document.querySelector(".compare-products"),
                            resultContainer: document.querySelector(".compare-result"),
                            winnerContainer: document.querySelector(".winner")
                        });
                            console.log(compareProducts)
compareProducts.init()