

// // src/components/Receipt/index.js
// import React from "react"

// // forwardRef ka istemaal zaroori hai taaki hum is component ko parent se target kar sakein
// const Receipt = React.forwardRef(({ order, shopName }, ref) => {
//   // Yeh check zaroori hai, taaki agar order data na ho to error na aaye
//   if (!order || !order.items) {
//     // Aap yahan ek loading state ya 'No data' message bhi dikha sakte hain
//     return (
//       <div ref={ref} className="p-6">
//         Generating receipt...
//       </div>
//     )
//   }

//   return (
//     <div ref={ref} className="p-6 bg-white text-black font-mono text-sm">
//       {/* Header */}
//       <div className="text-center mb-6">
//         <h1 className="text-xl font-bold uppercase">{shopName || "POS System"}</h1>
//         <p>Order Receipt</p>
//         <p className="text-xs">{new Date(order.createdAt).toLocaleString()}</p>
//       </div>

//       {/* Order Details */}
//       <div className="mb-4">
//         <p>
//           <span className="font-semibold">Order ID:</span> {order._id ? order._id.slice(-8).toUpperCase() : "N/A"}
//         </p>
//         {/* Cashier ka naam check karein, agar mojood hai to hi dikhayein */}
//         {order.cashier && (
//           <p>
//             <span className="font-semibold">Cashier:</span> {order.cashier.name}
//           </p>
//         )}
//       </div>

//       {/* Items Table */}
//       <table className="w-full mb-4">
//         <thead>
//           <tr className="border-b-2 border-dashed border-gray-400">
//             <th className="text-left pb-1">Item</th>
//             <th className="text-center pb-1">Qty</th>
//             <th className="text-right pb-1">Price</th>
//             <th className="text-right pb-1">Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {order.items.map((item, index) => (
//             <tr key={index} className="border-b border-dashed border-gray-300">
//               <td className="py-1">{item.name}</td>
//               <td className="text-center py-1">{item.quantity}</td>
//               <td className="text-right py-1">${item.price.toFixed(2)}</td>
//               <td className="text-right py-1">${(item.quantity * item.price).toFixed(2)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Totals Section */}
//       <div className="space-y-1 w-1/2 ml-auto mb-4">
//         <div className="flex justify-between">
//           <span>Subtotal:</span>
//           <span>${(order.subtotal || 0).toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between">
//           <span>Tax:</span>
//           <span>${(order.tax || 0).toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between font-bold text-base border-t border-black pt-1">
//           <span>Total:</span>
//           <span>${(order.total || 0).toFixed(2)}</span>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="text-center pt-4 border-t-2 border-dashed border-gray-400">
//         <p>Thank you for your purchase!</p>
//         <p className="text-xs">www.yourposwebsite.com</p>
//       </div>
//     </div>
//   )
// })

// // displayName set karna debugging ke liye achhi practice hai
// Receipt.displayName = "Receipt"

// export default Receipt













//-------------------------------------------




import React from "react"

const Receipt = React.forwardRef(({ order, shopName }, ref) => {
  if (!order || !order.items) {
    return (
      <div ref={ref} className="p-4 sm:p-6">
        Generating receipt...
      </div>
    )
  }

  return (
    <div ref={ref} className="p-4 sm:p-6 bg-white text-black font-mono text-xs sm:text-sm max-w-full">
      {/* Header - Compact on mobile */}
      <div className="text-center mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-xl font-bold uppercase leading-tight">
          {shopName || "POS System"}
        </h1>
        <p className="text-xs sm:text-sm mt-1">Order Receipt</p>
        <p className="text-[0.65rem] sm:text-xs mt-1">
          {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Order Details - Stacked on mobile */}
      <div className="mb-3 space-y-1 text-xs sm:text-sm">
        <p className="break-all">
          <span className="font-semibold">Order ID:</span> {order._id ? order._id.slice(-8).toUpperCase() : "N/A"}
        </p>
        {order.cashier && (
          <p>
            <span className="font-semibold">Cashier:</span> {order.cashier.name}
          </p>
        )}
      </div>

      {/* Items Table - Scrollable on mobile */}
      <div className="mb-3 overflow-x-auto">
        <table className="w-full min-w-[300px]">
          <thead>
            <tr className="border-b border-dashed border-gray-400">
              <th className="text-left pb-1 pr-2 w-[45%]">Item</th>
              <th className="text-center pb-1 px-1 w-[15%]">Qty</th>
              <th className="text-right pb-1 px-1 w-[20%]">Price</th>
              <th className="text-right pb-1 pl-2 w-[20%]">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index} className="border-b border-dashed border-gray-300">
                <td className="py-1 pr-2 truncate">{item.name}</td>
                <td className="text-center py-1 px-1">{item.quantity}</td>
                <td className="text-right py-1 px-1">${item.price.toFixed(2)}</td>
                <td className="text-right py-1 pl-2">${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals Section - Full width on mobile */}
      <div className="space-y-1 w-full sm:w-1/2 sm:ml-auto mb-4 text-xs sm:text-sm">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${(order.subtotal || 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax:</span>
          <span>${(order.tax || 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-sm sm:text-base border-t border-black pt-1 mt-1">
          <span>Total:</span>
          <span>${(order.total || 0).toFixed(2)}</span>
        </div>
      </div>

      {/* Footer - Compact on mobile */}
      <div className="text-center pt-3 border-t border-dashed border-gray-400 text-xs sm:text-sm">
        <p>Thank you for your purchase!</p>
        <p className="text-[0.65rem] sm:text-xs mt-1">www.yourposwebsite.com</p>
      </div>
    </div>
  )
})

Receipt.displayName = "Receipt"

export default Receipt