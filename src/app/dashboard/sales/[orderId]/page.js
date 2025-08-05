

// // File Path: src/app/dashboard/sales/[orderId]/page.js
// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';

// // Icons
// import {
//   ArrowLeftIcon,
//   UserCircleIcon,
//   CreditCardIcon,
//   CheckCircleIcon,
//   ClockIcon,
//   XCircleIcon,
//   CubeIcon,
//   LockClosedIcon // Access Denied ke liye naya icon
// } from '@heroicons/react/24/outline';


// // =======================================================
// //   1. Access Denied Component
// //   Yeh component tab dikhega jab user Admin nahi hoga.
// // =======================================================
// const AccessDenied = () => {
//     const router = useRouter();
//     return (
//         <div className="flex flex-col items-center justify-center min-h-[70vh] text-center bg-gray-50 p-6">
//             <LockClosedIcon className="h-16 w-16 text-red-500 mb-4" />
//             <h1 className="text-3xl font-bold text-gray-800">Access Denied</h1>
//             <p className="text-lg text-gray-600 mt-2">You do not have permission to view these order details.</p>
//             <p className="text-sm text-gray-500 mt-1">This page can only be viewed by an Administrator.</p>
//             <button
//                 onClick={() => router.back()}
//                 className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow"
//             >
//                 Go Back to Orders List
//             </button>
//         </div>
//     );
// };


// // =======================================================
// //   2. Order Details Component
// //   Yeh component sirf Admin ko dikhega.
// // =======================================================
// const OrderDetails = ({ orderId }) => {
//   const router = useRouter();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (orderId) {
//       const fetchOrderDetails = async () => {
//         setLoading(true);
//         try {
//           const res = await fetch(`/api/sales/${orderId}`);
//           const result = await res.json();
//           if (!result.success) {
//             // Agar API se "Access Denied" jaisa error aaye, to usay handle karein
//             if (res.status === 403) {
//                 setError("You do not have permission to view this order.");
//             } else {
//                 throw new Error(result.error || 'Failed to fetch order details.');
//             }
//           } else {
//             setOrder(result.data);
//           }
//         } catch (err) {
//           setError(err.message);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchOrderDetails();
//     }
//   }, [orderId]);

//   if (loading) return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
//   if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;
//   if (!order) return <div className="text-center py-10">Order not found.</div>;
  
//   const getStatusInfo = (status) => {
//     switch (status) {
//       case 'completed': return { icon: CheckCircleIcon, color: 'text-green-500', text: 'Completed' };
//       case 'pending': return { icon: ClockIcon, color: 'text-yellow-500', text: 'Pending' };
//       case 'cancelled': return { icon: XCircleIcon, color: 'text-red-500', text: 'Cancelled' };
//       default: return { icon: ClockIcon, color: 'text-gray-500', text: status };
//     }
//   };
//   const statusInfo = getStatusInfo(order.status);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex items-center mb-6">
//         <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-200 mr-4 transition-colors">
//           <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
//         </button>
//         <div>
//             <h1 className="text-3xl font-bold text-gray-800">Order Details</h1>
//             <p className="text-sm text-gray-500">Order ID: #{order._id.slice(-8).toUpperCase()}</p>
//         </div>
//       </div>

