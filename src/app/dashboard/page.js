


// // Dashboard.js (Final Updated Code)

// 'use client';
// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import { redirect } from 'next/navigation';
// import Link from 'next/link';

// import {
//   CurrencyDollarIcon,
//   ShoppingCartIcon,
//   ArchiveBoxIcon,
//   UserGroupIcon,
//   ArrowRightIcon,
//   PlusCircleIcon,
//   DocumentChartBarIcon,
//   ExclamationTriangleIcon
// } from '@heroicons/react/24/outline';

// const StatCard = ({ title, value, icon: Icon, colorClass }) => (
//   <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 transition-transform hover:scale-105">
//     <div className={`p-4 rounded-full ${colorClass}`}>
//       <Icon className="h-7 w-7 text-white" />
//     </div>
//     <div>
//       <p className="text-sm font-medium text-gray-500">{title}</p>
//       <p className="text-2xl font-bold text-gray-800">{value}</p>
//     </div>
//   </div>
// );

// async function fetchData(url) {
//   const response = await fetch(url, { cache: 'no-store' });
//   if (!response.ok) {
//     throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
//   }
//   return response.json();
// }

// export default function Dashboard() {
//   const { data: session, status } = useSession({
//     required: true,
//     onUnauthenticated() {
//       redirect('/login');
//     }
//   });

//   const [stats, setStats] = useState([]);
//   const [recentSales, setRecentSales] = useState([]);
//   const [lowStockItems, setLowStockItems] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const isAdmin = session?.user?.role === 'admin';
//   const loadData = async () => {
//     try {
//       setError(null);
//       setLoading(true);

//       const [statsResponse, salesData, lowStockData] = await Promise.all([
//         fetchData('/api/dashboard/stats'),
//         fetchData('/api/sales/recent'),
//         fetchData('/api/inventory/low-stock')
//       ]);

//       // YAHAN PAR BADLAV KIYA GAYA HAI
//       // Ab hum statsResponse.data se values lenge
//       const statsData = statsResponse.data; 

//       setStats([
//         { 
//           title: "Today's Revenue", 
//           // statsData.revenue ki jagah statsData.data.revenue
//           value: `$${(statsData.revenue || 0).toFixed(2)}`, 
//           icon: CurrencyDollarIcon, 
//           colorClass: "bg-green-500" 
//         },
//         { 
//           title: "Today's Sales", 
//           value: statsData.sales || 0, 
//           icon: ShoppingCartIcon, 
//           colorClass: "bg-blue-500" 
//         },
//         { 
//           title: "Total Products", 
//           value: statsData.products || 0, 
//           icon: ArchiveBoxIcon, 
//           colorClass: "bg-amber-500" 
//         },
//         { 
//           title: "Total Customers", 
//           value: statsData.customers || 0, 
//           icon: UserGroupIcon, 
//           colorClass: "bg-indigo-500" 
//         }
//       ]);

//       setRecentSales(salesData || []);
//       setLowStockItems(lowStockData?.length || 0);
//     } catch (err) {
//       console.error('Dashboard error:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     if (status === 'authenticated') {
//       loadData();
//       const interval = setInterval(loadData, 60000); // 1 minute interval
//       return () => clearInterval(interval);
//     }
//   }, [status]);

//   if (status === 'loading' || loading) {
//     return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
//   }

//   if (error) {
//     return <div className="flex items-center justify-center h-screen"><div className="bg-red-50 p-6 rounded-lg max-w-md text-center"><ExclamationTriangleIcon className="h-10 w-10 text-red-500 mx-auto mb-4" /><h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Dashboard</h2><p className="text-red-600 mb-4">{error}</p><button onClick={loadData} className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200">Retry</button></div></div>;
//   }

//   return (
//     <div className="p-6 space-y-8">
//       {/* Welcome Header */}
//       <div>
//         <h1 className="text-3xl font-bold text-gray-800">Welcome to Dashboard</h1>
//         <div className="mt-2 flex items-center"><p className="text-lg text-gray-600">Hello, <span className="font-semibold">{session.user.name}</span>!</p><p className="ml-4 text-lg text-gray-600">Role: <span className="font-semibold capitalize">{session.user.role}</span></p></div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat) => <StatCard key={stat.title} {...stat} />)}
//       </div>

