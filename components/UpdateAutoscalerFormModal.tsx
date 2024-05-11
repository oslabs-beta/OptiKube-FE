import React, { useState } from 'react';

const AutoscalerFormModal = ({ isOpen, onClose, onSubmit }) => {
    const [variability, setVariability] = useState('');
    const [criticality, setCriticality] = useState('');
    const [priority, setPriority] = useState('');
    const [minReplicaCount, setMinReplicaCount] = useState('');
    const [maxReplicaCount, setMaxReplicaCount] = useState('');
    const [minCPU, setMinCPU] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!variability || !criticality || !priority || !minReplicaCount || !maxReplicaCount || !minCPU) {
            alert('All fields must be filled!');
            return;
        }
        onSubmit({
            variability,
            criticality,
            priority,
            minReplicaCount,
            maxReplicaCount,
            minCPU
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Update Autoscaler</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">
                        Workload Variability:
                        <select value={variability} onChange={e => setVariability(e.target.value)} className="mt-1 p-2 w-full border rounded">
                            <option value="">Select</option>
                            <option value="dynamic">Dynamic</option>
                            <option value="variable">Variable</option>
                            <option value="steady">Steady</option>
                        </select>
                    </label>
                    <label className="block mb-2">
                        Application Criticality:
                        <select value={criticality} onChange={e => setCriticality(e.target.value)} className="mt-1 p-2 w-full border rounded">
                            <option value="">Select</option>
                            <option value="critical">Critical</option>
                            <option value="moderately critical">Moderately Critical</option>
                            <option value="non-critical">Non-critical</option>
                        </select>
                    </label>
                    <label className="block mb-2">
                        Optimization Priority:
                        <select value={priority} onChange={e => setPriority(e.target.value)} className="mt-1 p-2 w-full border rounded">
                            <option value="">Select</option>
                            <option value="performance">Performance</option>
                            <option value="balanced">Balanced</option>
                            <option value="cost efficiency">Cost Efficiency</option>
                        </select>
                    </label>
                    <label className="block mb-2">
                        Min Replica Count:
                        <input type="number" value={minReplicaCount} onChange={e => setMinReplicaCount(e.target.value)} className="mt-1 p-2 w-full border rounded"/>
                    </label>
                    <label className="block mb-2">
                        Max Replica Count:
                        <input type="number" value={maxReplicaCount} onChange={e => setMaxReplicaCount(e.target.value)} className="mt-1 p-2 w-full border rounded"/>
                    </label>
                    <label className="block mb-2">
                        Min CPU Request:
                        <input type="number" value={minCPU} onChange={e => setMinCPU(e.target.value)} className="mt-1 p-2 w-full border rounded"/>
                    </label>
                    <div className="flex justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Update
                        </button>
                        <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AutoscalerFormModal;
