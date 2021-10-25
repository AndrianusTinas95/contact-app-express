const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express();
const port = 3000;

// gunakan ejs
app.set('view engine', 'ejs');

// Third-party Middleware
app.use(expressLayouts);
app.use(morgan('dev'));

// buildin middleware
app.use(express.static('public'));

app.use((req,res,next)=>{
    console.log('Time: ',Date.now());
    next();
});

app.get('/',(req,res)=>{
    const mahasiswa =[
        {
            nama: "TinDev",
            email:"tindev@gmail.com"
        },
        {
            nama: "nanas",
            email:"nanas@gmail.com"
        },
        {
            nama: "andri",
            email:"andri@gmail.com"
        }
    ] 
    res.render('index',{
        layout:'layouts/main',
        nama : 'TinDev',
        title:'Home',
        mahasiswa
    });
    // res.sendFile('./index.html',{root:x__dirname})
});

app.get('/about',(req,res)=>{
    res.render('about',{
        layout:'layouts/main',
        title:'about'
    });
});

app.get('/contact',(req,res)=>{
    res.render('contact',{
        layout:'layouts/main',
        title:'contact'
    });
});

app.get('/product/:id',(req,res)=>{
    res.send(`Product id :  ${req.params.id} <br> Category : ${req.query.category}`);
});

app.use('/',(req,res)=>{
    res.status(404);
    res.send('<h1>404</h1>');
});

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`);
})