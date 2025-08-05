// // File Path: src/components/suppliers/SupplierForm.js
// 'use client';
// import { useState, useEffect } from 'react';

// const SupplierForm = ({ onSubmit, initialData = null, isSubmitting }) => {
//   const [formData, setFormData] = useState({ name: '', contactPerson: '', email: '', phone: '', address: '' });

//   useEffect(() => { if (initialData) setFormData(initialData); }, [initialData]);

//   const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
//   const handleSubmit = e => { e.preventDefault(); onSubmit(formData); };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label htmlFor="name" className="block text-sm font-medium">Supplier Name</label>
//         <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md"/>
//       </div>
//       <div>
//         <label htmlFor="contactPerson" className="block text-sm font-medium">Contact Person</label>
//         <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md"/>
//       </div>
//       <div>
//         <label htmlFor="email" className="block text-sm font-medium">Email</label>
//         <input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md"/>
//       </div>
//       <div>
//         <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
//         <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md"/>
//       </div>
//       <div>
//         <label htmlFor="address" className="block text-sm font-medium">Address</label>
//         <textarea name="address" value={formData.address} onChange={handleChange} rows="3" className="mt-1 w-full p-2 border rounded-md"></textarea>
//       </div>
//       <div className="flex justify-end">
//         <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400">
//           {isSubmitting ? 'Saving...' : 'Save Supplier'}
//         </button>
//       </div>
//     </form>
//   );
// };
// export default SupplierForm;











//------------------------------------------------------------------




'use client';
import { useState, useEffect } from 'react';

const SupplierForm = ({ onSubmit, initialData = null, isSubmitting }) => {
  // State management remains unchanged
  const [formData, setFormData] = useState({ 
    name: '', 
    contactPerson: '', 
    email: '', 
    phone: '', 
    address: '' 
  });

  // Backend logic remains exactly the same
  useEffect(() => { 
    if (initialData) setFormData(initialData); 
  }, [initialData]);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = e => { e.preventDefault(); onSubmit(formData); };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-2 sm:px-0">
      {/* Supplier Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Supplier Name <span className="text-red-500">*</span>
        </label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      {/* Contact Person */}
      <div>
        <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">
          Contact Person
        </label>
        <input 
          type="text" 
          name="contactPerson" 
          value={formData.contactPerson} 
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone
        </label>
        <input 
          type="tel" 
          name="phone" 
          value={formData.phone} 
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <textarea 
          name="address" 
          value={formData.address} 
          onChange={handleChange} 
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        ></textarea>
      </div>

      {/* Submit Button - Full width on mobile */}
      <div className="pt-2">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          {isSubmitting ? 'Saving...' : 'Save Supplier'}
        </button>
      </div>
    </form>
  );
};

export default SupplierForm;