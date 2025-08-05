

// // File Path: src/app/dashboard/products/page.js

// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
// import ProductForm from '@/components/products/ProductForm'; // Make sure this form is created

// // Main Page Component
// export default function ProductsPage() {
//   const { data: session, status } = useSession();
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState(null);
  
//   const isAdmin = session?.user?.role === 'admin';

//   // ===== YAHAN TABDEELI KI GAYI HAI =====
//   const fetchProducts = async () => { 
//     setIsLoading(true); 
//     try { 
//       const res = await fetch('/api/inventory'); // Inventory API use karein jo pagination support karti hai
//       if (!res.ok) throw new Error('Failed to fetch data'); 
//       const result = await res.json();

//       if (result.success) {
//         setProducts(result.data); // result.data ko state mein save karein, poore result ko nahi
//       } else {
//         throw new Error(result.error || 'Could not fetch products.');
//       }

//     } catch (err) { 
//       setError(err.message); 
//     } finally { 
//       setIsLoading(false); 
//     } 
//   };
  
//   // Baqi functions
//   useEffect(() => { fetchProducts(); }, []);
//   const handleAddNew = () => { if (!isAdmin) return; setCurrentProduct(null); setIsModalOpen(true); };
//   const handleEdit = (product) => { if (!isAdmin) return; setCurrentProduct(product); setIsModalOpen(true); };
//   const handleDelete = async (productId) => { 
//       if (!isAdmin) return; 
//       if (confirm('Are you sure you want to delete this product?')) { 
//           try { 
//               const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' }); 
//               const result = await res.json();
//               if(!result.success) throw new Error(result.error);
//               fetchProducts(); // Refresh the list
//           } catch (err) { 
//               alert('Failed to delete product.'); 
//           } 
//       } 
//   };
//   const handleFormSubmit = async (formData) => { 
//       if (!isAdmin) return; 
//       try { 
//           const url = currentProduct ? `/api/products/${currentProduct._id}` : '/api/products'; 
//           const method = currentProduct ? 'PUT' : 'POST'; 
//           const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
//           const result = await res.json();
//           if(!result.success) throw new Error(result.error);
//           setIsModalOpen(false); 
//           fetchProducts(); // Refresh the list
//       } catch (err) { 
//           alert('Failed to save product: ' + err.message); 
//       } 
//   };

//   if (status === 'loading') return <p className="p-6 text-center">Loading session...</p>;
//   if (isLoading) return <p className="p-6 text-center">Loading products...</p>;
//   if (error) return <p className="p-6 text-red-500 text-center">Error: {error}</p>;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
//         {isAdmin && (
//           <button onClick={handleAddNew} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
//             <FiPlus /> Add New Product
//           </button>
//         )}
//       </div>

//       <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
//         <table className="w-full">
//           <thead className="border-b bg-gray-50">
//             <tr>
//               <th className="text-left p-3 font-semibold text-gray-600">Name</th>
//               <th className="text-left p-3 font-semibold text-gray-600">Category</th>
//               <th className="text-right p-3 font-semibold text-gray-600">Price</th>
//               <th className="text-center p-3 font-semibold text-gray-600">Stock</th>
//               {isAdmin && <th className="text-center p-3 font-semibold text-gray-600">Actions</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {products.length > 0 ? products.map(product => (
//               <tr key={product._id} className="border-b hover:bg-gray-50">
//                 <td className="p-3 font-medium text-gray-800">{product.name}</td>
//                 <td className="p-3 text-gray-600">{product.category?.name || 'N/A'}</td>
//                 <td className="p-3 text-right font-semibold text-gray-700">${product.price.toFixed(2)}</td>
//                 <td className="p-3 text-center font-bold">{product.stock}</td>
//                 {isAdmin && (
//                   <td className="p-3 text-center">
//                     <button onClick={() => handleEdit(product)} className="mr-2 p-2 text-gray-500 hover:bg-gray-200 rounded-full"><FiEdit /></button>
//                     <button onClick={() => handleDelete(product._id)} className="p-2 text-red-500 hover:bg-red-100 rounded-full"><FiTrash2 /></button>
//                   </td>
//                 )}
//               </tr>
//             )) : (
//                 <tr>
//                     <td colSpan={isAdmin ? 5 : 4} className="text-center py-8 text-gray-500">No products found.</td>
//                 </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {isModalOpen && isAdmin && (
//         <ProductForm 
//           product={currentProduct}
//           onSubmit={handleFormSubmit}
//           onCancel={() => setIsModalOpen(false)}
//         />
//       )}
//     </div>
//   );
// }








//-------------------------------------------------





'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import ProductForm from '@/components/products/ProductForm';

