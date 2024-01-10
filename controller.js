const fs = require("node:fs")
module.exports = {
    addOne: (req, res, next) => {
        try {
            const { name, description, price, type } = req.body
            const products = JSON.parse(fs.readFileSync("./products.json", "utf-8"))
            const images = req.files.map(file => file.path)
            const id = "product_" + Date.now()
            const product = { id, name, description, price, images, type }
            products.push(product)
            fs.writeFile("./products.json", JSON.stringify(products), err => { if (err) console.log(err) })
            res.status(201).send("product successfully created")
        } catch (e) {
            res.status(400).send(e.message)
        }
    },
    getOne: (req, res, next) => {
        try {
            const products = JSON.parse(fs.readFileSync("./products.json", "utf-8"))
            const product = products.find(product => product.id == req.params.id)
            res.send(product)
        } catch (e) {
            res.status(400).send(e.message)
        }
    },
    getAll: (req, res, next) => {
        try {
            const products = JSON.parse(fs.readFileSync("./products.json", "utf-8"))
            res.send(products)
        } catch (e) {
            res.status(400).send(e.message)
        }
    },
    removeOne: (req, res, next) => {
        try {
            const products = JSON.parse(fs.readFileSync("./products.json", "utf-8"))
            const patchedProducts = products.filter(item => (item.id != req.params.id))
            fs.writeFile("./products.json", JSON.stringify(patchedProducts), err => { if (err) console.log(err) })
            res.send("product successfully removed")
        } catch (e) {
            res.status(400).send(e.message)
        }
    }
}