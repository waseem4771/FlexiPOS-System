

// // File Path: src/app/dashboard/sales/page.js
// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import Link from 'next/link';
// import { useSession } from 'next-auth/react';
// import { redirect } from 'next/navigation';

// // Icons
// import {
//   EyeIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   ExclamationTriangleIcon,
//   PlusCircleIcon
// } from '@heroicons/react/24/outline';

// const SalesPage = () => {
//   const { data: session, status } = useSession({
//     required: true,
//     onUnauthenticated() {
//       redirect('/login');
//     },
//   });

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     totalPages: 1,
//   });

//   // User ke role ko check karne ke liye variable
//   const isAdmin = session?.user?.role === 'admin';

//   const fetchOrders = useCallback(async (page, limit) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(`/api/sales?page=${page}&limit=${limit}`, { cache: 'no-store' });
//       const result = await response.json();
      
//       if (!result.success) {
//         throw new Error(result.error || 'Failed to fetch orders.');
//       }
      
//       setOrders(result.data);
//       setPagination(result.pagination);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (status === 'authenticated') {
//       fetchOrders(pagination.page, pagination.limit);
//     }
//   }, [status, pagination.page, pagination.limit, fetchOrders]);

//   const handlePreviousPage = () => {
//     if (pagination.page > 1) {
//       setPagination(prev => ({ ...prev, page: prev.page - 1 }));
//     }
//   };

//   const handleNextPage = () => {
//     if (pagination.page < pagination.totalPages) {
//       setPagination(prev => ({ ...prev, page: prev.page + 1 }));
//     }
//   };

//   if (status === 'loading') {
//     return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
//   }
  
//   const StatusBadge = ({ status }) => {
//     const statusClasses = {
//       completed: 'bg-green-100 text-green-800',
//       pending: 'bg-yellow-100 text-yellow-800',
//       cancelled: 'bg-red-100 text-red-800',
//       processing: 'bg-blue-100 text-blue-800',
//     };
//     return (
//       <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
//         {status.charAt(0).toUpperCase() + status.slice(1)}
//       </span>
//     );
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         {/* Heading role ke hisab se badlegi */}
//         <h1 className="text-3xl font-bold text-gray-800">
//           {isAdmin ? 'All Sales / Orders' : 'My Purchase History'}
//         </h1>
//         {/* "New Sale" button sirf Admin ko dikhega */}
//         {isAdmin && (
//           <Link href="/dashboard/pos">
//             <div className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
//               <PlusCircleIcon className="h-5 w-5 mr-2" />
//               New Sale
//             </div>
//           </Link>
//         )}
//       </div>

//       {/* Main Content Area */}
//       <div className="bg-white p-6 rounded-xl shadow-md">
//         {loading && <div className="text-center py-4">Loading orders...</div>}
        
//         {error && (
//             <div className="bg-red-50 p-4 rounded-lg text-center">
//                 <ExclamationTriangleIcon className="h-8 w-8 text-red-500 mx-auto mb-2" />
//                 <p className="text-red-700 font-semibold">Error loading data</p>
//                 <p className="text-red-600 text-sm">{error}</p>
//             </div>
//         )}

//         {!loading && !error && (
//           <>
//             {/* Orders Table */}
//             <div className="overflow-x-auto">
//               <table className="w-full text-left">
//                 <thead className="border-b bg-gray-50">
//                   <tr className="text-sm text-gray-600">
//                     <th className="py-3 px-4 font-semibold">Order ID</th>
//                     {/* Customer column sirf Admin ko dikhega */}
//                     {isAdmin && <th className="py-3 px-4 font-semibold">Customer</th>}
//                     <th className="py-3 px-4 font-semibold">Date</th>
//                     <th className="py-3 px-4 font-semibold">Total</th>
//                     <th className="py-3 px-4 font-semibold">Status</th>
//                     {/* "View Details" ka column sab ko nazar aayega */}
//                     <th className="py-3 px-4 font-semibold text-center">Details</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orders.length > 0 ? (
//                     orders.map((order) => (
//                       <tr key={order._id} className="border-b last:border-none hover:bg-gray-50 transition-colors">
//                         <td className="py-4 px-4 font-medium text-gray-800">#{order._id.slice(-6).toUpperCase()}</td>
//                         {isAdmin && <td className="py-4 px-4 text-gray-600">{order.customer?.name || 'Walk-in Customer'}</td>}
//                         <td className="py-4 px-4 text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
//                         <td className="py-4 px-4 text-gray-800 font-semibold">${order.total.toFixed(2)}</td>
//                         <td className="py-4 px-4"><StatusBadge status={order.status} /></td>
//                         {/* "View Details" ka button ab sab ko nazar aayega */}
//                         <td className="py-4 px-4 text-center">
//                           <Link href={`/dashboard/sales/${order._id}`}>
//                             <div className="inline-flex items-center p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors" title="View Order Details">
//                                 <EyeIcon className="h-5 w-5" />
//                             </div>
//                           </Link>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       {/* Colspan role ke hisab se adjust hoga aur message bhi */}
//                       <td colSpan={isAdmin ? 6 : 5} className="py-8 text-center text-gray-500">
//                         {isAdmin ? 'No orders have been placed in the system yet.' : 'You have not placed any orders yet.'}
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination Controls */}
//             {pagination.total > pagination.limit && (
//               <div className="flex justify-between items-center mt-6">
//                 <p className="text-sm text-gray-600">
//                   Showing <span className="font-semibold">{(pagination.page - 1) * pagination.limit + 1}</span> to <span className="font-semibold">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of <span className="font-semibold">{pagination.total}</span> results
//                 </p>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={handlePreviousPage}
//                     disabled={pagination.page === 1}
//                     className="flex items-center px-3 py-2 text-sm bg-white border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                   >
//                     <ChevronLeftIcon className="h-4 w-4 mr-1" />
//                     Previous
//                   </button>
//                   <span className="text-sm text-gray-700">Page {pagination.page} of {pagination.totalPages}</span>
//                   <button
//                     onClick={handleNextPage}
//                     disabled={pagination.page === pagination.totalPages}
//                     className="flex items-center px-3 py-2 text-sm bg-white border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                   >
//                     Next
//                     <ChevronRightIcon className="h-4 w-4 ml-1" />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SalesPage;






