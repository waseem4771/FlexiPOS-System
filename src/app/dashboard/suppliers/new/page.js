// // File Path: src/app/dashboard/suppliers/new/page.js
// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import SupplierForm from '@/components/suppliers/SupplierForm';

// export default function NewSupplierPage() {
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (formData) => {
//     setIsSubmitting(true);
//     await fetch('/api/suppliers', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });
//     router.push('/dashboard/suppliers');
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Add New Supplier</h1>
//       <div className="bg-white p-8 rounded-xl shadow-md">
//         <SupplierForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
//       </div>
//     </div>
//   );
// }






//----------------------------------------------


'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import SupplierForm from '@/components/suppliers/SupplierForm';

export default function NewSupplierPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to create supplier');
      }
      
      router.push('/dashboard/suppliers');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Add New Supplier</h1>
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
        <SupplierForm 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting} 
        />
      </div>
    </div>
  );
}