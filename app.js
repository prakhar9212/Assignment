var express=require("express"),
     app=express(),
     	bodyparser  =require("body-parser"),
    mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/commentupvote");

var CommentSchema=mongoose.Schema({
   body:String,
   upvote: Number,
   downvote: Number
   });


var comments=mongoose.model("Comments",CommentSchema);

app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");



app.get("/",function(req,res)
{
	comments.find({}, function(err,allComments)
	{
	if(err)
	{
		console.log(err);
	}
	else
	{
		res.render("posts",{comnt:allComments});
	}
	});
});


app.post("/",function(req,res)
{
    var body= req.body.comment;
    var nComment= {body,upvote:0,downvote:0};
    
    console.log(nComment);
	comments.create(nComment,function(err,comm)
		{
			if(err)
			{
				console.log(err);
			}
			else
			res.redirect("/");
		});
});
app.post("/upvoted",function(req,res){
	var id=req.body.id;
	var old=Number(req.body.val);
comments.findByIdAndUpdate(id, {upvote : old+1 },function(err,upv)

{
	if(err)
	{
		console.log(err);
	}
	
});
	res.redirect("/");
});

app.post("/downvoted",function(req, res) {
    	var id=req.body.id;
    	var old=Number(req.body.val);
	comments.findByIdAndUpdate(id, {downvote : old+1 },function(err,dnv)
{
	if(err)
	{
		console.log(err);
	}
	
});
	res.redirect("/");
});
 



const PORT = 3000;

app.listen(PORT,function(req,res)
{
	console.log(`Server Now Listening on Port ${PORT}`);
});