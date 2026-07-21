
import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout = new CheckoutProcess();

checkout.calculateSubtotal();

document
  .querySelector("[name=zip]")
  .addEventListener("blur", () => {
    checkout.calculateOrderTotals();
  });

document
  .querySelector("#checkout-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;

    try {
      const result = await checkout.checkout(form);
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  });