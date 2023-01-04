import * as dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import morgan from 'morgan';
import express, { Express } from 'express';
import accountRoutes from './routes/accounts';
import collectionRoutes from './routes/collections';

const router: Express = express();

// Setup logging
router.use(morgan('dev'));

// cors
router.use((req, res, next) => {
  res.header('Access-COntrol-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
    return res.status(200).json({});
  }
  next();
});

// routes
router.use('/api/v1/', collectionRoutes);
router.use('/api/v1/', accountRoutes);

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
