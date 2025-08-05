// // File Path: src/app/dashboard/customers/[customerId]/page.js
// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import { ArrowLeftIcon, LockClosedIcon, ShoppingCartIcon, CurrencyDollarIcon, CalendarIcon } from '@heroicons/react/24/outline';

// // Access Denied Component
// const AccessDenied = () => (
//   <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
//       <LockClosedIcon className="h-16 w-16 text-red-500 mb-4" />
//       <h1 className="text-3xl font-bold text-gray-800">Access Denied</h1>
//       <p className="text-lg text-gray-600 mt-2">Only Administrators can view customer details.</p>
//   </div>
// );

// const CustomerDetailsPage = () => {
//   const router = useRouter();
//   const params = useParams();
//   const customerId = params.customerId;
//   const { data: session, status } = useSession({ required: true });

//   const [customerData, setCustomerData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const isAdmin = session?.user?.role === 'admin';

//   useEffect(() => {
//     if (isAdmin && customerId) {
//       const fetchDetails = async () => {
//         try {
//           const res = await fetch(`/api/customers/${customerId}`);
//           const result = await res.json();
//           if (!result.success) throw new Error(result.error);
//           setCustomerData(result.data);
//         } catch (err) {
//           setError(err.message);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchDetails();
//     } else if (!isAdmin) {
//       // Agar user admin nahi hai, to loading foran band kar dein
//       setLoading(false);
//     }
//   }, [isAdmin, customerId]);

//   // Loading States
//   if (status === 'loading' || loading) {
//     return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
//   }
  
//   // Security Check (Sab se ahem)
//   if (!isAdmin) {
//     return <AccessDenied />;
//   }

//   // Error and Data States
//   if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
//   if (!customerData) return <div className="text-center py-10">Customer not found.</div>;

//   const { customer, purchaseHistory, stats } = customerData;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex items-center mb-6">
//         <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-200 mr-4">
//           <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
//         </button>
//         <h1 className="text-3xl font-bold text-gray-800">Customer Details</h1>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Left Column: Profile & Stats */}
//         <div className="lg:col-span-1 space-y-8">
//           <div className="bg-white p-6 rounded-xl shadow-md text-center">
//             <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 mx-auto flex items-center justify-center text-4xl font-bold">
//               {customer.name.charAt(0).toUpperCase()}
//             </div>
//             <h2 className="mt-4 text-2xl font-bold text-gray-800">{customer.name}</h2>
//             <p className="text-gray-500">{customer.email}</p>
//             <p className="mt-2 text-sm text-gray-400 flex items-center justify-center">
//               <CalendarIcon className="h-4 w-4 mr-1"/> Joined on {new Date(customer.createdAt).toLocaleDateString()}
//             </p>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <h3 className="text-lg font-semibold text-gray-700 mb-4">Lifetime Stats</h3>
//             <div className="space-y-4">
//               <div className="flex items-center">
//                 <ShoppingCartIcon className="h-8 w-8 text-blue-500 mr-4"/>
//                 <div> {/* <-- Yahan <div> theek kiya gaya hai */}
//                   <p className="text-gray-500">Total Orders</p>
//                   <p className="text-2xl font-bold text-gray-800">{stats.totalOrders}</p>
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <CurrencyDollarIcon className="h-8 w-8 text-green-500 mr-4"/>
//                 <div> {/* <-- Yahan <div> theek kiya gaya hai */}
//                   <p className="text-gray-500">Total Spent</p>
//                   <p className="text-2xl font-bold text-gray-800">${stats.totalSpent.toFixed(2)}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Column: Purchase History */}
//         <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4">Purchase History (Latest 20)</h3>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="text-left text-sm p-3 font-semibold text-gray-600">Order ID</th>
//                   <th className="text-left text-sm p-3 font-semibold text-gray-600">Date</th>
//                   <th className="text-right text-sm p-3 font-semibold text-gray-600">Total</th>
//                   <th className="text-center text-sm p-3 font-semibold text-gray-600">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {purchaseHistory.length > 0 ? purchaseHistory.map(order => (
//                   <tr key={order._id} className="border-b last:border-b-0">
//                     <td className="p-3 font-medium">#{order._id.slice(-6).toUpperCase()}</td>
//                     <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
//                     <td className="p-3 text-right font-semibold">${order.total.toFixed(2)}</td>
//                     <td className="p-3 text-center"><span className={`px-2 py-1 text-xs rounded-full ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{order.status}</span></td>
//                   </tr>
//                 )) : (
//                   <tr><td colSpan="4" className="text-center py-8 text-gray-500">No purchase history found.</td></tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDetailsPage;










