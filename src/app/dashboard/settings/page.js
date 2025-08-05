
// // src/app/dashboard/settings/page.js (Final Corrected Version)

// 'use client';

// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import { UserCircleIcon, LockClosedIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

// // Notification Component (Hooks Rule Corrected)
// const Notification = ({ message, type, onClose }) => {
//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => {
//         onClose();
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [message, onClose]);

//   if (!message) {
//     return null;
//   }

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

// export default function SettingsPage() {
//   // ===== 1. SABSE ZAROORI: `update` function ko yahan se lein =====
//   const { data: session, status, update } = useSession({ required: true });
  
//   const [activeTab, setActiveTab] = useState('profile');
//   const [isLoading, setIsLoading] = useState(false); // For form submissions
//   const [isFetching, setIsFetching] = useState(true); // For initial data load

//   const [notification, setNotification] = useState({ message: '', type: '' });

//   const [profileData, setProfileData] = useState({ name: '', email: '' });
//   const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
//   const [appSettings, setAppSettings] = useState({ shopName: '', taxRate: 0 });

//   // Initial data fetch
//   useEffect(() => {
//     if (status === 'authenticated') {
//       setIsFetching(true);
//       fetch('/api/settings')
//         .then(res => res.json())
//         .then(data => {
//           if (data.success) {
//             setProfileData({ name: data.userProfile.name, email: data.userProfile.email });
//             if(data.appSettings) {
//               setAppSettings({ shopName: data.appSettings.shopName, taxRate: data.appSettings.taxRate });
//             }
//           } else {
//             setNotification({ message: 'Failed to load settings.', type: 'error' });
//           }
//         })
//         .finally(() => setIsFetching(false));
//     }
//   }, [status]);
  
//   const clearNotification = () => setNotification({ message: '', type: '' });

//   // ===== 2. YAHAN ASAL JAADU HOTA HAI =====
//   const handleProfileUpdate = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     clearNotification();

//     const res = await fetch('/api/settings', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name: profileData.name }),
//     });
//     const data = await res.json();
    
//     if (data.success) {
//       // YEH LINE SESSION KO FORAN UPDATE KAREGI PURI APPLICATION MEIN
//       await update({ name: profileData.name }); 
//       setNotification({ message: data.message, type: 'success' });
//     } else {
//       setNotification({ message: data.error, type: 'error' });
//     }
//     setIsLoading(false);
//   };

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

//   const handleAppSettingsUpdate = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     clearNotification();
    
//     const res = await fetch('/api/settings', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ appSettings }),
//     });
//     const data = await res.json();

//     setNotification({ message: data.message || data.error, type: data.success ? 'success' : 'error' });
//     setIsLoading(false);
//   };
  
//   if (status === 'loading' || isFetching) {
//     return <div className="p-6 text-center">Loading Settings...</div>;
//   }

//   const isAdmin = session?.user?.role === 'admin';

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>
      
//       <Notification 
//         message={notification.message} 
//         type={notification.type} 
//         onClose={clearNotification} 
//       />

//       <div className="flex flex-col md:flex-row md:space-x-8">
//         <aside className="w-full md:w-1/4 mb-6 md:mb-0">
//           <nav className="space-y-1">
//             <button onClick={() => setActiveTab('profile')} className={`w-full text-left flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'profile' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
//               <UserCircleIcon className="h-5 w-5 mr-3" /> My Profile
//             </button>
//             <button onClick={() => setActiveTab('password')} className={`w-full text-left flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'password' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
//               <LockClosedIcon className="h-5 w-5 mr-3" /> Change Password
//             </button>
//             {isAdmin && (
//               <button onClick={() => setActiveTab('app')} className={`w-full text-left flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'app' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
//                 <Cog6ToothIcon className="h-5 w-5 mr-3" /> Application
//               </button>
//             )}
//           </nav>
//         </aside>

