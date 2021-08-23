import  petModel from '../../models/pet'
import {dbConnect} from '../../models/conection'
dbConnect();
export default async (req, res) => {
  const { method } = req;
  try {
    if (method === "GET") {         
        await petModel.find(req.query,(err, room) => {
            if (err) {
                res.status(400).send(err)
                return
            }
            
            if (room.length<1) {
                res.status(400).send({msg: "Email o Contraseña incorrectos"})
                return
            }
            
            res.statusCode = 200
            res.json( 
                room[0]
            )
          })   
    }
  } catch (error) {
    throw error;
  }
};