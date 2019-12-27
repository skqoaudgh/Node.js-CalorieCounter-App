const express = require('express');
const fs = require('fs');
const xml2js = require('xml2js');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

let foodInfo = [];

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.use((req, res, next) => {
    res.locals.error_msg = req.flash('error_msg');
    next();
});

app.get('/', (req, res) => {
    res.render('index', {foodInfo: null});
});

app.post('/search', (req, res) => {
    if(req.body.foodname) {
        const word = req.body.foodname.toLowerCase();
        let result = foodInfo.filter(food => food.Display_Name[0].toLowerCase().includes(word));
        if(result.length > 0) {
            let filteredResult = [];
            result.forEach(food => {
                let portion = Number(food.Portion_Amount[0]);
                const tmp = portion + "";
                if(tmp.indexOf(".") != -1) {
                    portion = portion.toFixed(4);
                    portion = portion.replace(/(0+$)/, "");
                }
                filteredResult.push({name: food.Display_Name[0], calorie: food.Calories[0], portion: portion, portionName: food.Portion_Display_Name[0] });
            });
            res.render('index', {foodInfo: filteredResult});
        }
        else {
            req.flash('error_msg', 'No matches were found');
            res.redirect('/');           
        }
    }
    else {
        req.flash('error_msg', 'Please fill in the text field');
        res.redirect('/');
    }
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