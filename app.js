import express from 'express'
import cors from 'cors'
import sql from 'mssql'

import { sqlConfig } from './database.js';
const pool = new sql.ConnectionPool(sqlConfig)
await pool.connect();
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/agendamentos', async (req, res)=>{
    let {recordset} = await pool.query`select * from Agendamento`
    return res.status(200).json(recordset)
})

app.listen(3000,()=>{
    console.log('runnning!')
})