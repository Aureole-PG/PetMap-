import {dbConnect} from '../../models/conection'
dbConnect();
export default async (req, res)=>{
    res.json({test: "test"})
}