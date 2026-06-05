import { getLocalStorage } from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  return items.map((item) => ({
    id: item.Id || item.id,
    name: item.Name || item.name,
    price: item.FinalPrice || item.price,
    quantity: item.quantity || 1,
  }));
}

// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

const checkoutProcess = {
  key: "",
  outputSelector: "",
  list: [],
  itemTotal: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,
  init: function (key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(key) || [];
    this.calculateItemSummary();
  },
  calculateItemSummary: function () {
    // calculate and display the total amount of the items in the cart, and the number of items.
    const summaryElement = document.querySelector(this.outputSelector);
    if (!summaryElement) return;

    this.itemTotal = this.list.reduce((sum, item) => sum + (item.FinalPrice || item.price || 0), 0);
    const numItems = this.list.length;

    // Display subtotal and count
    const subtotalElement = summaryElement.querySelector("#subtotal");
    if (subtotalElement) {
      subtotalElement.innerText = `$${this.itemTotal.toFixed(2)}`;
    }
    const countElement = summaryElement.querySelector("#num-items");
    if (countElement) {
      countElement.innerText = numItems;
    }
  },
  calculateOrdertotal: function () {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    const numItems = this.list.length;
    
    // Shipping: $10 for the first item plus $2 for each additional item
    this.shipping = numItems > 0 ? 10 + (numItems - 1) * 2 : 0;
    
    // Tax: 6% for sales tax
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    
    // Order Total
    this.orderTotal = (this.itemTotal + Number(this.shipping) + Number(this.tax)).toFixed(2);
    
    // display the totals.
    this.displayOrderTotals();
  },
  displayOrderTotals: function () {
    // once the totals are all calculated display them in the order summary page
    const summaryElement = document.querySelector(this.outputSelector);
    if (!summaryElement) return;

    const shippingElement = summaryElement.querySelector("#shipping");
    if (shippingElement) {
      shippingElement.innerText = `$${this.shipping.toFixed(2)}`;
    }

    const taxElement = summaryElement.querySelector("#tax");
    if (taxElement) {
      taxElement.innerText = `$${this.tax}`;
    }

    const orderTotalElement = summaryElement.querySelector("#orderTotal");
    if (orderTotalElement) {
      orderTotalElement.innerText = `$${this.orderTotal}`;
    }
  },
  checkout: async function (form) {
    // build the data object from the calculated fields, the items in the cart, and the information entered into the form
    const payload = formDataToJSON(form);
    
    payload.orderDate = new Date().toISOString();
    payload.items = packageItems(this.list);
    payload.orderTotal = String(this.orderTotal);
    payload.shipping = Number(this.shipping);
    payload.tax = String(this.tax);

    // call the checkout method in our externalServices module and send it our data object.
    try {
      const response = await checkout(payload);
      return response;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
};

export default checkoutProcess;
