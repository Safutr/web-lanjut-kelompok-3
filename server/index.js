import express from "express"
import {PrismaClient} from "@prisma/client"
const app = express()

const prisma = new PrismaClient()

app.use(express.json())

app.get("/", async (req,res) => {
    try {
        const data = await prisma.loker.findMany()
        return res.status(200).json(data)
    }catch(err) {
        console.log(err)
        return res.status(500).send("Server Error")
    }
})


app.post("/", async (req, res) => { 
try {
    const data = await prisma.loker.create({
        data : req.body
    })
    return res.status(200).json(data)
}   catch(err) {
    console.log(err)
    return res.status(500).send("Server Error")
}
})

app.delete("/:id", async (req, res) => {
 try {
    const data = await prisma.loker.delete({
        where : {
            id : parseInt(req.params.id)
        }
    })
    return res.status(200).json(data)
 }  catch(err) {
    console.log(err)
    return res.status(500).send("Server Error")
 } 
})

app.put("/:id", async (req,res) => {
    try {
        const data = await prisma.loker.update({
            where : {
                id : parseInt(req.params.id)
            }, 
            data : req.body
        })
        return res.status(200).json(data)
    }catch(err) {
        console.log(err)
        return res.status(500).send("Server Error")
    }
})

app.listen(3000, () => {
    console.log("Server is running in " + 3000)
})