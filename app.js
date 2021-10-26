const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContacts, findContact } = require('./utils/contact.js');

const app = express();
const port = 3000;

// gunakan ejs
app.set('view engine', 'ejs');

// Third-party Middleware
app.use(expressLayouts);

// buildin middleware
app.use(express.static('public'));


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
});

app.get('/about',(req,res)=>{
    res.render('about',{
        layout:'layouts/main',
        title:'about'
    });
});

app.get('/contact',(req,res)=>{
    const contacts = loadContacts();
    res.render('contact',{
        layout:'layouts/main',
        title:'contact',
        contacts
    });
});

app.get('/contact/:nama',(req,res)=>{
    const contact = findContact(req.params.nama);
    res.render('detail',{
        layout:'layouts/main',
        title:'Detail Contact',
        contact
    });
});


app.use('/',(req,res)=>{
    res.status(404);
    res.send('<h1>404</h1>');
});

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`);
})