import express from 'express';

import {
    getReport,
    getReportbyId,
    createReport,
    getImageById,
    getPdfById,
    createImage,
    getSala,
    getSalabyId, createSala, createPDF
} from "./database.js";

import bodyParser from 'body-parser';

const app = express();

// Increase the maximum request size limit for images/pdfs
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));




app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, ()=> {
    console.log('Server is running on port 8080')
})

//getting all
app.get("/reports", async (req, res) => {
    const reports = await getReport()
    res.send(reports)
})

app.get("/sale", async (req, res) => {
    const sale= await getSala()
    res.send(sale)
})

//getting report by id
app.get("/getReport/:id", async (req, res) => {
    const id = req.params.id
    const report = await getReportbyId(id)
    res.send(report)
})

app.get("/getSala/:id", async (req, res) => {
    const id = req.params.id
    const sala = await getSalabyId(id)
    res.send(sala)
})


//getting longBlob image by id
app.get("/getImage/:id", async (req, res) => {
    const id = req.params.id
    const image = await getImageById(id)

    res.send(image)
})

app.get("/getPdfById/:id", async (req, res) => {
    const id = req.params.id
    const pdf = await getPdfById(id)

    res.send(pdf)
})

//creating
app.post("/createReport", async (req, res) => {
    const {content, idWorker, username} = req.body
    const report = await createReport(content, idWorker, username)
    res.status(201).send(report)
})

app.post("/createSala", async (req, res) => {
    const {name,size} = req.body
    const sala = await createSala(name,size)
    res.status(201).send(sala)
})


app.post("/createImage", async (req, res) => {
    const {image} = req.body
    const image2 = await createImage(image)
    res.status(201).send(image2)
})

app.post("/createPdf", async (req, res) => {
    const {pdfData} = req.body
    const pdf = await createPDF(pdfData)
    res.status(201).send(pdf)
})




