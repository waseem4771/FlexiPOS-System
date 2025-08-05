



// // File Path: src/app/dashboard/staff/new/page.js
// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import StaffForm from '@/components/staff/StaffForm';
// import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// export default function NewStaffPage() {
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (formData) => {
//     setIsSubmitting(true);
//     setError(null);
//     try {
//       const res = await fetch('/api/staff', { 
//         method: 'POST', 
//         headers: { 'Content-Type': 'application/json' }, 
//         body: JSON.stringify(formData) 
//       });
//       const result = await res.json();
//       if (!result.success) {
//         throw new Error(result.error || "Failed to create staff member.");
//       }

//       alert("Staff member created successfully!");
//       router.push('/dashboard/staff');
//       router.refresh(); // <-- YEH SAB SE AHEM TABDEELI HAI

//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex items-center mb-6">
//           <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-200 mr-4">
//               <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
//           </button>
//           <h1 className="text-3xl font-bold text-gray-800">Add New Staff Member</h1>
//       </div>
//       <div className="bg-white p-8 rounded-xl shadow-md max-w-lg mx-auto">
//         {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}
//         <StaffForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
//       </div>
//     </div>
//   );
// }









//-------------------------------------------------





'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StaffForm from '@/components/staff/StaffForm';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function NewStaffPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/staff', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(formData) 
      });
      const result = await res.json();
      if (!result.success) {
        throw new Error(result.error || "Failed to create staff member.");
      }

      alert("Staff member created successfully!");
      router.push('/dashboard/staff');
      router.refresh();

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
          className="p-1 sm:p-2 rounded-full hover:bg-gray-200 mr-2 sm:mr-4"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Add New Staff Member</h1>
      </div>

      {/* Form Container */}
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl shadow-sm sm:shadow-md max-w-lg mx-auto">
        {/* Error Message */}
        {error && (
          <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-red-100 text-red-700 rounded-md text-sm sm:text-base">
            {error}
          </div>
        )}

        {/* Staff Form */}
        <StaffForm 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting} 
        />
      </div>
    </div>
  );
}