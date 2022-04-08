const express = require("express");
const server = express();
server.use(express.json());

const db = require('./config/database');

// Get
server.get("/planets", async (req, res) => {
    let response  = await db.query("SELECT * FROM planet");    
    res.status(200).send(response.rows);
});

// Get com id
server.get("/planets/:index", async (req, res) => {
    let {index} = req.params;
    let response = await db.query("SELECT * FROM planet WHERE id = $1", [index]);
    res.status(200).send(response.rows);
})

// Post
server.post("/planets", async (req, res) => {
    let {nome, diameter, climate, surface_water, population} = req.body;
    let sql = "INSERT INTO planet (nome, diameter, climate, surface_water, population) VALUES ($1, $2, $3, $4, $5)";
    await db.query(sql, [nome, diameter, climate, surface_water, population]);

    res.status(201).send("Planeta adicionado com sucesso");

});

// Update/Put
server.put("/planets/:index", async (req, res) => {
    let {index} = req.params;
    let {nome, diameter, climate, surface_water, population} = req.body;

    let sql = "UPDATE planet SET nome = $1, diameter = $2, climate = $3, surface_water = $4, population = $5 WHERE id = $6";
    await db.query(sql, [nome, diameter, climate, surface_water, population, index]);
    res.status(201).send("Planeta atualizado com sucesso");

});


// Delete
server.delete("/planets/:index", async (req, res) => {
    const {index} = req.params;
    let sql = "DELETE FROM planet WHERE id = $1";
    await db.query(sql, [index]);
    res.status(200).send("Planeta excluido com sucesso");
});


// ------

server.listen(3000, () => {
    console.log("Servidor em execução na porta: 3000");
});


