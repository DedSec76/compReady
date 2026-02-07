import { pricePercent, ratingPercent } from "./comparisonBars.js";
import { renderWithTemplate, renderCardProduct, getComparisonResult } from "./ui.mjs"

function normalizeProducts(product, source) {
    return {
        title: product.title,
        category: product.category,
        price: product.price,
        image: product.image || product.thumbnail,
        rating: 
            typeof product.rating === "object"
            ? product.rating.rate
            : product.rating,
        description: product.description,
        source
    };
}

export default class CompareProducts {
    constructor(pair, container) {
        this.pair = pair
        this.container = container
        this.containerResult = document.querySelector(".compare-result")
    }

    init() {
        let fake = normalizeProducts(this.pair.fake, "FakeStore")
        let dummy = normalizeProducts(this.pair.dummy, "DummyJSON")
        
        renderWithTemplate(renderCardProduct(fake), this.container)
        renderWithTemplate(renderCardProduct(dummy), this.container)

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