import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";
// Begin creating your productList function by thinking about the information it will need to accomplish it's purpose.
export default async function productList(selector, category) {
  const element = document.querySelector(selector);

  // get the list of products
  const products = await getData(category);

  // Attach a resolved image URL to each product (if present)
  if (Array.isArray(products)) {
    for (const p of products) {
      p.primaryMediumImage = await handleImages(p.Images);
    }
  } else if (products && products.Images) {
    products.primaryMediumImage = await handleImages(products.Images);
  }

  // render out the product list to the element
  renderListWithTemplate(productCardTemplate, element, products, "beforeend");
}

async function handleImages(images) {
  // Guard against missing images
  if (!images || !images.PrimaryMedium) return null;
  try {
    const res = await fetch(images.PrimaryMedium);
    return res.ok ? res.url : null;
  } catch (e) {
    return null;
  }
}

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    <img
      src="${product.primaryMediumImage || ''}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p></a>
  </li>`;
}
