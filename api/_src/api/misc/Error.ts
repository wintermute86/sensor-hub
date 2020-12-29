import { Request, Response, NextFunction } from 'express';

export function handleClientError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.status(500).send(`Cannot compute! ${err.message}`);
}

export function logError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error(err.stack);
  console.log(`path: ${req.path || 'N/A'}`);
  console.log(`query: ${req.query ? JSON.stringify(req.query) : 'N/A'}`);
  console.log(`body: ${req.body || 'N/A'}`);
  next(err);
}
