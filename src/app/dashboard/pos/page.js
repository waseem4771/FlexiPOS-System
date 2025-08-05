


// // File Path: src/app/dashboard/pos/page.js

// 'use client';

// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import { useSession } from 'next-auth/react';
// import { redirect } from 'next/navigation';
// import { FiTrash2, FiPlus, FiMinus, FiSearch, FiShoppingCart } from 'react-icons/fi';

// const TAX_RATE = 0.05; // 5% tax rate

// export default function PosPage() {
//   const { data: session, status } = useSession({
//     required: true,
//     onUnauthenticated() {
//       redirect('/login');
//     },
//   });

//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);

//   // isAdmin variable ko define karein taake UI ko adjust kar sakein
//   const isAdmin = session?.user?.role === 'admin';

//   // Products fetch karne ke liye function
//   const fetchProducts = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const res = await fetch('/api/products');
//       const result = await res.json();
      
//       if (!result.success) {
//         throw new Error(result.error || 'Failed to fetch products');
//       }
//       setProducts(result.data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     // Ab yeh check karega ke user login hai ya nahi, role check hata diya hai
//     if (status === 'authenticated') {
//       fetchProducts();
//     }
//   }, [status, fetchProducts]);

//   // Products ko search term ke hisab se filter karein
//   const filteredProducts = useMemo(() => {
//     if (!searchTerm) return products;
//     return products.filter(p => 
//       p.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [products, searchTerm]);

//   // Cart mein product add karein (stock check ke sath)
//   const addToCart = (product) => {
//     const itemInCart = cart.find(item => item._id === product._id);
//     const availableStock = product.stock - (itemInCart?.quantity || 0);
    
//     if (availableStock <= 0) {
//       alert(`Sorry, no more stock available for ${product.name}`);
//       return;
//     }
    
//     if (itemInCart) {
//       setCart(prev => prev.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item));
//     } else {
//       setCart(prev => [...prev, { ...product, quantity: 1 }]);
//     }
//   };

//   // Cart mein quantity update karein
//   const updateQuantity = (productId, newQuantity) => {
//     const product = products.find(p => p._id === productId);
//     if (newQuantity > product.stock) {
//       alert(`Only ${product.stock} units of ${product.name} are available.`);
//       return;
//     }

//     if (newQuantity <= 0) {
//       setCart(prev => prev.filter(item => item._id !== productId));
//     } else {
//       setCart(prev => prev.map(item => item._id === productId ? { ...item, quantity: newQuantity } : item));
//     }
//   };

//   // Cart ka subtotal, tax, aur total calculate karein (Discount field hata di gayi hai Customer ke liye)
//   const { subtotal, taxAmount, total } = useMemo(() => {
//     const sub = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     const tax = sub * TAX_RATE;
//     const finalTotal = sub + tax;
//     return { 
//       subtotal: sub, 
//       taxAmount: tax, 
//       total: finalTotal > 0 ? finalTotal : 0 
//     };
//   }, [cart]);

//   // Payment process karein
//   const handleProcessPayment = async (paymentMethod) => {
//     setIsProcessing(true);
//     try {
//       const orderData = {
//         items: cart.map(item => ({ product: item._id, quantity: item.quantity, price: item.price })),
//         subtotal,
//         tax: taxAmount,
//         discount: 0, // Customer ke liye discount 0 rakhein
//         total,
//         paymentMethod: paymentMethod.toLowerCase(),
//       };

//       const res = await fetch('/api/orders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(orderData),
//       });

//       const result = await res.json();
//       if (!result.success) {
//         throw new Error(result.error || 'Payment failed. Please try again.');
//       }
      
//       alert('Order placed successfully! You can view it in your "My Orders" page.');
//       setCart([]);
//       setIsPaymentModalOpen(false);
//       fetchProducts();
//     } catch (err) {
//       alert(`Error: ${err.message}`);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   if (status === 'loading' || isLoading) return <div className="p-6 text-center">Loading Store...</div>;
//   if (error) return <p className="p-6 text-red-500 text-center">Error: {error}</p>;

