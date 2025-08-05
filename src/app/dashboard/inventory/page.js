// // File Path: src/app/dashboard/inventory/page.js
// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import Link from 'next/link';
// import {
//   PencilSquareIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   PlusCircleIcon,
//   ExclamationTriangleIcon,
//   ArchiveBoxIcon
// } from '@heroicons/react/24/outline';

// // === Inventory Status Badge Component ===
// // Yeh component stock level ke hisab se status dikhayega
// const InventoryStatusBadge = ({ stock, minStock }) => {
//   if (stock <= 0) {
//     return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Out of Stock</span>;
//   }
//   if (stock <= minStock) {
//     return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Low Stock</span>;
//   }
//   return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">In Stock</span>;
// };


// const InventoryPage = () => {
//   const [inventory, setInventory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     totalPages: 1,
//   });

//   const fetchInventory = useCallback(async (page, limit) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(`/api/inventory?page=${page}&limit=${limit}`, { cache: 'no-store' });
//       const result = await response.json();
      
//       if (!result.success) {
//         throw new Error(result.error || 'Failed to fetch inventory.');
//       }
      
//       setInventory(result.data);
//       setPagination(result.pagination);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchInventory(pagination.page, pagination.limit);
//   }, [pagination.page, pagination.limit, fetchInventory]);

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

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800 flex items-center">
//             <ArchiveBoxIcon className="h-8 w-8 mr-3" />
//             Inventory Management
//         </h1>
//         <Link href="/dashboard/products/new">
//           <div className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
//             <PlusCircleIcon className="h-5 w-5 mr-2" />
//             Add New Product
//           </div>
//         </Link>
//       </div>

//       {/* Main Content Area */}
//       <div className="bg-white p-6 rounded-xl shadow-md">
//         {loading && <div className="text-center py-4">Loading inventory...</div>}
        
//         {error && (
//             <div className="bg-red-50 p-4 rounded-lg text-center">
//                 <ExclamationTriangleIcon className="h-8 w-8 text-red-500 mx-auto mb-2" />
//                 <p className="text-red-700 font-semibold">Error Loading Data</p>
//                 <p className="text-red-600 text-sm">{error}</p>
//             </div>
//         )}

//         {!loading && !error && (
//           <>
//             {/* Inventory Table */}
//             <div className="overflow-x-auto">
//               <table className="w-full text-left">
//                 <thead className="border-b bg-gray-50">
//                   <tr className="text-sm text-gray-600">
//                     <th className="py-3 px-4 font-semibold">Product Name</th>
//                     <th className="py-3 px-4 font-semibold">SKU</th>
//                     <th className="py-3 px-4 font-semibold">Category</th>
//                     <th className="py-3 px-4 font-semibold text-center">Current Stock</th>
//                     <th className="py-3 px-4 font-semibold">Status</th>
//                     <th className="py-3 px-4 font-semibold text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {inventory.length > 0 ? (
//                     inventory.map((product) => (
//                       <tr key={product._id} className="border-b last:border-none hover:bg-gray-50 transition-colors">
//                         <td className="py-4 px-4 font-medium text-gray-800">{product.name}</td>
//                         <td className="py-4 px-4 text-gray-500">{product.sku || 'N/A'}</td>
//                         <td className="py-4 px-4 text-gray-600">{product.category?.name || 'Uncategorized'}</td>
//                         <td className="py-4 px-4 text-center font-bold text-lg text-gray-700">{product.stock}</td>
//                         <td className="py-4 px-4">
//                             <InventoryStatusBadge stock={product.stock} minStock={product.minStock} />
//                         </td>
//                         <td className="py-4 px-4 text-center">
//                           <Link href={`/dashboard/products/${product._id}/edit`}>
//                             <div className="inline-flex items-center p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors" title="Edit Product">
//                                 <PencilSquareIcon className="h-5 w-5" />
//                             </div>
//                           </Link>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="6" className="py-8 text-center text-gray-500">No products found in inventory.</td>
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
//                   <button onClick={handlePreviousPage} disabled={pagination.page === 1} className="flex items-center px-3 py-2 text-sm bg-white border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
//                     <ChevronLeftIcon className="h-4 w-4 mr-1" /> Previous
//                   </button>
//                   <span className="text-sm text-gray-700">Page {pagination.page} of {pagination.totalPages}</span>
//                   <button onClick={handleNextPage} disabled={pagination.page === pagination.totalPages} className="flex items-center px-3 py-2 text-sm bg-white border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
//                     Next <ChevronRightIcon className="h-4 w-4 ml-1" />
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

// export default InventoryPage;











//------------------------------------------------









'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  PencilSquareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusCircleIcon,
  ExclamationTriangleIcon,
  ArchiveBoxIcon
} from '@heroicons/react/24/outline';

