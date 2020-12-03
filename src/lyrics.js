function findLyrics(artist, title) {
  return fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
}

const form = document.querySelector('form');

form.addEventListener('submit', el => {
  el.preventDefault();

  doSubmit();
});

async function doSubmit() {
  const lyricsEl = document.querySelector('.lyrics');
  lyricsEl.style.display = 'flex';

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

    clearInputs(artist, title);

    if (data.lyrics) {
      updateMainContainer(artist, title);

      lyricsEl.innerHTML = data.lyrics;
    } else {
      lyricsEl.innerHTML = '';

      let errorText = document.createTextNode(
        "It looks like we didn't find the song you were looking for 😕\n\n" +
          'Please verify the orthography and try again'
      );

      lyricsEl.appendChild(errorText);
    }
  } catch (err) {
    console.log(err);
  }
}

function clearInputs(artist, title) {
  artist.value = '';
  title.value = '';
}

function updateMainContainer() {
  const mainEl = document.querySelector('main');

  mainEl.style.height = 'auto';

  mainEl.style.marginBottom = '2em';
}