//         <main className="w-full md:w-3/4">
//           <div className="bg-white p-8 rounded-lg shadow-md">
//             {activeTab === 'profile' && (
//               <form onSubmit={handleProfileUpdate}>
//                 <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
//                 <div className="space-y-4">
//                   <div>
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
//                     <input type="text" id="name" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
//                   </div>
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
//                     <input type="email" id="email" value={profileData.email} disabled className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 cursor-not-allowed"/>
//                   </div>
//                 </div>
//                 <div className="mt-6">
//                   <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300">
//                     {isLoading ? 'Saving...' : 'Save Changes'}
//                   </button>
//                 </div>
//               </form>
//             )}

//             {activeTab === 'password' && (
//                <form onSubmit={handlePasswordChange}>
//                 <h2 className="text-xl font-semibold mb-4">Change Password</h2>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Current Password</label>
//                     <input type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">New Password</label>
//                     <input type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
//                     <input type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
//                   </div>
//                 </div>
//                 <div className="mt-6">
//                   <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300">
//                     {isLoading ? 'Updating...' : 'Update Password'}
//                   </button>
//                 </div>
//               </form>
//             )}

//             {activeTab === 'app' && isAdmin && (
//                <form onSubmit={handleAppSettingsUpdate}>
//                 <h2 className="text-xl font-semibold mb-4">Application Settings</h2>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Shop Name</label>
//                     <input type="text" value={appSettings.shopName} onChange={(e) => setAppSettings({...appSettings, shopName: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Tax Rate (%)</label>
//                     <input type="number" step="0.01" value={appSettings.taxRate} onChange={(e) => setAppSettings({...appSettings, taxRate: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
//                   </div>
//                 </div>
//                 <div className="mt-6">
//                   <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300">
//                     {isLoading ? 'Saving...' : 'Save App Settings'}
//                   </button>
//                 </div>
//               </form>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }













//-----------------------------------------------------






'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { UserCircleIcon, LockClosedIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const bgColor = type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700';
  
  return (
    <div className={`border px-3 py-2 sm:px-4 sm:py-3 rounded relative mb-3 sm:mb-4 ${bgColor}`} role="alert">
      <span className="block sm:inline text-sm sm:text-base">{message}</span>
      <button 
        onClick={onClose} 
        className="absolute top-0 bottom-0 right-0 px-3 py-2 sm:px-4 sm:py-3"
        aria-label="Close notification"
      >
        <span className="text-lg sm:text-xl font-bold">×</span>
      </button>
    </div>
  );
};

