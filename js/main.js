import ExternalServices from "./ExternalServices.mjs"
import ProductList from "./ProductList.mjs"
import { renderHeaderFooter } from "./ui.mjs"

renderHeaderFooter()

const dataSource = new ExternalServices()

const products = new ProductList({
                        dataSource, 
                        listElement: document.querySelector(".products"),
                        radioCategory: document.querySelectorAll('input[name="category"]'),
                        compare_action: document.querySelectorAll(".compare-action"),
                        input_search: document.getElementById("input_search")
                    });
products.init()

