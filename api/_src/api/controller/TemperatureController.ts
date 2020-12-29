import { Request, Response, NextFunction } from 'express';
import { Temperature } from '../model/Temperature';
import { getConnection } from 'typeorm';

export async function getAllRecords(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await Temperature.find();
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
    const result = await Temperature.findOne(req.params.id);
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
    const { temp, dev } = {
      temp: req.body?.temperature,
      dev: req.body?.device,
    };

    if (!temp || !dev) {
      res.status(400).send('You must specify temperature and device ID!');
    } else {
      const record = new Temperature(temp, dev);
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
      .from(Temperature)
      .execute();
  } catch (error) {
    next(error);
  }
}
