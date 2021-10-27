const fs = require('fs');

const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// ambil semua data di contact.json
const loadContacts = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);

    return contacts;
}

// cari contact berdasarkan nama
const findContact = (nama)=>{
    const contacts = loadContacts();
    const contact = contacts.find((contact)=>contact.nama.toLowerCase() === nama.toLowerCase());

    return contact;

}

// menulist / menimpa file contacts.json dengan data baru
const saveContacts = (contacts) =>{
    fs.writeFileSync('data/contacts.json',JSON.stringify(contacts));
}

//menambah data contact baru 
const addContact=(contact) => {
    const contacts = loadContacts();
    contacts.push(contact);
    saveContacts(contacts);
}

//cek duplikat
const cekDuplikat = (nama) =>{
    const contacts = loadContacts();
    return contacts.find((contact)=>contact.nama===nama);
}
module.exports = {
    loadContacts, findContact, addContact,cekDuplikat
}