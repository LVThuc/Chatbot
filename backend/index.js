import express from 'express';
import cors from 'cors';
import ImageKit from 'imagekit';
import mongoose from 'mongoose';
import Chat from './models/chat.js';
import UserChats from './models/userChats.js';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
const port = process.env.PORT || 3000;
const app = express();


console.log("Starting server from index.js");


app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use(express.json())

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log(err);
    }
}

const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
})

app.get("/api/upload", (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
})


// app.get("/api/test", ClerkExpressRequireAuth(),(req, res) => {
//     const userId = req.auth.userId;
//     console.log(userId);
//     res.send("working");
// })

app.post("/api/chats", ClerkExpressRequireAuth(), async (req, res) => {
    const userId = req.auth.userId;
    const { text } = req.body;

    try {
        //CREATE A NEW CHAT
        const newChat = new Chat({
            userId: userId,
            history: [{ role: "user", parts: [{ text: text }] }]
        });
        const savedChat = await newChat.save();
        //check if the userchat exists
        const userChats = await UserChats.findOne({ userId: userId });
        //IF Not exist, create a new userchat in the chats array
        if (!userChats) {
            const newUserChats = new UserChats({
                userId: userId,
                chats: [{
                    _id: savedChat.id,
                    title: text.substring(0, 40),
                }]
            });
            await newUserChats.save();
        } else {
            userChats.chats.push({
                _id: savedChat.id,
                title: text.substring(0, 40),
            });
            await userChats.save();
        }
        res.status(201).json({ id: newChat._id });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})

app.get("/api/userchats", ClerkExpressRequireAuth(), async (req, res) => {
    const userId = req.auth.userId;
    try {
        const userChats = await UserChats.findOne({ userId });
        if (!userChats) {
            return res.status(404).send("User Chats not found");
        }
        res.status(200).json(userChats.chats);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error feching user chats");
    }
})

app.get("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
    const userId = req.auth.userId;
    try {
        const chat = await Chat.findOne({ _id: req.params.id, userId });
        if (!chat) {
            return res.status(404).send("Chat not found");
        }
        res.status(200).json(chat);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching chat");
    }
});


app.put("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const { question, answer, img } = req.body;

  const newItems = [
    ...(question ? [{
      role: "user",
      parts: [{ text: question }],
      ...(img && { img })
    }] : []),
    ...(answer ? [{
      role: "model",
      parts: [{ text: answer }],
    }] : [])
  ];

  try {
    const updatedChat = await Chat.updateOne({ _id: req.params.id, userId }, {
      $push: {
        history: {
          $each: newItems,
        }
      }
    });
    res.status(200).json(updatedChat);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding conversation");
  }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(401).send('UNAUTHORIZED Ban khong co quyen truy cap');
});

app.listen(port, () => {
    connect()
    console.log(`Server is running on port ${port}`);
})