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

const insertResult = album => {
  const {
    Artist: artistName = "(Unknown)",
    "Album name": albumName = "(Unknown)",
    Rating: rating,
    Image: image
  } = album.fields;

  const { url: imageUrl, thumbnails } = image[0];

  const name = document.createElement("div");
  name.innerText = albumName;
  name.className = "result-text result-album";

  const artist = document.createElement("div");
  artist.innerText = artistName;
  artist.className = "result-text result-artist";

  const imgContainer = document.createElement("div");
  imgContainer.className = "result-image-container";

  const imageBox = document.createElement("div");
  imageBox.className = "image-box";
  imgContainer.append(imageBox);

  const altText = `photo of our copy of "${albumName}" by ${artistName}`;

  const img = document.createElement("img");
  img.src = imageUrl;
  img.className = "result-image lg-image";
  img.alt = altText;

  if (imageUrl) {
    const thumbUrl = thumbnails.large.url;
    const thumb = document.createElement("img");
    thumb.src = thumbUrl;
    thumb.className = "result-image sm-image";
    thumb.alt = altText;

    img.style.background = `url(${thumbUrl})`;
    img.style["background-size"] = "cover";

    imageBox.appendChild(thumb);
  }
  imageBox.appendChild(img);

  if (rating) {
    const ratingsBox = document.createElement("div");
    ratingsBox.className = "ratings";

    const starBox = document.createElement("span");

    const ratingsText = `rating: ${rating}/5`;
    starBox.className = "stars";
    for (let i = 0; i < rating; i++) {
      starBox.append("★");
    }
    starBox["aria-label"] = ratingsText;
    starBox.title = ratingsText;

    ratingsBox.append(starBox);

    imageBox.appendChild(ratingsBox);
  }

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
