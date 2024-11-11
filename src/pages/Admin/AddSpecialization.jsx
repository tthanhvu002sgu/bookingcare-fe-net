import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';

const AddSpecialization = () => {
    const { specializations, getAllSpecializations, addSpecialization, deleteSpecialization } = useContext(AdminContext);
    const [newSpecialization, setNewSpecialization] = useState('');

    useEffect(() => {
        getAllSpecializations();
    });

   
    const handleAdd = () => {
        const isDuplicate = specializations.some(
            (specialization) => specialization.specialization.toLowerCase() === newSpecialization.toLowerCase().trim()
        );

        if (isDuplicate) {
            toast.error('Specialization already exists.');
        } else if (newSpecialization.trim()) {
            addSpecialization(newSpecialization.trim());
            setNewSpecialization('');
        }
    };

    const handleDelete = (specializationName) => {
        deleteSpecialization(specializationName);
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Specializations</h1>
            <div className="mb-4">
                <input
                    type="text"
                    value={newSpecialization}
                    onChange={(e) => setNewSpecialization(e.target.value)}
                    placeholder="Add new specialization"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <button
                    onClick={handleAdd}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    Add Specialization
                </button>
            </div>
            <ul className="space-y-2">
                {specializations.map((specialization, index) => (
                    <li
                        key={index}
                        className="flex justify-between items-center p-3 bg-gray-100 rounded shadow"
                    >
                        <span>{specialization.specialization}</span>
                        <button
                            onClick={() => handleDelete(specialization.specialization)}
                            className="text-red-500 hover:text-red-700 transition duration-200"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddSpecialization;
