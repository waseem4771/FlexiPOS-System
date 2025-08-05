// // src/app/dashboard/profile/page.js (Complete & Real Profile Page)

// 'use client';

// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import { UserCircleIcon, KeyIcon } from '@heroicons/react/24/outline';

// // Notification Component
// const Notification = ({ message, type, onClose }) => {
//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => onClose(), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [message, onClose]);

//   if (!message) return null;
//   const bgColor = type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700';
//   return (
//     <div className={`border px-4 py-3 rounded relative mb-4 ${bgColor}`} role="alert">
//       <span className="block sm:inline">{message}</span>
//       <button onClick={onClose} className="absolute top-0 bottom-0 right-0 px-4 py-3">
//         <span className="text-xl font-bold">×</span>
//       </button>
//     </div>
//   );
// };

// export default function ProfilePage() {
//   const { data: session, status, update } = useSession({ required: true });
  
//   const [isLoading, setIsLoading] = useState(false);
//   const [notification, setNotification] = useState({ message: '', type: '' });

//   // States for forms
//   const [name, setName] = useState('');
//   const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

//   useEffect(() => {
//     if (status === 'authenticated' && session) {
//       setName(session.user.name);
//     }
//   }, [session, status]);

//   const clearNotification = () => setNotification({ message: '', type: '' });

//   // ===== NAME UPDATE FUNCTION =====
//   const handleNameUpdate = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     clearNotification();

//     const res = await fetch('/api/settings', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name }),
//     });
//     const data = await res.json();
    
//     if (data.success) {
//       await update({ name }); // Yeh session ko foran update karega
//       setNotification({ message: data.message, type: 'success' });
//     } else {
//       setName(session.user.name); // Agar fail ho to purana naam wapas daal dein
//       setNotification({ message: data.error, type: 'error' });
//     }
//     setIsLoading(false);
//   };

//   // ===== PASSWORD UPDATE FUNCTION =====
//   const handlePasswordChange = async (e) => {
//     e.preventDefault();
//     if (passwordData.newPassword.length < 6) {
//         setNotification({ message: 'New password must be at least 6 characters.', type: 'error' });
//         return;
//     }
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       setNotification({ message: 'New passwords do not match.', type: 'error' });
//       return;
//     }
//     setIsLoading(true);
//     clearNotification();

//     const res = await fetch('/api/settings', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword }),
//     });
//     const data = await res.json();
    
//     if (data.success) {
//         setNotification({ message: data.message, type: 'success' });
//         setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
//     } else {
//         setNotification({ message: data.error, type: 'error' });
//     }
//     setIsLoading(false);
//   };

//   if (status === 'loading') {
//     return <div className="p-8 text-center">Loading Profile...</div>;
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
//       <div className="flex items-center space-x-4">
//         <UserCircleIcon className="h-12 w-12 text-gray-500" />
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
//           <p className="text-gray-600">View and edit your personal information.</p>
//         </div>
//       </div>
      
//       <Notification 
//         message={notification.message} 
//         type={notification.type} 
//         onClose={clearNotification} 
//       />

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         {/* === Left Side: Profile Info & Name Change === */}
//         <div className="lg:col-span-2 space-y-6">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Details</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-500">Email Address</label>
//                 <p className="text-lg text-gray-700">{session.user.email}</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-500">Role</label>
//                 <p className="text-lg text-gray-700 capitalize">{session.user.role}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <form onSubmit={handleNameUpdate}>
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Your Name</h2>
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
//                 <input 
//                   type="text" 
//                   id="name" 
//                   value={name} 
//                   onChange={(e) => setName(e.target.value)} 
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div className="mt-6">
//                 <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300">
//                   {isLoading ? 'Saving...' : 'Save Changes'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* === Right Side: Change Password === */}
//         <div className="lg:col-span-1">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <form onSubmit={handlePasswordChange}>
//               <div className="flex items-center space-x-3 mb-4">
//                 <KeyIcon className="h-6 w-6 text-gray-500" />
//                 <h2 className="text-xl font-semibold text-gray-800">Change Password</h2>
//               </div>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Current Password</label>
//                   <input type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">New Password</label>
//                   <input type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
//                   <input type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
//                 </div>
//               </div>
//               <div className="mt-6">
//                 <button type="submit" disabled={isLoading} className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 disabled:bg-gray-400">
//                   {isLoading ? 'Updating...' : 'Update Password'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
        
