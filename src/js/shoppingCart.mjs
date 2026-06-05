import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function shoppingCart() {
  const cartList = document.querySelector(".product-list");
  const cartItems = getLocalStorage("so-cart") || [];
  renderListWithTemplate(cartItemTemplate, cartList, cartItems);


  // .cart footer control, check solution
  if (cartItems.length > 0) {
    const cartFooter = document.querySelector(".cart-footer");
    if (cartFooter) {
      cartFooter.classList.remove("hide");
      const total = cartItems.reduce((sum, item) => sum + (item.FinalPrice || item.price || 0), 0);
      const cartTotal = document.querySelector(".cart-total");
      if (cartTotal) {
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
      }
    }
  }
}

function cartItemTemplate(product) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${product.Image}" alt="${product.Name}"
      />
    </a>
    <a href="#">
        <h2 class="card__name">${product.Name}</h2>
    </a>
    <p class="card-card__color">${product.Colors[0].ColorName}</p>
    <p class="card__quantity">qty: 1</p>
    <p class="card__price">$${product.FinalPrice}</p>
  </li>`;

  return newItem;
}
