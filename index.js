import express from "express"
import bodyParser from "body-parser"
import env from "dotenv"

env.config();

const app = express();
const port = process.env.PORT;
const arr= [];

let lastId = 0;
let editPost= {};

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.render("home.ejs");
});

app.get("/Blog", (req, res)=>{
    res.render("blogs.ejs", {arr, editPost: null});
});

app.post("/submit", (req, res)=>{
    const newId = lastId+=1
    const newPost = {
        title: req.body.title,
        post: req.body.post,
        id: newId
    }

    lastId = newId;
    arr.push(newPost);
    res.redirect("/Blog");
});

app.get("/remove/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const searchIndex = arr.findIndex((post)=>post.id ===id);
    if(searchIndex == -1) res.status(404).json({ message: "Post not found" });
    arr.splice(searchIndex, 1);

    res.redirect("/Blog");
});

app.get("/edit/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const post = arr.find((p) => p.id === id);

    if (!post) return res.status(404).send("Post not found");

    res.render("blogs.ejs", { arr, editPost: post });
});

app.post("/update/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = arr.findIndex((p) => p.id === id);

    if (index === -1) return res.status(404).send("Post not found");

    arr[index] = {
        id,
        title: req.body.title,
        post: req.body.post,
    };

    res.redirect("/Blog");
});

app.listen(port, ()=>{
    console.log(`Server running on port${port}`);
})