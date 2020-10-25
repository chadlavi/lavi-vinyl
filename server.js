const express = require("express");
const app = express();

const records = require("./airtable").records;

app.get("/albums", (request, response) => {
  records
    .select()
    .all(
      (e, r) => {
        if (e) console.log(e)
        const l = Math.floor(Math.random() * r.length)
        const album = r[l]    
        
        response.json(album);
      }
    )
});

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
