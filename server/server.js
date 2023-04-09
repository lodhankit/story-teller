const express = require('express')
require('dotenv').config()
const fetch = require('node-fetch');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3001
//const { Configuration, OpenAIApi } = require("openai");

app.listen(port, () => {
    console.log(`app listening at on port ${port}`)
})
app.use(cors())
//app.use(bodyParser.urlencoded())
//app.use(bodyParser.json())
app.use(express.json())
async function fetchData(data) {
    const api = process.env.OPENAI_API_KEY
	const response = await fetch(
		"https://api-inference.huggingface.co/models/openai-gpt",
		{
			headers: { Authorization: `Bearer ${api}` },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}
app.post("/server", async (req, res) => {
    let data = req.body.name
    let skip = "The model is loading please try again"
    let story = await fetchData(data).then(response =>  response[0]['generated_text'] ).catch(err => skip)
    res.json({ "name": `${story}`})
})