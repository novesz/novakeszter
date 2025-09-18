const express = require("express");
const app = express();
const cors = require("cors");
//const mysql = require("mysql");
const bodyParser = require('body-parser');
require('dotenv').config();
app.use(bodyParser.json());
app.use(cors());
//const mysql = require("mysq2");
const {db} = require('./db');
// Adatbázis kapcsolat létrehozása


// Gyökér útvonal, tesztelésre
app.get("/", (req, res) => {
 res.send("Fut a backend!");
})

// Régiók listázása
app.get("/regiok", (req, res) => {
 const sql = "SELECT * FROM `regiok`"; 
 db.query(sql, (err, result) => {
 if (err) return res.json(err);
 return res.json(result)
 })
})

//3 api feladat:
//1. megoldás:
app.get("/2017", (req, res) => {
 const sql = "SELECT * FROM kozutak.kozutak_hossza where kozutak_hossza.datum = '2017'"; 
 db.query(sql, (err, result) => {
 if (err) return res.json(err);
 return res.json(result)
 })
})

//2. megoldás: 
app.get("/avg", (req, res) => {
 const sql = "SELECT avg(kozutak_hossza.hossz) as 'Az átlag közutak hossza.' from kozutak.kozutak_hossza;"; 
 db.query(sql, (err, result) => {
 if (err) return res.json(err);
 return res.json(result)
 })
})

//3. megoldás
app.get("/Bmegye", (req, res) => {
 const sql = "SELECT * FROM kozutak.megyek where megyek.megyenev like 'B%'"; 
 db.query(sql, (err, result) => {
 if (err) return res.json(err);
 return res.json(result)
 })
})


// Régió hozzáadása
app.post("/ujregio", (req, res) => {
 const sql = "INSERT INTO `regiok` (`Rid`, `regionev`, `regio_tipusa`) VALUES (?, ?, ?)";
 const values = ['11', 'Budapest', 'Főváros'];

 db.query(sql, values, (err, result) => {
 if (err) {
 console.error("Hiba történt:", err);
 return res.status(500).json({ error: "Adatbázis hibatörtént." });
 }
 return res.status(200).json({ message: "Sikeres beszúrás!",
result });
 });
});

// Több régió hozzáadása egyszerre
app.post("/ujregiok", (req, res) => {
 const sql = "INSERT INTO `regiok` (`Rid`, `regionev`, `regio_tipusa`) VALUES (?, ?, ?), (?, ?, ?)";

 // Az értékeket tömbként kell megadni
 const values = [
 '9', 'Dél Alföld', 'régió',
 '10', 'Szeged', 'Főváros'
 ];
 db.query(sql, values, (err, result) => {
 if (err) {
 console.error("Hiba történt:", err);
 return res.status(500).json({ error: "Adatbázis hibatörtént." });
 }
 return res.status(200).json({
 message: "A rekord(ok) beszúrása sikeres volt.",
 result
 });
 });
});

// Régió törlése ID alapján
app.delete("/torles/:id", (req, res) => {
 const sql = "DELETE FROM `regiok` WHERE Rid = ?";
 db.query(sql, [req.params.id], (err, result) => {
 if (err) return res.json(err);
 return res.json(result)
 })
})

// Egyszerre több régió törlése
app.delete("/torles/", (req, res) => {
 // Példa: A kérésben kapott rekordok azonosítói (Rid) egy tömbben
 const idsToDelete = req.body.ids; // Például: [1, 2, 3]
 // Ellenőrzés, hogy van-e legalább egy azonosító
 if (!Array.isArray(idsToDelete) || idsToDelete.length === 0) {
 return res.status(400).json({ error: "Nem adtál meg törlendőazonosítókat." });
 }

 // SQL lekérdezés az `IN` kulcsszóval
 const sql = "DELETE FROM `regiok` WHERE `Rid` IN (?)";
 // SQL végrehajtása
 db.query(sql, [idsToDelete], (err, result) => {
 if (err) {
 console.error("Hiba történt:", err);
 return res.status(500).json({ error: "Adatbázis hibatörtént." });
 }
 return res.status(200).json({
 message: "A rekord(ok) törlése sikeres volt.",
 affectedRows: result.affectedRows
 });
 });
});

// Szerver indítása a 3007-es porton
app.listen(3007, () => {
 console.log("localhost:3007-on fut!");
});