import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParam("product");
productDetails(productId);

/* const product = await findProductById(productId);
console.log(product); */

/* function addProductToCart(product) {
  // Get current cart content
  let cart = getLocalStorage("so-cart") || [];

  // Add new product
  cart.push(product);

  // Save updated cart back to local storage
  setLocalStorage("so-cart", cart);
} */
/* 
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler); */
