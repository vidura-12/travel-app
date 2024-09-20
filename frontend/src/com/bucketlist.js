import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './bucketlist.css';


const BucketList = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [newNote, setNewNote] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [editingItemId, setEditingItemId] = useState(null);
    const [editingPlace, setEditingPlace] = useState('');
    const [editingNote, setEditingNote] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            const result = await axios.get('/api/bucketlist');
            setItems(result.data);
        };
        fetchItems();
    }, []);

    const addItem = async () => {
        if (newItem.trim() !== '') {
            const result = await axios.post('/api/bucketlist', { place: newItem, note: newNote });
            setItems([...items, result.data]);
            setNewItem('');
            setNewNote('');
        }
    };

    const startEditing = (item) => {
        setEditingItemId(item._id);
        setEditingPlace(item.place);
        setEditingNote(item.note);
    };

    const updateItem = async () => {
        const result = await axios.put(`/api/bucketlist/${editingItemId}`, { place: editingPlace, note: editingNote });
        const updatedItems = items.map(item => item._id === editingItemId ? result.data : item);
        setItems(updatedItems);
        setEditingItemId(null);
        setEditingPlace('');
        setEditingNote('');
    };

    const deleteItem = async (id) => {
        await axios.delete(`/api/bucketlist/${id}`);
        const updatedItems = items.filter(item => item._id !== id);
        setItems(updatedItems);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredItems = items.filter(item => item.place.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="bucket-list-container">
            <h1>Bucket List</h1>
            <input 
                type="text" 
                value={searchTerm} 
                onChange={handleSearch} 
                placeholder="Search" 
                className="search-bar"
            />
            <div className="add-item-container">
                <input 
                    type="text" 
                    value={newItem} 
                    onChange={(e) => setNewItem(e.target.value)} 
                    placeholder="Add a place" 
                />
                <input 
                    type="text" 
                    value={newNote} 
                    onChange={(e) => setNewNote(e.target.value)} 
                    placeholder="Add a note about this place" 
                />
                <button onClick={addItem}>Add</button>
            </div>
            <ul className="bucket-list-items">
                {filteredItems.map(item => (
                    <li key={item._id} className="bucket-list-item">
                        {editingItemId === item._id ? (
                            <div>
                                <input 
                                    type="text" 
                                    value={editingPlace} 
                                    onChange={(e) => setEditingPlace(e.target.value)} 
                                />
                                <input 
                                    type="text" 
                                    value={editingNote} 
                                    onChange={(e) => setEditingNote(e.target.value)} 
                                />
                                <button onClick={updateItem}>Update</button>
                                <button onClick={() => setEditingItemId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div className="bucket-list-item-content">
                                <span>{item.place}</span>
                                <span className="bucket-list-note">{item.note}</span>
                                <div>
                                    <button onClick={() => startEditing(item)}>Edit</button>
                                    <button onClick={() => deleteItem(item._id)}>Delete</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BucketList;
