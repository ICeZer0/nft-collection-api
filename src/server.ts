import http from 'http';
import express, {Express} from 'express';
import routes from './routes/collections';

const router: Express = express();

// Setup logging

router.use((req, res, next) => {
    res.header('Access-COntrol-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

router.use('/', routes);

router.use((req, res, next) => {
    const error = new Error('Route Not Found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 3030;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));