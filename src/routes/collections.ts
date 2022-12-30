import express from 'express';
import controller from '../controllers/collections';
const router = express.Router();

router.get('/collections', controller.getCollections);
// router.get('/collections/:ethWalletId', controller.getCollections);
// router.get('/collection/:collectionId', controller.getCollections);


export = router;