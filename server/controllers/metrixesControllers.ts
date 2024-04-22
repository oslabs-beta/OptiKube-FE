import { Request, Response, NextFunction } from "express";
import * as k8s from "@kubernetes/client-node";

const metrixesControllers: any = {};

const kubeConfig = new k8s.KubeConfig();
kubeConfig.loadFromDefault();
const k8sApi = kubeConfig.makeApiClient(k8s.CoreV1Api);

interface CustomError extends Error {
  status?: number;
}

metrixesControllers.getRunningPods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const namespace = "php-namespace";
    console.log(">>> namespace: ", namespace);
    const podMetrics = await k8sApi.listNamespacedPod(namespace);
    const podList: k8s.V1Pod[] = podMetrics.body.items;

    const runningPods = podList.filter(
      (pod) => pod.status?.phase === "Running"
    );
    console.log(">>> running Pods: ", runningPods.length);
    res.locals.runningPods = runningPods.length;
    return next();
  } catch (error) {
    const customError: CustomError = new Error(
      "Error in analysisController.getRunningPods: " + JSON.stringify(error)
    );
    customError.status = 500;
    return next(customError);
  }
};

export default metrixesControllers;
