
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const genres = [
  "Rock",
  "Pop",
  "Jazz",
  "Hip Hop",
  "Electronic",
  "Indie",
  "Country",
  "Blues",
  "Alternative Rock",
  "Britpop",
  "Lo-fi Hip Hop",
  "Salsa",
  "Japanese Traditional",
  "Black Metal"
];

const randomGenre =
  genres[Math.floor(Math.random() * genres.length)];

export async function getAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + btoa(`${clientId}:${clientSecret}`),
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();

  return data.access_token;
}

export async function searchMusic(query) {
  const token = await getAccessToken();

  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  console.log(data);

  return data.tracks.items;
}

export async function getRandomAlbums() {
  const albums = await searchMusic(randomGenre);
    return {
      genre: randomGenre,
      albums
  };
}