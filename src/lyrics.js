function findLyrics(artist, title) {
  return fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
}

const form = document.querySelector('#lyrics_form');
form.addEventListener('submit', (el) => {
  el.preventDefault();
  doSubmit();
});

async function doSubmit() {
  const lyrics_el = document.querySelector('#lyrics');
  const artist = document.querySelector('#artist');
  const title = document.querySelector('#title');

  lyrics_el.innerHTML =
    '<div class = "spinner-grow" role = "status" > <span class = "sr-only">Loading...</span></div>';

  try {
    const lyricsResponse = await findLyrics(artist.value, title.value);
    const data = await lyricsResponse.json();
    if (data.lyrics) {
      lyrics_el.innerHTML = data.lyrics;
    } else {
      lyrics_el.innerHTML = data.error;
    }
  } catch (err) {
    console.log(err);
  }
}
