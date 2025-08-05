

// // File Path: src/app/dashboard/reports/page.js
// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useSession } from 'next-auth/react';
// import { 
//   DocumentChartBarIcon, 
//   CurrencyDollarIcon, 
//   SparklesIcon, 
//   ExclamationTriangleIcon, 
//   ShoppingCartIcon,
//   ArchiveBoxXMarkIcon, // Naya Icon: Cost of Goods ke liye
//   BanknotesIcon,       // Naya Icon: Gross Profit ke liye
// } from '@heroicons/react/24/outline';
// import SalesChart from '@/components/reports/SalesChart'; // Make sure this component exists

// // Stat Card Component (reusable)
// const StatCard = ({ title, value, icon: Icon, color }) => (
//   <div className="bg-white p-6 rounded-lg shadow-md flex items-start transform transition-transform hover:scale-105">
//     <div className={`p-3 rounded-full mr-4 ${color.bg}`}>
//       <Icon className={`h-6 w-6 ${color.text}`} />
//     </div>
//     <div>
//       <h3 className="text-sm font-medium text-gray-500">{title}</h3>
//       <p className="text-3xl font-semibold text-gray-900">{value}</p>
//     </div>
//   </div>
// );

// // Timeframe Buttons Component (reusable)
// const TimeframeSelector = ({ selected, onSelect }) => {
//   const timeframes = [
//     { key: '7d', label: '7 Days' },
//     { key: '1m', label: '1 Month' },
//     { key: '6m', label: '6 Months' },
//     { key: '1y', label: '1 Year' },
//   ];
//   return (
//     <div className="flex space-x-1 sm:space-x-2 bg-gray-200 p-1 rounded-lg">
//       {timeframes.map(tf => (
//         <button key={tf.key} onClick={() => onSelect(tf.key)}
//           className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors ${selected === tf.key ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:bg-gray-300'}`}>
//           {tf.label}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default function ReportsPage() {
//   const { data: session, status } = useSession({ required: true });
//   const [reportData, setReportData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [timeframe, setTimeframe] = useState('7d'); // Default timeframe is 7 days

//   const isAdmin = session?.user?.role === 'admin';

//   // Data fetch karne ke liye function
//   const fetchReports = useCallback(async (tf) => {
//     setLoading(true);
//     setError(null);
//     try {
//       // API endpoint wahi rahega, humne use hi upgrade kiya hai
//       const res = await fetch(`/api/reports/sales-summary?timeframe=${tf}`);
//       const result = await res.json();
//       if (!result.success) throw new Error(result.error || 'Failed to fetch report data.');
//       setReportData(result.data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Timeframe ya session change hone per data dobara fetch karein
//   useEffect(() => {
//     if (status === 'authenticated') {
//       fetchReports(timeframe);
//     }
//   }, [status, timeframe, fetchReports]);

//   if (status === 'loading') {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
//           <DocumentChartBarIcon className="h-8 w-8 mr-3" /> 
//           {isAdmin ? "Store Analytics" : "My Spending Report"}
//         </h1>
//         <TimeframeSelector selected={timeframe} onSelect={setTimeframe} />
//       </div>

//       {loading ? (
//         <div className="text-center py-10">Generating reports...</div>
//       ) : error ? (
//         <div className="p-4 bg-red-100 text-red-700 rounded-lg text-center">
//           <h2 className="font-bold">An Error Occurred</h2>
//           <p>{error}</p>
//         </div>
//       ) : reportData && (
//         <>
//           {/* Stat Cards - Grid layout ko behtar banaya gaya hai */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             {isAdmin ? (
//               <>
//                 <StatCard title="Total Sales" value={`$${reportData.totalSalesOrSpent.toFixed(2)}`} icon={CurrencyDollarIcon} color={{ bg: 'bg-green-100', text: 'text-green-600' }}/>
                