//   return (
//     <div className="flex h-screen bg-gray-100 font-sans">
//       {/* Products Section */}
//       <div className="w-[60%] p-4">
//         <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
//           <div className="p-4 border-b flex justify-between items-center">
//             <h2 className="text-2xl font-bold text-gray-800">
//               {isAdmin ? "POS Terminal" : "Start Shopping"}
//             </h2>
//             <div className="relative w-1/2">
//               <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
//               <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg"/>
//             </div>
//           </div>
//           <div className="flex-grow p-4 overflow-y-auto">
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//               {filteredProducts.map((product) => (
//                 <div key={product._id} onClick={() => addToCart(product)} className="border rounded-lg p-3 text-center cursor-pointer hover:shadow-lg hover:border-blue-500 transition-all group">
//                   <p className="font-semibold truncate">{product.name}</p>
//                   <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
//                   <p className="text-xs font-bold text-green-600 mt-1">
//                     {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left!`}
//                   </p>
//                   <span className="block mt-2 text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">Add to Cart</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Cart/Bill Section */}
//       <div className="w-[40%] p-4">
//         <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
//           <div className="p-4 border-b flex items-center">
//             <FiShoppingCart className="mr-3 h-6 w-6 text-gray-700"/>
//             <h2 className="text-xl font-bold">Your Cart</h2>
//           </div>
//           <div className="flex-grow p-4 overflow-y-auto">
//             {cart.length === 0 ? <p className="text-gray-500 text-center mt-10">Your cart is empty.</p> : 
//             <div className="space-y-3">
//               {cart.map(item => (
//                 <div key={item._id} className="flex items-center text-sm">
//                   <div className="flex-grow">
//                     <p className="font-semibold">{item.name}</p>
//                     <p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="p-1.5 rounded-full bg-gray-200 hover:bg-gray-300"><FiMinus size={12} /></button>
//                     <span className="font-bold w-6 text-center">{item.quantity}</span>
//                     <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="p-1.5 rounded-full bg-gray-200 hover:bg-gray-300"><FiPlus size={12} /></button>
//                   </div>
//                   <div className="ml-4 font-bold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</div>
//                   <button onClick={() => updateQuantity(item._id, 0)} className="ml-2 text-red-500 hover:text-red-700"><FiTrash2 /></button>
//                 </div>
//               ))}
//             </div>}
//           </div>
//           {cart.length > 0 && (
//             <div className="p-4 border-t bg-gray-50 rounded-b-lg space-y-3">
//               <div className="flex justify-between text-sm"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
//               <div className="flex justify-between text-sm"><span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span><span>${taxAmount.toFixed(2)}</span></div>
//               {/* Discount field sirf Admin ko dikhayega */}
//               {isAdmin && (
//                 <div className="flex justify-between items-center text-sm">
//                   <span>Discount ($)</span>
//                   <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} className="w-24 text-right font-bold border rounded-md px-2 py-1"/>
//                 </div>
//               )}
//               <hr />
//               <div className="flex justify-between font-bold text-2xl"><span>Total</span><span>${total.toFixed(2)}</span></div>
//               <button onClick={() => setIsPaymentModalOpen(true)} disabled={isProcessing} className="w-full bg-green-600 text-white py-3 rounded-lg mt-2 font-bold text-lg hover:bg-green-700 transition-colors">
//                 {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Payment Modal */}
//       {isPaymentModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
//             <h2 className="text-2xl font-bold mb-4">Confirm Payment</h2>
//             <div className="text-lg mb-6">Total Amount: <span className="font-bold text-3xl text-green-600">${total.toFixed(2)}</span></div>
//             <div className="space-y-3">
//               <button onClick={() => handleProcessPayment('Cash')} disabled={isProcessing} className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400">{isProcessing ? 'Processing...' : 'Pay with Cash'}</button>
//               <button onClick={() => handleProcessPayment('Card')} disabled={isProcessing} className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400">{isProcessing ? 'Processing...' : 'Pay with Card'}</button>
//             </div>
//             <button onClick={() => setIsPaymentModalOpen(false)} className="w-full mt-4 text-sm text-gray-600 hover:text-gray-800">Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


















// // File Path: src/app/dashboard/pos/page.js

// 'use client';

// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import { useSession } from 'next-auth/react';
// import { redirect } from 'next/navigation';
// import { FiTrash2, FiPlus, FiMinus, FiSearch, FiShoppingCart } from 'react-icons/fi';

// const TAX_RATE = 0.05; // 5% tax rate

// export default function PosPage() {
//   const { data: session, status } = useSession({
//     required: true,
//     onUnauthenticated() {
//       redirect('/login');
//     },
//   });

//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [discount, setDiscount] = useState(0);

//   const isAdmin = session?.user?.role === 'admin';

