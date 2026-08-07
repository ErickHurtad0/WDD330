import { openModal } from "./modal.js";

export function createCard(song, type = "song", showFavorite = true, removable = false) {

    const card = document.createElement("article");
    card.classList.add("song-card");

    const image = song.album.images[0].url;
    const artist = song.artists[0].name;

    const title =
        type === "song"
            ? song.name
            : song.album.name;

    const spotify =
        type === "song"
            ? song.external_urls.spotify
            : song.album.external_urls.spotify;

    card.innerHTML = `
        <img
            src="${image}"
            alt="${title}"
            class="song-image">

        <div class="song-info">

            <h3>${title}</h3>

            <p class="artist">
                ${artist}
            </p>

            ${
                type === "song"
                    ? `
                        <p class="album">
                            ${song.album.name}
                        </p>

                        <div class="card-actions">

                            <a
                                href="${spotify}"
                                target="_blank"
                                class="spotify-btn">

                                Open in Spotify

                            </a>

                        </div>
                    `
                    : ""
            }

        </div>
    `;

    if (type === "album") {

        card.addEventListener("click", () => {
            window.open(song.album.external_urls.spotify, "_blank");
        });

    } else {

        card.addEventListener("click", () => {
            openModal(song, {
                removable
            });
        });

    }

    return card;

}