//       {/* Main Grid Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 space-y-8">
//             <div className="bg-white p-6 rounded-xl shadow-md">
//                 <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center"><CubeIcon className="h-6 w-6 mr-2" /> Items in this Order</h2>
//                 <div className="overflow-x-auto">
//                     <table className="w-full">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="text-left text-sm font-medium text-gray-600 p-3">Product</th>
//                                 <th className="text-center text-sm font-medium text-gray-600 p-3">Quantity</th>
//                                 <th className="text-right text-sm font-medium text-gray-600 p-3">Price</th>
//                                 <th className="text-right text-sm font-medium text-gray-600 p-3">Subtotal</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {order.items.map(item => (
//                                 <tr key={item.product?._id || Math.random()} className="border-b last:border-b-0">
//                                     <td className="p-3 font-medium text-gray-800">{item.product?.name || 'Product Not Available'}</td>
//                                     <td className="p-3 text-center text-gray-600">x {item.quantity}</td>
//                                     <td className="p-3 text-right text-gray-600">${item.price.toFixed(2)}</td>
//                                     <td className="p-3 text-right font-semibold text-gray-800">${(item.quantity * item.price).toFixed(2)}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow-md">
//                 <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center"><CreditCardIcon className="h-6 w-6 mr-2" /> Transaction Details</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                     <div><span className="font-semibold text-gray-600">Payment Method:</span><span className="ml-2 text-gray-800">{order.paymentMethod}</span></div>
//                     <div><span className="font-semibold text-gray-600">Payment Status:</span><span className="ml-2 text-gray-800">{order.paymentStatus}</span></div>
//                     {order.transactionId && <div><span className="font-semibold text-gray-600">Transaction ID:</span><span className="ml-2 text-gray-800">{order.transactionId}</span></div>}
//                 </div>
//             </div>
//         </div>
//         <div className="space-y-8">
//             <div className="bg-white p-6 rounded-xl shadow-md">
//                 <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h2>
//                 <div className="space-y-2 text-sm">
//                     <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
//                     <div className="flex justify-between text-gray-600"><span>Taxes</span><span>${order.tax.toFixed(2)}</span></div>
//                     <div className="flex justify-between text-gray-600"><span>Discount</span><span className="text-red-500">-${order.discount.toFixed(2)}</span></div>
//                     <hr className="my-2"/>
//                     <div className="flex justify-between text-lg font-bold text-gray-800"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
//                 </div>
//                 <div className={`mt-4 flex items-center p-3 rounded-lg bg-${statusInfo.color.split('-')[1]}-50`}>
//                     <statusInfo.icon className={`h-6 w-6 mr-2 ${statusInfo.color}`} />
//                     <span className={`font-semibold ${statusInfo.color}`}>{statusInfo.text}</span>
//                 </div>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow-md">
//                 <h2 className="text-xl font-semibold text-gray-700 mb-4">Customer Information</h2>
//                 <div className="flex items-center space-x-3">
//                     <UserCircleIcon className="h-12 w-12 text-gray-400" />
//                     <div>
//                         <p className="font-semibold text-gray-800">{order.customer?.name || 'Walk-in Customer'}</p>
//                         <p className="text-sm text-gray-500">{order.customer?.email}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// // =======================================================
// //   3. Main Page Component (The Gatekeeper)
// //   Yeh component decide karega ke kya dikhana hai.
// // =======================================================
// const OrderDetailsPage = () => {
//     const { data: session, status } = useSession({
//         required: true,
//         onUnauthenticated() {
//             // Agar user login nahi hai to login page per bhej dein
//             redirect('/login');
//         }
//     });
    
//     const params = useParams();
//     const orderId = params.orderId;

//     // Jab tak session load ho raha hai, loading state dikhayein
//     if (status === 'loading') {
//         return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
//     }

//     // Role ke hisab se component render karein
//     if (session?.user?.role === 'admin') {
//         // Agar user ADMIN hai, to order ki details dikhayein
//         return <OrderDetails orderId={orderId} />;
//     } else {
//         // Agar user ADMIN nahi hai, to Access Denied message dikhayein
//         return <AccessDenied />;
//     }
// };

// export default OrderDetailsPage;













//-----------------------------------------------------





'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

// Icons
import {
  ArrowLeftIcon,
  UserCircleIcon,
  CreditCardIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  CubeIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';

const AccessDenied = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center bg-gray-50 p-4 md:p-6">
            <LockClosedIcon className="h-12 md:h-16 w-12 md:w-16 text-red-500 mb-3 md:mb-4" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Access Denied</h1>
            <p className="text-base md:text-lg text-gray-600 mt-1 md:mt-2">You do not have permission to view these order details.</p>
            <p className="text-xs md:text-sm text-gray-500 mt-1">This page can only be viewed by an Administrator.</p>
            <button
                onClick={() => router.back()}
                className="mt-4 md:mt-6 px-4 md:px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow text-sm md:text-base"
            >
                Go Back to Orders List
            </button>
        </div>
    );
};

