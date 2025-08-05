// // File Path: src/app/dashboard/payments/page.js
// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useSession } from 'next-auth/react';
// import Link from 'next/link'; // Link component import karein
// import { 
//   BanknotesIcon, 
//   CreditCardIcon, 
//   CurrencyDollarIcon, 
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   EyeIcon // Details ke liye icon
// } from '@heroicons/react/24/outline';

// // Payment Method Badge Component
// const PaymentMethodBadge = ({ method }) => {
//     const isCash = method?.toLowerCase() === 'cash';
//     const Icon = isCash ? CurrencyDollarIcon : CreditCardIcon;
//     const colorClasses = isCash ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
//     return (<span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${colorClasses}`}><Icon className="h-4 w-4 mr-1.5" />{method.charAt(0).toUpperCase() + method.slice(1)}</span>);
// };

// const PaymentsPage = () => {
//   const { data: session, status } = useSession({ required: true });
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pagination, setPagination] = useState({ page: 1, limit: 15, total: 0, totalPages: 1 });

//   const isAdmin = session?.user?.role === 'admin';

//   const fetchPayments = useCallback(async (page) => {
//     try {
//       setLoading(true);
//       const res = await fetch(`/api/payments?page=${page}&limit=${pagination.limit}`);
//       const result = await res.json();
//       if (!result.success) throw new Error(result.error);
//       setPayments(result.data);
//       setPagination(result.pagination);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [pagination.limit]);

//   useEffect(() => {
//     if (status === 'authenticated') {
//       fetchPayments(pagination.page);
//     }
//   }, [status, pagination.page, fetchPayments]);
  
//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= pagination.totalPages) {
//         setPagination(prev => ({ ...prev, page: newPage }));
//     }
//   };

//   if (status === 'loading' || loading) return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
//   if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800 flex items-center">
//           <BanknotesIcon className="h-8 w-8 mr-3" /> 
//           {isAdmin ? "All Payments" : "My Transaction History"}
//         </h1>
//       </div>
//       <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto">
//         <table className="w-full">
//           <thead className="border-b bg-gray-50">
//             <tr>
//               <th className="text-left p-3 font-semibold text-gray-600">Transaction ID</th>
//               <th className="text-left p-3 font-semibold text-gray-600">Date</th>
//               {/* Customer column sirf Admin ko dikhayega */}
//               {isAdmin && <th className="text-left p-3 font-semibold text-gray-600">Customer</th>}
//               <th className="text-left p-3 font-semibold text-gray-600">Method</th>
//               <th className="text-right p-3 font-semibold text-gray-600">Amount</th>
//               {/* Actions column sirf Admin ko dikhayega */}
//               {isAdmin && <th className="text-center p-3 font-semibold text-gray-600">Details</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {payments.length > 0 ? payments.map(payment => (
//               <tr key={payment._id} className="border-b hover:bg-gray-50 last:border-b-0">
//                 <td className="p-3 font-medium text-gray-800">ORD-{payment._id.slice(-6).toUpperCase()}</td>
//                 <td className="p-3 text-gray-600">{new Date(payment.createdAt).toLocaleString()}</td>
//                 {isAdmin && <td className="p-3 text-gray-600">{payment.customer?.name || 'Walk-in'}</td>}
//                 <td className="p-3"><PaymentMethodBadge method={payment.paymentMethod} /></td>
//                 <td className="p-3 text-right font-bold text-gray-800">${payment.total.toFixed(2)}</td>
//                 {/* View Details button sirf Admin ko dikhayega */}
//                 {isAdmin && (
//                   <td className="p-3 text-center">
//                     <Link href={`/dashboard/sales/${payment._id}`}>
//                       <div className="inline-flex items-center p-2 text-blue-600 hover:bg-blue-100 rounded-full" title="View Order Details">
//                         <EyeIcon className="h-5 w-5" />
//                       </div>
//                     </Link>
//                   </td>
//                 )}
//               </tr>
//             )) : (
//               <tr><td colSpan={isAdmin ? 6 : 4} className="text-center py-8 text-gray-500">No payments found.</td></tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       {pagination.totalPages > 1 && (
//         <div className="flex justify-between items-center mt-6">
//           <p className="text-sm text-gray-600">Page <span className="font-semibold">{pagination.page}</span> of <span className="font-semibold">{pagination.totalPages}</span></p>
//           <div className="flex items-center space-x-2">
//               <button onClick={() => handlePageChange(pagination.page - 1)} disabled={pagination.page === 1} className="flex items-center px-3 py-2 text-sm bg-white border rounded-md disabled:opacity-50"><ChevronLeftIcon className="h-4 w-4 mr-1" /> Previous</button>
//               <button onClick={() => handlePageChange(pagination.page + 1)} disabled={pagination.page === pagination.totalPages} className="flex items-center px-3 py-2 text-sm bg-white border rounded-md disabled:opacity-50">Next <ChevronRightIcon className="h-4 w-4 ml-1" /></button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentsPage;








//--------------------------------



