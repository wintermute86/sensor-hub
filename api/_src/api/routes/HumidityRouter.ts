import { Router } from 'express';
import {
  getAllRecords,
  getRecordByID,
  addRecord,
} from '../controller/HumidityController';

export const humidityRouter = Router();

humidityRouter.route('/humidity').get(getAllRecords).post(addRecord);

humidityRouter.route('/humidity/:id').get(getRecordByID);
