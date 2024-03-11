import mysql from 'mysql2'

import dotenv from 'dotenv'

dotenv.config()
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.PASS,
    database: process.env.DATABASE
}).promise()

//Getting
export async function getReport(){
    const [rows] = await pool.query("Select * from raport")
    //console.log(rows)
    return rows
}

export async function getSala(){
    const [rows] = await pool.query("Select wielkość,nazwa from sala")
    return rows
}

export async function getSalabyId(id){
    const [rows] = await pool.query("Select wielkość,nazwa from sala WHERE idSali = ?", [id])
    //console.log(rows[0])
    return rows
}
export async function getReportbyId(id){
    const [rows] = await pool.query("Select * from raport WHERE IdRaportu = ?", [id])
    //console.log(rows[0])
    return rows
}

export async function getImageById(id){
    const [rows] = await pool.query("Select image from images WHERE idImages = ?", [id])
    //console.log(rows[0])
    return rows[0]
}


export async function getPdfById(id){
    const [rows] = await pool.query("Select pdf from pdfs WHERE pdfId = ?", [id])
    return rows[0]
}

//Creating
export async function createReport(content, idWorker, username){
    const [result] = await  pool.query("Insert into raport (opis,idPracownika,username) values (?,?,?)", [content, idWorker, username])
}

export async function createSala(name,size){
    const [result] = await  pool.query("Insert into sala (nazwa, wielkość,status,typ) values (?,?,?,?)", [name,size,"wolna","x"])
}


export async function createImage(image){
    const [result] = await  pool.query("Insert into images (image) values (?)", [image])
    const id = result.insertId
}


export async function createPDF(pdfData){
    const [result] = await  pool.query("Insert into pdfs (pdf) values (?)", [pdfData])
    const id = result.insertId
}




