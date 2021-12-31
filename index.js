var express = require('express');
var app     = express();
var path    = require("path");
const mysql = require("mysql");

// set static directories
//app.use(express.static(path.join(__dirname, '/views')));

const db=mysql.createConnection({
	host:process.env.MYSQL_HOST,
	port:process.env.MYSQL_PORT,
	user:process.env.MYSQL_USER,
	password:process.env.MYSQL_PASSWORD,
	database:process.env.MYSQL_DATABASE
});

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "/views"));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
 });

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+ '/views/index.html'));
});

const getFullUrl = (req)=>{
    return req.protocol + '://' + req.get('host') + req.originalUrl;
}

app.get('/berita/:id_berita/:judul_berita/',function (req,res){
    console.log(req.params);
   // res.sendFile(path.join(__dirname+ '/adpmet/berita.html'));
    console.log(path.join(__dirname,"/views"))
    const id_berita=req.params.id_berita;
    const query=`SELECT * FROM berita WHERE id=${id_berita}`;
    db.query(query,(err,resp,fields)=>{
        var data=resp[0];
        res.render("berita",{
            judul_berita: data.judul,
            deskripsi_berita: data.isi.slice(0,100)+"..",
            thumbnail_berita: data.foto,
            url: getFullUrl(req)
        });
    });
});

app.get('/pengumuman/:id/:judul/',function (req,res){
    console.log(req.params);
   // res.sendFile(path.join(__dirname+ '/adpmet/berita.html'));
    console.log(path.join(__dirname,"/views"));
    const query=`SELECT * FROM pengumuman WHERE id=${req.params.id}`;
    db.query(query,(err,resp,fields)=>{
        var data=resp[0];
        res.render("pengumuman",{
            judul: data.judul,
            deskripsi: data.isi.slice(0,100)+"..",
            thumbnail: data.foto,
            url: getFullUrl(req)
        });
    });
});

app.get('/artikel/:id/:judul/',function (req,res){
    console.log(req.params);
   // res.sendFile(path.join(__dirname+ '/adpmet/berita.html'));
    console.log(path.join(__dirname,"/views"))
    const query=`SELECT * FROM artikel WHERE id=${req.params.id}`;
    db.query(query,(err,resp,fields)=>{
        var data=resp[0];
        res.render("artikel",{
            judul: data.judul,
            deskripsi: data.isi.slice(0,100)+"..",
            thumbnail: data.foto,
            url: getFullUrl(req)
        });
    });
});

app.get('/event/:id/:judul/',function (req,res){
    console.log(req.params);
   // res.sendFile(path.join(__dirname+ '/adpmet/berita.html'));
    console.log(path.join(__dirname,"/views"))
    const query=`SELECT * FROM event WHERE id=${req.params.id}`;
    db.query(query,(err,resp,fields)=>{
        var data=resp[0];
        res.render("event",{
            judul: data.judul,
            deskripsi: data.deskripsi.slice(0,100)+"..",
            thumbnail: data.gambar,
            url: getFullUrl(req)
        });
    });
});

app.get('/dbhlifting/:id/:judul/',function (req,res){
    console.log(req.params);
    console.log(path.join(__dirname,"/views"))
    const query=`SELECT * FROM dbh_lifting WHERE id=${req.params.id}`;
    db.query(query,(err,resp,fields)=>{
        var data=resp[0];
        res.render("dbhlifting",{
            judul: data.judul,
            deskripsi: data.isi.slice(0,100)+"..",
            thumbnail: data.foto,
            url: getFullUrl(req)
        });
    });
});

var port = process.env.PORT || 5000;
app.listen(port);
console.log('Listening on port ',  port);
