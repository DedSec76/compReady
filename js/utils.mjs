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