import express from "express"

const app = express();

const port = 8080

app.use(express.json);
app.get('/', (req, res) => {
    res.send('Welcome to the Express Backend!');
});
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});