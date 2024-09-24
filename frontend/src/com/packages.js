import React, { createContext, useContext, useState } from 'react';

const packages = createContext();

export const PackageProvider = ({ children }) => {
  const [approvedPackage, setApprovedPackage] = useState(null);

  return (
    <packages.Provider value={{ approvedPackage, setApprovedPackage }}>
      {children}
    </packages.Provider>
  );
};

export const usePackage = () => useContext(packages);
