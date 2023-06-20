const express = require('express');
const cors = require('cors');

const appFactory = (dbConnectionMgr) => {
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.post('/record', async(req, res)=>{
        const {record} = req.body;
        if(!record){
            return res.status(400).send({
                status:'error',
                message:'Please provide all the required feilds'
            }
            
            )
        }
        try{
            const id = await dbConnectionMgr.createRecord(record);
            record.id = id;
            res.status(201).send({
                status: 'created',
                data:{
                    record
                }
            })

        } catch(err){
            console.log(err);
            res.status(500).send({
                status: 'error',
                message: 'Database operation failed'
                
            });
        }
    })



    return app;
}
module.exports = appFactory;
