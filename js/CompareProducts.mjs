import { pricePercent, ratingPercent, valuePercent, renderCompareBar } from "./comparisonBars.js";
import { renderSingleComparison, getComparisonResult, renderCardProduct, renderWithTemplate } from "./ui.mjs"
import { normalizeProducts } from "./utils.mjs"
import StorageManager  from "./localStorage.mjs"

export default class CompareProducts {
    constructor({pair, container, resultContainer, winnerContainer}) {
        this.pair = pair
        this.container = container
        this.resultContainer = resultContainer
        this.winnerContainer = winnerContainer
    }

    init() {
        this.fake = this.pair.fake
        this.dummy = this.pair.dummy
        this.results = getComparisonResult(this.fake, this.dummy)
        
        renderSingleComparison(this.container, this.fake, this.dummy)

        // Add event listeners for "Read More" buttons
        const buttons = this.container.querySelectorAll(".read-more");
        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const text = btn.previousElementSibling

                text.classList.toggle("expanded")
                btn.textContent = text.classList.contains("expanded")
                    ? "Read Less"
                    : "Read More";
            })
        });
        
        this.renderSummary()
        this.showWinner()
    }

    renderSummary() {
        
        const price = pricePercent(this.fake, this.dummy)
        const rating = ratingPercent(this.fake, this.dummy)
        const value = valuePercent(this.fake, this.dummy)

        this.resultContainer.innerHTML = `
            <h2 class="title__heading">Fast Results</h2>

            <div>
                <p>Price: <span>${this.results.betterPrice} 💸</span></p>
                <p>Rating: <span>${this.results.betterRating} ⭐</span></p>
                <p>Best Value: <span>${this.results.betterValue} 🥇</span></p>
            </div>

            <h2 class="title__heading">Details</h2>
        `
        renderWithTemplate(renderCompareBar("Price", price, `$${this.fake.price}`, `$${this.dummy.price}`), this.resultContainer)
        renderWithTemplate(renderCompareBar("Rating", rating, `${this.fake.rating}⭐`, `${this.dummy.rating}⭐`), this.resultContainer)
        renderWithTemplate(renderCompareBar("Value", value, `${value.a} %`, `${value.b} %`), this.resultContainer)
    }

    showWinner() {
        let result_win = this.results.winner
        
        const btn = document.getElementById("showWinner")
        
        btn.onclick = () => {
            btn.style.animation = "none"
            
            this.winnerContainer.classList.toggle("show")

            this.winnerContainer.innerHTML = `<h2 class="title__heading">Winner</h2>`
            
            if(result_win === "Draw") {
                this.winnerContainer.innerHTML += "<p>It's draw 🤝</p>"
                return
            }

            if(result_win === this.fake.source) {
                StorageManager.saveWinner(this.fake)
                renderWithTemplate(renderCardProduct(this.fake), this.winnerContainer)
            } else {
                StorageManager.saveWinner(this.dummy)
                renderWithTemplate(renderCardProduct(this.dummy), this.winnerContainer)
            }
            window.scrollTo(0, this.winnerContainer.offsetTop)
        }
    }
}