//                 {/* === NAYA CARD: COST OF GOODS === */}
//                 <StatCard title="Cost of Goods" value={`$${(reportData.totalCost || 0).toFixed(2)}`} icon={ArchiveBoxXMarkIcon} color={{ bg: 'bg-red-100', text: 'text-red-600' }}/>
                
//                 {/* === NAYA CARD: GROSS PROFIT === */}
//                 <StatCard title="Gross Profit" value={`$${(reportData.grossProfit || 0).toFixed(2)}`} icon={BanknotesIcon} color={{ bg: 'bg-blue-100', text: 'text-blue-600' }}/>
                
//                 <StatCard title="Total Orders" value={reportData.totalOrders} icon={ShoppingCartIcon} color={{ bg: 'bg-indigo-100', text: 'text-indigo-600' }}/>
//                 <StatCard title="Top Selling Product" value={reportData.topProduct} icon={SparklesIcon} color={{ bg: 'bg-purple-100', text: 'text-purple-600' }}/>
//                 <StatCard title="Low Stock Items" value={reportData.lowStockItems} icon={ExclamationTriangleIcon} color={{ bg: 'bg-yellow-100', text: 'text-yellow-600' }}/>
//               </>
//             ) : (
//               // Customer view waisa hi rahega
//               <>
//                 <StatCard title="Total Spent" value={`$${reportData.totalSalesOrSpent.toFixed(2)}`} icon={CurrencyDollarIcon} color={{ bg: 'bg-green-100', text: 'text-green-600' }}/>
//                 <StatCard title="Orders Placed" value={reportData.totalOrders} icon={ShoppingCartIcon} color={{ bg: 'bg-blue-100', text: 'text-blue-600' }}/>
//                 <StatCard title="Your Favorite Product" value={reportData.topProduct} icon={SparklesIcon} color={{ bg: 'bg-purple-100', text: 'text-purple-600' }}/>
//               </>
//             )}
//           </div>
      
//           {/* Chart Section (Ismein koi badlaav nahi) */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4 text-gray-700">
//               {isAdmin ? "Sales Trend" : "Spending Trend"}
//             </h2>
//             {reportData.chartData && reportData.chartData.length > 0 ? (
//               <SalesChart data={reportData.chartData} />
//             ) : (
//               <div className="h-64 flex items-center justify-center text-gray-400">
//                 No data available for this period.
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }












//----------------------------------------------





'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { 
  DocumentChartBarIcon, 
  CurrencyDollarIcon, 
  SparklesIcon, 
  ExclamationTriangleIcon, 
  ShoppingCartIcon,
  ArchiveBoxXMarkIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
