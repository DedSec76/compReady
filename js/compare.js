import { renderHeaderFooter } from "./ui.mjs";
import StorageManager from "./localStorage.mjs";
import CompareProducts from "./CompareProducts.mjs"

renderHeaderFooter()

const pair = StorageManager.getPair()

if (!pair) {
   location.href = "./index.html";
}
const lastComparison = StorageManager.getLastPair()[StorageManager.getLastPair().length - 2]

// We use the stats that we save with localStorage 
// so that the user keeps their last movements
document.addEventListener("DOMContentLoaded", () => {
   document.querySelector(".stats").innerHTML = 
               
            `<li>Last compared products: <span>${lastComparison ? `${lastComparison.fake.title} <strong>VS</strong> ${lastComparison.dummy.title}` : "None"}</span></li>
             <li>Last winner was: <span>${StorageManager.getWinner() ? StorageManager.getWinner().title : "None"}</span></li>
             <li>You have made: <span>${StorageManager.getCompareCount()} comparisons.</span></li>
            `
})

// We pass the constructor as an object, since 
// if we want to scale the code, it is necessary 
// to add features without breaking the architecture
const compareProducts = new CompareProducts({
                            pair, 
                            container: document.querySelector(".compare-products"),
                            resultContainer: document.querySelector(".compare-result"),
                            winnerContainer: document.querySelector(".winner")
                        });
                            
compareProducts.init()