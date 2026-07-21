
import ShoppingCart from "./ShoppingCart.mjs";

const listElement = document.querySelector(".product-list");

const shoppingCart = new ShoppingCart(listElement);

shoppingCart.init();

