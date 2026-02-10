export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

export function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function getParam(param) {
    const queryString = location.search
    const urlParam = new URLSearchParams(queryString)
    const product = urlParam.get(param)

    return product
}

export function normalizeProducts(product, source) {
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