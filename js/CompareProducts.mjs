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
        let fake = normalizeProducts(this.pair.fake, "FakeStore")
        let dummy = normalizeProducts(this.pair.dummy, "DummyJSON")
        this.results = getComparisonResult(fake, dummy)
        
        renderSingleComparison(this.container, fake, dummy)

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
        
        this.renderSummary(fake, dummy)
        this.showWinner(fake, dummy)
    }

    renderSummary(fake, dummy) {
        
        const price = pricePercent(fake, dummy)
        const rating = ratingPercent(fake, dummy)
        const value = valuePercent(fake, dummy)

        this.resultContainer.innerHTML = `
            <h2 class="title__heading">Fast Results</h2>

            <div>
                <p>Price: <span>${this.results.betterPrice} 💸</span></p>
                <p>Rating: <span>${this.results.betterRating} ⭐</span></p>
                <p>Best Value: <span>${this.results.betterValue} 🥇</span></p>
            </div>

            <h2 class="title__heading">Details</h2>
        `
        renderWithTemplate(renderCompareBar("Price", price, `$${fake.price}`, `$${dummy.price}`), this.resultContainer)
        renderWithTemplate(renderCompareBar("Rating", rating, `${fake.rating}⭐`, `${dummy.rating}⭐`), this.resultContainer)
        renderWithTemplate(renderCompareBar("Value", value, `${value.a} %`, `${value.b} %`), this.resultContainer)
    }

    showWinner(fake, dummy) {
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

            if(result_win === fake.source) {
                StorageManager.saveWinner(fake)
                renderWithTemplate(renderCardProduct(fake), this.winnerContainer)
            } else {
                StorageManager.saveWinner(dummy)
                renderWithTemplate(renderCardProduct(dummy), this.winnerContainer)
            }
            window.scrollTo(0, this.winnerContainer.offsetTop)
        }
    }
}