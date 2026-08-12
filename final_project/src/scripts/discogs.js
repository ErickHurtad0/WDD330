import { getCurrentAlbum } from "./modal.js";

const TOKEN = import.meta.env.VITE_DISCOGS_TOKEN;

const buyBtn = document.querySelector("#buy-btn");

if (buyBtn) {
    buyBtn.addEventListener("click", () => {
        const album = getCurrentAlbum();

        const artist = encodeURIComponent(album.artists[0].name);
        const albumName = encodeURIComponent(album.album.name);

        window.location.href =
            `src/buy.html?artist=${artist}&album=${albumName}`;
    });
}

export async function searchDiscogs(query) {
    try {
        const response = await fetch(
            `https://api.discogs.com/database/search?q=${encodeURIComponent(query)}&type=release`,
            {
                headers: {
                    Authorization: `Discogs token=${TOKEN}`,
                    "User-Agent": "OutForMusic/1.0"
                }
            }
        );

        if (!response.ok) {
            const text = await response.text();
            console.log(response.status);
            console.log(text);

            throw new Error(`Discogs returned ${response.status}`);
        }

        const data = await response.json();

        return data.results;

    } catch (error) {
        console.error(error);
    }
}
