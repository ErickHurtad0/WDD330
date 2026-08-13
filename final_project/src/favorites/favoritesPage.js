
import { getFavorites } from "../scripts/favorites.js";
import { createCard } from "../scripts/card.js";
import "../scripts/discogs.js";

const container = document.querySelector("#favorites-container");

function renderFavorites() {

    container.innerHTML = "";

    const favorites = getFavorites();

    if (favorites.length === 0) {

        container.innerHTML = `
            <p class="empty-message">
                You haven't added any favorite songs yet.

                <br>Search for music and tap "Add to Favorites".
            </p>
        `;

        return;
    }

    favorites.forEach(song => {
        container.appendChild(createCard(song, "song", false, true));
    });

}



renderFavorites();


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
