const placeholder = document.getElementById("placeholder");

const reinsert = e => {
  const n = e.cloneNode(true);
  const parent = e.parentNode;
  e.remove();
  parent.append(n);
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
  const { artistName, albumName, rating, image, imageUrl, thumbUrl } = album;

  const resultContainer = document.getElementById("album");

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
  imgContainer.appendChild(imageBox);

  const altText = `photo of our copy of "${albumName}" by ${artistName}`;

  const img = document.createElement("img");
  img.src = imageUrl;
  img.className = "result-image lg-image";
  img.alt = altText;

  if (imageUrl) {
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

    ratingsBox.appendChild(starBox);

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
      hidePlaceholder();
      insertResult(album);
    });
};

const newAlbum = async () => {
  const reloadButton = document.getElementById("reload-button");
  const previousResult = document.getElementById("result");
  if (previousResult) previousResult.remove();
  loadAlbum().then(() => {
    reinsert(reloadButton);
    showReloadButton();
  });
};

document.addEventListener("keydown", e => {
  console.log(e.code);
  const triggers = ["Space", "KeyN", "ArrowRight"];
  if (triggers.includes(e.code)) newAlbum();
});

loadAlbum().then(() => {
  showReloadButton();
});

console.log(
  `%c                  _,.,
                ,'   ,'
               /   ,'
              /   ,
             /   ,
            /   '
           /   ,'
           '.__|
            |  |
            |__|              ;
            |  |              ;;
            |__|              ;';.
            |  |              ;  ;;
            |__|              ;   ;;
            |  |              ;    ;;
            |__|              ;    ;;
            |, |              ;   ;'
            |--|              ;  '
            |__|         ,;;;,;
            |  |         ;;;;;;
            |--|        \`;;;;'
            |__|
            |__|        ,-.
            |__|'     ,'  /
       _,.-'     ',_,' o /
      /     8888        /
      |                /
       1              /
       \`L   8888     /
        |           /
       /    ====    \\
      /     ____     \\
     /     (____)  o  \\
    /             o    \\
   /             o     ,'
  /               _,.'^
 /        __,.-"~^
',,..--~~^

RADICAL, DUDE.

Thanks for taking a peek in the console!
You can check out the code for this app at https://github.com/chadlavi/lavi-vinyl.`,
  "font-family:monospace"
);
