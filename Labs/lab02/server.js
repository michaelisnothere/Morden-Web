import express from 'express';
import routes from './routes.js';
const app = express();


app.use('/', routes);

const PORT = 8000
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);});