import SalesChart from '@/components/reports/SalesChart';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-start">
    <div className={`p-2 sm:p-3 rounded-full mr-3 sm:mr-4 ${color.bg}`}>
      <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${color.text}`} />
    </div>
    <div>
      <h3 className="text-xs sm:text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

const TimeframeSelector = ({ selected, onSelect }) => {
  const timeframes = [
    { key: '7d', label: '7D', fullLabel: '7 Days' },
    { key: '1m', label: '1M', fullLabel: '1 Month' },
    { key: '6m', label: '6M', fullLabel: '6 Months' },
    { key: '1y', label: '1Y', fullLabel: '1 Year' },
  ];
  
  return (
    <div className="flex space-x-1 sm:space-x-2 bg-gray-200 p-1 rounded-lg">
      {timeframes.map(tf => (
        <button 
          key={tf.key} 
          onClick={() => onSelect(tf.key)}
          className={`px-2 sm:px-3 md:px-4 py-1 text-xs sm:text-sm font-medium rounded-md transition-colors ${
            selected === tf.key 
              ? 'bg-white text-blue-600 shadow-sm sm:shadow' 
              : 'text-gray-600 hover:bg-gray-300'
          }`}
          aria-label={tf.fullLabel}
        >
          <span className="sm:hidden">{tf.label}</span>
          <span className="hidden sm:inline">{tf.fullLabel}</span>
        </button>
      ))}
    </div>
  );
};

export default function ReportsPage() {
  const { data: session, status } = useSession({ required: true });
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('7d');

  const isAdmin = session?.user?.role === 'admin';

  const fetchReports = useCallback(async (tf) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/reports/sales-summary?timeframe=${tf}`);
      const result = await res.json();
      if (!result.success) throw new Error(result.error || 'Failed to fetch report data.');
      setReportData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchReports(timeframe);
    }
  }, [status, timeframe, fetchReports]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
          <DocumentChartBarIcon className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3" /> 
          {isAdmin ? "Store Analytics" : "My Spending Report"}
        </h1>
        <TimeframeSelector selected={timeframe} onSelect={setTimeframe} />
      </div>

      {/* Loading/Error State */}
      {loading ? (
        <div className="text-center py-8 sm:py-10">Generating reports...</div>
      ) : error ? (
        <div className="p-3 sm:p-4 bg-red-100 text-red-700 rounded-lg text-center">
          <h2 className="font-bold">An Error Occurred</h2>
          <p>{error}</p>
        </div>
      ) : reportData && (
        <>
          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
            {isAdmin ? (
              <>
                <StatCard 
                  title="Total Sales" 
                  value={`$${reportData.totalSalesOrSpent.toFixed(2)}`} 
                  icon={CurrencyDollarIcon} 
                  color={{ bg: 'bg-green-100', text: 'text-green-600' }}
                />
                <StatCard 
                  title="Cost of Goods" 
                  value={`$${(reportData.totalCost || 0).toFixed(2)}`} 
                  icon={ArchiveBoxXMarkIcon} 
                  color={{ bg: 'bg-red-100', text: 'text-red-600' }}
                />
                <StatCard 
                  title="Gross Profit" 
                  value={`$${(reportData.grossProfit || 0).toFixed(2)}`} 
                  icon={BanknotesIcon} 
                  color={{ bg: 'bg-blue-100', text: 'text-blue-600' }}
                />
                <StatCard 
                  title="Total Orders" 
                  value={reportData.totalOrders} 
                  icon={ShoppingCartIcon} 
                  color={{ bg: 'bg-indigo-100', text: 'text-indigo-600' }}
                />
                <StatCard 
                  title="Top Selling Product" 
                  value={reportData.topProduct} 
                  icon={SparklesIcon} 
                  color={{ bg: 'bg-purple-100', text: 'text-purple-600' }}
                />
                <StatCard 
                  title="Low Stock Items" 
                  value={reportData.lowStockItems} 
                  icon={ExclamationTriangleIcon} 
                  color={{ bg: 'bg-yellow-100', text: 'text-yellow-600' }}
                />
              </>
            ) : (
              <>
                <StatCard 
                  title="Total Spent" 
                  value={`$${reportData.totalSalesOrSpent.toFixed(2)}`} 
                  icon={CurrencyDollarIcon} 
                  color={{ bg: 'bg-green-100', text: 'text-green-600' }}
                />
                <StatCard 
                  title="Orders Placed" 
                  value={reportData.totalOrders} 
                  icon={ShoppingCartIcon} 
                  color={{ bg: 'bg-blue-100', text: 'text-blue-600' }}
                />
                <StatCard 
                  title="Favorite Product" 
                  value={reportData.topProduct} 
                  icon={SparklesIcon} 
                  color={{ bg: 'bg-purple-100', text: 'text-purple-600' }}
                />
              </>
            )}
          </div>
      
          {/* Chart Section */}
          <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-sm sm:shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-700">
              {isAdmin ? "Sales Trend" : "Spending Trend"}
            </h2>
            {reportData.chartData && reportData.chartData.length > 0 ? (
              <div className="h-64 sm:h-80 md:h-96">
                <SalesChart data={reportData.chartData} />
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-400">
                No data available for this period.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}