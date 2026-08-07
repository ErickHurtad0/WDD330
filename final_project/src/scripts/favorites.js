


const STORAGE_KEY = "favorites";

export function getFavorites() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveFavorites(favorites) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function addFavorite(album) {
    const favorites = getFavorites();

    const exists = favorites.some(item => item.id === album.id);

    if (!exists) {
        favorites.push(album);
        saveFavorites(favorites);
    }
}

export function removeFavorite(id) {
    const favorites = getFavorites().filter(item => item.id !== id);
    saveFavorites(favorites);
}

export function isFavorite(id) {
    return getFavorites().some(item => item.id === id);
}

