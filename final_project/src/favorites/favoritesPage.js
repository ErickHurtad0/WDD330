
import { getFavorites } from "../scripts/favorites.js";
import { createCard } from "../scripts/card.js";

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
