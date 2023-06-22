const env = require('dotenv');
const mysql = require("mysql2");

env.config();

const connection = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

const createRecord = async (record) =>{
    const {firstName, lastName, email,artist} = record;

    if(!firstName || !lastName || !email || !artist){
        throw new Error("Missing input")
    }

    try{
        const result = await connection.promise().query(
            `INSERT INTO records (first_name, last_name, email, artist) VALUES (?,?,?,?)`,
            [firstName, lastName, email,artist]
        );
        return result[0].insertId
    } catch(err){
        throw new Error('Database query failed');
    }
}

const getArtistSearchHistory = async(email) =>{
    if(!email){
        throw new Error("Missing input")
    } 

    try{
        const result = await connection.promise.query(
            `SELECT DISTINCT artist 
            FROM records
            WHERE email = ?`,
            [email]
        )

    } catch(err){
        throw new Error('Database query failed');
    }
}

module.exports={
    createRecord,getArtistSearchHistory
}