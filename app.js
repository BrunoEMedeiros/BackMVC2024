
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

/*
    Nota:
    A pasta ./src foi criada como boa pratica para separar a parte
    que corresponde as pastas e arquivos do MVC das partes de configurações
    gerais da API.
    Futuramente quando ela for passada para TS essa pasta facilitará
    muito as configurações e manutenções.
*/

app.listen(3000,()=>{ console.log('API no ar!') })
