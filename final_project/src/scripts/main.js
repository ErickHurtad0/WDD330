
import { handleSearch } from "./search.js";
import { getRandomAlbums } from "./api.js";
import {
  displaySongs,
  displayRandomAlbums,
  updateRandomTitle
} from "./ui.js";
import { openModal } from "./modal.js";
import { closeModal } from "./modal.js";
import "./discogs.js";

const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const defaultHeroTitle = "Discover Your Next Favorite Song";

if (form) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const query = input.value.trim();

        if (!query) return;

        await handleSearch(query);
    });
}


document.addEventListener("DOMContentLoaded", async () => {
    const data = await getRandomAlbums();

displayRandomAlbums(data.albums);

updateRandomTitle(data.genre);
});

document
.querySelector(".close-modal")
.addEventListener("click", closeModal);

const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    if (navigation.classList.contains("open")) {
        menuButton.textContent = "✕";
    } else {
        menuButton.textContent = "☰";
    }
});

document.querySelector("#lastModified").textContent =
`Last Modified: ${document.lastModified}`;



const hero = document.querySelector(".hero");
const header = document.querySelector("header");



function goHome(event) {
    event.preventDefault();

    const hero = document.querySelector(".hero");
    const resultsSection = document.querySelector("#results-section");

    hero.classList.remove("search-mode");
    hero.querySelector("h2").textContent = defaultHeroTitle;

    resultsSection.style.display = "none";
    document.querySelector(".results-grid").innerHTML = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

document
    .querySelector("#home-link")
    .addEventListener("click", goHome);

document
    .querySelector("#logo-link")
    .addEventListener("click", goHome);

document
    .querySelector("#title-link")
    .addEventListener("click", goHome);