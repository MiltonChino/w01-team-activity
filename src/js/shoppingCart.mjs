import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function shoppingCart() {
  const cartList = document.querySelector(".product-list");
  const cartItems = getLocalStorage("so-cart") || [];
  renderListWithTemplate(cartItemTemplate, cartList, cartItems);
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
