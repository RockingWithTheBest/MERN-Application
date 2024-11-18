import express from 'express';
import cors from 'cors';
import bodyParse from 'body-parser';

const app = express();

app.use(cors());

app.use(bodyParse.json());
const post  = 1000;

app.get('/', (req, res) => { 
    res.send('Hello, World!');
})

app.listen(post, (req, res) => {
    console.log(`Server is running on port http://localhost:${post}`);
})