import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";
// Begin creating your productList function by thinking about the information it will need to accomplish it's purpose.

function formatCategoryTitle(category) {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function productList(selector, category) {
  // get the element we will insert the list into from the selector
  const element = document.querySelector(selector);

  // get the list of products
  const products = await getData(category);

  // render out the product list to the element
  renderListWithTemplate(productCardTemplate, element, products, "beforeend");
  document.querySelector(".title").innerHTML = formatCategoryTitle(category);
}

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p></a>
  </li>`;
}
