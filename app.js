var express=require("express"),
app=express(),
bodyParser=require("body-parser"),
mongoose=require("mongoose");


mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));



var blogSchema=new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{type:Date, default: Date.now}
});

var Blog=mongoose.model("Blog",blogSchema);

//RESTFUL ROUTES
app.get("/blogs",function(req,res){
     Blog.find({},function(err,blogs){
        if(err){
            console.log("ERROR");
        }
        else{
            res.render("index",{blogs:blogs});
        }
    });
})

app.get("/",function(req,res){
   
    res.redirect("/blogs");
})

// Blog.create({
//     title:"TEST",
//     image:"https://images.unsplash.com/photo-1446404468622-a0c36ff6f0c4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3f082a4844b9fd2e35cd0d258ad79893&auto=format&fit=crop&w=1050&q=80",
//     body:"HELLOWORDL!"
// });


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("SERVER IS RUNNING!");
})

