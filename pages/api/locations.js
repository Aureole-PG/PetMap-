import  petLocations from '../../models/locations'
import {dbConnect} from '../../models/conection'
dbConnect();
export default async (req, res) => {
  const { method } = req;
  try {
    if (method === "GET") {         
        petLocations.find(req.query,(err, room) => {
            if (err) {
                res.status(400).send(err)
                return
            }
            res.statusCode = 200
            res.json(room)
          })   
    }
    if (method === "POST") { 
        const location = new petLocations(req.body)        
        await location.save((err, room) => {
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