//   const fetchProducts = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const res = await fetch('/api/products');
//       const result = await res.json();
//       if (!result.success) throw new Error(result.error || 'Failed to fetch products');
//       setProducts(result.data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (status === 'authenticated') {
//       fetchProducts();
//     }
//   }, [status, fetchProducts]);

//   const filteredProducts = useMemo(() => {
//     if (!searchTerm) return products;
//     return products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
//   }, [products, searchTerm]);

//   // ===== YAHAN AHEM TABDEELI KI GAYI HAI =====
//   const addToCart = (product) => {
//     // Agar user Admin hai, to usay alert dikhayein aur function rok dein.
//     if (isAdmin) {
//       alert("Admin Actions Restricted:\n\nAs an administrator, you can view the shopping page, but you cannot add items to the cart. This feature is for customers only.");
//       return;
//     }
    
//     // Baqi logic customer ke liye waisa hi rahega
//     const itemInCart = cart.find(item => item._id === product._id);
//     const availableStock = product.stock - (itemInCart?.quantity || 0);
//     if (availableStock <= 0) {
//       alert(`Sorry, no more stock available for ${product.name}`);
//       return;
//     }
//     if (itemInCart) {
//       setCart(prev => prev.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item));
//     } else {
//       setCart(prev => [...prev, { ...product, quantity: 1 }]);
//     }
//   };

//   const updateQuantity = (productId, newQuantity) => {
//     const product = products.find(p => p._id === productId);
//     if (newQuantity > product.stock) {
//       alert(`Only ${product.stock} units of ${product.name} are available.`);
//       return;
//     }
//     if (newQuantity <= 0) {
//       setCart(prev => prev.filter(item => item._id !== productId));
//     } else {
//       setCart(prev => prev.map(item => item._id === productId ? { ...item, quantity: newQuantity } : item));
//     }
//   };

//   const { subtotal, taxAmount, total } = useMemo(() => {
//     const sub = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     const tax = sub * TAX_RATE;
//     // Discount sirf Admin ke liye hai, lekin UI se hata diya gaya hai, to yahan 0 rakhein
//     const finalTotal = sub + tax;
//     return { 
//       subtotal: sub, 
//       taxAmount: tax, 
//       total: finalTotal > 0 ? finalTotal : 0 
//     };
//   }, [cart]);

//   const handleProcessPayment = async (paymentMethod) => {
//     setIsProcessing(true);
//     try {
//       const orderData = {
//         items: cart.map(item => ({ product: item._id, quantity: item.quantity, price: item.price })),
//         subtotal,
//         tax: taxAmount,
//         discount: 0, // Customer ke liye discount hamesha 0
//         total,
//         paymentMethod: paymentMethod.toLowerCase(),
//       };
//       const res = await fetch('/api/orders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(orderData),
//       });
//       const result = await res.json();
//       if (!result.success) throw new Error(result.error || 'Payment failed.');
//       alert('Order placed successfully!');
//       setCart([]);
//       setIsPaymentModalOpen(false);
//       fetchProducts();
//     } catch (err) {
//       alert(`Error: ${err.message}`);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   if (status === 'loading') return <div className="p-6 text-center">Loading...</div>;
//   if (isLoading) return <div className="p-6 text-center">Loading Products...</div>;
//   if (error) return <p className="p-6 text-red-500 text-center">Error: {error}</p>;

