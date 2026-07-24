import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

const title = document.querySelector(".title");

const formattedCategory = category
  .split("-")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

title.textContent = `Top Products: ${formattedCategory}`;

const dataSource = new ExternalServices();

const listElement = document.querySelector(".product-list");

const myList = new ProductList(
  category,
  dataSource,
  listElement
);

await myList.init();

const modal = document.querySelector("#quickViewModal");
const modalContent = document.querySelector("#quickViewContent");


document.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("quick-view-btn")) return;

  const id = e.target.dataset.id;

  try {
    const product = await dataSource.findProductById(id);

    console.log(product);

    modalContent.innerHTML = `
      <div class="quick-view">
        <div class="quick-view__image">
          <img
            src="${product.Images.PrimaryMedium}"
            alt="${product.Name}"
          >
        </div>

        <div class="quick-view__info">
          <h2>${product.Name}</h2>

          <h3>${product.Brand.Name}</h3>

          <p>${product.DescriptionHtmlSimple}</p>

          <p class="price"><strong>$${product.FinalPrice}</strong></p>
        </div>
      </div>
    `;

    modal.classList.add("show");

  } catch (err) {
    console.error(err);
    alert("Error loading product");
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-modal")) {
    modal.classList.remove("show");
  }
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});