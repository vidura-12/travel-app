import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Editpackage = () => {
  const { id } = useParams(); // Get the package ID from the URL
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the package details using the ID
    axios.get(`http://localhost:8081/packages/${id}`)
      .then((response) => {
        setPackageDetails(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch package details');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Edit Package: {packageDetails.agencyName}</h2>
      {/* You can add a form here to edit the package details */}
      {/* Example: <input value={packageDetails.price} onChange={...} /> */}
    </div>
  );
};

export default Editpackage;

