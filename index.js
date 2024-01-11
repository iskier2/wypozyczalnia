const express = require('express')
const app = express()
const cors = require('cors');
const path = require("path")
app.use('/image/', express.static('./image'))
app.use(express.static(path.join(__dirname + "/public")))
app.use(cors({
    origin: 'http://localhost:3000'
}));
const port = process.env.PORT || 4000
const controller = require('./controller')
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg')
    }
})
const upload = multer({ storage: storage });
app.get('/products', controller.getAll)
app.get('/products/:id', controller.getOne)
app.post('/products', upload.array("image", 10), controller.addOne)
app.delete('/products/:id', controller.removeOne)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})