
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

export function renderListWithTemplate(
    templateFn,
    parentElement,
    list,
    position = "afterbegin",
    clear = false
) {

  const htmlStrings = list.map(templateFn);
  const html = htmlStrings.join("");
  if (clear) {
      parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, html);

}

export function renderWithTemplate(
    template,
    parentElement,
    data,
    callback
) {
    parentElement.innerHTML = template;

    if (callback) {
        callback(data);
    }
}

export async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}

export async function loadHeaderFooter() {
  console.log("loadHeaderFooter is running");

  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(
    headerTemplate,
    headerElement
  );

  renderWithTemplate(
    footerTemplate,
    footerElement
  );
}

export function alertMessage(message, scroll = true) {
  const existing = document.querySelector(".alert");

  if (existing) {
      existing.remove();
  }

  const alert = document.createElement("div");
  alert.className = "alert";

  alert.innerHTML = `
    <p>${message}</p>
    <button aria-label="Close">&times;</button>
  `;

  alert.querySelector("button").addEventListener("click", () => {
    alert.remove();
  });

  const main = document.querySelector("main");
  main.prepend(alert);

  if (scroll) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}