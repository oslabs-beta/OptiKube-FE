import React from 'react';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                <p>Are you sure you want to delete this autoscaler?</p>
                <div className="mt-4 flex justify-between">
                    <button 
                        onClick={onConfirm}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Delete
                    </button>
                    <button 
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
