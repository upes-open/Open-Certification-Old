var express=require("express");
var app=express();
var ejs=require("ejs");
var path = require("path");
var bodyParser=require("body-parser");
var pdf = require("html-pdf");
app.set("view engine","ejs");
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended:true}));

//Get Home Route
app.get("/",function(req, res){
    res.render("home");
    
});
//Download Logic
downloadData=[];
app.get("/downloadCertificate", (req, res) => {
    ejs.renderFile(path.join(__dirname, './views/', "certificates.ejs"), {certificateData: downloadData[0]}, (err, data) => {
    if (err) {
          res.send(err);
    } else {
        let options = {
            "height": "11.25in",
            "width": "8.5in",
            "header": {
                "height": "20mm"
            },
            "footer": {
                "height": "20mm",
            },
        };
        pdf.create(data, options).toFile("certificate.pdf", function (err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send("File created successfully");
            }
        });
    }
});
})
// Post to New Certification
app.post("/newcertification",function(req,res){
    //get data from form and add to campground array.
    var name=req.body.AwardeeName;
    var cause=req.body.EventDetails;
    var certificateData={name:name,cause:cause};
    //certificates.push(newCertificate);
    downloadData.push(certificateData);
    res.render("getcertificate",{certificateData:certificateData});
    }); 



app.listen(5000,function(){
    console.log("App is running");
});