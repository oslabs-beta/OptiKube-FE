export default async function handler(req, res) {
    try {
        const response = await fetch('http://optikube-operator-svc.optikube.svc.cluster.local:8080/api/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(req.body) // Ensure you are passing the correct body from the frontend
        });
        const text = await response.text();  // First get text to check if it is valid JSON
        try {
            const data = JSON.parse(text);
            res.status(200).json(data);
        } catch (error) {
            console.error('Failed to parse JSON:', text);
            throw new Error(`Invalid JSON response: ${text}`);
        }
    } catch (error) {
        console.error('Failed to delete deployment and scaled object:', error);
        res.status(500).json({ message: "Failed to delete deployment and scaled object", error: error.toString() });
    }
}