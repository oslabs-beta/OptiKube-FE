import { Router, Request, Response, NextFunction } from "express";
import metrixesControllers from "../controllers/metrixesControllers";

const metrixesRoute = Router();

metrixesRoute.get(
  "/runningPods",
  metrixesControllers.getRunningPods,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.runningPods);
  }
);

export default metrixesRoute;
