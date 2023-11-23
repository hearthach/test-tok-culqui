import { Router } from 'express';
import { tokenizeCardController, getCardDataController } from '../controllers/cardController';

const router = Router();

router.post('/tokenize', tokenizeCardController);
router.get('/card/:token', getCardDataController);

export default router;