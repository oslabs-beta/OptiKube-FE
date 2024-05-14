// pages/api/deployments.js
export default async function handler(req, res) {
    try {
        const response = await fetch('http://optikube-operator-svc.optikube.svc.cluster.local:8080/api/deployments');
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Failed to fetch deployments:', error);
        res.status(500).json({ message: "Failed to fetch deployments" });
    }
}
