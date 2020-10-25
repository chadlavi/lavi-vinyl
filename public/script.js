const resultContainer = document.getElementById("album");

const placeholder = document.getElementById("placeholder");

const reinsert = e => {
  const n = e.cloneNode(true);
  const parent = e.parentNode;
  e.remove();
  parent.append(n);
  showReloadButton();
};

const hidePlaceholder = () => {
  placeholder.className = "hide";
};

const showPlaceholder = () => {
  placeholder.className = "";
};

const hideReloadButton = () => {
  const reloadButton = document.getElementById("reload-button");
  reloadButton.className = "";
};

const showReloadButton = () => {
  const reloadButton = document.getElementById("reload-button");
  setTimeout(() => {
    reloadButton.className = "show";
  }, 1000);
};

const formatResult = album => {
  const { fields } = album;
  return `"${fields["Album name"]}" by${fields.Artist}`;
};

const insertResult = album => {
  const albumName = album.fields["Album name"];
  const name = document.createElement("div");
  name.innerText = albumName || "Unknown";
  name.className = "result-text result-album";

  const artistName = album.fields.Artist;
  const artist = document.createElement("div");
  artist.innerText = artistName || "Unknown";
  artist.className = "result-text result-artist";

  const imgContainer = document.createElement("div");
  imgContainer.className = "result-image-container";

  const imageBox = document.createElement("div");
  imageBox.className = "image-box";
  imgContainer.append(imageBox);

  const imageUrl = album.fields.Image[0].url;

  const img = document.createElement("img");
  img.src = imageUrl;
  img.className = "result-image lg-image";
  img.alt = `photo of "${albumName}" by ${artistName}`;

  if (imageUrl) {
    const thumbUrl = album.fields.Image[0].thumbnails.large.url;
    const thumb = document.createElement("img");
    thumb.src = thumbUrl;
    thumb.className = "result-image sm-image";
    thumb.alt = `photo of "${albumName}" by ${artistName}`;

    img.style.background = `url(${thumbUrl})`;
    img.style["background-size"] = "cover";

    imageBox.appendChild(thumb);
  }
  imageBox.appendChild(img);

  const result = document.createElement("div");
  result.id = "result";

  result.appendChild(name);
  result.appendChild(artist);
  result.appendChild(imgContainer);

  resultContainer.appendChild(result);
};

const loadAlbum = async () => {
  showPlaceholder();
  hideReloadButton();
  fetch("/albums")
    .then(response => response.json())
    .then(album => {
      document.getElementById("placeholder").className = "hide";
      insertResult(album);
    });
};

const newAlbum = async () => {
  const reloadButton = document.getElementById("reload-button");
  const previousResult = document.getElementById("result");
  previousResult.remove();
  loadAlbum().then(() => {
    reinsert(reloadButton);
  });
};

loadAlbum().then(() => {
  showReloadButton();
});
