
function createSongCard(song) {

    const card = document.createElement("article");

    card.classList.add("song-card");

    card.innerHTML = `
        <img
            src="${song.album.images[0]?.url}"
            alt="${song.album.name}"
            class="song-image">

        <div class="song-info">

            <h3>${song.name}</h3>

            <p class="artist">
                ${song.artists[0].name}
            </p>

            <p class="album">
                ${song.album.name}
            </p>

            <div class="card-actions">

                <button class="favorite-btn">
                    ❤️ Favorite
                </button>

                <a
                    href="${song.external_urls.spotify}"
                    target="_blank"
                    class="spotify-btn">

                    Open in Spotify

                </a>

            </div>

        </div>
    `;

    return card;

}

export function displaySongs(songs) {

    const resultsSection = document.querySelector("#results-section");
    const grid = document.querySelector(".results-grid");

    document
    .querySelector("#random-section")
    .classList.add("hidden");

    resultsSection.style.display = "block";

    grid.innerHTML = "";

    songs.forEach(song => {

        const card = createSongCard(song);

        grid.appendChild(card);

    });

}

function createRandomAlbumCard(song) {

    const link = document.createElement("a");

    link.href = song.album.external_urls.spotify;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    link.classList.add("album-link");

    link.innerHTML = `
        <article class="song-card">

            <img
                src="${song.album.images[0].url}"
                alt="${song.album.name}"
                class="song-image">

            <div class="song-info">

                <h3>${song.album.name}</h3>

                <p>${song.artists[0].name}</p>

            </div>

        </article>
    `;

    return link;
}

export function displayRandomAlbums(songs) {
    const grid = document.querySelector(".random-grid");

    grid.innerHTML = "";

    songs.slice(0, 4).forEach(song => {
        grid.appendChild(createRandomAlbumCard(song));
    });
}

export function updateRandomTitle(genre) {
  const title = document.querySelector("#random-title");

  title.textContent = `Discover Something New in ${genre}`;
}