const express = require("express");
const app = express();

const records = require("./airtable").records;

const getAlbumDetails = album => {
  const {
    Artist: artistName = "(Unknown)",
    "Album name": albumName = "(Unknown)",
    Rating: rating,
    Image: image
  } = album.fields;

  const { url: imageUrl, thumbnails } = image[0];

  const thumbUrl = thumbnails.large.url;

  return {
    artistName,
    albumName,
    rating,
    imageUrl,
    thumbUrl
  };
};

app.get("/albums", (request, response) => {
  records.select().all((e, r) => {
    if (e) console.log(e);
    const l = Math.floor(Math.random() * r.length);
    const album = r[l];

    response.json(getAlbumDetails(album));
  });
});

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
