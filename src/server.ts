import express, { urlencoded } from 'express';
import helmet from 'helmet';
import router from './routes';
import { connectDB } from './services/mongo';

const server = express();

server.use(express.json());
server.use(helmet());
server.use(urlencoded({ extended: true }));
server.use('/', router);

connectDB();

server.listen(3000, () => {
    console.log('Server is running in port 3000')
});