const OrderDetails = ({ orderId }) => {
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (orderId) {
      const fetchOrderDetails = async () => {
        setLoading(true);
        try {
          const res = await fetch(`/api/sales/${orderId}`);
          const result = await res.json();
          if (!result.success) {
            if (res.status === 403) {
                setError("You do not have permission to view this order.");
            } else {
                throw new Error(result.error || 'Failed to fetch order details.');
            }
          } else {
            setOrder(result.data);
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchOrderDetails();
    }
  }, [orderId]);

  if (loading) return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
  if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;
  if (!order) return <div className="text-center py-10">Order not found.</div>;
  
  const getStatusInfo = (status) => {
    switch (status) {
      case 'completed': return { icon: CheckCircleIcon, color: 'text-green-500', text: 'Completed' };
      case 'pending': return { icon: ClockIcon, color: 'text-yellow-500', text: 'Pending' };
      case 'cancelled': return { icon: XCircleIcon, color: 'text-red-500', text: 'Cancelled' };
      default: return { icon: ClockIcon, color: 'text-gray-500', text: status };
    }
  };
  const statusInfo = getStatusInfo(order.status);

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-start md:items-center mb-4 md:mb-6 gap-3">
        <button 
          onClick={() => router.back()} 
          className="p-2 rounded-full hover:bg-gray-200 transition-colors flex-shrink-0"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="h-5 w-5 md:h-6 md:w-6 text-gray-700" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Order Details</h1>
          <p className="text-xs md:text-sm text-gray-500">Order ID: #{order._id.slice(-8).toUpperCase()}</p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* Left Column - Items and Transaction */}
        <div className="flex-1 space-y-4 md:space-y-6">
          {/* Items Table */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4 flex items-center">
              <CubeIcon className="h-5 w-5 md:h-6 md:w-6 mr-2" /> 
              Items in this Order
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left text-xs md:text-sm font-medium text-gray-600 p-2 md:p-3">Product</th>
                    <th className="text-center text-xs md:text-sm font-medium text-gray-600 p-2 md:p-3">Qty</th>
                    <th className="text-right text-xs md:text-sm font-medium text-gray-600 p-2 md:p-3">Price</th>
                    <th className="text-right text-xs md:text-sm font-medium text-gray-600 p-2 md:p-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map(item => (
                    <tr key={item.product?._id || Math.random()} className="border-b last:border-b-0">
                      <td className="p-2 md:p-3 font-medium text-gray-800 text-sm md:text-base">
                        {item.product?.name || 'Product Not Available'}
                      </td>
                      <td className="p-2 md:p-3 text-center text-gray-600 text-sm md:text-base">
                        x {item.quantity}
                      </td>
                      <td className="p-2 md:p-3 text-right text-gray-600 text-sm md:text-base">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="p-2 md:p-3 text-right font-semibold text-gray-800 text-sm md:text-base">
                        ${(item.quantity * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4 flex items-center">
              <CreditCardIcon className="h-5 w-5 md:h-6 md:w-6 mr-2" /> 
              Transaction Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
              <div><span className="font-semibold text-gray-600">Payment Method:</span> {order.paymentMethod}</div>
              <div><span className="font-semibold text-gray-600">Payment Status:</span> {order.paymentStatus}</div>
              {order.transactionId && (
                <div className="sm:col-span-2">
                  <span className="font-semibold text-gray-600">Transaction ID:</span> {order.transactionId}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Summary and Customer */}
        <div className="w-full lg:w-96 space-y-4 md:space-y-6">
          {/* Order Summary */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="text-red-500">-${order.discount.toFixed(2)}</span>
              </div>
              <hr className="my-2 border-gray-200"/>
              <div className="flex justify-between text-base md:text-lg font-bold text-gray-800">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
            <div className={`mt-3 md:mt-4 flex items-center p-2 md:p-3 rounded-md bg-${statusInfo.color.split('-')[1]}-50`}>
              <statusInfo.icon className={`h-5 w-5 md:h-6 md:w-6 mr-2 ${statusInfo.color}`} />
              <span className={`font-semibold text-sm md:text-base ${statusInfo.color}`}>
                {statusInfo.text}
              </span>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">Customer Information</h2>
            <div className="flex items-center gap-2 md:gap-3">
              <UserCircleIcon className="h-10 w-10 md:h-12 md:w-12 text-gray-400 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800 text-sm md:text-base">
                  {order.customer?.name || 'Walk-in Customer'}
                </p>
                {order.customer?.email && (
                  <p className="text-xs md:text-sm text-gray-500">
                    {order.customer.email}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderDetailsPage = () => {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/login');
        }
    });
    
    const params = useParams();
    const orderId = params.orderId;

    if (status === 'loading') {
        return <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>;
    }

    if (session?.user?.role === 'admin') {
        return <OrderDetails orderId={orderId} />;
    } else {
        return <AccessDenied />;
    }
};

export default OrderDetailsPage;