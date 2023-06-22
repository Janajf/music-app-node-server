const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');

const appFactory = (dbConnectionMgr,spotifyMgr) => {
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
            // console.log(err);
            res.status(500).send({
                status: 'error',
                message: 'Database operation failed'
                
            });
        }
        
    })

    app.get('/artist', async (req, res)=>{
        const artist = req.query.artist;
        if(!artist){
            return res.status(400).send({
                status:'error',
                message:'Please provide the artist\'s name'
            })
        }

        try{
            const result = await spotifyMgr.getArtistDiscography(artist);
            return res.status(200).send(result)
        } catch(err){
            return res.status(500).send({
                status: 'error',
                message: 'Database operation failed. Failed to get artist discography'
            })
        }
    })
    app.get('/history', async (req, res) =>{
        const email = req.query.email;

        if(!email){
            return res.status(400).send({
                status:'error',
                message:'Please provide all the required feilds'
            })
        }

    })




    return app;
}
module.exports = appFactory;
