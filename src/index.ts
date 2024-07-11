import config from './config';
import express from 'express';
import Router from './routes/'; //index router 
import { genericErrorHandler, notFoundError } from './middleware/errorHandler';
import { requestLogger } from './middleware/logger';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

const app = express();

const limiter=rateLimit({
        windowMs:60*1000,
        limit:10,
        message:"Too many requests"
    });

const allowedOrigins=[
    "https://www.test.com",
]

//Middleware to add security level
app.use(helmet());

//Middleware to limt request for the ip address
app.use(limiter);

//Middlerware to control access to the server 
app.use(cors(
    {
        origin:(origin,callback)=>{
            if (!origin || allowedOrigins.includes(origin)){
                callback(null,origin);
            }
            else{
                callback(new Error("Not Allowed"));
            }
        }
    }
));

//Middleware to parse incoming requests with JSON payload
app.use(express.json()); 

//Middleware to log
app.use (requestLogger);

//use main router
app.use(Router); 

//Middleware to handle errors
app.use (genericErrorHandler);

//Middleware to handle if route requested is not found
app.use (notFoundError);

//server port,defaulting to port 8000 if not specified
const serverPort=config.port?config.port:8000

//listening on server port
app.listen(
    serverPort,
    ()=>{
        console.log(`Listening in port ${serverPort} `)
    }
);
