import { renderHeaderFooter } from "./ui.mjs";
import { getParam } from "./utils.mjs"
import ProductDetails from "./ProductDetails.mjs"
import ExternalServices from "./ExternalServices.mjs";

renderHeaderFooter()

const id = getParam("product")
const dataSource = new ExternalServices()


const productDetails = new ProductDetails(id, dataSource)
productDetails.init()
