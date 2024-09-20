import React, { useState, useEffect } from 'react';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';

const HealthcareServicesApp = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: '', description: '', price: '' });
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    const savedServices = JSON.parse(localStorage.getItem('healthcareServices')) || [];
    setServices(savedServices);
  }, []);

  useEffect(() => {
    localStorage.setItem('healthcareServices', JSON.stringify(services));
  }, [services]);

  const addService = () => {
    if (newService.name && newService.description && newService.price) {
      setServices([...services, { ...newService, id: Date.now() }]);
      setNewService({ name: '', description: '', price: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

  const updateService = () => {
    if (editingService.name && editingService.description && editingService.price) {
      setServices(services.map(service => 
        service.id === editingService.id ? editingService : service
      ));
      setEditingService(null);
    } else {
      alert('Please fill in all fields');
    }
  };

  const deleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Healthcare Services Management</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          {editingService ? 'Edit Service' : 'Add New Service'}
        </h2>
        <div className="space-y-4">
          <input
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Service Name"
            value={editingService ? editingService.name : newService.name}
            onChange={(e) => editingService 
              ? setEditingService({...editingService, name: e.target.value})
              : setNewService({...newService, name: e.target.value})}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Description"
            value={editingService ? editingService.description : newService.description}
            onChange={(e) => editingService
              ? setEditingService({...editingService, description: e.target.value})
              : setNewService({...newService, description: e.target.value})}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Price (in ₹)"
            type="number"
            value={editingService ? editingService.price : newService.price}
            onChange={(e) => editingService
              ? setEditingService({...editingService, price: e.target.value})
              : setNewService({...newService, price: e.target.value})}
          />
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 flex items-center"
            onClick={editingService ? updateService : addService}
          >
            <PlusCircle className="mr-2" size={18} />
            {editingService ? 'Update Service' : 'Add Service'}
          </button>
          {editingService && (
            <button 
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
              onClick={() => setEditingService(null)}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {services.map(service => (
          <div key={service.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-blue-600">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>
                <p className="font-semibold">₹{service.price}</p>
              </div>
              <div className="space-x-2">
                <button 
                  className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition duration-200"
                  onClick={() => setEditingService(service)}
                >
                  <Pencil size={18} />
                </button>
                <button 
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
                  onClick={() => deleteService(service.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthcareServicesApp;