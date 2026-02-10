import { pricePercent, ratingPercent } from "./comparisonBars.js";
import { renderSingleComparison, getComparisonResult } from "./ui.mjs"
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

        this.containerResult.innerHTML = `
            <h2>Results</h2>
            <p>Price: </p>
            <h3>${results.betterPrice}</h3>
            <p>Rating: </p>
            <h3>${results.betterRating}</h3>
            <p>Best Value: </p>
            <h3>${results.betterValue}</h3>
        `


        console.log(price)
        document.querySelector(".fill.fake").style.width = `${price.a}%`;
        document.querySelector(".fill.dummy").style.width = `${price.b}%`;

    }
}