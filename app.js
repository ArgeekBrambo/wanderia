const express = require('express');
const app = express();
const port = 3000;
const openai = require('./config/openAI-Connection');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).send('Hello from wanderia!');
})

app.post('/', async (req, res, next) => {
    try {
        const { prompt } = req.body;

        // console.log(req.body, 'req.body')

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            // top_p: 0.1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        })

        const botResponse = response.data.choices[0].text;
        const keyWords = botResponse.trim().split(" ");

        const filterWords = ["di", "dan", "yang", "untuk", "dengan", "dari", "ke", "ini", "karena", "itu", "tidak", "pada", "ada", "adalah", "seperti", "atau", "jika", "memiliki", "telah", "yaitu"];

        // const filteredKeyWords = keyWords.filter(word => !filterWords.includes(word));
        // console.log(response.data.choices);

        // res.status(200).send(filteredKeyWords)
        res.status(200).send(botResponse)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})