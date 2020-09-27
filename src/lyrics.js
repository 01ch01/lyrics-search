function findLyrics(artist, title) {
  return fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
}

const form = document.querySelector('form');
form.addEventListener('submit', (el) => {
  el.preventDefault();
  doSubmit();
});

async function doSubmit() {
  const lyricsEl = document.querySelector('.lyrics');
  const artist = document.querySelector('#artist');
  const title = document.querySelector('#title');

  const loadingEl = document.createElement('div');
  loadingEl.setAttribute('class', 'loader');

  let loadingText = document.createTextNode('Loading...');
  loadingEl.appendChild(loadingText);

  lyricsEl.appendChild(loadingEl);

  try {
    const lyricsResponse = await findLyrics(artist.value, title.value);
    const data = await lyricsResponse.json();

    if (data.lyrics) {
      lyricsEl.innerHTML = data.lyrics;
      clearInputs();
    } else {
      lyricsEl.innerHTML = data.error;
    }
  } catch (err) {
    console.log(err);
  }
}

function clearInputs() {
  const artistInputEl = document.querySelector('input#artist');
  const titleInputEl = document.querySelector('input#title');

  artistInputEl.value = '';
  titleInputEl.value = '';
}
