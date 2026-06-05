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
    // calculate and display the total amount of the items in the cart, and the number of items.
    this.itemTotal = this.list.reduce(
      (total, item) => total + item.FinalPrice,
      0,
    );
    const itemCount = this.list.length;
    const outputElement = document.querySelector(this.outputSelector);
    outputElement.textContent = `Items: ${itemCount} - Total: $${this.itemTotal.toFixed(2)}`;
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
    // once the totals are all calculated display them in the order summary page
    const outputElement = document.querySelector(this.outputSelector);
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    outputElement.innerHTML = `
      <p>Items Total: $${this.itemTotal.toFixed(2)}</p>
      <p>Shipping: $${this.shipping.toFixed(2)}</p>
      <p>Tax: $${this.tax.toFixed(2)}</p>
      <h3>Order Total: $${this.orderTotal.toFixed(2)}</h3>
    `;
  },
};
export default checkoutProcess;
