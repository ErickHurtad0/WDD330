
import { createCard } from "./card.js";

export function displaySongs(songs) {

    const hero = document.querySelector(".hero");
    const resultsSection = document.querySelector("#results-section");
    const grid = document.querySelector(".results-grid");

    hero.classList.add("search-mode");
    hero.querySelector("h2").textContent = "Search Results";

    resultsSection.style.display = "block";

    grid.innerHTML = "";

    songs.forEach(song => {
        grid.appendChild(createCard(song, "song"));
    });

}
export function displayRandomAlbums(songs) {

    const grid = document.querySelector(".random-grid");

    grid.innerHTML = "";

    songs.slice(0, 4).forEach(song => {
        grid.appendChild(createCard(song, "album"));
    });

}

export function updateRandomTitle(genre) {
    const title = document.querySelector("#random-title");
    title.textContent = `Discover your new favorite ${genre} album`;
}