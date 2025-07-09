import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout.jsx';
import api from '../utils/api.js';

const CreateShipment = () => {
  const [formData, setFormData] = useState({
    senderName: '',
    senderAddress: '',
    senderPhone: '',
    receiverName: '',
    receiverAddress: '',
    receiverPhone: '',
    packageSize: 'medium',
    weight: undefined,
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/shipments', formData);
      const { shipment } = response.data;
      navigate(`/shipment/${shipment.trackingNumber}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create shipment');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'weight' ? (value ? parseFloat(value) : undefined) : value,
    });
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 group transition-all duration-200 hover:bg-gray-100/50 px-3 py-2 rounded-xl"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Back to Dashboard</span>
          </button>
          
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl shadow-xl">
                <Package className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Create New Shipment</h1>
            <p className="text-lg text-gray-600">Fill in the details to create and track your shipment</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/50 text-red-700 px-6 py-4 rounded-2xl backdrop-blur-sm animate-slide-up">
              <div className="flex">
                <div className="text-sm font-medium">{error}</div>
              </div>
            </div>
          )}

          {/* Sender Information */}
          <div className="card-glass animate-slide-up">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                <Package className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Sender Information</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label htmlFor="senderName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Sender Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="senderName"
                  name="senderName"
                  required
                  className="input-field w-full"
                  placeholder="Enter sender's full name"
                  value={formData.senderName}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="senderPhone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Sender Phone
                </label>
                <input
                  type="tel"
                  id="senderPhone"
                  name="senderPhone"
                  className="input-field w-full"
                  placeholder="Enter sender's phone number"
                  value={formData.senderPhone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="lg:col-span-2">
                <label htmlFor="senderAddress" className="block text-sm font-semibold text-gray-700 mb-2">
                  Sender Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="senderAddress"
                  name="senderAddress"
                  required
                  rows={3}
                  className="input-field w-full resize-none"
                  placeholder="Enter sender's complete address"
                  value={formData.senderAddress}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Receiver Information */}
          <div className="card-glass animate-slide-up">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <Package className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Receiver Information</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label htmlFor="receiverName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Receiver Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="receiverName"
                  name="receiverName"
                  required
                  className="input-field w-full"
                  placeholder="Enter receiver's full name"
                  value={formData.receiverName}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="receiverPhone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Receiver Phone
                </label>
                <input
                  type="tel"
                  id="receiverPhone"
                  name="receiverPhone"
                  className="input-field w-full"
                  placeholder="Enter receiver's phone number"
                  value={formData.receiverPhone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="lg:col-span-2">
                <label htmlFor="receiverAddress" className="block text-sm font-semibold text-gray-700 mb-2">
                  Receiver Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="receiverAddress"
                  name="receiverAddress"
                  required
                  rows={3}
                  className="input-field w-full resize-none"
                  placeholder="Enter receiver's complete address"
                  value={formData.receiverAddress}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className="card-glass animate-slide-up">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl">
                <Package className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Package Details</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label htmlFor="packageSize" className="block text-sm font-semibold text-gray-700 mb-2">
                  Package Size <span className="text-red-500">*</span>
                </label>
                <select
                  id="packageSize"
                  name="packageSize"
                  required
                  className="input-field w-full"
                  value={formData.packageSize}
                  onChange={handleChange}
                >
                  <option value="small">Small (up to 1kg)</option>
                  <option value="medium">Medium (1-5kg)</option>
                  <option value="large">Large (5-20kg)</option>
                  <option value="extra-large">Extra Large (20kg+)</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="weight" className="block text-sm font-semibold text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  step="0.1"
                  min="0"
                  className="input-field w-full"
                  placeholder="Enter package weight"
                  value={formData.weight || ''}
                  onChange={handleChange}
                />
              </div>
              
              <div className="lg:col-span-2">
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Package Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="input-field w-full resize-none"
                  placeholder="Describe the package contents (optional)"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary px-12 py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[200px]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                'Create Shipment'
              )}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateShipment;