'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { 
  BanknotesIcon, 
  CreditCardIcon, 
  CurrencyDollarIcon, 
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const PaymentMethodBadge = ({ method }) => {
  const isCash = method?.toLowerCase() === 'cash';
  const Icon = isCash ? CurrencyDollarIcon : CreditCardIcon;
  const colorClasses = isCash ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${colorClasses}`}>
      <Icon className="h-3 w-3 mr-1 md:h-4 md:w-4 md:mr-1.5" />
      <span className="hidden sm:inline">{method.charAt(0).toUpperCase() + method.slice(1)}</span>
      <span className="sm:hidden">{method.charAt(0).toUpperCase()}</span>
    </span>
  );
};

const PaymentsPage = () => {
  const { data: session, status } = useSession({ required: true });
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ 
    page: 1, 
    limit: 15, 
    total: 0, 
    totalPages: 1 
  });

  const isAdmin = session?.user?.role === 'admin';

  const fetchPayments = useCallback(async (page) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/payments?page=${page}&limit=${pagination.limit}`);
      const result = await res.json();
      if (!result.success) throw new Error(result.error);
      setPayments(result.data);
      setPagination(result.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [pagination.limit]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchPayments(pagination.page);
    }
  }, [status, pagination.page, fetchPayments]);
  
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 p-4 md:p-6 rounded-lg max-w-md text-center">
          <ExclamationTriangleIcon className="h-8 w-8 md:h-10 md:w-10 text-red-500 mx-auto mb-3" />
          <h2 className="text-lg md:text-xl font-semibold text-red-800 mb-2">Error Loading Payments</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => fetchPayments(pagination.page)}
            className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
          <BanknotesIcon className="h-6 w-6 md:h-8 md:w-8 mr-2 md:mr-3" /> 
          {isAdmin ? "All Payments" : "My Transactions"}
        </h1>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white p-4 md:p-6 rounded-xl shadow-md overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="text-left p-3 font-semibold text-gray-600">Transaction ID</th>
              <th className="text-left p-3 font-semibold text-gray-600">Date</th>
              {isAdmin && <th className="text-left p-3 font-semibold text-gray-600">Customer</th>}
              <th className="text-left p-3 font-semibold text-gray-600">Method</th>
              <th className="text-right p-3 font-semibold text-gray-600">Amount</th>
              {isAdmin && <th className="text-center p-3 font-semibold text-gray-600">Details</th>}
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? payments.map(payment => (
              <tr key={payment._id} className="border-b hover:bg-gray-50 last:border-b-0">
                <td className="p-3 font-medium text-gray-800">ORD-{payment._id.slice(-6).toUpperCase()}</td>
                <td className="p-3 text-gray-600">{new Date(payment.createdAt).toLocaleString()}</td>
                {isAdmin && <td className="p-3 text-gray-600">{payment.customer?.name || 'Walk-in'}</td>}
                <td className="p-3"><PaymentMethodBadge method={payment.paymentMethod} /></td>
                <td className="p-3 text-right font-bold text-gray-800">${payment.total.toFixed(2)}</td>
                {isAdmin && (
                  <td className="p-3 text-center">
                    <Link href={`/dashboard/sales/${payment._id}`}>
                      <div className="inline-flex items-center p-2 text-blue-600 hover:bg-blue-100 rounded-full" title="View Order Details">
                        <EyeIcon className="h-5 w-5" />
                      </div>
                    </Link>
                  </td>
                )}
              </tr>
            )) : (
              <tr>
                <td colSpan={isAdmin ? 6 : 4} className="text-center py-8 text-gray-500">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {payments.length > 0 ? payments.map(payment => (
          <div key={payment._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-800">ORD-{payment._id.slice(-6).toUpperCase()}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </p>
              </div>
              <PaymentMethodBadge method={payment.paymentMethod} />
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex justify-between items-center">
                {isAdmin && (
                  <p className="text-sm text-gray-600">
                    {payment.customer?.name || 'Walk-in'}
                  </p>
                )}
                <p className="font-semibold text-gray-800">
                  ${payment.total.toFixed(2)}
                </p>
              </div>
              {isAdmin && (
                <div className="mt-3 flex justify-end">
                  <Link href={`/dashboard/sales/${payment._id}`}>
                    <div className="flex items-center text-sm text-blue-600">
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View Details
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )) : (
          <div className="bg-white p-6 rounded-lg shadow-sm text-center text-gray-500">
            No payments found
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 md:mt-6 gap-3">
          <p className="text-sm text-gray-600">
            Page <span className="font-semibold">{pagination.page}</span> of <span className="font-semibold">{pagination.totalPages}</span>
          </p>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => handlePageChange(pagination.page - 1)} 
              disabled={pagination.page === 1} 
              className="flex items-center px-3 py-2 text-sm bg-white border rounded-md disabled:opacity-50 hover:bg-gray-50"
            >
              <ChevronLeftIcon className="h-4 w-4 mr-1" /> 
              Previous
            </button>
            <button 
              onClick={() => handlePageChange(pagination.page + 1)} 
              disabled={pagination.page === pagination.totalPages} 
              className="flex items-center px-3 py-2 text-sm bg-white border rounded-md disabled:opacity-50 hover:bg-gray-50"
            >
              Next <ChevronRightIcon className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;