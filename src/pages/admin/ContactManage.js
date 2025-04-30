import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchContacts, deleteContact } from '../../utils/api';
import { toast } from 'react-toastify';
import { FaSignOutAlt, FaEnvelope, FaTrash, FaUsers, FaBuilding, FaHome, FaCog, FaSync } from 'react-icons/fa';

const ContactManage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchContactData();
  }, []);
  
  const fetchContactData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch contact data from API
      const response = await fetchContacts();
      console.log('Contacts data received:', response.data);
      setContacts(response.data || []);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contact data:', error);
      setError('Failed to load contact data. Please try again later.');
      setLoading(false);
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact entry?')) {
      try {
        // Call API to delete contact
        await deleteContact(id);
        
        // Update state
        setContacts(contacts.filter(contact => contact._id !== id));
        toast.success('Contact entry deleted successfully');
      } catch (error) {
        console.error('Error deleting contact:', error);
        toast.error(error.response?.data?.message || 'Failed to delete contact entry');
      }
    }
  };
  
  const handleRefresh = () => {
    fetchContactData();
    toast.info('Refreshing contact data...');
  };
  
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    navigate('/admin');
  };
  
  // Format date to a readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="min-h-screen bg-offwhite py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-teal">Contact Form Submissions</h1>
            <p className="text-gray-600">
              View and manage contact form entries
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleRefresh}
              className="flex items-center text-teal hover:text-teal/70 transition duration-300"
            >
              <FaSync className="mr-2" />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center text-red hover:text-red-700 transition duration-300"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
        
        {/* Admin Navigation */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <Link to="/admin/dashboard" className="btn-secondary">
              <FaHome className="inline mr-2" />
              Dashboard
            </Link>
            <Link to="/admin/placements" className="btn-secondary">
              <FaUsers className="inline mr-2" />
              Manage Students
            </Link>
            <Link to="/admin/companies" className="btn-secondary">
              <FaBuilding className="inline mr-2" />
              Manage Companies
            </Link>
            <Link to="/admin/contacts" className="btn-primary">
              <FaEnvelope className="inline mr-2" />
              Contact Messages
            </Link>
            <Link to="#" className="btn-secondary">
              <FaCog className="inline mr-2" />
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="btn-danger md:ml-auto"
            >
              <FaSignOutAlt className="inline mr-2" />
              Logout
            </button>
          </nav>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
            <div className="mt-4">
              <button
                onClick={handleRefresh}
                className="bg-red text-white px-4 py-2 rounded hover:bg-red/80 transition duration-300"
              >
                <FaSync className="inline mr-2" />
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Contact Entries ({contacts.length})</h2>
              <button
                onClick={handleRefresh}
                className="text-teal hover:text-teal/70 transition duration-300"
              >
                <FaSync />
              </button>
            </div>
            
            {contacts.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No contact form submissions found.
              </div>
            ) : (
              <div className="space-y-4 p-6">
                {contacts.map((contact) => (
                  <div key={contact._id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 transition duration-300 hover:shadow-md">
                    <div className="flex justify-between">
                      <div className="flex items-center mb-2">
                        <div className="p-2 rounded-full bg-teal/20 mr-2">
                          <FaEnvelope className="text-teal" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">{contact.subject}</h3>
                      </div>
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="text-red hover:text-red-700 transition duration-300"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">From</p>
                        <p className="text-gray-800">{contact.name} ({contact.email})</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="text-gray-800">{formatDate(contact.createdAt)}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Message</p>
                      <p className="text-gray-800 bg-white p-3 rounded-md border border-gray-200 mt-1">
                        {contact.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactManage; 