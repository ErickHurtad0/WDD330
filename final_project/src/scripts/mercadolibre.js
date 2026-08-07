
import { getCurrentAlbum } from "./modal.js";

const buyBtn = document.querySelector("#buy-btn");

buyBtn.addEventListener("click", async () => {

    const album = getCurrentAlbum();

    const query =
        `${album.artists[0].name} ${album.name} vinyl`;

    searchMercadoLibre(query);

});