import React, { useEffect, useState } from 'react';
import CreateAutoscalerFormModal from './CreateAutoscalerFormModal';
import UpdateAutoscalerFormModal from './UpdateAutoscalerFormModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const Deployment = props => {
    // probably need a manage autoscaler button for frontend communication to KEDA
    const [kedaInfo, setKedaInfo] = useState({
        status: props.optimization ? true : false, 
        variability: props.optimization ? props.optimization["workload variability:"] : null, 
        criticality: props.optimization ? props.optimization["application criticality:"] : null, 
        priority: props.optimization ? props.optimization["optimization priority:"] : null, 
        score: props.optimization ? props.optimization["optimization score:"] : null,
        scalerName: props.scaler ? props.scaler["name:"] : null,
        minReplicaCount: props.scaler ? props.scaler["min replicas:"] : null,
        maxReplicaCount: props.scaler ? props.scaler["max replicas:"] : null,
        targetCPU: props.scaler ? props.scaler["target cpu utilization:"] : null,
        minCPU: props.optimization ? props.optimization["min cpu request"]: null,
    })
    // useEffect(() => {
    //     const fetchKedaInfo = async () => {
    //         try {
    //             // const response = await fetch(`http://34.71.62.191:80/api/read?namespace=${props.deployment.namespace}&deployment=${props.deployment.name}`)
    //             // if (response.ok) {
    //             //     const data = await response.json();
    //             //     setKedaInfo({
    //             //         status: true,
    //             //         score: data.settings.settings.optimizationScore,
    //             //         minReplicas: data.scaledObject.spec.minReplicaCount,
    //             //         maxReplicas: data.scaledObject.spec.maxReplicaCount,
    //             //         utilization: data.scaledObject.spec.triggers[0].metadata.value
    //             //     });
    //             //     console.log(kedaInfo);
    //             // }
    //         } catch(err) {
    //             console.log(err)
    //         }
    //     }
    //     fetchKedaInfo();
    // }, [])
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const openUpdateModal = () => setIsUpdateModalOpen(true);
    const closeUpdateModal = () => setIsUpdateModalOpen(false);
    const handleUpdateAutoscaler = async (formData) => {
        closeUpdateModal();  // Close modal on submission
        // Add your fetch API logic here to send `formData` to your backend
        const response = await fetch('http://34.71.62.191:80/api/update', {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                namespace: props.deployment.namespace,
                deployment: props.deployment.name,
                settings: {
                    "workload variability": formData.variability,
                    "application criticality": formData.criticality,
                    "optimization priority": formData.priority,
                    "min cpu request": Number(formData.minCPU)
                },
                scaledObjectSpec: {
                    minReplicaCount: Number(formData.minReplicaCount),
                    maxReplicaCount: Number(formData.maxReplicaCount)
                }
            })
        });
        const data = await response.json();
        const optimization = data.response["optimization settings"];
        const scaler = data.response["scaler settings"]
        setKedaInfo({
            status: true, 
            variability: optimization["workload variability:"], 
            criticality: optimization["application criticality:"], 
            priority: optimization["optimization priority:"], 
            score: optimization["optimization score:"],
            scalerName: scaler["name:"],
            minReplicaCount: scaler["min replicas:"],
            maxReplicaCount: scaler["max replicas:"],
            targetCPU: scaler["target cpu utilization:"],
            minCPU: optimization["min cpu request"],
        })
    }
    const handleCreateAutoscaler = async (formData) => {
        closeCreateModal();  // Close modal on submission
        // Add your fetch API logic here to send `formData` to your backend
        const response = await fetch('http://34.41.209.93:8080/api/create', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                namespace: props.deployment.namespace,
                deployment: props.deployment.name,
                settings: {
                    "workload variability": formData.variability,
                    "application criticality": formData.criticality,
                    "optimization priority": formData.priority,
                    "min cpu request": Number(formData.minCPU)
                },
                scaledObjectSpec: {
                    minReplicaCount: Number(formData.minReplicaCount),
                    maxReplicaCount: Number(formData.maxReplicaCount)
                }
            })
        })
        const data = await response.json();
        const optimization = data.response["optimization settings"];
        const scaler = data.response["scaler settings"];
        setKedaInfo({
            status: true, 
            variability: optimization["workload variability:"], 
            criticality: optimization["application criticality:"], 
            priority: optimization["optimization priority:"], 
            score: optimization["optimization score:"],
            scalerName: scaler["name:"],
            minReplicaCount: scaler["min replicas:"],
            maxReplicaCount: scaler["max replicas:"],
            targetCPU: scaler["target cpu utilization:"],
            minCPU: optimization["min cpu request"],
        })
    };

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    const handleDeleteAutoscaler = async () => {
        closeDeleteModal(); // Close the modal after confirmation
        // Here, add your API call or logic to delete the autoscaler
        try {
            const response = await fetch('http://34.41.209.93:8080/api/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    namespace: props.deployment.namespace,
                    deployment: props.deployment.name,
                    "scaledObjectName": `scaled-object-${props.deployment.name}`
                })
            });
            if (response.ok) {
                setKedaInfo({
                    status: false, 
                    variability: null, 
                    criticality: null, 
                    priority: null, 
                    score: null,
                    scalerName: null,
                    minReplicaCount: null,
                    maxReplicaCount: null,
                    targetCPU: null,
                    minCPU: null,
                })
            }
            if (!response.ok) throw new Error('Failed to delete autoscaler');
            alert('Autoscaler deleted successfully');
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };
    // const createKedaClick = async (event) => {
    //     try {
    //         const response = await fetch('KEDA ENDPOINT FOR CREATING', {
    //             method: "POST",
    //             body: JSON.stringify({
    //                 // body
    //             })
    //         })
    //     } catch(err) {
    //         console.log(err)
    //     }
    // }
    
    return (
        <div className="p-4 bg-blue-950 rounded-lg shadow">
            <div className="mb-4">
                <h4 className="font-semibold text-zinc-200 text-lg">Deployment Details:</h4>
                <p className="text-zinc-200">
                    <span className="font-medium">Name:</span> {props.deployment.name}
                </p>
                <p className="text-zinc-200">
                    <span className="font-medium">Namespace:</span> {props.deployment.namespace}
                </p>
            </div>
            {kedaInfo.status === false ? (
                <button onClick={openCreateModal} className="inline-block shadow-lg hover:shadow-xl hover:bg-blue-600 bg-blue-500 px-6 py-2 rounded-full text-white font-medium transition duration-200 ease-in-out">
                    Create Autoscaler
                </button>
            ) : (
                <div className="space-y-2">
                    <div className="text-zinc-200">
                        <p><span className="font-medium">Workload Variability:</span> {kedaInfo.variability}</p>
                        <p><span className="font-medium">Application Criticality:</span> {kedaInfo.criticality}</p>
                        <p><span className="font-medium">Optimization Priority:</span> {kedaInfo.priority}</p>
                        <p><span className="font-medium">Optimization Score:</span> {kedaInfo.score}</p>
                        <p><span className="font-medium">Autoscaler Name:</span> {kedaInfo.scalerName}</p>
                        <p><span className="font-medium">Min Replicas:</span> {kedaInfo.minReplicaCount}</p>
                        <p><span className="font-medium">Max Replicas:</span> {kedaInfo.maxReplicaCount}</p>
                        <p><span className="font-medium">Target CPU Utilization:</span> {kedaInfo.targetCPU}</p>
                        <p><span className="font-medium">Min CPU Request:</span> {kedaInfo.minCPU}</p>
                    </div>
                    <button
                        onClick={openUpdateModal} 
                        className="inline-block shadow-lg hover:shadow-xl hover:bg-blue-600 bg-blue-500 px-6 py-2 rounded-full text-white font-medium transition duration-200 ease-in-out">
                        Update Autoscaler
                    </button>

                    <button 
                        onClick={openDeleteModal} 
                        className="inline-block shadow-lg hover:shadow-xl hover:bg-red-600 bg-red-500 px-6 py-2 rounded-full text-white font-medium transition duration-200 ease-in-out">
                        Delete Autoscaler
                    </button>
                </div>
            )}
            <CreateAutoscalerFormModal isOpen={isCreateModalOpen} onClose={closeCreateModal} onSubmit={handleCreateAutoscaler}/>
            <UpdateAutoscalerFormModal isOpen={isUpdateModalOpen} onClose={closeUpdateModal} onSubmit={handleUpdateAutoscaler}/>
            <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onConfirm={handleDeleteAutoscaler}/>
        </div>
    );
}

export default Deployment;