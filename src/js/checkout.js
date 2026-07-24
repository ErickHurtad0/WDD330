
import CheckoutProcess from "./CheckoutProcess.mjs";
import { alertMessage } from "./utils.mjs";

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

    // Browser validation
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    try {
      await checkout.checkout(form);
    } catch (err) {
      console.error(err);

      const messages = Object.entries(err.message)
        .map(([field, message]) => `<strong>${field}:</strong> ${message}`)
        .join("<br>");

      alertMessage(messages);
    }
  });