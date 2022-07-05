const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const shortid = require('shortid');
console.log(shortid.generate());

const newId = shortid.generate()
console.log(newId)


app.post('/api/notes', (req,res)=> {
    const addNote = { ...req.body, "id": newId}
    fs.readFile ("./db/db.json", "utf8", (error, results) => {
    
    var getAll = JSON.parse(results)
    
    getAll.push(addNote)
    
    fs.writeFile("./db/db.json", JSON.stringify(getAll), (error, results) => {
        if (error) {"error: ",  console.log(error)};
    res.json(getAll)
    
    })
})
    
    })
    

    app.get('/api/notes', (req, res) => {
        fs.readFile("./db/db.json", "utf8", (error, results) => {
    
    
            const getAll = JSON.parse(results);
            res.json(getAll);
        });
    
    });

    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, './public/notes.html'));
    });
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './public/index.html'));
    });
    



app.listen(PORT, () => {
    console.log(`API server now on port 3001!  http://localhost:${PORT}`);
})