//-----------------------------------------------












'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import {
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline';

const SalesPage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const isAdmin = session?.user?.role === 'admin';

  const fetchOrders = useCallback(async (page, limit) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/sales?page=${page}&limit=${limit}`, { cache: 'no-store' });
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch orders.');
      }
      
      setOrders(result.data);
      setPagination(result.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchOrders(pagination.page, pagination.limit);
    }
  }, [status, pagination.page, pagination.limit, fetchOrders]);

  const handlePreviousPage = () => {
    if (pagination.page > 1) {
      setPagination(prev => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: prev.page + 1 }));
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  const StatusBadge = ({ status }) => {
    const statusClasses = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      processing: 'bg-blue-100 text-blue-800',
    };
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          {isAdmin ? 'All Sales / Orders' : 'My Purchase History'}
        </h1>
        {isAdmin && (
          <Link href="/dashboard/pos">
            <div className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm text-sm sm:text-base">
              <PlusCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
              New Sale
            </div>
          </Link>
        )}
      </div>

      {/* Main Content Area */}
      <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-sm sm:shadow-md">
        {loading && <div className="text-center py-4">Loading orders...</div>}
        
        {error && (
          <div className="bg-red-50 p-3 sm:p-4 rounded-lg text-center">
            <ExclamationTriangleIcon className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 mx-auto mb-1 sm:mb-2" />
            <p className="text-red-700 font-semibold text-sm sm:text-base">Error loading data</p>
            <p className="text-red-600 text-xs sm:text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Mobile View - Cards */}
            <div className="sm:hidden space-y-3">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order._id} className="border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-800">Order #{order._id.slice(-6).toUpperCase()}</p>
                        {isAdmin && (
                          <p className="text-xs text-gray-600">{order.customer?.name || 'Walk-in Customer'}</p>
                        )}
                      </div>
                      <StatusBadge status={order.status} />
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</span>
                      <span className="font-semibold">${order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-end">
                      <Link href={`/dashboard/sales/${order._id}`}>
                        <div className="flex items-center text-blue-600 text-sm hover:text-blue-800 transition-colors">
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View Details
                        </div>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  {isAdmin ? 'No orders have been placed yet.' : 'You have no orders yet.'}
                </div>
              )}
            </div>

            {/* Desktop View - Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b bg-gray-50">
                  <tr className="text-sm text-gray-600">
                    <th className="py-2 px-3 sm:py-3 sm:px-4 font-semibold">Order ID</th>
                    {isAdmin && <th className="py-2 px-3 sm:py-3 sm:px-4 font-semibold">Customer</th>}
                    <th className="py-2 px-3 sm:py-3 sm:px-4 font-semibold">Date</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 font-semibold">Total</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 font-semibold">Status</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 font-semibold text-center">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr key={order._id} className="border-b last:border-none hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-3 sm:py-4 sm:px-4 font-medium text-gray-800">#{order._id.slice(-6).toUpperCase()}</td>
                        {isAdmin && <td className="py-3 px-3 sm:py-4 sm:px-4 text-gray-600">{order.customer?.name || 'Walk-in Customer'}</td>}
                        <td className="py-3 px-3 sm:py-4 sm:px-4 text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="py-3 px-3 sm:py-4 sm:px-4 text-gray-800 font-semibold">${order.total.toFixed(2)}</td>
                        <td className="py-3 px-3 sm:py-4 sm:px-4"><StatusBadge status={order.status} /></td>
                        <td className="py-3 px-3 sm:py-4 sm:px-4 text-center">
                          <Link href={`/dashboard/sales/${order._id}`}>
                            <div className="inline-flex items-center p-1 sm:p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors" title="View Order Details">
                              <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                            </div>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={isAdmin ? 6 : 5} className="py-6 text-center text-gray-500">
                        {isAdmin ? 'No orders have been placed in the system yet.' : 'You have not placed any orders yet.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {pagination.total > pagination.limit && (
              <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-6 gap-3">
                <p className="text-xs sm:text-sm text-gray-600">
                  Showing <span className="font-semibold">{(pagination.page - 1) * pagination.limit + 1}</span> to <span className="font-semibold">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of <span className="font-semibold">{pagination.total}</span> results
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePreviousPage}
                    disabled={pagination.page === 1}
                    className="flex items-center px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm bg-white border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    <ChevronLeftIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    Previous
                  </button>
                  <span className="text-xs sm:text-sm text-gray-700">Page {pagination.page} of {pagination.totalPages}</span>
                  <button
                    onClick={handleNextPage}
                    disabled={pagination.page === pagination.totalPages}
                    className="flex items-center px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm bg-white border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    Next
                    <ChevronRightIcon className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SalesPage;