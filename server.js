const express = require('express');
const fs = require('fs');
const xml2js = require('xml2js');

const app = express();

let foodInfo = [];

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index', {foodInfo: null});
});

app.post('/search', (req, res) => {
    const word = req.body.foodname.toLowerCase();
    let result = foodInfo.filter(food => food.Display_Name[0].toLowerCase().includes(word));
    let filteredResult = [];
    result.forEach(food => {
        filteredResult.push({name: food.Display_Name[0], calorie: food.Calories[0]});
    });
    res.render('index', {foodInfo: filteredResult});
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