//   return (
//     <div className="flex h-screen bg-gray-100 font-sans">
//       {/* Products Section */}
//       <div className="w-[60%] p-4">
//         <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
//           <div className="p-4 border-b flex justify-between items-center">
//             <h2 className="text-2xl font-bold text-gray-800">
//               {isAdmin ? "Products (Admin View)" : "Start Shopping"}
//             </h2>
//             <div className="relative w-1/2">
//               <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
//               <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg"/>
//             </div>
//           </div>
//           <div className="flex-grow p-4 overflow-y-auto">
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//               {filteredProducts.map((product) => (
//                 <div key={product._id} onClick={() => addToCart(product)} className="border rounded-lg p-3 text-center cursor-pointer hover:shadow-lg hover:border-blue-500 transition-all group">
//                   <p className="font-semibold truncate">{product.name}</p>
//                   <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
//                   <p className="text-xs font-bold text-green-600 mt-1">{product.stock > 10 ? 'In Stock' : `Only ${product.stock} left!`}</p>
//                   <span className="block mt-2 text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
//                     {isAdmin ? "View Only" : "Add to Cart"}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Cart Section */}
//       <div className="w-[40%] p-4">
//         <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
//           <div className="p-4 border-b flex items-center">
//             <FiShoppingCart className="mr-3 h-6 w-6 text-gray-700"/>
//             <h2 className="text-xl font-bold">{isAdmin ? "Cart (Disabled for Admin)" : "Your Cart"}</h2>
//           </div>
//           <div className="flex-grow p-4 overflow-y-auto">
//             {cart.length === 0 ? <p className="text-gray-500 text-center mt-10">Your cart is empty.</p> : <div className="space-y-3">{cart.map(item => (<div key={item._id} className="flex items-center text-sm"><div className="flex-grow"><p className="font-semibold">{item.name}</p><p className="text-xs text-gray-500">${item.price.toFixed(2)}</p></div><div className="flex items-center gap-2"><button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="p-1.5 rounded-full bg-gray-200 hover:bg-gray-300"><FiMinus size={12} /></button><span className="font-bold w-6 text-center">{item.quantity}</span><button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="p-1.5 rounded-full bg-gray-200 hover:bg-gray-300"><FiPlus size={12} /></button></div><div className="ml-4 font-bold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</div><button onClick={() => updateQuantity(item._id, 0)} className="ml-2 text-red-500 hover:text-red-700"><FiTrash2 /></button></div>))}</div>}
//           </div>
//           {cart.length > 0 && (<div className="p-4 border-t bg-gray-50 rounded-b-lg space-y-3"><div className="flex justify-between text-sm"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div><div className="flex justify-between text-sm"><span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span><span>${taxAmount.toFixed(2)}</span></div><hr /><div className="flex justify-between font-bold text-2xl"><span>Total</span><span>${total.toFixed(2)}</span></div><button onClick={() => setIsPaymentModalOpen(true)} disabled={isProcessing} className="w-full bg-green-600 text-white py-3 rounded-lg mt-2 font-bold text-lg hover:bg-green-700 transition-colors">{isProcessing ? 'Processing...' : 'Proceed to Checkout'}</button></div>)}
//         </div>
//       </div>
//       {/* Payment Modal */}
//       {isPaymentModalOpen && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="bg-white rounded-lg p-6 w-96 shadow-xl"><h2 className="text-2xl font-bold mb-4">Confirm Payment</h2><div className="text-lg mb-6">Total Amount: <span className="font-bold text-3xl text-green-600">${total.toFixed(2)}</span></div><div className="space-y-3"><button onClick={() => handleProcessPayment('Cash')} disabled={isProcessing} className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400">{isProcessing ? 'Processing...' : 'Pay with Cash'}</button><button onClick={() => handleProcessPayment('Card')} disabled={isProcessing} className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400">{isProcessing ? 'Processing...' : 'Pay with Card'}</button></div><button onClick={() => setIsPaymentModalOpen(false)} className="w-full mt-4 text-sm text-gray-600 hover:text-gray-800">Cancel</button></div></div>)}
//     </div>
//   );
// }









// // File Path: src/app/dashboard/pos/page.js
// "use client"

// // Step 1: Zaroori cheezein import karein
// import { useState, useEffect, useMemo, useCallback, useRef } from "react"
// import { useReactToPrint } from "react-to-print"
// import { useSession } from "next-auth/react"
// import { redirect } from "next/navigation"
// import { FiTrash2, FiPlus, FiMinus, FiSearch, FiShoppingCart } from "react-icons/fi"

// // Step 1.1: Apna Receipt component import karein
// import Receipt from "@/components/Receipt"
// const TAX_RATE = 0.05 // 5% tax rate

// export default function PosPage() {
//   const { data: session, status } = useSession({
//     required: true,
//     onUnauthenticated() {
//       redirect("/login")
//     },
//   })

//   // ===== Existing States =====
//   const [products, setProducts] = useState([])
//   const [cart, setCart] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
//   const [isProcessing, setIsProcessing] = useState(false)

//   // Step 2: Receipt ke liye naye state aur ref banayein
//   const [lastOrder, setLastOrder] = useState(null) // Yeh successful order ka data store karega
//   const receiptRef = useRef(null) // ⚠️ IMPORTANT: null se initialize karein

//   const isAdmin = session?.user?.role === "admin"

