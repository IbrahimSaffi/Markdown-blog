const { urlencoded } = require("express")
const express = require("express")
const { default: mongoose} = require("mongoose")
const articlesRouter =require('./routes/articles')
const Article = require("./schemes/article")
const app = express()
mongoose.connect("mongodb://localhost:27017/articles")
.then(()=>{
    console.log("Connected to db")
}).catch((err)=>console.log("Error",err))
app.use(express.static('public'))
app.use(express.urlencoded())

app.set('view engine',"ejs")
app.use('/articles',articlesRouter)
app.get('/', async (req,res) => {
    const articles = await Article.find({})
    console.log(articles[0]);
    res.render("index",{articles:articles})

})
app.listen(8000);
