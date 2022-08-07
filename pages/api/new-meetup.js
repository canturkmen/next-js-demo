import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect("mongodb+srv://CanTurkmen:9WzjPA1VZ47Y95HR@cluster0.t76i6e6.mongodb.net/?retryWrites=true&w=majority");
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    console.log(result);
    client.close();

    res.status(201).json({
      message: "Meetup Inserted",
    });
  }
}

export default handler;
