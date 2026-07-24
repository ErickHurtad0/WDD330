
import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: item.quantity,
  }));
}

export default class CheckoutProcess {
  constructor() {
    this.cartItems = getLocalStorage("so-cart") || [];
    this.externalServices = new ExternalServices();

    this.subtotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.total = 0;
  }

  calculateSubtotal() {
    this.subtotal = this.cartItems.reduce(
      (sum, item) => sum + item.FinalPrice * item.quantity,
      0
    );

    document.querySelector("#subtotal").textContent =
      this.subtotal.toFixed(2);

    return this.subtotal;
  }

  calculateOrderTotals() {
    this.calculateSubtotal();

    this.tax = this.subtotal * 0.06;

    this.shipping =
      10 + (this.cartItems.length - 1) * 2;

    this.total =
      this.subtotal +
      this.tax +
      this.shipping;

    document.querySelector("#tax").textContent =
      this.tax.toFixed(2);

    document.querySelector("#shipping").textContent =
      this.shipping.toFixed(2);

    document.querySelector("#orderTotal").textContent =
      this.total.toFixed(2);
  }

  async checkout(form) {
    const formData = new FormData(form);
    const order = Object.fromEntries(formData.entries());

    order.orderDate = new Date().toISOString();
    order.items = packageItems(this.cartItems);
    order.tax = this.tax.toFixed(2);
    order.shipping = this.shipping;
    order.orderTotal = this.total.toFixed(2);

    try {
        console.log(order);
        const result = await this.externalServices.checkout(order);

        localStorage.removeItem("so-cart");

        window.location.href = "/checkout/success.html";

        return result;
    } catch (err) {
        throw err;
    }
    }
}