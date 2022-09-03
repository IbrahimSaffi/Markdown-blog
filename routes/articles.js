const express = require('express');
const Article = require("../schemes/article")
const router = express.Router();
router.get('/new',(req,res)=>{
   res.render('articles/new')
})
router.post('/update/:id', async (req,res)=>{
   const {title,data,author} = req.body
   if(!title,!data,!author){
      res.status(400).send("Entries are missing")
   }
   await Article.updateOne( {"_id": req.params.id},{title:title,body:data,author:author});
   res.redirect(req.protocol + '://' + req.get('host'))
})
router.get('/edit/:id', async (req,res)=>{
   let article = await Article.findOne( {"_id": req.params.id});
   res.render('articles/edit',{article:article})
})
router.post('/del/:id',async (req,res)=>{
   await Article.deleteOne( {"_id": req.params.id});
   res.redirect(req.protocol + '://' + req.get('host'))
})
router.get('/view/:id',async (req,res)=>{
   let article = await Article.findOne( {"_id": req.params.id});
   res.render("articles/view",{article:article})
   // res.redirect(req.protocol + '://' + req.get('host'))
})
router.get('/', (req,res) =>{
     res.send('Articles List')
})
router.post('/add', async (req,res)=>{
   const {title,data,author} = req.body
   if(!title,!data,!author){
      res.status(400).send("Entries are missing")
   }
   const article = new Article({
    title:title,
    body:data,
    author:author,
    created_at: new Date().toLocaleString()
   })
   article.save()
   res.redirect(req.protocol + '://' + req.get('host'))
   // res.redirect(location.origin)
   //Details,Delete and edit functionalatiy
})
module.exports = router;