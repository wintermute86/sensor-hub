import { Request, Response, NextFunction } from 'express';
import { Humidity } from '../model/Humidity';
import { getConnection } from 'typeorm';

export async function getAllRecords(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await Humidity.find();
    res.status(200);
    res.send(result);
  } catch (error) {
    next(error);
  }
}

export async function getRecordByID(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await Humidity.findOne(req.params.id);
    res.send(result);
  } catch (error) {
    next(error);
  }
}

export async function addRecord(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { humidity, dev } = {
      humidity: req.body?.humidity,
      dev: req.body?.device,
    };

    if (!humidity || !dev) {
      res.status(400).send('You must specify humidity and device ID!');
    } else {
      const record = new Humidity(humidity, dev);
      const result = await record.save();
      res.send(result);
    }
  } catch (error) {
    next(error);
  }
}

export async function deleteAllRecords(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Humidity)
      .execute();
  } catch (error) {
    next(error);
  }
}
