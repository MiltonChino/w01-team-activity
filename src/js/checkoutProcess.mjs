import { getLocalStorage } from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  let convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
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
    this.list = getLocalStorage(key);
    this.calculateItemSummary();
  },
  calculateItemSummary: function () {
    // Asegurar que la lista no sea null si el carrito está vacío
    this.list = this.list || [];

    // Calcular el subtotal acumulado
    this.itemTotal = this.list.reduce(
      (total, item) => total + (item.FinalPrice || 0),
      0,
    );
    const itemCount = this.list.length;

    // 💡 SOLUCIÓN: Apuntar a los elementos específicos en vez de destruir el contenedor superior
    const numItemsElement = document.querySelector("#num-items");
    const cartTotalElement = document.querySelector("#cartTotal");

    if (numItemsElement) numItemsElement.textContent = itemCount;
    if (cartTotalElement)
      cartTotalElement.textContent = "$" + this.itemTotal.toFixed(2);
  },

  calculateOrdertotal: function () {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.tax = this.itemTotal * 0.06;
    // Use $10 for the first item plus $2 for each additional item for shipping
    this.shipping = this.list.length > 0 ? 10 + (this.list.length - 1) * 2 : 0;
    // display the totals.
    this.displayOrderTotals();
  },
  displayOrderTotals: function () {
    // 💡 Buscamos los elementos <p> directamente por sus IDs individuales
    const shippingElement = document.querySelector("#shipping");
    const taxElement = document.querySelector("#tax");
    const orderTotalElement = document.querySelector("#orderTotal");

    // Calculamos el total general
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    // 💡 Insertamos los valores dentro de los <p> que ya existen en tu HTML
    if (shippingElement) {
      shippingElement.innerText = "$" + this.shipping.toFixed(2);
    }
    if (taxElement) {
      taxElement.innerText = "$" + this.tax.toFixed(2);
    }
    if (orderTotalElement) {
      orderTotalElement.innerText = "$" + this.orderTotal.toFixed(2);
    }
  },
  checkout: async function (form) {
    // package up the form data and the cart items
    const json = formDataToJSON(form);
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);
    // send the data to the server using the checkout function from the external services module.
    try {
      const response = await checkout(json);
      console.log("Checkout successful:", response);
      // Clear the cart and update the display
      localStorage.removeItem(this.key);
      this.list = [];
      this.calculateItemSummary();
      this.displayOrderTotals();
      alert("Checkout successful! Thank you for your purchase.");
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again.");
    }
  },
};
export default checkoutProcess;
