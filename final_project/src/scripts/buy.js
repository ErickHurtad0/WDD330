
import { searchDiscogs } from "./discogs.js";

loadPage();

async function loadPage() {

    const params = new URLSearchParams(window.location.search);

    const artist = params.get("artist");
    const album = params.get("album");

    document.querySelector("#album-title").textContent = album;

    document.querySelector("#artist-name").textContent = artist;

    const query = `${artist} ${album}`;

    const results = await searchDiscogs(query);

    displayResults(results);

}

function displayResults(results) {
    const container = document.querySelector("#discogs-results");

    container.innerHTML = "";

    results.slice(0, 6).forEach(result => {

        const discogsUrl = `https://www.discogs.com${result.uri}`;

        const format = result.format[0];

        let formatClass = "format-default";

        if (format === "CD") {
            formatClass = "format-cd";
        } else if (format === "Vinyl") {
            formatClass = "format-vinyl";
        }

        container.innerHTML += `
            <article class="release-card">

                <div class="release-image">
                    <img
                        src="${result.cover_image}"
                        alt="${result.title}"
                    >
                </div>

                <div class="release-content">

                    <h3>${result.title}</h3>

                    <div class="release-meta">

                        <span class="badge year">
                            ${result.year || "Unknown"}
                        </span>

                        <span class="badge ${formatClass}">
                            ${format}
                        </span>

                    </div>

                    <p class="country">
                        ${result.country || "Unknown Country"}
                    </p>

                    <a
                        href="${discogsUrl}"
                        target="_blank"
                        class="buy-link">

                        View on Discogs →

                    </a>

                </div>

            </article>
            `;
    });
}