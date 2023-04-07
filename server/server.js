const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const port = 3001
const { Configuration, OpenAIApi } = require("openai");

app.listen(port, () => {
    console.log(`app listening at on port ${port}`)
})
app.use(cors())
async function fetchData() {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Hello world",
        temperature: 0.5,
        maxTokens: 100,
        n: 1,
        stream: false,
        stop: "\n"
    },
        {
            timeout: 10000
        });
    return response
}
app.post("/server", (req, res) => {
    console.log("====================================")
    console.log(req)
    console.log("===========================================")
    //fetchData().then(response => { console.log(response.data.choices[0].text) }).catch(err => {
    //    console.error(err)
    //})
    res.json({ "name": "I am good" })
})