//       </div>
//     </div>
//   );
// }







//------------------------------------------------



'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { UserCircleIcon, KeyIcon } from '@heroicons/react/24/outline';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => onClose(), 5000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;
  const bgColor = type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700';
  return (
    <div className={`border px-4 py-3 rounded relative mb-4 ${bgColor}`} role="alert">
      <span className="block sm:inline">{message}</span>
      <button onClick={onClose} className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <span className="text-xl font-bold">×</span>
      </button>
    </div>
  );
};

export default function ProfilePage() {
  const { data: session, status, update } = useSession({ required: true });
  
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const [name, setName] = useState('');
  const [passwordData, setPasswordData] = useState({ 
    currentPassword: '', 
    newPassword: '', 
    confirmPassword: '' 
  });

  useEffect(() => {
    if (status === 'authenticated' && session) {
      setName(session.user.name);
    }
  }, [session, status]);

  const clearNotification = () => setNotification({ message: '', type: '' });

  const handleNameUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearNotification();

    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    
    if (data.success) {
      await update({ name });
      setNotification({ message: data.message, type: 'success' });
    } else {
      setName(session.user.name);
      setNotification({ message: data.error, type: 'error' });
    }
    setIsLoading(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword.length < 6) {
        setNotification({ message: 'New password must be at least 6 characters.', type: 'error' });
        return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setNotification({ message: 'New passwords do not match.', type: 'error' });
      return;
    }
    setIsLoading(true);
    clearNotification();

    const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          currentPassword: passwordData.currentPassword, 
          newPassword: passwordData.newPassword 
        }),
    });
    const data = await res.json();
    
    if (data.success) {
        setNotification({ message: data.message, type: 'success' });
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
        setNotification({ message: data.error, type: 'error' });
    }
    setIsLoading(false);
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <UserCircleIcon className="h-10 w-10 sm:h-12 sm:w-12 text-gray-500" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-sm sm:text-base text-gray-600">View and edit your personal information</p>
        </div>
      </div>
      
      <Notification 
        message={notification.message} 
        type={notification.type} 
        onClose={clearNotification} 
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        {/* Left Column - Profile Info & Name Update */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Profile Details Card */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm sm:shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
              Profile Details
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-500">
                  Email Address
                </label>
                <p className="text-base sm:text-lg text-gray-700">
                  {session.user.email}
                </p>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-500">
                  Role
                </label>
                <p className="text-base sm:text-lg text-gray-700 capitalize">
                  {session.user.role}
                </p>
              </div>
            </div>
          </div>

          {/* Name Update Form */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm sm:shadow-md">
            <form onSubmit={handleNameUpdate}>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                Update Your Name
              </h2>
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm sm:text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mt-4 sm:mt-6">
                <button 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 transition-colors text-sm sm:text-base"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column - Password Change */}
        <div className="lg:col-span-1">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm sm:shadow-md">
            <form onSubmit={handlePasswordChange}>
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <KeyIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Change Password
                </h2>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input 
                    type="password" 
                    value={passwordData.currentPassword} 
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})} 
                    required 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input 
                    type="password" 
                    value={passwordData.newPassword} 
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} 
                    required 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input 
                    type="password" 
                    value={passwordData.confirmPassword} 
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} 
                    required 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm sm:text-base"
                  />
                </div>
              </div>
              <div className="mt-4 sm:mt-6">
                <button 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 active:bg-gray-950 disabled:bg-gray-400 transition-colors text-sm sm:text-base"
                >
                  {isLoading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}