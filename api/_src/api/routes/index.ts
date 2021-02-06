import { tempRouter } from './TemperatureRouter';
import { humidityRouter } from './HumidityRouter';
import { completeDataRouter } from './CompleteDataRouter';
import { Router } from 'express';

const allRoutes = Router();
allRoutes.use(tempRouter, humidityRouter, completeDataRouter);

export { allRoutes };
