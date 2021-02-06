import { Router } from 'express';
import {
  getAllRecords
} from '../controller/CompleteDataController';

export const completeDataRouter = Router();

completeDataRouter.route('/complete').get(getAllRecords);