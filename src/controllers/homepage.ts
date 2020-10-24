import { Request, Response } from "express";

const homepage = (req: Request, res: Response) => {
  res.render("index", { title: "Express" });
};

export { homepage };
