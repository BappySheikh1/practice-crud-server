const express =require('express');
const cors =require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port =process.env.PORT || 5000

// Midleware
app.use(cors())
app.use(express.json())

// user name: userID4 
// password: CmrdHtdZPWwpZAL4




const uri = "mongodb+srv://userID4:CmrdHtdZPWwpZAL4@cluster0.frkx4db.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const productCollaction=client.db('ProductList').collection('product')
        
       app.get('/product',async(req,res)=>{
        const quary ={}
        const cursor =productCollaction.find(quary)
        const result = await cursor.toArray();
        res.send(result)
       })

       app.get('/product/:id',async(req,res)=>{
        const id =req.params.id
        const quary={_id: ObjectId(id)}
        const result =await productCollaction.findOne(quary)
        res.send(result)
       })

        app.post('/product',async (req,res)=>{
            const product=req.body
            const result=await productCollaction.insertOne(product)
            console.log(result);
            res.send(result)
        })
    
     app.put('/product/:id',async(req,res)=>{
        const id=req.params.id
        const filter={_id: ObjectId(id)}
        const product=req.body
        const option = { upsert: true };
        const updateProduct ={
            $set:{
                name:product.name,
                price:product.price,
                quantity:product.quantity,
                photoURL:product.photoURL
            }
        }
        const result=await productCollaction.updateOne(filter,updateProduct,option);
        res.send(result)

     })

     app.delete('/product/:id',async (req,res)=>{
        const id =req.params.id
        const quary={_id: ObjectId(id)}
        const result=await productCollaction.deleteOne(quary)
        console.log(result);
        res.send(result)
     })

    }
    finally{

    }
}
run().catch(err=> console.log(err))

app.get('/',(req,res)=>{
    res.send('Practice mongodb crud operator')
})

app.listen(port, ()=>{
    console.log(`server crud operator rounning in port`,port);
})