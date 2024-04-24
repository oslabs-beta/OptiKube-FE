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
        <div>
            <span>Name: {props.deployment.name} </span>
            <span>Namespace: {props.deployment.namespace} </span>
             {kedaInfo.status === false ? (
                <button> Create autoscaler </button>
             ) : (
                <div>
                    <span>Score: {kedaInfo.score} </span>
                    <span>Min Replicas: {kedaInfo.minReplicas} </span>
                    <span>Max Replicas: {kedaInfo.maxReplicas} </span>
                    <span>Utilization: {kedaInfo.utilization} </span>
                    <button> Update autoscaler </button>
                </div>
             )}
        </div>
    )
}

export default Deployment;