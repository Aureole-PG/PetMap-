import  petModel from '../../models/pet'
import {dbConnect} from '../../models/conection'
dbConnect();
export default async (req, res) => {
  const { method } = req;
  try {
    if (method === "GET") {         
        petModel.find(req.query,(err, room) => {
            if (err) {
                res.status(400).send(err)
                return
            }
            res.statusCode = 200
            res.json(room)
          })   
    }
  } catch (error) {
    throw error;
  }
};