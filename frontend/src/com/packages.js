import React, { useEffect, useState } from 'react';
import './agency.css';

const Packages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('/api/packages');
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages", error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="packages">
      <h1>Available Travel Packages</h1>
      {packages.map((pkg) => (
        <div key={pkg._id} className="package">
          <h2>{pkg.agencyName}</h2>
          <p>Phone: {pkg.phoneNumber}</p>
          <p>Email: {pkg.email}</p>
          <p>Location: {pkg.location}</p>
          <p>Places: {pkg.places.join(', ')}</p>
          <p>Max People: {pkg.maxPeople}</p>
          <p>Price: ${pkg.price}</p>
          <img src={`/${pkg.image}`} alt="Travel Package" />
        </div>
      ))}
    </div>
  );
};

export default Packages;
