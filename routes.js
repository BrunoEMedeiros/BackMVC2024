
import express from 'express'
import sql from 'mssql'
import { sqlConfig } from './database.js';
const pool = new sql.ConnectionPool(sqlConfig)
await pool.connect();

const router = express.Router()

router.post('/login', async (req, res)=>{
    try {
        const { email, senha } = req.body;
        if(email != null && email != "" && senha != null && senha != "")
        {
            const { recordset } = await pool.query`select id, nome from Usuario where email = ${email} and senha = ${senha}`;
            if(recordset.length == 0)
            {
                return res.status(204).json('usuario ou senha incorreta')
            }

            return res.status(200).json(recordset)
        }
            return res.status(400).json("bad request")
    } 
    catch (error){
        console.log(error)
        return res.status(500).json('Error on server!')
    }
})

router.post('/user/novo', async(req, res)=>{
    try{
        const {nome, email, senha} = req.body;
        console.log(nome, email, senha)
        if(nome != null && nome != "" && email != null && email != "" &&
            senha != null && senha != "")
        {
            await pool.query`insert into Usuario values(${nome},${email},${senha})`
            return res.status(200).json('Cadastrado com sucesso')
        }
        return res.status(400).json("bad request") 
    }
    catch(error){
        //2627 é o code number padrão no SQL Server para violação de
        //registro unico, nesse caso a pessoa esta tentando inserir um email ja cadastrado
        if(error.number == 2627)
        {
            return res.status(409).json('Email ja cadastrado!')
        }
        return res.status(500).json('Error on server!')
    }
})

router.get('/salas', async (req, res)=>{
    try {
        const {recordset} = await pool.query`select * from Sala`
        return res.status(200).json(recordset)
    } catch (error) {
        return res.status(500).json('error...')
    }
})

export default router
