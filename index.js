import express from "express"
import bodyParser from "body-parser"

const app = express();
const port = 3000;
const arr= [];

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.render("home.ejs")
});

app.get("/Blog", (req, res)=>{
    res.render("blogs.ejs", {arr})
});

app.post("/submit", (req, res)=>{
    const newPost = {
        title: req.body["title"],
        post: req.body["post"]
    }

    arr.push(newPost);

    res.render("blogs.ejs", {arr});
})

app.listen(port, ()=>{
    console.log(`Server running on port${port}`);
})