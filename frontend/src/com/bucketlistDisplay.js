import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './bucketlistDisplay.css'; 

const BucketListDisplay = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const result = await axios.get('/api/bucketlist');
            setItems(result.data);
        };
        fetchItems();
    }, []);

    const updateItem = async (id) => {
        const newPlace = prompt('Enter the new place:');
        const newNote = prompt('Enter a note about this place:');
        if (newPlace && newNote) {
            const result = await axios.put(`/api/bucketlist/${id}`, { place: newPlace, note: newNote });
            setItems(items.map(item => item._id === id ? result.data : item));
        }
    };

    const deleteItem = async (id) => {
        await axios.delete(`/api/bucketlist/${id}`);
        setItems(items.filter(item => item._id !== id));
    };

    return (
        <div className="bucket-list-display">
            <h1>Bucket List Items</h1>
            <table>
                <thead>
                    <tr>
                        <th>Place</th>
                        <th>Note About Place</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}. {item.place}</td>
                            <td>{item.note}</td>
                            <td>
                                <button onClick={() => updateItem(item._id)}>Update</button>
                                <button onClick={() => deleteItem(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BucketListDisplay;
