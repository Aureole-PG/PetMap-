import  UserModel from '../../models/auth'
import {dbConnect} from '../../models/conection'
import jwt from 'jsonwebtoken'
const KEY = process.env.DECODE_KEY
dbConnect();
export default async (req, res) => {
  const { method } = req;
  try {
    if (method === "POST") {
      const { email, password } = req.body;
        if (!email || !password) {
          res.status(400).json({
            status: 'error',
            error: req.body,
          });
        } 
        else{
            
            const User = new UserModel(req.body)
            await User.save((err, room) => {
                
                if (err) {
                 
                  res.status(400).send(err)
                  return
                }
                res.statusCode = 200
                res.json( {token: jwt.sign({
                    id: room._id,
                    nombre: room.nombre,
                    email: room.email
                },KEY) })
              })    
        }
    }
  } catch (error) {
    throw error;
  }
};