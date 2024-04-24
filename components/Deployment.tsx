import React, { useEffect, useState } from 'react';

const Deployment = props => {
    // probably need a manage autoscaler button for frontend communication to KEDA
    const [kedaInfo, setKedaInfo] = useState({status: false, score: null, minReplicas: null, maxReplicas: null, utilization: null})
    useEffect(() => {
        const fetchKedaInfo = async () => {
            try {
                const response = await fetch(`http://34.71.62.191:80/api/read?namespace=${props.deployment.namespace}&deployment=${props.deployment.name}`)
                if (response.ok) {
                    const data = await response.json();
                    setKedaInfo({
                        status: true,
                        score: data.settings.settings.optimizationScore,
                        minReplicas: data.scaledObject.spec.minReplicaCount,
                        maxReplicas: data.scaledObject.spec.maxReplicaCount,
                        utilization: data.scaledObject.spec.triggers[0].metadata.value
                    });
                    console.log(kedaInfo);
                }
            } catch(err) {
                console.log(err)
            }
        }
        fetchKedaInfo();
    }, [])

    const manageKedaClick = (name, namespace) => {
        // Creates a modal for updating KEDA ?
    }

    const updateKedaClick = async (event) => {
        try {
            const response = await fetch('KEDA ENDPOINT FOR UPDATING', {
                method: "PATCH",
                body: JSON.stringify({
                    name: props.deployment.name,
                    targetNamespace: props.deployment.namespace,
                    patchPayload: {
                        // event.target values passed in patch payload
                    }
                })
            })
        } catch(err) {
            console.log(err)
        }
    }

    const createKedaClick = async (event) => {
        try {
            const response = await fetch('KEDA ENDPOINT FOR CREATING', {
                method: "POST",
                body: JSON.stringify({
                    // body
                })
            })
        } catch(err) {
            console.log(err)
        }
    }

    const deleteKedaClick = async (event) => {
        try {
            const response = await fetch('KEDA ENDPOINT FOR DELETING', {
                method: "DELETE",
                body: JSON.stringify({
                    // body
                })
            })
        } catch(err) {
            console.log(err)
        }
    }
    
    return (
        <div className="p-4 bg-gray-50 rounded-lg shadow">
            <div className="mb-4">
                <h4 className="font-semibold text-lg">Deployment Details:</h4>
                <p className="text-gray-700">
                    <span className="font-medium">Name:</span> {props.deployment.name}
                </p>
                <p className="text-gray-700">
                    <span className="font-medium">Namespace:</span> {props.deployment.namespace}
                </p>
            </div>
            {kedaInfo.status === false ? (
                <button className="inline-block shadow-lg hover:shadow-xl hover:bg-blue-600 bg-blue-500 px-6 py-2 rounded-full text-white font-medium transition duration-200 ease-in-out">
                    Create Autoscaler
                </button>
            ) : (
                <div className="space-y-2">
                    <div className="text-gray-700">
                        <p><span className="font-medium">Score:</span> {kedaInfo.score}</p>
                        <p><span className="font-medium">Min Replicas:</span> {kedaInfo.minReplicas}</p>
                        <p><span className="font-medium">Max Replicas:</span> {kedaInfo.maxReplicas}</p>
                        <p><span className="font-medium">Utilization:</span> {kedaInfo.utilization}</p>
                    </div>
                    <button className="shadow-lg hover:shadow-xl hover:bg-blue-600 bg-blue-500 px-6 py-2 rounded-full text-white font-medium transition duration-200 ease-in-out">
                        Update Autoscaler
                    </button>
                </div>
            )}
        </div>

    )
}

export default Deployment;