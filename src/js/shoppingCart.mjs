import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function shoppingCart() {
  const cartList = document.querySelector(".product-list");
  const cartItems = getLocalStorage("so-cart") || [];
  renderListWithTemplate(cartItemTemplate, cartList, cartItems);
  // Show the cart footer if there are items in the cart
  const cartFooter = document.querySelector(".cart-footer");
  if (cartItems.length > 0) {
    // Calculate total price
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.FinalPrice,
      0,
    );
    const totalElement = cartFooter.querySelector(".cart-total");
    totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    cartFooter.classList.remove("hide");
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