export default function SettingsPage() {
  const { data: session, status, update } = useSession({ required: true });
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const [profileData, setProfileData] = useState({ name: '', email: '' });
  const [passwordData, setPasswordData] = useState({ 
    currentPassword: '', 
    newPassword: '', 
    confirmPassword: '' 
  });
  const [appSettings, setAppSettings] = useState({ 
    shopName: '', 
    taxRate: 0 
  });

  useEffect(() => {
    if (status === 'authenticated') {
      setIsFetching(true);
      fetch('/api/settings')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setProfileData({ 
              name: data.userProfile.name, 
              email: data.userProfile.email 
            });
            if(data.appSettings) {
              setAppSettings({ 
                shopName: data.appSettings.shopName, 
                taxRate: data.appSettings.taxRate 
              });
            }
          } else {
            setNotification({ 
              message: 'Failed to load settings.', 
              type: 'error' 
            });
          }
        })
        .finally(() => setIsFetching(false));
    }
  }, [status]);
  
  const clearNotification = () => setNotification({ message: '', type: '' });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearNotification();

    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: profileData.name }),
    });
    const data = await res.json();
    
    if (data.success) {
      await update({ name: profileData.name });
      setNotification({ 
        message: data.message, 
        type: 'success' 
      });
    } else {
      setNotification({ 
        message: data.error, 
        type: 'error' 
      });
    }
    setIsLoading(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword.length < 6) {
        setNotification({ 
          message: 'Password must be at least 6 characters', 
          type: 'error' 
        });
        return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setNotification({ 
        message: 'Passwords do not match', 
        type: 'error' 
      });
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
        setNotification({ 
          message: 'Password updated successfully', 
          type: 'success' 
        });
        setPasswordData({ 
          currentPassword: '', 
          newPassword: '', 
          confirmPassword: '' 
        });
    } else {
        setNotification({ 
          message: data.error || 'Failed to update password', 
          type: 'error' 
        });
    }
    setIsLoading(false);
  };

  const handleAppSettingsUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearNotification();
    
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appSettings }),
    });
    const data = await res.json();

    setNotification({ 
      message: data.message || data.error, 
      type: data.success ? 'success' : 'error' 
    });
    setIsLoading(false);
  };
  
  if (status === 'loading' || isFetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const isAdmin = session?.user?.role === 'admin';

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
        Settings
      </h1>
      
      <Notification 
        message={notification.message} 
        type={notification.type} 
        onClose={clearNotification} 
      />

      <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-1/4">
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('profile')} 
              className={`w-full text-left flex items-center px-3 py-2 text-sm sm:text-base font-medium rounded-md ${
                activeTab === 'profile' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <UserCircleIcon className="h-5 w-5 mr-2" /> 
              <span>My Profile</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('password')} 
              className={`w-full text-left flex items-center px-3 py-2 text-sm sm:text-base font-medium rounded-md ${
                activeTab === 'password' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <LockClosedIcon className="h-5 w-5 mr-2" /> 
              <span>Change Password</span>
            </button>
            
            {isAdmin && (
              <button 
                onClick={() => setActiveTab('app')} 
                className={`w-full text-left flex items-center px-3 py-2 text-sm sm:text-base font-medium rounded-md ${
                  activeTab === 'app' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Cog6ToothIcon className="h-5 w-5 mr-2" /> 
                <span>Application</span>
              </button>
            )}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="w-full md:w-3/4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Profile Information
                </h2>
                
                <div className="space-y-3">
                  <div>
                    <label 
                      htmlFor="name" 
                      className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      value={profileData.name} 
                      onChange={(e) => setProfileData({
                        ...profileData, 
                        name: e.target.value
                      })} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    />
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      value={profileData.email} 
                      disabled 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed text-sm sm:text-base"
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isLoading} 
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors text-sm sm:text-base"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            )}

            {activeTab === 'password' && (
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Change Password
                </h2>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input 
                      type="password" 
                      value={passwordData.currentPassword} 
                      onChange={(e) => setPasswordData({
                        ...passwordData, 
                        currentPassword: e.target.value
                      })} 
                      required 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input 
                      type="password" 
                      value={passwordData.newPassword} 
                      onChange={(e) => setPasswordData({
                        ...passwordData, 
                        newPassword: e.target.value
                      })} 
                      required 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input 
                      type="password" 
                      value={passwordData.confirmPassword} 
                      onChange={(e) => setPasswordData({
                        ...passwordData, 
                        confirmPassword: e.target.value
                      })} 
                      required 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isLoading} 
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors text-sm sm:text-base"
                >
                  {isLoading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            )}

            {activeTab === 'app' && isAdmin && (
              <form onSubmit={handleAppSettingsUpdate} className="space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Application Settings
                </h2>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                      Shop Name
                    </label>
                    <input 
                      type="text" 
                      value={appSettings.shopName} 
                      onChange={(e) => setAppSettings({
                        ...appSettings, 
                        shopName: e.target.value
                      })} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                      Tax Rate (%)
                    </label>
                    <input 
                      type="number" 
                      step="0.01" 
                      min="0"
                      max="100"
                      value={appSettings.taxRate} 
                      onChange={(e) => setAppSettings({
                        ...appSettings, 
                        taxRate: e.target.value
                      })} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isLoading} 
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors text-sm sm:text-base"
                >
                  {isLoading ? 'Saving...' : 'Save Settings'}
                </button>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}