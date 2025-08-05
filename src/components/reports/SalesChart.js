


// // File Path: src/components/reports/SalesChart.js
// 'use client';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const SalesChart = ({ data }) => {
//   // Data ko format karein taake chart mein sahi se nazar aaye
//   const formattedData = data.map(item => ({
//     ...item,
//     // API se 'sales' ya 'amount' aa sakta hai, dono ko handle karein
//     sales: item.sales || item.amount || 0,
//     // Date ko behtar format (e.g., "Jun 25") mein badlein
//     date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
//   }));

//   return (
//     <div style={{ width: '100%', height: 300 }}>
//       <ResponsiveContainer>
//         <LineChart 
//           data={formattedData} 
//           margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//           <XAxis 
//             dataKey="date" 
//             stroke="#666" 
//             fontSize={12} 
//             tick={{ dy: 5 }}
//           />
          
//           {/* Y-axis ko hamesha 0 se shuru karne ke liye domain prop ka istemal karein */}
//           <YAxis 
//             domain={[0, 'dataMax + 10']} // dataMax se thora oopar tak, taake line touch na ho
//             stroke="#666" 
//             fontSize={12} 
//             tickFormatter={(value) => `$${value}`} // Y-axis per dollar sign lagayein
//             tickCount={6}
//           />

//           <Tooltip 
//             formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
//             labelStyle={{ color: '#333', fontWeight: 'bold' }}
//             itemStyle={{ color: '#10B981' }}
//             contentStyle={{ 
//               backgroundColor: 'rgba(255, 255, 255, 0.9)', 
//               border: '1px solid #ccc', 
//               borderRadius: '0.5rem',
//               boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
//             }}
//           />
//           <Legend wrapperStyle={{ fontSize: '14px', paddingTop: '15px' }}/>
//           <Line 
//             type="monotone" 
//             dataKey="sales"
//             name="Sales/Spending" // Legend mein behtar naam
//             stroke="#10B981" 
//             strokeWidth={3} 
//             activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }} 
//             dot={{ r: 4, fill: '#10B981' }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default SalesChart;









//---------------------------------------

'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalesChart = ({ data }) => {
  // Data formatting remains exactly the same
  const formattedData = data.map(item => ({
    ...item,
    sales: item.sales || item.amount || 0,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));

  return (
    <div className="w-full h-[250px] sm:h-[300px]">
      <ResponsiveContainer>
        <LineChart 
          data={formattedData} 
          margin={{ 
            top: 10, 
            right: window.innerWidth < 640 ? 5 : 20, 
            left: window.innerWidth < 640 ? 0 : 10, 
            bottom: 5 
          }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#e0e0e0"
            vertical={window.innerWidth >= 640} // Hide vertical grid on mobile
          />
          
          <XAxis 
            dataKey="date" 
            stroke="#666" 
            fontSize={window.innerWidth < 640 ? 10 : 12}
            tick={{ dy: 5 }}
            interval={window.innerWidth < 640 ? Math.ceil(data.length/5) : 0}
          />
          
          <YAxis 
            domain={[0, 'dataMax + 10']}
            stroke="#666" 
            fontSize={window.innerWidth < 640 ? 10 : 12}
            tickFormatter={(value) => `$${value}`}
            tickCount={window.innerWidth < 640 ? 4 : 6}
            width={window.innerWidth < 640 ? 30 : 40}
          />

          <Tooltip 
            formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
            labelStyle={{ 
              color: '#333', 
              fontWeight: 'bold',
              fontSize: window.innerWidth < 640 ? 12 : 14
            }}
            itemStyle={{ 
              color: '#10B981',
              fontSize: window.innerWidth < 640 ? 12 : 14
            }}
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              border: '1px solid #ccc', 
              borderRadius: '0.5rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}
          />
          
          <Legend 
            wrapperStyle={{ 
              fontSize: window.innerWidth < 640 ? 12 : 14,
              paddingTop: '10px'
            }}
          />
          
          <Line 
            type="monotone" 
            dataKey="sales"
            name="Sales/Spending"
            stroke="#10B981" 
            strokeWidth={window.innerWidth < 640 ? 2 : 3}
            activeDot={{ 
              r: window.innerWidth < 640 ? 6 : 8, 
              stroke: '#fff', 
              strokeWidth: 2 
            }} 
            dot={{ 
              r: window.innerWidth < 640 ? 3 : 4, 
              fill: '#10B981' 
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;