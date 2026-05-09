import { findProductById } from "./productData.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

let productData = {};

export default async function productDetails(productId, selector) {
  // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
  productData = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails();
  // add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}

function addToCart() {
  // Get current cart content
  let cart = getLocalStorage("so-cart") || [];

  // Add new product
  cart.push(productData);
  // Save updated cart back to local storage
  setLocalStorage("so-cart", cart);
}

function renderProductDetails() {
  document.querySelector("#productName").innerText = productData.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    productData.NameWithoutBrand;
  document.querySelector("#productImage").src = productData.Image;
  document.querySelector("#productImage").alt = productData.Name;
  document.querySelector("#productFinalPrice").innerText =
    productData.FinalPrice;
  document.querySelector("#productColorName").innerText =
    productData.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    productData.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = productData.Id;
}
