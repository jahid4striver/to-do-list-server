const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://nbcAc:WeyNZddR07jMnJO9@cluster0.10zxl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      await client.connect();
      const workCollection= client.db('toDoList').collection('works')
        console.log('Mongo server connected');

    // post a item

    app.post('/works', async(req, res)=>{
        const newWorks= req.body;
        const result= await workCollection.insertOne(newWorks);
        res.send(result)
    });

    // get with id
    
    app.delete('/works/:id', async(req, res)=>{
        const id= req.params.id;
        const query= {_id: ObjectId(id)}
        const works= await workCollection.deleteOne(query);
        res.send(works);
    })

    // get the item from db

    app.get('/works', async(req, res)=>{
        const query= {};
        const cursor= workCollection.find(query);
        const works= await cursor.toArray();
        res.send(works);
    })

    

    }
    finally {

    }
}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('To Do List Server is Running')
});


app.listen(port, () => {
    console.log('listening to port', port);
})


// nbcAc
// WeyNZddR07jMnJO9