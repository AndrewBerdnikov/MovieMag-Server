require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const fileUpLoad = require('express-fileupload');
const path = require('path');
const multer = require('multer');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpLoad({}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', router);

//Обработка ошибок, последний middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Сервер успешно запустился на порте ${PORT}`);
});