//       {/* Main Content Area */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Recent Sales Table */}
//         <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
//           <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-semibold text-gray-700">Recent Sales</h2>{lowStockItems > 0 && <div className="flex items-center text-red-600"><ExclamationTriangleIcon className="h-5 w-5 mr-1" /><span>{lowStockItems} low stock items</span></div>}</div>
//           <div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="border-b text-sm text-gray-500"><th className="py-3 px-2">Order ID</th><th className="py-3 px-2">Customer</th><th className="py-3 px-2">Amount</th><th className="py-3 px-2">Status</th></tr></thead><tbody>{recentSales.length > 0 ? recentSales.map((sale) => <tr key={sale.id} className="border-b last:border-none hover:bg-gray-50"><td className="py-4 px-2 font-medium text-gray-800">ORD-{sale.id?.slice(-5) || 'N/A'}</td><td className="py-4 px-2 text-gray-600">{sale.customer || 'Walk-in'}</td><td className="py-4 px-2 text-gray-800 font-semibold">{sale.amount || '$0.00'}</td><td className="py-4 px-2"><span className={`px-3 py-1 text-xs font-semibold rounded-full ${sale.status === 'completed' ? 'bg-green-100 text-green-800' : sale.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{sale.status || 'unknown'}</span></td></tr>) : <tr><td colSpan="4" className="py-4 text-center text-gray-500">No recent sales found</td></tr>}</tbody></table></div>
//         </div>

//         {/* Quick Actions */}
//         <div className="space-y-4">
//           <h2 className="text-xl font-semibold text-gray-700 mb-2">Quick Actions</h2>
//           <Link href="/dashboard/pos" className="flex items-center justify-between w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-lg"><div className="flex items-center"><PlusCircleIcon className="h-6 w-6 mr-3" /> <span className="font-bold">New Sale</span></div><ArrowRightIcon className="h-5 w-5" /></Link>
          
//           {/* == YAHAN BADLAV KIYA GAYA HAI == */}
//           {isAdmin && (
//             <Link href="/dashboard/products" className="flex items-center justify-between w-full p-4 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all shadow-lg"><div className="flex items-center"><ArchiveBoxIcon className="h-6 w-6 mr-3" /><span className="font-bold">Manage Products</span></div><ArrowRightIcon className="h-5 w-5" /></Link>
//           )}

//           <Link href="/dashboard/reports" className="flex items-center justify-between w-full p-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all"><div className="flex items-center"><DocumentChartBarIcon className="h-6 w-6 mr-3" /><span className="font-bold">View All Reports</span></div><ArrowRightIcon className="h-5 w-5" /></Link>
          
//           {/* Inventory Alerts (yeh abhi bhi dummy hai jab tak aap /api/inventory/low-stock nahi banate) */}
//         </div>
//       </div>
//     </div>
//   );
// }









//-------------------------------------------------------------








'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  ArchiveBoxIcon,
  UserGroupIcon,
  ArrowRightIcon,
  PlusCircleIcon,
  DocumentChartBarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white p-4 md:p-6 rounded-xl shadow-md flex items-center space-x-3 md:space-x-4 transition-transform hover:scale-[1.02]">
    <div className={`p-3 md:p-4 rounded-full ${colorClass}`}>
      <Icon className="h-5 w-5 md:h-7 md:w-7 text-white" />
    </div>
    <div>
      <p className="text-xs md:text-sm font-medium text-gray-500">{title}</p>
      <p className="text-lg md:text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