//---------------------------------------------------

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ArrowLeftIcon, LockClosedIcon, ShoppingCartIcon, CurrencyDollarIcon, CalendarIcon } from '@heroicons/react/24/outline';

// Access Denied Component
const AccessDenied = () => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-4 md:p-6">
    <LockClosedIcon className="h-12 w-12 md:h-16 md:w-16 text-red-500 mb-3 md:mb-4" />
    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Access Denied</h1>
    <p className="text-base md:text-lg text-gray-600 mt-2">Only Administrators can view customer details.</p>
  </div>
);

const CustomerDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const customerId = params.customerId;
  const { data: session, status } = useSession({ required: true });

  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAdmin = session?.user?.role === 'admin';

  useEffect(() => {
    if (isAdmin && customerId) {
      const fetchDetails = async () => {
        try {
          const res = await fetch(`/api/customers/${customerId}`);
          const result = await res.json();
          if (!result.success) throw new Error(result.error);
          setCustomerData(result.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchDetails();
    } else if (!isAdmin) {
      setLoading(false);
    }
  }, [isAdmin, customerId]);

  // Loading States
  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Security Check
  if (!isAdmin) {
    return <AccessDenied />;
  }

  // Error and Data States
  if (error) return (
    <div className="text-center py-8 md:py-10 text-red-500">
      Error: {error}
    </div>
  );
  
  if (!customerData) return (
    <div className="text-center py-8 md:py-10">
      Customer not found.
    </div>
  );

  const { customer, purchaseHistory, stats } = customerData;

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-4 md:mb-6">
        <button 
          onClick={() => router.back()} 
          className="p-1 md:p-2 rounded-full hover:bg-gray-200 mr-2 md:mr-4"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="h-5 w-5 md:h-6 md:w-6 text-gray-700" />
        </button>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
          Customer Details
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {/* Left Column: Profile & Stats */}
        <div className="lg:col-span-1 space-y-4 md:space-6">
          {/* Profile Card */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-blue-100 text-blue-600 mx-auto flex items-center justify-center text-2xl md:text-3xl lg:text-4xl font-bold">
              {customer.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="mt-3 md:mt-4 text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
              {customer.name}
            </h2>
            <p className="text-sm md:text-base text-gray-500 break-all">
              {customer.email}
            </p>
            <p className="mt-1 md:mt-2 text-xs md:text-sm text-gray-400 flex items-center justify-center">
              <CalendarIcon className="h-3 w-3 md:h-4 md:w-4 mr-1"/> 
              Joined on {new Date(customer.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Stats Card */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
            <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-3 md:mb-4">
              Lifetime Stats
            </h3>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center">
                <ShoppingCartIcon className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-blue-500 mr-3 md:mr-4"/>
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Total Orders</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-800">
                    {stats.totalOrders}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <CurrencyDollarIcon className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-green-500 mr-3 md:mr-4"/>
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Total Spent</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-800">
                    ${stats.totalSpent.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Purchase History */}
        <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-xl shadow-md">
          <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-3 md:mb-4">
            Purchase History (Latest 20)
          </h3>
          
          {/* Mobile Card View */}
          <div className="lg:hidden space-y-3">
            {purchaseHistory.length > 0 ? (
              purchaseHistory.map(order => (
                <div key={order._id} className="border rounded-lg p-3 md:p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Order #{order._id.slice(-6).toUpperCase()}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="mt-2 text-right">
                    <p className="font-semibold">${order.total.toFixed(2)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                No purchase history found.
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left text-sm p-3 font-semibold text-gray-600">Order ID</th>
                  <th className="text-left text-sm p-3 font-semibold text-gray-600">Date</th>
                  <th className="text-right text-sm p-3 font-semibold text-gray-600">Total</th>
                  <th className="text-center text-sm p-3 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {purchaseHistory.length > 0 ? purchaseHistory.map(order => (
                  <tr key={order._id} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="p-3 text-sm font-medium">#{order._id.slice(-6).toUpperCase()}</td>
                    <td className="p-3 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-3 text-sm text-right font-semibold">${order.total.toFixed(2)}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-gray-500">
                      No purchase history found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsPage;