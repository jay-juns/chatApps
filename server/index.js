import express from 'express';
import bodyParser from 'body-parser';

import usersRoutes from './routes/users.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/users', usersRoutes);

app.get('/', (req, res) => res.send('안녕 여기는 서버야'));

app.listen(PORT, () => console.log(`서버가 작동중입니다 http://localhost:${PORT}`));