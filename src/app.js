const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const connectDB = require('./config/dbConfig');
const schema = require('./schema');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

connectDB();

app.use(express.json());
app.use('/graphql', authMiddleware, graphqlHTTP({
    schema,
    graphiql: true,
}));

module.exports = app;
