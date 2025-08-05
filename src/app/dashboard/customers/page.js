// // File Path: src/app/dashboard/customers/page.js
// 'use client';

// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import Link from 'next/link';
// import { UserGroupIcon, EyeIcon } from '@heroicons/react/24/outline';


// const CustomersPage = () => {
//   const { data: session, status } = useSession({ required: true });
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // isAdmin variable yahan define karein
//   const isAdmin = session?.user?.role === 'admin';

//   useEffect(() => {
//     // Session load hone ke baad hi data fetch karein
//     if (status === 'authenticated') {
//       const fetchCustomers = async () => {
//         try {
//           setLoading(true);
//           const res = await fetch('/api/customers');
//           const result = await res.json();
//           if (!result.success) throw new Error(result.error || "Could not fetch customer data.");
//           setCustomers(result.data);
//         } catch (err) {
//           setError(err.message);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchCustomers();
//     }
//   }, [status]); // Dependency mein sirf 'status' rakhein, taake yeh dobara na chale

//   if (status === 'loading' || loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }
  
//   if (error) {
//     return (
//       <div className="p-6 text-center text-red-600 bg-red-50 rounded-lg">
//         <h2 className="font-bold">Error</h2>
//         <p>{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800 flex items-center">
//           <UserGroupIcon className="h-8 w-8 mr-3" /> 
//           {/* Heading role ke hisab se badlein */}
//           {isAdmin ? "Customer Management" : "Customer Directory"}
//         </h1>
//       </div>
//       <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto">
//         <table className="w-full">
//           <thead className="border-b bg-gray-50">
//             <tr>
//               <th className="text-left p-3 font-semibold text-gray-600">Name</th>
//               <th className="text-left p-3 font-semibold text-gray-600">Email</th>
//               <th className="text-left p-3 font-semibold text-gray-600">Role</th>
//               <th className="text-left p-3 font-semibold text-gray-600">Joined On</th>
//               {/* "Actions" column sirf Admin ko dikhayega */}
//               {isAdmin && (
//                 <th className="text-center p-3 font-semibold text-gray-600">Actions</th>
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {customers.length > 0 ? (
//               customers.map(customer => (
//                 <tr key={customer._id} className="border-b hover:bg-gray-50 last:border-b-0">
//                   <td className="p-3 font-medium text-gray-800">{customer.name}</td>
//                   <td className="p-3 text-gray-600">{customer.email}</td>
//                   <td className="p-3 text-gray-600 capitalize">{customer.role}</td>
//                   <td className="p-3 text-gray-600">{new Date(customer.createdAt).toLocaleDateString()}</td>
//                   {/* "View Details" ka button sirf Admin ko dikhayega */}
//                   {isAdmin && (
//                     <td className="p-3 text-center">
//                       <Link href={`/dashboard/customers/${customer._id}`}>
//                         <div className="inline-flex items-center p-2 text-blue-600 hover:bg-blue-100 rounded-full" title="View Details">
//                           <EyeIcon className="h-5 w-5" />
//                         </div>
//                       </Link>
//                     </td>
//                   )}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 {/* Colspan ko role ke hisab se adjust karein */}
//                 <td colSpan={isAdmin ? 5 : 4} className="text-center py-8 text-gray-500">
//                   No other customers found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CustomersPage;










//--------------------------------------------







'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { UserGroupIcon, EyeIcon } from '@heroicons/react/24/outline';

const CustomersPage = () => {
  const { data: session, status } = useSession({ required: true });
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAdmin = session?.user?.role === 'admin';

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchCustomers = async () => {
        try {
          setLoading(true);
          const res = await fetch('/api/customers');
          const result = await res.json();
          if (!result.success) throw new Error(result.error || "Could not fetch customer data.");
          setCustomers(result.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchCustomers();
    }
  }, [status]);

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4 md:p-6 text-center text-red-600 bg-red-50 rounded-lg max-w-md mx-auto mt-8">
        <h2 className="font-bold text-lg">Error Loading Customers</h2>
        <p className="mt-2">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-100 rounded-md hover:bg-red-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-2 md:gap-0">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
          <UserGroupIcon className="h-6 w-6 md:h-8 md:w-8 mr-2 md:mr-3" /> 
          {isAdmin ? "Customer Management" : "Customer Directory"}
        </h1>
      </div>

      {/* Customers Table - Hidden on mobile */}
      <div className="hidden md:block bg-white p-4 rounded-xl shadow-md overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="text-left p-3 font-semibold text-gray-600">Name</th>
              <th className="text-left p-3 font-semibold text-gray-600">Email</th>
              <th className="text-left p-3 font-semibold text-gray-600">Role</th>
              <th className="text-left p-3 font-semibold text-gray-600">Joined On</th>
              {isAdmin && (
                <th className="text-center p-3 font-semibold text-gray-600">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map(customer => (
                <tr key={customer._id} className="border-b hover:bg-gray-50 last:border-b-0">
                  <td className="p-3 font-medium text-gray-800">{customer.name}</td>
                  <td className="p-3 text-gray-600">{customer.email}</td>
                  <td className="p-3 text-gray-600 capitalize">{customer.role}</td>
                  <td className="p-3 text-gray-600">{new Date(customer.createdAt).toLocaleDateString()}</td>
                  {isAdmin && (
                    <td className="p-3 text-center">
                      <Link href={`/dashboard/customers/${customer._id}`}>
                        <div className="inline-flex items-center p-2 text-blue-600 hover:bg-blue-100 rounded-full" title="View Details">
                          <EyeIcon className="h-5 w-5" />
                        </div>
                      </Link>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isAdmin ? 5 : 4} className="text-center py-8 text-gray-500">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards View - Hidden on desktop */}
      <div className="md:hidden space-y-3">
        {customers.length > 0 ? (
          customers.map(customer => (
            <div key={customer._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{customer.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 capitalize">{customer.role}</p>
                </div>
                {isAdmin && (
                  <Link href={`/dashboard/customers/${customer._id}`}>
                    <div className="p-1 text-blue-600 hover:bg-blue-50 rounded-full">
                      <EyeIcon className="h-5 w-5" />
                    </div>
                  </Link>
                )}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-600 break-all">{customer.email}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Joined: {new Date(customer.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-sm text-center text-gray-500">
            No customers found
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersPage;
