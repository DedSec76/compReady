import { normalizeProducts } from "./utils.mjs"

export async function loadTemplate(path) {
    const res = await fetch(path)
    const template = await res.text()
    return template
}

export async function renderHeaderFooter() {
    const headerTemplate = await loadTemplate("../partials/header.html")
    const headerElement = document.querySelector(".header-main")
    
    const footerTemplate = await loadTemplate("../partials/footer.html")
    const footerElement = document.querySelector(".footer-main")
    
    renderWithTemplate(headerTemplate, headerElement)
    renderNavBar()
    renderWithTemplate(footerTemplate, footerElement)
    renderCopy()
}

export function renderNavBar() {
    const hamburger = document.querySelector(".hamburger")
    const nav = document.querySelector(".navigation")
    const btn_search = document.querySelector(".search")
    const nav_search = document.querySelector(".navigation__search")

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        nav.classList.toggle("show")
    })

    btn_search.addEventListener("click", () => {
        nav_search.classList.toggle("show")
    })

}

export function renderCopy() {
    const fullYear = new Date
    document.querySelector("#year").textContent = fullYear.getFullYear()
    document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`
}

export function renderWithTemplate(template, parentElement) {
    parentElement.innerHTML += template
}

export function renderListWithTemplate(templateFn, parentE, list, clear=false) {
    const htmlStrings = list.map(item => {
        return templateFn(item)
    })

    if(clear) {
        parentE.innerHTML = "";
    }
    parentE.insertAdjacentHTML("afterbegin", htmlStrings.join(''))
}

export function renderCardProduct(product) {
    return `<div class="product-card">
    ${product.source ? `<h2 class="card__store">${product.source}</h2>` : ""}
                <img src="${product.image}" />
                
                <h3 class="card__title">${product.title}</h3>
                <p class="card__category">${product.category}</p>
                <p class="card__price">$${product.price}</p>

                <p class="card__rating">${product.rating}</p>
                <p class="card__description">${product.description}</p>
            </div>
            `
}

export function filterFakeStore(category, data) {
    return data.filter(p => p.category === category)   
}

export function filterDummy(category, data) {
    if(category === "men's clothing") {
        const order = {
            "womens-bags": 1,
            "mens-shirts": 2
        }
        const dataFiltered = data.filter(p => 
            (p.category === "womens-bags" && p.price < 130 && p.price > 100) ||
            (p.category === "mens-shirts" && p.price < 30))
        
        return [...dataFiltered].sort((a, b) => order[a.category] - order[b.category])
    }
        
    if (category === "women's clothing") {
        return data.filter(p => p.category === "tops")
    }

    if (category === "electronics") {
        return data.filter(p => p.category === "mobile-accessories");
    }

    if (category === "jewelery") {
        const order = {
            "womens-bags": 1,
            "womens-watches": 2,
            "womens-jewellery": 3
        };

        return data.filter(p =>
            (p.category === "womens-bags" && p.price >= 500) ||
            (p.category === "womens-watches" && p.price <= 200) ||
            (p.category === "womens-jewellery" && p.price <= 25)
        ).sort((a, b) => order[a.category] - order[b.category])
    }
}

export function createComparisonRow(fake, dummy) {
    const t_fake = renderCardProduct(fake)
    const t_dummy = renderCardProduct(dummy)

    const row = document.createElement("div")
    const div_action = document.createElement("div")
    const btn = document.createElement("button")
    btn.textContent = "Compare"
    btn.classList.add("card__btn")

    row.classList.add("compare-row")
    div_action.classList.add("compare-action")

    div_action.appendChild(btn)

    renderWithTemplate(t_fake, row)
    row.appendChild(div_action)
    renderWithTemplate(t_dummy, row)
    
    return row
}

export function renderComparison(container, fakeFil, dummyFil) {
    container.innerHTML = "";

    const total = Math.min(fakeFil.length, dummyFil.length)

    for (let i = 0; i < total; i++) {
        container.appendChild(createComparisonRow(normalizeProducts(fakeFil[i]), normalizeProducts(dummyFil[i])));
    }
}

export function renderSingleComparison(container, fake, dummy) {
    container.innerHTML = ""
    container.appendChild(createComparisonRow(fake, dummy))
}


export function getComparisonResult(a, b) {
    return {
        betterPrice: comparePrice(a, b),
        betterRating: compareRating(a, b),
        betterValue: compareValue(a, b)
    }

    function comparePrice(a, b) {
        if(a.price < b.price) return a.source
        if(b.price < a.price) return b.source

        return "Draw"
    }
    function compareRating(a, b) {
        if(a.rating > b.rating) return a.source
        if(a.rating < b.rating) return b.source

        return "Same Rating"
    }
    function compareValue(a, b) {
        const valueA = a.rating / a.price
        const valueB = b.rating / b.price

        if (valueA > valueB) return a.source
        if (valueB > valueA) return b.source
                
        return "Draw"
    }
}

