


// // File Path: src/app/dashboard/staff/[staffId]/edit/page.js
// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import StaffForm from '@/components/staff/StaffForm';
// import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// export default function EditStaffPage() {
//   const router = useRouter();
//   const { staffId } = useParams();
//   const [initialData, setInitialData] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (staffId) {
//       const fetchStaffData = async () => {
//         try {
//           const res = await fetch(`/api/staff/${staffId}`);
//           const result = await res.json();
//           if (!result.success) throw new Error(result.error);
//           setInitialData(result.data);
//         } catch (err) {
//           setError(err.message);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchStaffData();
//     }
//   }, [staffId]);

//   const handleSubmit = async (formData) => {
//     setIsSubmitting(true);
//     setError(null);
//     try {
//         const res = await fetch(`/api/staff/${staffId}`, { 
//             method: 'PUT', 
//             headers: { 'Content-Type': 'application/json' }, 
//             body: JSON.stringify(formData) 
//         });
//         const result = await res.json();
//         if(!result.success) throw new Error(result.error);
        
//         alert("Staff member updated successfully!");
//         router.push('/dashboard/staff');
//         router.refresh(); // Yahan bhi refresh add kar dein
//     } catch (err) {
//         setError(err.message);
//     } finally {
//         setIsSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex items-center mb-6">
//         <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-200 mr-4">
//             <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
//         </button>
//         <h1 className="text-3xl font-bold text-gray-800">Edit Staff Member</h1>
//       </div>
//       <div className="bg-white p-8 rounded-xl shadow-md max-w-lg mx-auto">
//         {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}
//         <StaffForm 
//           onSubmit={handleSubmit} 
//           initialData={initialData} 
//           isSubmitting={isSubmitting} 
//           isEditing={true} 
//         />
//       </div>
//     </div>
//   );
// }











//------------------------------------------------





'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import StaffForm from '@/components/staff/StaffForm';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function EditStaffPage() {
  const router = useRouter();
  const { staffId } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (staffId) {
      const fetchStaffData = async () => {
        try {
          const res = await fetch(`/api/staff/${staffId}`);
          const result = await res.json();
          if (!result.success) throw new Error(result.error);
          setInitialData(result.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchStaffData();
    }
  }, [staffId]);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError(null);
    try {
        const res = await fetch(`/api/staff/${staffId}`, { 
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(formData) 
        });
        const result = await res.json();
        if(!result.success) throw new Error(result.error);
        
        alert("Staff member updated successfully!");
        router.push('/dashboard/staff');
        router.refresh();
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
          className="p-1 sm:p-2 rounded-full hover:bg-gray-200 mr-2 sm:mr-4"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Edit Staff Member</h1>
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
          initialData={initialData} 
          isSubmitting={isSubmitting} 
          isEditing={true} 
        />
      </div>
    </div>
  );
}