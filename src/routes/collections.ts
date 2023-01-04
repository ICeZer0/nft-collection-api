import express from 'express';
import * as controller from '../controllers/collections';
const router = express.Router();

router.get('/collections/metadata/:walletAddress/', controller.getCollectionsMetaData);

export default router;
