const express = require('express');
const fs = require('fs');
const xml2js = require('xml2js');

const app = express();

let foodInfo = [];

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    const parser = new xml2js.Parser();
    fs.readFile(__dirname + '/resource/Food_Display_Table.xml', function(err, data) {
        parser.parseString(data, function (err, result) {
            foodInfo = result.Food_Display_Table.Food_Display_Row;
        });
    });

    console.log('Server is running on port 3000');
});