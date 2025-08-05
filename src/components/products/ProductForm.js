

// // File Path: src/components/products/ProductForm.js
// 'use client';

// import { useState, useEffect } from 'react';

// const ProductForm = ({ onSubmit, initialData = null, isSubmitting, buttonText = "Save Product" }) => {
//   // 1. 'cost' ko state mein shamil karein
//   const [product, setProduct] = useState({
//     name: '',
//     description: '',
//     price: 0,
//     cost: 0, // 'cost' field add ki gayi hai
//     stock: 0,
//     minStock: 10,
//     sku: '',
//     category: '', 
//   });

//   // 2. Edit ke waqt 'cost' ko bhi populate karein
//   useEffect(() => {
//     if (initialData) {
//       setProduct({
//         name: initialData.name || '',
//         description: initialData.description || '',
//         price: initialData.price || 0,
//         cost: initialData.cost || 0, // initialData se 'cost' lein
//         stock: initialData.stock || 0,
//         minStock: initialData.minStock || 10,
//         sku: initialData.sku || '',
//         category: initialData.category || '',
//       });
//     }
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     // valueAsNumber se number fields ko number hi rakhein
//     const parsedValue = e.target.type === 'number' ? parseFloat(value) || 0 : value;
//     setProduct(prev => ({ ...prev, [name]: parsedValue }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(product);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Product Name */}
//         <div>
//           <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
//           <input type="text" name="name" id="name" value={product.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
//         </div>

//         {/* SKU */}
//         <div>
//           <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU (Stock Keeping Unit)</label>
//           <input type="text" name="sku" id="sku" value={product.sku} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
//         </div>
//       </div>

//       {/* Description */}
//       <div>
//         <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//         <textarea name="description" id="description" rows="4" value={product.description} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
//       </div>

//       {/* Pricing and Stock Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 border-t pt-6">
//         {/* Selling Price */}
//         <div>
//           <label htmlFor="price" className="block text-sm font-medium text-gray-700">Selling Price ($)</label>
//           <p className="text-xs text-gray-500 mb-1">Yeh woh qeemat hai jis per customer khareeday ga.</p>
//           <input type="number" name="price" id="price" value={product.price} onChange={handleChange} required step="0.01" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
//         </div>
        
//         {/* Product Cost */}
//         <div>
//           <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Product Cost ($)</label>
//           <p className="text-xs text-gray-500 mb-1">Yeh aapki khareedari qeemat hai.</p>
//           <input type="number" name="cost" id="cost" value={product.cost} onChange={handleChange} required step="0.01" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
//         </div>
        
//         {/* Profit Margin (Calculated) */}
//         <div className="bg-gray-50 p-3 rounded-md">
//             <label className="block text-sm font-medium text-gray-700">Profit Margin</label>
//             <p className="text-xs text-gray-500 mb-1">Aapka munaafa is product per.</p>
//             <div className="text-2xl font-bold text-green-600">
//                 ${(product.price - product.cost).toFixed(2)}
//             </div>
//         </div>
//       </div>

//       {/* Inventory and Category Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8 border-t pt-6">
//         {/* Current Stock */}
//         <div>
//           <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Current Stock (Units)</label>
//           <input type="number" name="stock" id="stock" value={product.stock} onChange={handleChange} required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
//         </div>

//         {/* Minimum Stock Level */}
//         <div>
//           <label htmlFor="minStock" className="block text-sm font-medium text-gray-700">Low Stock Alert Level</label>
//           <input type="number" name="minStock" id="minStock" value={product.minStock} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
//         </div>
        
//         {/* Category */}
//         <div>
//           <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category (ID)</label>
//           <input type="text" name="category" id="category" placeholder="Enter Category ID" value={product.category} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
//         </div>
//       </div>
      
//       {/* Submit Button */}
//       <div className="pt-6 border-t">
//         <div className="flex justify-end">
//             <button type="submit" disabled={isSubmitting} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed">
//             {isSubmitting ? 'Saving...' : buttonText}
//             </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default ProductForm;











//-----------------------------------------






'use client';

import { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit, initialData = null, isSubmitting, buttonText = "Save Product" }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    cost: 0,
    stock: 0,
    minStock: 10,
    sku: '',
    category: '', 
  });

  useEffect(() => {
    if (initialData) {
      setProduct({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || 0,
        cost: initialData.cost || 0,
        stock: initialData.stock || 0,
        minStock: initialData.minStock || 10,
        sku: initialData.sku || '',
        category: initialData.category || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = e.target.type === 'number' ? parseFloat(value) || 0 : value;
    setProduct(prev => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {/* Product Name and SKU */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={product.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
          />
        </div>

        <div>
          <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
            SKU
          </label>
          <input
            type="text"
            name="sku"
            id="sku"
            value={product.sku}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows="3"
          value={product.description}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
        ></textarea>
      </div>

      {/* Pricing Section */}
      <div className="border-t pt-4 sm:pt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3 sm:text-base">Pricing Information</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Selling Price ($)
            </label>
            <p className="text-xs text-gray-500 mb-2">Customer purchase price</p>
            <input
              type="number"
              name="price"
              id="price"
              value={product.price}
              onChange={handleChange}
              required
              step="0.01"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base"
            />
          </div>

          <div className="bg-white p-3 rounded-md border border-gray-200">
            <label htmlFor="cost" className="block text-sm font-medium text-gray-700">
              Product Cost ($)
            </label>
            <p className="text-xs text-gray-500 mb-2">Your purchase cost</p>
            <input
              type="number"
              name="cost"
              id="cost"
              value={product.cost}
              onChange={handleChange}
              required
              step="0.01"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base"
            />
          </div>

          <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
            <label className="block text-sm font-medium text-gray-700">Profit Margin</label>
            <p className="text-xs text-gray-500 mb-2">Your profit per unit</p>
            <div className="text-xl sm:text-2xl font-bold text-green-600">
              ${(product.price - product.cost).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Section */}
      <div className="border-t pt-4 sm:pt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3 sm:text-base">Inventory Management</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
              Current Stock
            </label>
            <input
              type="number"
              name="stock"
              id="stock"
              value={product.stock}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base"
            />
          </div>

          <div className="bg-white p-3 rounded-md border border-gray-200">
            <label htmlFor="minStock" className="block text-sm font-medium text-gray-700">
              Low Stock Alert
            </label>
            <input
              type="number"
              name="minStock"
              id="minStock"
              value={product.minStock}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base"
            />
          </div>

          <div className="bg-white p-3 rounded-md border border-gray-200">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              name="category"
              id="category"
              placeholder="Category ID"
              value={product.category}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="border-t pt-4 sm:pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-6 py-2 sm:py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          {isSubmitting ? 'Saving...' : buttonText}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;