async function fetchData(url) {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  return response.json();
}

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    }
  });

  const [stats, setStats] = useState([]);
  const [recentSales, setRecentSales] = useState([]);
  const [lowStockItems, setLowStockItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAdmin = session?.user?.role === 'admin';
  const loadData = async () => {
    try {
      setError(null);
      setLoading(true);

      const [statsResponse, salesData, lowStockData] = await Promise.all([
        fetchData('/api/dashboard/stats'),
        fetchData('/api/sales/recent'),
        fetchData('/api/inventory/low-stock')
      ]);

      const statsData = statsResponse.data; 

      setStats([
        { 
          title: "Today's Revenue", 
          value: `$${(statsData.revenue || 0).toFixed(2)}`, 
          icon: CurrencyDollarIcon, 
          colorClass: "bg-green-500" 
        },
        { 
          title: "Today's Sales", 
          value: statsData.sales || 0, 
          icon: ShoppingCartIcon, 
          colorClass: "bg-blue-500" 
        },
        { 
          title: "Total Products", 
          value: statsData.products || 0, 
          icon: ArchiveBoxIcon, 
          colorClass: "bg-amber-500" 
        },
        { 
          title: "Total Customers", 
          value: statsData.customers || 0, 
          icon: UserGroupIcon, 
          colorClass: "bg-indigo-500" 
        }
      ]);

      setRecentSales(salesData || []);
      setLowStockItems(lowStockData?.length || 0);
    } catch (err) {
      console.error('Dashboard error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      loadData();
      const interval = setInterval(loadData, 60000);
      return () => clearInterval(interval);
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
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 p-4 md:p-6 rounded-lg max-w-md text-center">
          <ExclamationTriangleIcon className="h-8 w-8 md:h-10 md:w-10 text-red-500 mx-auto mb-3 md:mb-4" />
          <h2 className="text-lg md:text-xl font-semibold text-red-800 mb-2">Error Loading Dashboard</h2>
          <p className="text-sm md:text-base text-red-600 mb-3 md:mb-4">{error}</p>
          <button 
            onClick={loadData} 
            className="px-3 py-1 md:px-4 md:py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm md:text-base"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Welcome to Dashboard</h1>
        <div className="mt-1 md:mt-2 flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
          <p className="text-base md:text-lg text-gray-600">
            Hello, <span className="font-semibold">{session.user.name}</span>!
          </p>
          <p className="text-base md:text-lg text-gray-600">
            Role: <span className="font-semibold capitalize">{session.user.role}</span>
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Recent Sales Table */}
        <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-xl shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2 md:gap-0">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700">Recent Sales</h2>
            {lowStockItems > 0 && (
              <div className="flex items-center text-sm md:text-base text-red-600">
                <ExclamationTriangleIcon className="h-4 w-4 md:h-5 md:w-5 mr-1" />
                <span>{lowStockItems} low stock items</span>
              </div>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px] md:min-w-0">
              <thead>
                <tr className="border-b text-xs md:text-sm text-gray-500">
                  <th className="py-2 md:py-3 px-2">Order ID</th>
                  <th className="py-2 md:py-3 px-2">Customer</th>
                  <th className="py-2 md:py-3 px-2">Amount</th>
                  <th className="py-2 md:py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.length > 0 ? (
                  recentSales.map((sale) => (
                    <tr key={sale.id} className="border-b last:border-none hover:bg-gray-50">
                      <td className="py-3 md:py-4 px-2 font-medium text-gray-800 text-xs md:text-sm">
                        ORD-{sale.id?.slice(-5) || 'N/A'}
                      </td>
                      <td className="py-3 md:py-4 px-2 text-gray-600 text-xs md:text-sm">
                        {sale.customer || 'Walk-in'}
                      </td>
                      <td className="py-3 md:py-4 px-2 text-gray-800 font-semibold text-xs md:text-sm">
                        {sale.amount || '$0.00'}
                      </td>
                      <td className="py-3 md:py-4 px-2">
                        <span className={`px-2 py-0.5 md:px-3 md:py-1 text-xs font-semibold rounded-full ${
                          sale.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          sale.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {sale.status || 'unknown'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-gray-500 text-sm md:text-base">
                      No recent sales found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3 md:space-y-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-1 md:mb-2">Quick Actions</h2>
          
          <Link 
            href="/dashboard/pos" 
            className="flex items-center justify-between w-full p-3 md:p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-lg"
          >
            <div className="flex items-center">
              <PlusCircleIcon className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3" /> 
              <span className="font-bold text-sm md:text-base">New Sale</span>
            </div>
            <ArrowRightIcon className="h-4 w-4 md:h-5 md:w-5" />
          </Link>
          
          {isAdmin && (
            <Link 
              href="/dashboard/products" 
              className="flex items-center justify-between w-full p-3 md:p-4 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all shadow-lg"
            >
              <div className="flex items-center">
                <ArchiveBoxIcon className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3" />
                <span className="font-bold text-sm md:text-base">Manage Products</span>
              </div>
              <ArrowRightIcon className="h-4 w-4 md:h-5 md:w-5" />
            </Link>
          )}

          <Link 
            href="/dashboard/reports" 
            className="flex items-center justify-between w-full p-3 md:p-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all"
          >
            <div className="flex items-center">
              <DocumentChartBarIcon className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3" />
              <span className="font-bold text-sm md:text-base">View All Reports</span>
            </div>
            <ArrowRightIcon className="h-4 w-4 md:h-5 md:w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}