const InventoryStatusBadge = ({ stock, minStock }) => {
  if (stock <= 0) {
    return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Out of Stock</span>;
  }
  if (stock <= minStock) {
    return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Low Stock</span>;
  }
  return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">In Stock</span>;
};

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const fetchInventory = useCallback(async (page, limit) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/inventory?page=${page}&limit=${limit}`, { cache: 'no-store' });
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch inventory.');
      }
      
      setInventory(result.data);
      setPagination(result.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInventory(pagination.page, pagination.limit);
  }, [pagination.page, pagination.limit, fetchInventory]);

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

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
          <ArchiveBoxIcon className="h-6 w-6 md:h-8 md:w-8 mr-2 md:mr-3" />
          Inventory Management
        </h1>
        <Link href="/dashboard/products/new" className="w-full md:w-auto">
          <div className="flex items-center justify-center px-3 py-2 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm md:text-base">
            <PlusCircleIcon className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" />
            Add New Product
          </div>
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="bg-white p-3 md:p-6 rounded-xl shadow-md">
        {loading && <div className="text-center py-4">Loading inventory...</div>}
        
        {error && (
          <div className="bg-red-50 p-3 md:p-4 rounded-lg text-center">
            <ExclamationTriangleIcon className="h-6 w-6 md:h-8 md:w-8 text-red-500 mx-auto mb-2" />
            <p className="text-red-700 font-semibold text-sm md:text-base">Error Loading Data</p>
            <p className="text-red-600 text-xs md:text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b bg-gray-50">
                  <tr className="text-xs md:text-sm text-gray-600">
                    <th className="py-2 md:py-3 px-2 md:px-4 font-semibold">Product Name</th>
                    <th className="py-2 md:py-3 px-2 md:px-4 font-semibold">SKU</th>
                    <th className="py-2 md:py-3 px-2 md:px-4 font-semibold">Category</th>
                    <th className="py-2 md:py-3 px-2 md:px-4 font-semibold text-center">Stock</th>
                    <th className="py-2 md:py-3 px-2 md:px-4 font-semibold">Status</th>
                    <th className="py-2 md:py-3 px-2 md:px-4 font-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.length > 0 ? (
                    inventory.map((product) => (
                      <tr key={product._id} className="border-b last:border-none hover:bg-gray-50 transition-colors">
                        <td className="py-3 md:py-4 px-2 md:px-4 font-medium text-gray-800 text-sm md:text-base">{product.name}</td>
                        <td className="py-3 md:py-4 px-2 md:px-4 text-gray-500 text-sm md:text-base">{product.sku || 'N/A'}</td>
                        <td className="py-3 md:py-4 px-2 md:px-4 text-gray-600 text-sm md:text-base">{product.category?.name || 'Uncategorized'}</td>
                        <td className="py-3 md:py-4 px-2 md:px-4 text-center font-bold text-base md:text-lg text-gray-700">{product.stock}</td>
                        <td className="py-3 md:py-4 px-2 md:px-4">
                          <InventoryStatusBadge stock={product.stock} minStock={product.minStock} />
                        </td>
                        <td className="py-3 md:py-4 px-2 md:px-4 text-center">
                          <Link href={`/dashboard/products/${product._id}/edit`}>
                            <div className="inline-flex items-center p-1 md:p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors" title="Edit Product">
                              <PencilSquareIcon className="h-4 w-4 md:h-5 md:w-5" />
                            </div>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-6 md:py-8 text-center text-gray-500 text-sm md:text-base">No products found in inventory.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {inventory.length > 0 ? (
                inventory.map((product) => (
                  <div key={product._id} className="border rounded-lg p-3 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">{product.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{product.category?.name || 'Uncategorized'}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{product.stock}</span>
                        <InventoryStatusBadge stock={product.stock} minStock={product.minStock} />
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                      <p className="text-xs text-gray-500">{product.sku || 'N/A'}</p>
                      <Link href={`/dashboard/products/${product._id}/edit`}>
                        <div className="p-1 text-gray-500 hover:bg-gray-200 rounded-full">
                          <PencilSquareIcon className="h-4 w-4" />
                        </div>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">No products found in inventory.</div>
              )}
            </div>

            {/* Pagination Controls */}
            {pagination.total > pagination.limit && (
              <div className="flex flex-col md:flex-row justify-between items-center mt-4 md:mt-6 gap-3">
                <p className="text-xs md:text-sm text-gray-600">
                  Showing <span className="font-semibold">{(pagination.page - 1) * pagination.limit + 1}</span> to <span className="font-semibold">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of <span className="font-semibold">{pagination.total}</span> results
                </p>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={handlePreviousPage} 
                    disabled={pagination.page === 1} 
                    className="flex items-center px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm bg-white border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronLeftIcon className="h-3 w-3 md:h-4 md:w-4 mr-1" /> Prev
                  </button>
                  <span className="text-xs md:text-sm text-gray-700">Page {pagination.page} of {pagination.totalPages}</span>
                  <button 
                    onClick={handleNextPage} 
                    disabled={pagination.page === pagination.totalPages} 
                    className="flex items-center px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm bg-white border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next <ChevronRightIcon className="h-3 w-3 md:h-4 md:w-4 ml-1" />
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

export default InventoryPage;