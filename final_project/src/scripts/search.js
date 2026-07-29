
import { searchMusic } from "./api.js";
import { displaySongs } from "./ui.js";

export async function handleSearch(query) {
  console.log("Searching:", query);

  const songs = await searchMusic(query);

  displaySongs(songs);
}

