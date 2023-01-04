import express from 'express';
import controller from '../controllers/collections';
const router = express.Router();

router.get('/collections/metadata/:walletAddress/', controller.getMetaDataForCollections);

export default router;