export default function ProductsPage() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  
  const isAdmin = session?.user?.role === 'admin';

  const fetchProducts = async () => { 
    setIsLoading(true); 
    try { 
      const res = await fetch('/api/inventory');
      if (!res.ok) throw new Error('Failed to fetch data'); 
      const result = await res.json();

      if (result.success) {
        setProducts(result.data);
      } else {
        throw new Error(result.error || 'Could not fetch products.');
      }
    } catch (err) { 
      setError(err.message); 
    } finally { 
      setIsLoading(false); 
    } 
  };
  
  useEffect(() => { fetchProducts(); }, []);
  
  const handleAddNew = () => { 
    if (!isAdmin) return; 
    setCurrentProduct(null); 
    setIsModalOpen(true); 
  };
  
  const handleEdit = (product) => { 
    if (!isAdmin) return; 
    setCurrentProduct(product); 
    setIsModalOpen(true); 
  };
  
  const handleDelete = async (productId) => { 
    if (!isAdmin) return; 
    if (confirm('Are you sure you want to delete this product?')) { 
      try { 
        const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' }); 
        const result = await res.json();
        if(!result.success) throw new Error(result.error);
        fetchProducts();
      } catch (err) { 
        alert('Failed to delete product.'); 
      } 
    } 
  };
  
  const handleFormSubmit = async (formData) => { 
    if (!isAdmin) return; 
    try { 
      const url = currentProduct ? `/api/products/${currentProduct._id}` : '/api/products'; 
      const method = currentProduct ? 'PUT' : 'POST'; 
      const res = await fetch(url, { 
        method, 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(formData) 
      });
      const result = await res.json();
      if(!result.success) throw new Error(result.error);
      setIsModalOpen(false); 
      fetchProducts();
    } catch (err) { 
      alert('Failed to save product: ' + err.message); 
    } 
  };

  if (status === 'loading') return <p className="p-6 text-center">Loading session...</p>;
  if (isLoading) return <p className="p-6 text-center">Loading products...</p>;
  if (error) return <p className="p-6 text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header Section - Responsive */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Product Management</h1>
        {isAdmin && (
          <button 
            onClick={handleAddNew} 
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm w-full md:w-auto"
          >
            <FiPlus /> <span>Add New Product</span>
          </button>
        )}
      </div>

      {/* Products Table - Responsive */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Mobile View - Cards */}
        <div className="md:hidden space-y-3 p-3">
          {products.length > 0 ? products.map(product => (
            <div key={product._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-600 truncate">{product.category?.name || 'N/A'}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-700">${product.price.toFixed(2)}</p>
                  <p className={`text-sm font-bold ${product.stock < 5 ? 'text-red-500' : 'text-green-600'}`}>
                    Stock: {product.stock}
                  </p>
                </div>
              </div>
              {isAdmin && (
                <div className="flex justify-end gap-3 mt-3 pt-3 border-t">
                  <button 
                    onClick={() => handleEdit(product)} 
                    className="p-2 text-gray-600 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-colors"
                    aria-label="Edit product"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(product._id)} 
                    className="p-2 text-red-500 hover:bg-red-50 active:bg-red-100 rounded-full transition-colors"
                    aria-label="Delete product"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              )}
            </div>
          )) : (
            <div className="text-center py-8 text-gray-500">No products found</div>
          )}
        </div>

        {/* Desktop View - Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-600">Name</th>
                <th className="text-left p-3 font-semibold text-gray-600">Category</th>
                <th className="text-right p-3 font-semibold text-gray-600">Price</th>
                <th className="text-center p-3 font-semibold text-gray-600">Stock</th>
                {isAdmin && <th className="text-center p-3 font-semibold text-gray-600">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? products.map(product => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800 max-w-xs truncate">{product.name}</td>
                  <td className="p-3 text-gray-600 max-w-xs truncate">{product.category?.name || 'N/A'}</td>
                  <td className="p-3 text-right font-semibold text-gray-700">${product.price.toFixed(2)}</td>
                  <td className={`p-3 text-center font-bold ${product.stock < 5 ? 'text-red-500' : 'text-green-600'}`}>
                    {product.stock}
                  </td>
                  {isAdmin && (
                    <td className="p-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => handleEdit(product)} 
                          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                          aria-label="Edit product"
                        >
                          <FiEdit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product._id)} 
                          className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                          aria-label="Delete product"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              )) : (
                <tr>
                  <td colSpan={isAdmin ? 5 : 4} className="text-center py-8 text-gray-500">No products found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Form Modal */}
      {isModalOpen && isAdmin && (
        <ProductForm 
          product={currentProduct}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
