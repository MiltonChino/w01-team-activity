import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

let product = {};

export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails();
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}

function addToCart() {
  let cart = getLocalStorage("so-cart") || [];
  cart.push(product);
  setLocalStorage("so-cart", cart);
}

function renderProductDetails() {
  const imageUrl = product.Images?.PrimaryLarge;
  const colorName = product.Colors?.[0]?.ColorName || "";
  const price = product.FinalPrice ?? product.Price ?? "";
  const brandName = product.Brand?.Name || "";

  document.querySelector("#productName").innerText = brandName;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand || product.Name || "";
  document.querySelector("#productImage").src = imageUrl;
  document.querySelector("#productImage").alt = product.Name || "Product image";
  document.querySelector("#productFinalPrice").innerText = price;
  document.querySelector("#productColorName").innerText = colorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple || "";
  document.querySelector("#addToCart").dataset.id = product.Id;
}
