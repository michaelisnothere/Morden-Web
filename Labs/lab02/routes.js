import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Server")
})

router.get('/name', (req, res) => {
    res.send("Michael Rojas")
})

router.get('/greeting', (req, res) => {
    res.send("Michael Rojas N01628051")
})

router.get('/add/:x/:y', (req, res) => {
    const x = parseInt(req.params.x);
    const y = parseInt(req.params.y);
    res.send(`The sum of x and y is ${x + y}`);
});

router.get('/calculate/:x/:y/:operation', (req, res) => {
    const x = parseInt(req.params.x);
    const y = parseInt(req.params.y);
    const operation = req.params.operation;

    let result = 0;
    switch (operation) {
        case "add":
            result = x + y;
            break;
        case "subtract":
            result = x - y;
            break;
        case "multiply":
            result = x * y;
            break;
        case "divide":
            result = x / y;
            break;
        case "power":
            result = x ** y;
            break;
        default:
            result = "Invalid operation";
    }
    res.send(`The total is ${result}`);
})

export default router;