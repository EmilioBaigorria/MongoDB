const express=require("express")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")

const expApp=express()
expApp.use(express.json());
const puerto=3000

mongoose.connect("mongodb://admin:1234@localhost:27017").then(()=>console.log("Conexion exitosa")).catch((err)=>console.log("Ocurrio un error al conectarse",err.message))

const usuariosSchema= new mongoose.Schema({
    nombre: String,
    edad:Number,
    email:String
})
const Usuario=mongoose.model("Usuario",usuariosSchema)

expApp.get('/usuarios',async (req,res)=>{
    const usuarios= await Usuario.find({})
    res.json(usuarios)
})

expApp.post('/usuarios',async (req,res)=>{
    const newUsuario=new Usuario(req.body)
    const response=await newUsuario.save()
    console.log("Nuevo elemento creado exitosamente: ",response)
    res.json(response)
})
expApp.listen(puerto,()=>{
    console.log(`Servidor corriendo en el puerto ${puerto}`)
})