import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import commonErrors from './middlewares/filter/error/commonError';
import { CustomError, httpExceptionFilter } from './middlewares/filter';
import morganMiddleware from './middlewares/logger/morganMiddleware';
import { logger } from './middlewares/logger/config/logger';
import connection from './config/db.config';

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', // 허락하고자 하는 요청 주소
};

const morganOption = ':method :status :url :response-time ms ip: :remote-addr';

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
    app.use(
        morgan(morganOption, {
            stream: logger.stream,
        }),
    );
} else if (process.env.NODE_ENV === 'production') {
    app.use(morganMiddleware);
} else {
    throw new CustomError(500, commonErrors.configError);
}

// 404 에러 핸들러
app.use((req, res, next) => {
    throw new CustomError(404, commonErrors.resourceNotFoundError);
});

app.use(httpExceptionFilter);

connection.connect((err) => {
    if (err) {
        throw new CustomError(500, commonErrors.dbConnectionError);
    }
    logger.info('DB 연결 성공');
});

export { app };
