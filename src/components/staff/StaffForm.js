// // File Path: src/components/staff/StaffForm.js
// 'use client';
// import { useState, useEffect } from 'react';

// const StaffForm = ({ onSubmit, initialData = null, isSubmitting, isEditing = false }) => {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'cashier' });

//   useEffect(() => {
//     if (isEditing && initialData) {
//       setFormData({
//         name: initialData.name || '',
//         email: initialData.email || '',
//         password: '', // Password edit form mein nahi dikhana
//         role: initialData.role || 'cashier',
//       });
//     }
//   }, [initialData, isEditing]);

//   const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
//   const handleSubmit = e => { e.preventDefault(); onSubmit(formData); };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label htmlFor="name">Full Name</label>
//         <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded-md"/>
//       </div>
//       <div>
//         <label htmlFor="email">Email Address</label>
//         <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled={isEditing} className="w-full p-2 border rounded-md disabled:bg-gray-100"/>
//         {isEditing && <p className="text-xs text-gray-500">Email cannot be changed.</p>}
//       </div>
//       {!isEditing && (
//         <div>
//           <label htmlFor="password">Password</label>
//           <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded-md"/>
//         </div>
//       )}
//       <div>
//         <label htmlFor="role">Role</label>
//         <select name="role" value={formData.role} onChange={handleChange} required className="w-full p-2 border rounded-md">
//           <option value="cashier">Cashier</option>
//           <option value="manager">Manager</option>
//           <option value="inventory_manager">Inventory Manager</option>
//         </select>
//       </div>
//       <div className="flex justify-end pt-4">
//         <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400">
//           {isSubmitting ? 'Saving...' : 'Save Staff Member'}
//         </button>
//       </div>
//     </form>
//   );
// };
// export default StaffForm;










//-------------------------------------------------




'use client';
import { useState, useEffect } from 'react';

const StaffForm = ({ onSubmit, initialData = null, isSubmitting, isEditing = false }) => {
  // State management remains exactly the same
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: 'cashier' 
  });

  // Backend logic unchanged
  useEffect(() => {
    if (isEditing && initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        password: '',
        role: initialData.role || 'cashier',
      });
    }
  }, [initialData, isEditing]);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = e => { e.preventDefault(); onSubmit(formData); };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-2 sm:px-0">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
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

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
          disabled={isEditing} 
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 text-sm"
        />
        {isEditing && (
          <p className="mt-1 text-xs text-gray-500">
            Email cannot be changed
          </p>
        )}
      </div>

      {/* Password Field - Only for new staff */}
      {!isEditing && (
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
      )}

      {/* Role Selection */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
          Role
        </label>
        <select 
          name="role" 
          value={formData.role} 
          onChange={handleChange} 
          required 
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option value="cashier">Cashier</option>
          <option value="manager">Manager</option>
          <option value="inventory_manager">Inventory Manager</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Staff' : 'Save Staff Member'}
        </button>
      </div>
    </form>
  );
};

export default StaffForm;