//   // Step 3: useReactToPrint hook ko setup karein - FIXED VERSION
//   const handlePrint = useReactToPrint({
//     contentRef: receiptRef, // ✅ contentRef use karein, content nahi
//     documentTitle: `order-receipt-${lastOrder?._id || Date.now()}`,
//     onAfterPrint: () => {
//       console.log("Receipt printed successfully!")
//       setLastOrder(null) // Print ke baad lastOrder ko clear kar dein
//     },
//     onPrintError: (error) => {
//       console.error("Print error:", error)
//       alert("Print failed. Please try again.")
//     },
//   })

//   // Step 4: useEffect jo print trigger karega - IMPROVED VERSION
//   useEffect(() => {
//     // Check karein ki lastOrder mein data hai aur receiptRef ready hai
//     if (lastOrder && receiptRef.current) {
//       // setTimeout ka istemal karein taaki React ko DOM update karne ka time mil jaaye
//       const timer = setTimeout(() => {
//         try {
//           handlePrint()
//         } catch (error) {
//           console.error("Print trigger error:", error)
//           alert("Failed to print receipt. Please try again.")
//         }
//       }, 500) // 500ms delay for better reliability

//       // Cleanup function
//       return () => clearTimeout(timer)
//     }
//   }, [lastOrder, handlePrint]) // Dependencies

//   const fetchProducts = useCallback(async () => {
//     setIsLoading(true)
//     try {
//       const res = await fetch("/api/products")
//       const result = await res.json()
//       if (!result.success) throw new Error(result.error || "Failed to fetch products")
//       setProducts(result.data)
//     } catch (err) {
//       setError(err.message)
//     } finally {
//       setIsLoading(false)
//     }
//   }, [])

//   useEffect(() => {
//     if (status === "authenticated") {
//       fetchProducts()
//     }
//   }, [status, fetchProducts])

//   const filteredProducts = useMemo(() => {
//     if (!searchTerm) return products
//     return products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
//   }, [products, searchTerm])

//   const addToCart = (product) => {
//     if (isAdmin) {
//       alert("Admin Actions Restricted: You cannot add items to the cart.")
//       return
//     }
//     const itemInCart = cart.find((item) => item._id === product._id)
//     const availableStock = product.stock - (itemInCart?.quantity || 0)
//     if (availableStock <= 0) {
//       alert(`Sorry, no more stock available for ${product.name}`)
//       return
//     }
//     if (itemInCart) {
//       setCart((prev) =>
//         prev.map((item) => (item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item)),
//       )
//     } else {
//       setCart((prev) => [...prev, { ...product, quantity: 1 }])
//     }
//   }

//   const updateQuantity = (productId, newQuantity) => {
//     const product = products.find((p) => p._id === productId)
//     if (newQuantity > product.stock) {
//       alert(`Only ${product.stock} units of ${product.name} are available.`)
//       return
//     }
//     if (newQuantity <= 0) {
//       setCart((prev) => prev.filter((item) => item._id !== productId))
//     } else {
//       setCart((prev) => prev.map((item) => (item._id === productId ? { ...item, quantity: newQuantity } : item)))
//     }
//   }

//   const { subtotal, taxAmount, total } = useMemo(() => {
//     const sub = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
//     const tax = sub * TAX_RATE
//     const finalTotal = sub + tax
//     return { subtotal: sub, taxAmount: tax, total: finalTotal > 0 ? finalTotal : 0 }
//   }, [cart])

//   // Step 5: handleProcessPayment function ko modify karein
//   const handleProcessPayment = async (paymentMethod) => {
//     setIsProcessing(true)
//     try {
//       const orderDataForAPI = {
//         items: cart.map((item) => ({
//           product: item._id,
//           quantity: item.quantity,
//           price: item.price,
//         })),
//         subtotal,
//         tax: taxAmount,
//         discount: 0,
//         total,
//         paymentMethod: paymentMethod.toLowerCase(),
//       }

//       const res = await fetch("/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderDataForAPI),
//       })

//       const result = await res.json()
//       if (!result.success) throw new Error(result.error || "Payment failed.")

//       alert("Order placed successfully! Preparing receipt...")

//       // API se lautne wale data ko 'lastOrder' state mein save karein
//       // Taki usmein ID aur createdAt bhi ho
//       setLastOrder(result.data)

//       setCart([])
//       setIsPaymentModalOpen(false)
//       fetchProducts()
//     } catch (err) {
//       alert(`Error: ${err.message}`)
//     } finally {
//       setIsProcessing(false)
//     }
//   }

