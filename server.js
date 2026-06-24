const express = require("express");
const pool = require("./db");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", async (req, res) => {

    const category = req.query.category;
    const cursor = req.query.cursor;
    

    app.use(cors());

    let result;

    if (category && cursor) {

        result = await pool.query(
            `
            SELECT *
            FROM products
            WHERE category = $1
            AND id < $2
            ORDER BY id DESC
            LIMIT 20
            `,
            [category, cursor]
        );

    } else if (category) {

        result = await pool.query(
            `
            SELECT *
            FROM products
            WHERE category = $1
            ORDER BY id DESC
            LIMIT 20
            `,
            [category]
        );

    } else if (cursor) {

        result = await pool.query(
            `
            SELECT *
            FROM products
            WHERE id < $1
            ORDER BY id DESC
            LIMIT 20
            `,
            [cursor]
        );

    } else {

        result = await pool.query(
            `
            SELECT *
            FROM products
            ORDER BY id DESC
            LIMIT 20
            `
        );

    }

    res.json(result.rows);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});