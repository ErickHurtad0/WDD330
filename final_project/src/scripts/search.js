
import { searchMusic } from "./api.js";
import { displaySongs } from "./ui.js";

export async function handleSearch(query) {
  const songs = await searchMusic(query);

  displaySongs(songs);
}

