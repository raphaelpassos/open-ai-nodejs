require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const port  = 3050
app.use(express.json());
app.use(cors());
const { Configuration, OpenAIApi} = require('openai');

const configuration = new Configuration({
    apiKey:process.env.SECRET_OPEN_AI,
});

const openai = new OpenAIApi(configuration);

app.post("/ask", async (req, res) => {
    const messages = req.body.messages;

    if (messages === null) {
        return new Error('Invalid Message')
    }
    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        max_tokens: 4096,
        messages: messages,
    });
    console.log('chatCompletion', chatCompletion)
    console.log(chatCompletion.data.choices[0].message);

    return res.status(200).json({
        sucess:true,
        result:chatCompletion.data.choices[0].message
    })
})

app.listen(port, () => console.log(`Server is running on port ${port}!!`));

