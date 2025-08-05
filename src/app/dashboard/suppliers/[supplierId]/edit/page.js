// // File Path: src/app/dashboard/suppliers/[supplierId]/edit/page.js
// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import SupplierForm from '@/components/suppliers/SupplierForm';

// export default function EditSupplierPage() {
//   const router = useRouter();
//   const params = useParams();
//   const { supplierId } = params;

//   const [initialData, setInitialData] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (supplierId) {
//       fetch(`/api/suppliers/${supplierId}`).then(res => res.json()).then(data => setInitialData(data.data));
//     }
//   }, [supplierId]);
  
//   // Note: /api/suppliers/[supplierId] ke GET method ko implement karna na bhoolein
//   // Main ne usay upar wali API file mein chorr diya tha

//   const handleSubmit = async (formData) => {
//     setIsSubmitting(true);
//     await fetch(`/api/suppliers/${supplierId}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });
//     router.push('/dashboard/suppliers');
//   };

//   if (!initialData) return <p>Loading...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Edit Supplier</h1>
//       <div className="bg-white p-8 rounded-xl shadow-md">
//         <SupplierForm onSubmit={handleSubmit} initialData={initialData} isSubmitting={isSubmitting} />
//       </div>
//     </div>
//   );
// }



//--------------------------------------------------------



'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import SupplierForm from '@/components/suppliers/SupplierForm';

export default function EditSupplierPage() {
  const router = useRouter();
  const params = useParams();
  const { supplierId } = params;

  const [initialData, setInitialData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (supplierId) {
      const fetchSupplierData = async () => {
        try {
          const res = await fetch(`/api/suppliers/${supplierId}`);
          const result = await res.json();
          if (!result.success) {
            throw new Error(result.error || 'Failed to load supplier data');
          }
          setInitialData(result.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchSupplierData();
    }
  }, [supplierId]);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/suppliers/${supplierId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const result = await res.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to update supplier');
      }
      
      router.push('/dashboard/suppliers');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 text-center">
        <div className="p-3 sm:p-4 bg-red-100 text-red-700 rounded-lg">
          <h2 className="font-bold text-sm sm:text-base">Error</h2>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header with back button */}
      <div className="flex items-center mb-4 sm:mb-6">
        <button 
          onClick={() => router.back()}
          className="p-1 sm:p-2 rounded-full hover:bg-gray-200 mr-2 sm:mr-4 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Edit Supplier</h1>
      </div>

      {/* Form Container */}
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl shadow-sm sm:shadow-md max-w-lg mx-auto">
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm sm:text-base">
            {error}
          </div>
        )}

        {/* Supplier Form */}
        {initialData && (
          <SupplierForm 
            onSubmit={handleSubmit} 
            initialData={initialData} 
            isSubmitting={isSubmitting} 
          />
        )}
      </div>
    </div>
  );
}