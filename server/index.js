const connectToMongo = require('./db/db')
const express = require('express');
const app = express();
var cors = require('cors')
// const PORT = 8000;
const dotenv = require('dotenv')
const PORT = process.env.PORT || 8000
const path = require('path')

dotenv.config()

//Import Routes
const userRoutes = require('./routes/userRoute');
const noteRoutes = require('./routes/notesRoute');

// MongoDb Connection
connectToMongo();

//middleware
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, '../todo/build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './todo/build/index.html'))
})

//Routes
app.use('/api/user', userRoutes);
app.use('/api/note', noteRoutes);

// app.get('/', (req, res) => {
//     res.send('hellow')
// })


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

