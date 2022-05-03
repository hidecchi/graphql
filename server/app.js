const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema.js');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());

const dbUri = process.env.dbUri;
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => { console.log('connect to db'); })
    .catch((err) => { console.log(err); })

console.log(dbUri);


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const path = require("path")
app.use(express.static(path.join(path.resolve(__dirname, '..'), "public")))

app.get("*", (req, res) => {
    res.sendFile(path.join(path.resolve(__dirname, '..'), "public", "index.html"));
    // res.send('Hello, World');
});

app.listen(port, () => {
    console.log('server start!');
}); 