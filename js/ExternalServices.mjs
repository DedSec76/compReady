
async function convertToJson(res) {
    const response = await res.json()
    
    if (res.ok) {
        return response
    } else {
        throw { name: "ServicesError", message: response};
    }
}

export default class ExternalServices {
    constructor() {

    }
    async loadProducts() {
        const [fakeRes, dummyRes] = await Promise.all([
            fetch("https://fakestoreapi.com/products"),
            fetch("https://dummyjson.com/products?limit=200")
        ])

        const fakeProducts = await convertToJson(fakeRes)
        const dummyData = await convertToJson(dummyRes)

        return { fakeProducts, dummyProducts:  dummyData.products}
    }
    
    async findProductById(id) {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`)
        const data = await convertToJson(res)
        return data
    }
}


