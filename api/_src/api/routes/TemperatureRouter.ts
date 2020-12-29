import { Router } from 'express';
import {
  getAllRecords,
  getRecordByID,
  addRecord,
} from '../controller/TemperatureController';

export const tempRouter = Router();

tempRouter.route('/temperature').get(getAllRecords).post(addRecord);

tempRouter.route('/temperature/:id').get(getRecordByID);
