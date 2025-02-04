require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGO_URI } = process.env;
const Gen = require('./models/model');

const app = express();

app.use(cors());
app.use(express.json());

// connect to mongoDB
const connectToMongoDB = async () => {
    try {
      await mongoose.connect(MONGO_URI);
      console.log("connected to database");
    } catch (error) {
      console.error(`error: ${error.message}`);
    }
  };

app.get('/userinfo', async (req, res) => {
    try {
        const gen = await Gen.findOne({genId: 'myopencustody'});
        if (!gen) {
            console.error('Gen Model has not been updated');
            return res.status(500).json({message: "an error occurred"});
        }

        const stakedBal = String(gen.stakedBal);
        const availBal = String(gen.availBal);
        const rewards = String(gen.rewards);

        res.status(200).json({data: {stakedBal, availBal, rewards}});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"error": "an error occurred"});
    }
})

app.post('/addrewards', async (req, res) => {
    try {
        const gen = await Gen.findOne({genId: "myopencustody"});
        if (!gen) {
            console.error('Gen Model has not been updated');
            return res.status(400).json({message: "Gen Model has not been updated"});
        }

        const updatedAt = new Date(gen.updatedAt);
        const today = new Date();
        
        // Normalize both dates to midnight for accurate comparison
        updatedAt.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        if (updatedAt.getTime() === today.getTime()) {
            return res.status(400).json({message:"reward already added today"});
        }

        gen.rewards = gen.rewards + 967.954;
        gen.updatedAt = new Date();
        await gen.save();
        res.status(200).json({message: "reward added successfully", rewards: String(gen.rewards)});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "an error occurred"});
    }
})

app.post('/create', async (req, res) => {
    try {
        const {genId, stakedBal, availBal, rewards} = req.body;

        const gen = await Gen.findOne({genId})
        if (gen) {
            return res.status(400).json({message: "Gen Model already exist"});
        }

        const newGen = await Gen.create({
            genId,
            stakedBal,
            availBal,
            rewards
        });

        res.status(200).json({message: "Gen Model created successfully", data: newGen});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "an error occurred"})
    }
})

app.all("*", (req, res) => {
    res.status(404).send("Page not found");
  });
  
  const port = process.env.PORT;

  //Connect to the database before listening
connectToMongoDB().then(() => {
    app.listen(port, () => {
      console.log("listening for requests");
    });
});