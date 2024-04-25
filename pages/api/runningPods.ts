import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const fetchRunningPods = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await axios.get("/api/metrixesdashboard/runningPods");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch running pods data" });
  }
};

export default fetchRunningPods;
