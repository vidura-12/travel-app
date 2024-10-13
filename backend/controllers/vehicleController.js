const Vehicle = require('../models/Vehicle');

// Create a new vehicle post
exports.createVehicle = async (req, res) => {
    const { ownerEmail, make, model, numberOfSeats, pricePerDay, color, category, contact, ac, vnumber, location } = req.body;
    const image = req.file ? req.file.filename : ''; // Use filename here
    console.log(ownerEmail, make, model, numberOfSeats, pricePerDay, color, category, image, contact, ac, vnumber, location);
    try {
      if (!ownerEmail || !make || !model || !numberOfSeats || !pricePerDay || !color || !category || !image || !contact || !ac || !vnumber || !location) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const vehicle = new Vehicle({
        ownerEmail,
        make,
        model,
        numberOfSeats,
        pricePerDay,
        color,
        category,
        image,
        contact, 
        ac,
        vnumber,
        location 
      });
  
      await vehicle.save();
      res.status(201).json({ message: 'Vehicle created successfully' });
    } catch (error) {
      console.error('Error creating vehicle:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Get all vehicles
exports.getVehicles = async (req, res) => {
   

    try {
        const vehicles = await Vehicle.find();
        res.status(200).json({
            success: true,
            data: vehicles,
        });
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

// Update vehicle
exports.updateVehicle = async (req, res) => {
    const { vehicleId } = req.params;
    const { make, model, numberOfSeats, pricePerDay, color, category,contact, ac, vnumber, location } = req.body;
    const image = req.file ? req.file.filename : req.body.existingImage; 

    try {
        const vehicle = await Vehicle.findByIdAndUpdate(vehicleId, {
            make,
            model,
            numberOfSeats,
            pricePerDay,
            color,
            category,
            image,
            contact,
            ac, 
            vnumber,
            location
        }, { new: true });

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.status(200).json({ message: 'Vehicle updated successfully', vehicle });
    } catch (error) {
        console.error('Error updating vehicle:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete vehicle
exports.deleteVehicle = async (req, res) => {
    const { vehicleId } = req.params;

    try {
        const vehicle = await Vehicle.findByIdAndDelete(vehicleId);

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



exports.updateVehicleStatus = async (req, res) => {
    const { vehicleId } = req.params;
    const { status } = req.body;

    try {
        const vehicle = await Vehicle.findByIdAndUpdate(
            vehicleId,
            { status },
            { new: true } 
        );

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.status(200).json({ message: 'Vehicle status updated successfully', vehicle });
    } catch (error) {
        console.error('Error updating vehicle status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



exports.getVehicleById = async (req, res) => {
    const { vehicleId } = req.params;

    try {
        const vehicle = await Vehicle.findById(vehicleId);

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.status(200).json({ success: true, data: vehicle });
    } catch (error) {
        console.error('Error fetching vehicle details:', error);
        res.status(500).json({ message: 'Server error' });
    }
};