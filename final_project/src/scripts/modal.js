
let currentAlbum = null;

const modal = document.querySelector("#album-modal");

export function openModal(song, options = {}) {

    const removable = options.removable ?? false;

    currentAlbum = song;

    document.querySelector("#modal-cover").src =
        song.album.images[0].url;

    document.querySelector("#modal-song").textContent =
        song.name;

    document.querySelector("#modal-artist").textContent =
        song.artists[0].name;

    document.querySelector("#modal-album").textContent =
        song.album.name;

    const favoriteBtn = document.getElementById("favorite-btn");
    const removeBtn = document.getElementById("remove-btn");

    if (favoriteBtn && removeBtn) {
        favoriteBtn.hidden = removable;
        removeBtn.hidden = !removable;
    }

    modal.classList.remove("hidden");

    favoriteBtn.disabled = isFavorite(currentAlbum.id);


}

export function closeModal() {
    modal.classList.add("hidden");
}


import {
    addFavorite,
    removeFavorite,
    isFavorite
} from "./favorites.js";

const removeBtn = document.getElementById("remove-btn");

if (removeBtn) {

    removeBtn.addEventListener("click", () => {

        if (!currentAlbum) return;

        removeFavorite(currentAlbum.id);

        closeModal();

        if (window.location.pathname.includes("favorites")) {
            location.reload();
        }

    });

}

const favoriteBtn = document.getElementById("favorite-btn");

if (favoriteBtn) {

    favoriteBtn.addEventListener("click", () => {

        if (!currentAlbum) return;

        addFavorite(currentAlbum);

        favoriteBtn.disabled = true;

    });

}

const closeButton = document.querySelector(".close-modal");

if (closeButton) {
    closeButton.addEventListener("click", closeModal);
}