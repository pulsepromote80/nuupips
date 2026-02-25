"use client";
import React from 'react';

const DeletePopup = ({ show, type, name, onCancel, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-[500px] mx-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Confirm Delete
                </h3>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this {type} "{name}"? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-white bg-[#29d2cc] rounded-md hover:bg-red-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeletePopup;
