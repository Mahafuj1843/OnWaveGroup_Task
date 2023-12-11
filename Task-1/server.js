const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 4000;

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload_images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Serve your main HTML file
app.use(express.static(path.join(__dirname + '/public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle image uploads
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('Image uploaded!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
