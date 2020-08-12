const request = require('request');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const dbConfig = require('./database/db');
const dataSchema = require('./models/schema');
const app = express();
const port = 4000;

// MongoDB Setup
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true
}).then(() => {
  console.log('Database sucessfully connected')
},
  error => {
    console.log('Database could not be connected: ' + error)
  }
)

app.get('/', (req, res) => {
    let date = new Date();
    let day = date.getDate();
    
    for (let i = 2; i < day / 2; i++) {

        if (day % 2 == 0) {
            res.send(`Hello stark the day is ${day} not prime`);
        } else {

            let apiUrl = process.env.apiUrl;

            request(apiUrl, { json: true }, (err, result, body) => {
                if (err) throw err;

                let dataStore = new dataSchema({
                    data: body
                })

                dataStore.save().then(result => {
                    console.log(result);
                    res.status(201).json({
                      message: "Data saved!",
                      dataSaved: {
                        _data: body
                      }
                    })
                  }).catch(err => {
                    console.log(err),
                      res.status(500).json({
                        error: err
                      });
                  })

                res.send({ status: "Hello stark day is prime", data: body });
            })
        }
    }
})

app.listen(port, () => {
    console.log(`App listening at http://localhost: ${port}`);
})
