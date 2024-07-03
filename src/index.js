require("dotenv").config();
const express = require('express');
const cors = require('cors');
const emitter = require('./utils/eventemitter');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/v1/maillist', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({message: 'phrase not inputted!'});

        emitter.emit('send-email', {email: 'denisa.baciu010@gmail.com', message});

        return res.redirect('http://localhost:1120/api/v1/home');
    } catch (error) {
        console.error(error.message);
    }
})

app.all("*", (req, res) => {
    res.status(404).send("Page not found");
  });
  
  const port = process.env.PORT;
  
  app.listen(port, () => console.log(`Server up and running on port: ${port}`));