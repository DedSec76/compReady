
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

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        nav.classList.toggle("show")
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
                <h2 class="card__store">${product.source}</h2>
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
        return data.filter(p => p.category === "mens-shirts" || p.category === "mens-shoes")
    }
        
    if (category === "women's clothing") {
        return data.filter(p => p.category === "womens-dresses" || p.category === "tops")
    }

    if (category === "electronics") {
        return data.filter(p => 
            p.category === "laptops" || 
            p.category === "smartphones" ||
            p.category === "mobile-accesories"
        );
    }

    if (category === "jewelery") {
        return data.filter(p =>
            p.category === "mens-watches" || 
            p.category === "womens-watches"
        );
    }
            
    
}

export function renderComparison(container, fakeFil, dummyFil) {
    container.innerHTML = "";

    const total = Math.min(fakeFil.length, dummyFil.length)
    
    for (let i = 0; i < total; i++) {
        const row = document.createElement("div")
        row.classList.add("compare-row")

        row.innerHTML = `
            <div class="product-card fake">
                <img src="${fakeFil[i].image}">
                <h3 class="card__title">${fakeFil[i].title}</h3>
                <p class="card__price">$${fakeFil[i].price}</p>
                <p class="card__rating">⭐ ${fakeFil[i].rating.rate}</p>
            </div>

            <div class="compare-action">
                <button class="card__btn">Compare</button>
            </div>

            <div class="product-card dummy">
                <img src="${dummyFil[i].thumbnail}">
                <h3 class="card__title">${dummyFil[i].title}</h3>
                <p class="card__price">$${dummyFil[i].price}</p>
                <p class="card__rating">⭐ ${dummyFil[i].rating}</p>
            </div>

            
    `;

        container.appendChild(row);
    }
}

export function getComparisonResult(a, b) {
    return {
        betterPrice: comparePrice(a, b),
        betterRating: compareRating(a, b),
        betterValue: compareValue(a, b)
    }
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