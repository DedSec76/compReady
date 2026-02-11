import { pricePercent, ratingPercent, valuePercent } from "./comparisonBars.js";
import { renderSingleComparison, getComparisonResult, renderCardProduct, renderWithTemplate } from "./ui.mjs"
import { normalizeProducts } from "./utils.mjs"

export default class CompareProducts {
    constructor(pair, container) {
        this.pair = pair
        this.container = container
        this.containerResult = document.querySelector(".compare-result")
    }

    init() {
        let fake = normalizeProducts(this.pair.fake, "FakeStore")
        let dummy = normalizeProducts(this.pair.dummy, "DummyJSON")
        
        renderSingleComparison(this.container, fake, dummy)
        
        this.renderResult(fake, dummy)
    }

    renderResult(fake, dummy) {
        const results = getComparisonResult(fake, dummy)
        const price = pricePercent(fake, dummy)
        const rating = ratingPercent(fake, dummy)
        const value = valuePercent(fake, dummy)

        this.containerResult.innerHTML = `
            <h2 class="title__heading">Results</h2>

            <div>
                <p>Price: <span>${results.betterPrice} 💸</span></p>
                <p>Rating: <span>${results.betterRating} ⭐</span></p>
                <p>Best Value: <span>${results.betterValue} 🥇</span></p>
            </div>
        `

        // Bar filling with price attributes

        document.getElementById("nameStore").textContent = `${fake.source}`
        document.getElementById("nameStore_c").textContent = `${dummy.source}`

        document.querySelector(".fill.fake").style.width = `${price.a}%`;
        document.querySelector(".fill.dummy").style.width = `${price.b}%`;

        document.getElementById("bar_price_f").textContent = `$${fake.price}`
        document.getElementById("bar_price_d").textContent = `$${dummy.price}`
    
        // Bar filling with rating attributes
        document.getElementById("nameStore_r").textContent = `${fake.source}`
        document.getElementById("nameStore_c_r").textContent = `${dummy.source}`

        document.querySelector(".fill_r.fake").style.width = `${rating.a}%`;
        document.querySelector(".fill_r.dummy").style.width = `${rating.b}%`;

        document.getElementById("bar_rating_f").textContent = `⭐${fake.rating}`
        document.getElementById("bar_rating_d").textContent = `⭐${dummy.rating}`
    
        // Bar filling with value attributes
        document.getElementById("nameStore_v").textContent = `${fake.source}`
        document.getElementById("nameStore_c_v").textContent = `${dummy.source}`

        document.querySelector(".fill_v.fake").style.width = `${value.a}%`;
        document.querySelector(".fill_v.dummy").style.width = `${value.b}%`;

        document.getElementById("bar_value_f").textContent = `${value.a} %`
        document.getElementById("bar_value_d").textContent = `${value.b} %`

        this.showWinner(results, fake,dummy)
    }

    showWinner(results, fake, dummy) {
        let result_win = results.winner
        
        const btn = document.getElementById("showWinner")
        
        btn.onclick = () => {
            btn.style.animation = "none"
            const winner = document.querySelector(".winner")
            winner.classList.toggle("show")

            winner.innerHTML = `<h2 class="title__heading">Winner</h2>`
            
            if(result_win === "Draw") {
                winner.innerHTML += "<p>It's draw 🤝</p>"
                return
            }
            if(result_win === "FakeStore") {
                renderWithTemplate(renderCardProduct(fake), winner)
            } else {
                renderWithTemplate(renderCardProduct(dummy), winner)
            }
        }
    }
}