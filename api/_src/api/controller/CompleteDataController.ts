import { Request, Response, NextFunction } from 'express';
import { Humidity } from '../model/Humidity';
import { Temperature } from '../model/Temperature';
import { createQueryBuilder } from 'typeorm';

export async function getAllRecords(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const limit = parseInt(req.query.limit as string);
    
    const data = await createQueryBuilder(Temperature, "t")
      .leftJoinAndSelect(Humidity, "h", "DATE(t.date) = DATE(h.date) and SUBSTRING(TIME(t.date), 1, 5) = SUBSTRING(TIME(h.date), 1, 5)")
      .select(["t.temperature AS temperature", "h.humidity AS humidity", "t.date AS date", "t.device AS device"])
      .limit(typeof limit == 'number' ? limit : 0)
      .orderBy("t.date", "DESC")
      .getRawMany();
      
    res.status(200);
    res.send(data);
  } catch (error) {
    next(error);
  }
}