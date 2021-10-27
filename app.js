const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContacts, findContact, addContact,cekDuplikat } = require('./utils/contact.js');
const { body, validationResult,check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
flash = require('connect-flash');



const app = express();
const port = 3000;

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(session({
    cookie:{maxAge:6000},
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));
app.use(flash());
// gunakan ejs
app.set('view engine', 'ejs');

// Third-party Middleware
app.use(expressLayouts);

// buildin middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

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
        contacts,
        msg:req.flash('msg'),
    });
});

//form tambah kontak
app.get('/contact/add',(req,res)=>{
    res.render('add-contact',{
        layout:'layouts/main',
        title:'form tambah kontak',
    });
});

// proses data kontak
app.post('/contact',[
    body('nama').custom((value)=>{
        const duplikat = cekDuplikat(value);
        if(duplikat){
            throw new Error('Nama contact sudah terdaftar')
        }
        return true;
    }),
    check('email','Email Tidak Valid!').isEmail(),
    check('noHP','Nomor HP tidak valid').isMobilePhone('id-ID')
], (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        
        res.render('add-contact',{
            'title':'Form Tambah data kontak',
            layout:'layouts/main',
            errors:errors.array(),
        })
    }else{
        addContact(req.body);
        req.flash('msg','Data kontak berhasil ditambahkan!');
        res.redirect('/contact');
    }
});

// detail kontak
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