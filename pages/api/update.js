export default async function handler(req, res) {

    if (req.method !== "PATCH") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const response = await fetch('http://optikube-operator-svc.optikube.svc.cluster.local:8080/api/update', {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(req.body)  // Passing the body directly from the frontend request
        });
        if (!response.ok) {
            throw new Error(`Backend responded with an error: ${backendResponse.status} ${backendResponse.statusText}`);
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Failed to update deployment and scaled object:', error);
        res.status(500).json({ message: "Failed to update deployment and scaled object" });
    }
}