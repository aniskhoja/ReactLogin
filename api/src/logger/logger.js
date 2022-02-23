import winston from 'winston';

const level = process.env.NODE_ENV === "production" ? "error" : "debug";
const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({ level: level }),
        new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
    ],
});


export default logger