import express from 'express'
import { router } from './routes'
import cors from 'cors'
import path from 'path'

const app = express()
const port = 3333

app.use(express.json())
app.use(cors())
app.use(router)

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.listen(port, () => console.log(`Server online on http://localhost:${port}`))