import { tempRouter } from './TemperatureRouter';
import { humidityRouter } from './HumidityRouter';
import { Router } from 'express';

const allRoutes = Router();
allRoutes.use(tempRouter, humidityRouter);

export { allRoutes };
