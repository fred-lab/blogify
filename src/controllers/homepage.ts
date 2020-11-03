import { Request, Response } from 'express';
import path from 'path';

const homepage = (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../index.html'));
};

export { homepage };