//   if (status === "loading") return <div className="p-6 text-center">Loading...</div>
//   if (isLoading) return <div className="p-6 text-center">Loading Products...</div>
//   if (error) return <p className="p-6 text-red-500 text-center">Error: {error}</p>

//   return (
//     <>
//       <div className="flex h-screen bg-gray-100 font-sans">
//         {/* Products Section */}
//         <div className="w-[60%] p-4">
//           <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
//             <div className="p-4 border-b flex justify-between items-center">
//               <h2 className="text-2xl font-bold text-gray-800">
//                 {isAdmin ? "Products (Admin View)" : "Start Shopping"}
//               </h2>
//               <div className="relative w-1/2">
//                 <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border rounded-lg"
//                 />
//               </div>
//             </div>
//             <div className="flex-grow p-4 overflow-y-auto">
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                 {filteredProducts.map((product) => (
//                   <div
//                     key={product._id}
//                     onClick={() => addToCart(product)}
//                     className="border rounded-lg p-3 text-center cursor-pointer hover:shadow-lg hover:border-blue-500 transition-all group"
//                   >
//                     <p className="font-semibold truncate">{product.name}</p>
//                     <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
//                     <p className="text-xs font-bold text-green-600 mt-1">
//                       {product.stock > 10 ? "In Stock" : `Only ${product.stock} left!`}
//                     </p>
//                     <span className="block mt-2 text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
//                       {isAdmin ? "View Only" : "Add to Cart"}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Cart Section */}
//         <div className="w-[40%] p-4">
//           <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
//             <div className="p-4 border-b flex items-center">
//               <FiShoppingCart className="mr-3 h-6 w-6 text-gray-700" />
//               <h2 className="text-xl font-bold">{isAdmin ? "Cart (Disabled for Admin)" : "Your Cart"}</h2>
//             </div>
//             <div className="flex-grow p-4 overflow-y-auto">
//               {cart.length === 0 ? (
//                 <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
//               ) : (
//                 <div className="space-y-3">
//                   {cart.map((item) => (
//                     <div key={item._id} className="flex items-center text-sm">
//                       <div className="flex-grow">
//                         <p className="font-semibold">{item.name}</p>
//                         <p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                           className="p-1.5 rounded-full bg-gray-200 hover:bg-gray-300"
//                         >
//                           <FiMinus size={12} />
//                         </button>
//                         <span className="font-bold w-6 text-center">{item.quantity}</span>
//                         <button
//                           onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                           className="p-1.5 rounded-full bg-gray-200 hover:bg-gray-300"
//                         >
//                           <FiPlus size={12} />
//                         </button>
//                       </div>
//                       <div className="ml-4 font-bold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</div>
//                       <button
//                         onClick={() => updateQuantity(item._id, 0)}
//                         className="ml-2 text-red-500 hover:text-red-700"
//                       >
//                         <FiTrash2 />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             {cart.length > 0 && (
//               <div className="p-4 border-t bg-gray-50 rounded-b-lg space-y-3">
//                 <div className="flex justify-between text-sm">
//                   <span>Subtotal</span>
//                   <span>${subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
//                   <span>${taxAmount.toFixed(2)}</span>
//                 </div>
//                 <hr />
//                 <div className="flex justify-between font-bold text-2xl">
//                   <span>Total</span>
//                   <span>${total.toFixed(2)}</span>
//                 </div>
//                 <button
//                   onClick={() => setIsPaymentModalOpen(true)}
//                   disabled={isProcessing}
//                   className="w-full bg-green-600 text-white py-3 rounded-lg mt-2 font-bold text-lg hover:bg-green-700 transition-colors"
//                 >
//                   {isProcessing ? "Processing..." : "Proceed to Checkout"}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Payment Modal */}
//         {isPaymentModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
//               <h2 className="text-2xl font-bold mb-4">Confirm Payment</h2>
//               <div className="text-lg mb-6">
//                 Total Amount: <span className="font-bold text-3xl text-green-600">${total.toFixed(2)}</span>
//               </div>
//               <div className="space-y-3">
//                 <button
//                   onClick={() => handleProcessPayment("Cash")}
//                   disabled={isProcessing}
//                   className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
//                 >
//                   {isProcessing ? "Processing..." : "Pay with Cash"}
//                 </button>
//                 <button
//                   onClick={() => handleProcessPayment("Card")}
//                   disabled={isProcessing}
//                   className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400"
//                 >
//                   {isProcessing ? "Processing..." : "Pay with Card"}
//                 </button>
//               </div>
//               <button
//                 onClick={() => setIsPaymentModalOpen(false)}
//                 className="w-full mt-4 text-sm text-gray-600 hover:text-gray-800"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Step 6: Hidden Receipt component ko render karein, yahi print hoga */}
//       {/* ⚠️ IMPORTANT: Conditional rendering add ki hai */}
//       {lastOrder && (
//         <div style={{ display: "none" }}>
//           <Receipt ref={receiptRef} order={lastOrder} shopName="My POS Shop" />
//         </div>
//       )}
//     </>
//   )
// }













//----------------------------




"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { FiTrash2, FiPlus, FiMinus, FiSearch, FiShoppingCart } from "react-icons/fi"
import Receipt from "@/components/Receipt"
const TAX_RATE = 0.05 // 5% tax rate

export default function PosPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login")
    },
  })

  // Existing States
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [lastOrder, setLastOrder] = useState(null)
  const receiptRef = useRef(null)

  const isAdmin = session?.user?.role === "admin"

  // Print functionality (unchanged)
  const handlePrint = useReactToPrint({
    contentRef: receiptRef,
    documentTitle: `order-receipt-${lastOrder?._id || Date.now()}`,
    onAfterPrint: () => {
      console.log("Receipt printed successfully!")
      setLastOrder(null)
    },
    onPrintError: (error) => {
      console.error("Print error:", error)
      alert("Print failed. Please try again.")
    },
  })

  useEffect(() => {
    if (lastOrder && receiptRef.current) {
      const timer = setTimeout(() => {
        try {
          handlePrint()
        } catch (error) {
          console.error("Print trigger error:", error)
          alert("Failed to print receipt. Please try again.")
        }
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [lastOrder, handlePrint])

  // Data fetching and business logic (unchanged)
  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/products")
      const result = await res.json()
      if (!result.success) throw new Error(result.error || "Failed to fetch products")
      setProducts(result.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (status === "authenticated") {
      fetchProducts()
    }
  }, [status, fetchProducts])

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products
    return products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [products, searchTerm])

  const addToCart = (product) => {
    if (isAdmin) {
      alert("Admin Actions Restricted: You cannot add items to the cart.")
      return
    }
    const itemInCart = cart.find((item) => item._id === product._id)
    const availableStock = product.stock - (itemInCart?.quantity || 0)
    if (availableStock <= 0) {
      alert(`Sorry, no more stock available for ${product.name}`)
      return
    }
    if (itemInCart) {
      setCart((prev) =>
        prev.map((item) => (item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item)),
      )
    } else {
      setCart((prev) => [...prev, { ...product, quantity: 1 }])
    }
  }

  const updateQuantity = (productId, newQuantity) => {
    const product = products.find((p) => p._id === productId)
    if (newQuantity > product.stock) {
      alert(`Only ${product.stock} units of ${product.name} are available.`)
      return
    }
    if (newQuantity <= 0) {
      setCart((prev) => prev.filter((item) => item._id !== productId))
    } else {
      setCart((prev) => prev.map((item) => (item._id === productId ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const { subtotal, taxAmount, total } = useMemo(() => {
    const sub = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = sub * TAX_RATE
    const finalTotal = sub + tax
    return { subtotal: sub, taxAmount: tax, total: finalTotal > 0 ? finalTotal : 0 }
  }, [cart])

  const handleProcessPayment = async (paymentMethod) => {
    setIsProcessing(true)
    try {
      const orderDataForAPI = {
        items: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal,
        tax: taxAmount,
        discount: 0,
        total,
        paymentMethod: paymentMethod.toLowerCase(),
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDataForAPI),
      })

      const result = await res.json()
      if (!result.success) throw new Error(result.error || "Payment failed.")

      alert("Order placed successfully! Preparing receipt...")
      setLastOrder(result.data)
      setCart([])
      setIsPaymentModalOpen(false)
      fetchProducts()
    } catch (err) {
      alert(`Error: ${err.message}`)
    } finally {
      setIsProcessing(false)
    }
  }

  if (status === "loading") return <div className="p-6 text-center">Loading...</div>
  if (isLoading) return <div className="p-6 text-center">Loading Products...</div>
  if (error) return <p className="p-6 text-red-500 text-center">Error: {error}</p>

  return (
    <>
      {/* Mobile Responsive Layout */}
      <div className="flex flex-col md:flex-row h-screen bg-gray-100 font-sans">
        {/* Products Section - Stacked on mobile, side-by-side on desktop */}
        <div className="w-full md:w-[60%] p-2 md:p-4">
          <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
            {/* Header with search - Column on mobile, row on desktop */}
            <div className="p-3 border-b flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                {isAdmin ? "Products (Admin View)" : "Start Shopping"}
              </h2>
              <div className="relative w-full md:w-1/2">
                <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-1 md:py-2 border rounded-lg text-sm md:text-base"
                />
              </div>
            </div>

            {/* Product Grid - 2 cols on mobile, more on larger screens */}
            <div className="flex-grow p-2 md:p-4 overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => addToCart(product)}
                    className="border rounded-lg p-2 md:p-3 text-center cursor-pointer hover:shadow-lg hover:border-blue-500 transition-all active:bg-gray-50"
                  >
                    <p className="font-semibold truncate text-sm md:text-base">{product.name}</p>
                    <p className="text-xs md:text-sm text-gray-600">${product.price.toFixed(2)}</p>
                    <p className="text-xs font-bold text-green-600 mt-1">
                      {product.stock > 10 ? "In Stock" : `Only ${product.stock} left!`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cart Section - Full width on mobile, 40% on desktop */}
        <div className="w-full md:w-[40%] p-2 md:p-4">
          <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
            {/* Cart Header */}
            <div className="p-3 md:p-4 border-b flex items-center">
              <FiShoppingCart className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6 text-gray-700" />
              <h2 className="text-lg md:text-xl font-bold">{isAdmin ? "Cart (Disabled)" : "Your Cart"}</h2>
            </div>

            {/* Cart Items - Scrollable area */}
            <div className="flex-grow p-2 md:p-4 overflow-y-auto">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
              ) : (
                <div className="space-y-2 md:space-y-3">
                  {cart.map((item) => (
                    <div key={item._id} className="flex items-center text-xs md:text-sm gap-1 md:gap-2">
                      <div className="flex-grow truncate max-w-[120px] md:max-w-none">
                        <p className="font-semibold truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-1 md:gap-2">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="p-1 md:p-1.5 rounded-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400"
                        >
                          <FiMinus size={10} />
                        </button>
                        <span className="font-bold w-4 md:w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="p-1 md:p-1.5 rounded-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400"
                        >
                          <FiPlus size={10} />
                        </button>
                      </div>
                      <div className="ml-2 md:ml-4 font-bold w-12 md:w-20 text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <button
                        onClick={() => updateQuantity(item._id, 0)}
                        className="ml-1 md:ml-2 text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Checkout Section - Shows only when cart has items */}
            {cart.length > 0 && (
              <div className="p-3 md:p-4 border-t bg-gray-50 rounded-b-lg space-y-2 md:space-y-3">
                <div className="flex justify-between text-xs md:text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm">
                  <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg md:text-2xl">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => setIsPaymentModalOpen(true)}
                  disabled={isProcessing}
                  className="w-full bg-green-600 text-white py-2 md:py-3 rounded-lg mt-1 md:mt-2 font-bold text-base md:text-lg hover:bg-green-700 active:bg-green-800 transition-colors"
                >
                  {isProcessing ? "Processing..." : "Checkout"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Payment Modal - Responsive for all screens */}
        {isPaymentModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-0">
            <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-[90vw] md:w-96 shadow-xl">
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Confirm Payment</h2>
              <div className="text-base md:text-lg mb-4 md:mb-6">
                Total: <span className="font-bold text-2xl md:text-3xl text-green-600">${total.toFixed(2)}</span>
              </div>
              <div className="space-y-2 md:space-y-3">
                <button
                  onClick={() => handleProcessPayment("Cash")}
                  disabled={isProcessing}
                  className="w-full py-2 md:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-400 transition-colors"
                >
                  {isProcessing ? "Processing..." : "Cash Payment"}
                </button>
                <button
                  onClick={() => handleProcessPayment("Card")}
                  disabled={isProcessing}
                  className="w-full py-2 md:py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 active:bg-purple-800 disabled:bg-gray-400 transition-colors"
                >
                  {isProcessing ? "Processing..." : "Card Payment"}
                </button>
              </div>
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="w-full mt-3 md:mt-4 text-xs md:text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hidden Receipt Component (unchanged) */}
      {lastOrder && (
        <div style={{ display: "none" }}>
          <Receipt ref={receiptRef} order={lastOrder} shopName="My POS Shop" />
        </div>
      )}
    </>
  )
}