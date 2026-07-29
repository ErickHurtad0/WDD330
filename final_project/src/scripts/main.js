
import { handleSearch } from "./search.js";
import { getRandomAlbums } from "./api.js";
import {
  displaySongs,
  displayRandomAlbums,
  updateRandomTitle
} from "./ui.js";

const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const query = input.value.trim();

  if (!query) return;

  await handleSearch(query);
});


document.addEventListener("DOMContentLoaded", async () => {
    const data = await getRandomAlbums();

displayRandomAlbums(data.albums);

updateRandomTitle(data.genre);
});
