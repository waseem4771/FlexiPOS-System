


// // File Path: src/app/dashboard/products/[productId]/edit/page.js
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import { useSession } from 'next-auth/react'; // Session hook import karein
// import ProductForm from '@/components/products/ProductForm';
// import { ArrowLeftIcon, LockClosedIcon } from '@heroicons/react/24/outline';


// // ====== Access Denied Component ======
// const AccessDenied = () => {
//     const router = useRouter();
//     return (
//         <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
//             <LockClosedIcon className="h-16 w-16 text-red-500 mb-4" />
//             <h1 className="text-3xl font-bold text-gray-800">Access Denied</h1>
//             <p className="text-lg text-gray-600 mt-2">You must be an Administrator to edit products.</p>
//             <button
//                 onClick={() => router.push('/dashboard')}
//                 className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
//             >
//                 Return to Dashboard
//             </button>
//         </div>
//     );
// };


// // ====== Main Page Component (The Gatekeeper) ======
// const EditProductPage = () => {
//   const router = useRouter();
//   const params = useParams();
//   const productId = params.productId;
//   const { data: session, status } = useSession({ required: true }); // Session data hasil karein

//   const [initialData, setInitialData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState(null);

//   // Yeh useEffect data fetch karega
//   useEffect(() => {
//     if (productId && session?.user?.role === 'admin') { // Sirf admin hi data fetch kare
//       const fetchProduct = async () => {
//         try {
//           const response = await fetch(`/api/products/${productId}`);
//           const result = await response.json();
//           if (!result.success) throw new Error(result.error);
//           setInitialData(result.data);
//         } catch (err) {
//           setError(err.message);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchProduct();
//     } else if (session?.user?.role !== 'admin') {
//         setLoading(false); // Agar admin nahi to loading band kar dein
//     }
//   }, [productId, session]);

//   const handleUpdateProduct = async (productData) => {
//     // ... (yeh function waisa hi rahega)
//     setIsSubmitting(true);
//     setError(null);
//     try {
//       const response = await fetch(`/api/products/${productId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(productData),
//       });
//       const result = await response.json();
//       if (!result.success) throw new Error(result.error);
//       alert('Product updated successfully!');
//       router.push('/dashboard/inventory');
//     } catch (err) {
//       setError(err.message);
//       alert('Error: ' + err.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Jab tak session/data load ho raha hai, loading state dikhayein
//   if (status === 'loading' || loading) {
//     return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
//   }
  
//   // Role check: Agar user admin nahi hai, to Access Denied component dikhayein
//   if (session.user.role !== 'admin') {
//     return <AccessDenied />;
//   }

//   if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;

//   // Agar user admin hai, to form dikhayein
//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//         <div className="flex items-center mb-6">
//             <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-200 mr-4">
//             <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
//             </button>
//             <h1 className="text-3xl font-bold text-gray-800">Edit Product</h1>
//         </div>
//         <div className="bg-white p-8 rounded-xl shadow-md">
//             <ProductForm 
//                 onSubmit={handleUpdateProduct} 
//                 initialData={initialData}
//                 isSubmitting={isSubmitting}
//                 buttonText="Update Product"
//             />
//         </div>
//     </div>
//   );
// };

// export default EditProductPage;













//-----------------------------------------------------






'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ProductForm from '@/components/products/ProductForm';
import { ArrowLeftIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const AccessDenied = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-4 sm:p-6">
            <LockClosedIcon className="h-12 sm:h-16 w-12 sm:w-16 text-red-500 mb-3 sm:mb-4" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Access Denied</h1>
            <p className="text-base sm:text-lg text-gray-600 mt-2">You must be an Administrator to edit products.</p>
            <button
                onClick={() => router.push('/dashboard')}
                className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors"
            >
                Return to Dashboard
            </button>
        </div>
    );
};

const EditProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params.productId;
  const { data: session, status } = useSession({ required: true });

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productId && session?.user?.role === 'admin') {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/products/${productId}`);
          const result = await response.json();
          if (!result.success) throw new Error(result.error);
          setInitialData(result.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    } else if (session?.user?.role !== 'admin') {
        setLoading(false);
    }
  }, [productId, session]);

  const handleUpdateProduct = async (productData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      alert('Product updated successfully!');
      router.push('/dashboard/inventory');
    } catch (err) {
      setError(err.message);
      alert('Error: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (session.user.role !== 'admin') {
    return <AccessDenied />;
  }

  if (error) return (
    <div className="text-center py-8 sm:py-10 px-4 text-red-600">
      Error: {error}
    </div>
  );

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header with back button */}
      <div className="flex items-center mb-4 sm:mb-6">
        <button 
          onClick={() => router.back()} 
          className="p-1.5 sm:p-2 rounded-full hover:bg-gray-200 active:bg-gray-300 mr-2 sm:mr-4 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
        </button>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Edit Product</h1>
      </div>
      
      {/* Form Container */}
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl shadow-sm sm:shadow-md">
        {error && (
          <div className="mb-3 sm:mb-4 text-sm sm:text-base text-red-600 bg-red-100 p-2 sm:p-3 rounded-md">
            {error}
          </div>
        )}
        
        <ProductForm 
          onSubmit={handleUpdateProduct} 
          initialData={initialData}
          isSubmitting={isSubmitting}
          buttonText={
            <span className="flex items-center justify-center gap-1 sm:gap-2">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                'Update Product'
              )}
            </span>
          }
          submitButtonClass="w-full sm:w-auto px-4 sm:px-6 py-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-medium rounded-lg transition-colors"
        />
      </div>
    </div>
  );
};

export default EditProductPage;