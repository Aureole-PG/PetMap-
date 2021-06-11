import  UserModel from '../../models/auth'
import {dbConnect} from '../../models/conection'
import jwt from 'jsonwebtoken'
dbConnect();
const KEY = "aureole"
export default (req , res) =>{
    const {method} = req;
    try {
        if (method==="POST") {
            UserModel.find(req.body,(err, room) => {
                if (err) {
                    res.status(400).send(err)
                    return
                }
                if (room.length<1) {
                    res.status(400).send({msg: "Email o Contraseña incorrectos"})
                    return
                }
                res.statusCode = 200
                res.json( {token: jwt.sign({
                    id: room[0].id,
                    nombre: room[0].nombre,
                    email: room[0].email
                },KEY) })
                
              }) 
        }
    } catch (error) {
        console.log(error) ;
    }
}