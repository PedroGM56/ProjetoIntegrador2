import express from 'express'
import cors from 'cors'

const app = express();

app.use(cors({
    origin: '*'
}))

app.listen(8080, () => {
    console.log('Aplicação rodando em http://localhost:8080')
})