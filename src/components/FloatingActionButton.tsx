import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FloatingActionButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/create-shipment')}
      className="fab group"
      title="Create New Shipment"
    >
      <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
    </button>
  );
};

export default FloatingActionButton;
