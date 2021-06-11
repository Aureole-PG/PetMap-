import  petModel from '../../models/pet'
import {dbConnect} from '../../models/conection'
dbConnect();
export default async (req, res) => {
  const { method } = req;
  try {
    if (method === "POST") {         
        const User = new petModel(req.body)
        User.save((err, room) => {
            
            if (err) {
                res.status(400).send(err)
                return
            }
            res.status(200).send(room)
            })    
        
    }
  } catch (error) {
    throw error;
  }
};