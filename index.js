const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json());

function readDataFromFile(callback) {
  fs.readFile("data.json", "utf8", (err, data) => {
    callback(JSON.parse(data));
  });
}

function writeDataToFile(data, callback) {
  fs.writeFile("data.json", JSON.stringify(data, null, 2), "utf8", (err) => {
    callback(err);
  });
}
app.get("/posts", (req, res) => {
  readDataFromFile((data) => {
    res.send({ posts: data });
  });
});
const date = new Date;

app.post("/posts", (req, res) => {
  readDataFromFile((data) => {
   
    if (!req.body?.name) {
      res.send({ message: "name filled is required." });
    }
    else if (!req.body?.title) {
      res.send({ message: "title filled is required." });
    }
    else if (!req.body?.description) {
      res.send({ message: "description filled is required." });
    }
    else{ 
      req.body.date = `${date.getDate().toString()} / ${(date.getMonth()+1).toString()} / ${date.getFullYear().toString()}`;
      if(data.length == 0)
     req.body.id = data.length + 1;
     else {
        req.body.id = data[data.length - 1].id + 1;
     }
    data.push(req.body);
    
    writeDataToFile(data, () => {
      res.send({ message: "Post added successfully." });
    });}
  });
});

app.put("/posts/:id", (req, res) => {
  const id = req.params.id;

  readDataFromFile((data) => {
    const index = data.findIndex((item) => item.id == id);

    if (index == -1) {
      res.send({ message: "This post does not exists." });
    }

   else
    { 
      if (req.body?.name) {
        data[index].name = req.body.name;
      }
       if (req.body?.title) {
        data[index].title = req.body.title;
      }
       if (req.body?.description) {
        data[index].description = req.body.description;
      }
  

    writeDataToFile(data, () => {
      res.send({ message: "Post updated successfully." });
    });}
  });
});

app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  readDataFromFile((data) => {
    const index = data.findIndex((item) => item.id == id);

    if (index == -1) {
      res.send({ message: "This post does not exists." });
    }
else{
    const dataAfterDelete = data.filter((item) => item.id != id);

    writeDataToFile(dataAfterDelete, () => {
      res.send({ message: "Post deleted successfully." });
    });
  }
  });
});

app.listen(3000);
