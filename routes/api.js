var express = require('express');
var router = express.Router();
var db = require('../db/db');

function getData(url, tb_name) {
    var sql = `SELECT * FROM ${tb_name}`;
    router.get(url, (req, res) => {
        db.query(sql, (err, data) => {
            if (err) {
                console.log(`Tidak bisa mengambil data di tabel ${tb_name} dengan error: ${err}`);
                res.status(500).send('Gagal mengambil data.');
            } else {
                res.send(data);
            }
        });
    });
}

function editData(url, tb_name) {
    router.post(url, (req, res) => {
        const id = req.params.id;
        const { judulBuku, pengarang } = req.body;
        
        const sql = `UPDATE ${tb_name} SET judulBuku = ?, pengarang = ? WHERE id = ?`;
        const values = [judulBuku, pengarang, id];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.log(`Tidak bisa mengupdate data di tabel ${tb_name} dengan error: ${err}`);
                res.status(500).json({ error: 'Gagal mengupdate data.' });
            } else {
                console.log(`Berhasil mengupdate data di tabel ${tb_name} dengan id: ${id}`);
                res.json({ message: 'Data berhasil diupdate', id: id });
            }
        });
    });
}

function addData(url, tb_name, data) {
    var sql = `INSERT INTO ${tb_name} (${data}) VALUES (${data})`;
    router.post(url, (req, res) => {
        db.query(sql, (err, data) => {
            if (err) {
                console.log(`Tidak bisa menambah data di tabel ${tb_name} dengan error: ${err}`);
                res.status(500).send('Gagal menambah data.');
            } else {
                console.log(`Berhasil menambah data di tabel ${tb_name} dengan data: ${data}`);
                res.send(data);
            }
        });
    });
}


getData('/dataPeminjam', 'peminjam');
addData('dataPeminjam', 'peminjam');
editData('/editBuku/:id', 'buku');ada deh

module.exports = router;