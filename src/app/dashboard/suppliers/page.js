

// // File Path: src/app/dashboard/suppliers/page.js
// 'use client';
// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { TruckIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// export default function SuppliersPage() {
//   const { data: session, status } = useSession({ required: true });
//   const router = useRouter();
//   const [suppliers, setSuppliers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // isAdmin variable yahan define karein taake isay dobara istemal kar sakein
//   const isAdmin = session?.user?.role === 'admin';

//   useEffect(() => {
//     // Session load hone ke baad hi data fetch karein
//     if (status === 'authenticated') {
//       const fetchSuppliers = async () => {
//         try {
//           setLoading(true);
//           const res = await fetch('/api/suppliers');
//           const result = await res.json();
//           if (!result.success) {
//             throw new Error(result.error || 'Could not fetch suppliers');
//           }
//           setSuppliers(result.data);
//         } catch (err) {
//           setError(err.message);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchSuppliers();
//     }
//   }, [status]); // Dependency mein sirf 'status' rakhein

//   const handleDelete = async (id) => {
//     if (!isAdmin) return; // Extra security check
//     if (confirm('Are you sure you want to delete this supplier?')) {
//       try {
//         await fetch(`/api/suppliers/${id}`, { method: 'DELETE' });
//         // List se supplier ko foran hata dein
//         setSuppliers(prevSuppliers => prevSuppliers.filter(s => s._id !== id));
//       } catch (err) {
//         alert("Failed to delete supplier.");
//       }
//     }
//   };

//   // Loading aur error states ko behtar tareeqay se handle karein
//   if (status === 'loading' || loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }
  
//   if (error) {
//     return (
//       <div className="p-6 text-center">
//         <div className="p-4 bg-red-100 text-red-700 rounded-lg">
//           <h2 className="font-bold">An Error Occurred</h2>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800 flex items-center">
//             <TruckIcon className="h-8 w-8 mr-3"/>
//             {/* Heading ko role ke hisab se badlein */}
//             {isAdmin ? "Supplier Management" : "Our Suppliers"}
//         </h1>
//         {/* "Add Supplier" button sirf Admin ko dikhega */}
//         {isAdmin && (
//             <button 
//               onClick={() => router.push('/dashboard/suppliers/new')} 
//               className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
//             >
//                 <PlusIcon className="h-5 w-5 mr-2"/>Add Supplier
//             </button>
//         )}
//       </div>
//       <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto">
//         <table className="w-full">
//           <thead className="border-b bg-gray-50">
//             <tr>
//               <th className="text-left p-3 font-semibold text-gray-600">Name</th>
//               <th className="text-left p-3 font-semibold text-gray-600">Contact Person</th>
//               <th className="text-left p-3 font-semibold text-gray-600">Email</th>
//               {/* "Actions" column ka header sirf Admin ko dikhega */}
//               {isAdmin && <th className="text-center p-3 font-semibold text-gray-600">Actions</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {suppliers.length > 0 ? (
//               suppliers.map(s => (
//                 <tr key={s._id} className="border-b hover:bg-gray-50 last:border-b-0">
//                   <td className="p-3 font-medium text-gray-800">{s.name}</td>
//                   <td className="p-3 text-gray-600">{s.contactPerson || 'N/A'}</td>
//                   <td className="p-3 text-gray-600">{s.email}</td>
//                   {/* "Actions" buttons sirf Admin ko dikhenge */}
//                   {isAdmin && (
//                     <td className="p-3 text-center">
//                       <button onClick={() => router.push(`/dashboard/suppliers/${s._id}/edit`)} className="p-2 hover:bg-gray-200 rounded-full mr-2" title="Edit Supplier"><PencilIcon className="h-5 w-5 text-gray-600"/></button>
//                       <button onClick={() => handleDelete(s._id)} className="p-2 text-red-500 hover:bg-red-100 rounded-full" title="Delete Supplier"><TrashIcon className="h-5 w-5"/></button>
//                     </td>
//                   )}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 {/* Colspan ko role ke hisab se adjust karein */}
//                 <td colSpan={isAdmin ? 4 : 3} className="text-center py-8 text-gray-500">
//                   No suppliers found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }











//---------------------------------------------------




'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { TruckIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function SuppliersPage() {
  const { data: session, status } = useSession({ required: true });
  const router = useRouter();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAdmin = session?.user?.role === 'admin';

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchSuppliers = async () => {
        try {
          setLoading(true);
          const res = await fetch('/api/suppliers');
          const result = await res.json();
          if (!result.success) {
            throw new Error(result.error || 'Could not fetch suppliers');
          }
          setSuppliers(result.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchSuppliers();
    }
  }, [status]);

  const handleDelete = async (id) => {
    if (!isAdmin) return;
    if (confirm('Are you sure you want to delete this supplier?')) {
      try {
        await fetch(`/api/suppliers/${id}`, { method: 'DELETE' });
        setSuppliers(prevSuppliers => prevSuppliers.filter(s => s._id !== id));
      } catch (err) {
        alert("Failed to delete supplier.");
      }
    }
  };

  if (status === 'loading' || loading) {
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
          <h2 className="font-bold text-sm sm:text-base">An Error Occurred</h2>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
          <TruckIcon className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3"/>
          {isAdmin ? "Supplier Management" : "Our Suppliers"}
        </h1>
        
        {isAdmin && (
          <button 
            onClick={() => router.push('/dashboard/suppliers/new')} 
            className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-colors text-sm sm:text-base"
            aria-label="Add new supplier"
          >
            <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2"/>
            Add Supplier
          </button>
        )}
      </div>

      {/* Suppliers Table - Mobile Responsive */}
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm overflow-x-auto">
        {suppliers.length > 0 ? (
          <>
            {/* Desktop Table (hidden on mobile) */}
            <div className="hidden sm:block">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-semibold text-gray-600">Name</th>
                    <th className="text-left p-3 font-semibold text-gray-600">Contact Person</th>
                    <th className="text-left p-3 font-semibold text-gray-600">Email</th>
                    {isAdmin && <th className="text-center p-3 font-semibold text-gray-600">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map(s => (
                    <tr key={s._id} className="border-b hover:bg-gray-50 last:border-b-0">
                      <td className="p-3 font-medium text-gray-800">{s.name}</td>
                      <td className="p-3 text-gray-600">{s.contactPerson || 'N/A'}</td>
                      <td className="p-3 text-gray-600">{s.email}</td>
                      {isAdmin && (
                        <td className="p-3 text-center">
                          <div className="flex justify-center space-x-2">
                            <button 
                              onClick={() => router.push(`/dashboard/suppliers/${s._id}/edit`)} 
                              className="p-2 hover:bg-gray-200 rounded-full"
                              aria-label={`Edit ${s.name}`}
                            >
                              <PencilIcon className="h-5 w-5 text-gray-600"/>
                            </button>
                            <button 
                              onClick={() => handleDelete(s._id)} 
                              className="p-2 text-red-500 hover:bg-red-100 rounded-full"
                              aria-label={`Delete ${s.name}`}
                            >
                              <TrashIcon className="h-5 w-5"/>
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards (hidden on desktop) */}
            <div className="sm:hidden space-y-3">
              {suppliers.map(s => (
                <div key={s._id} className="border rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">{s.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-semibold">Contact:</span> {s.contactPerson || 'N/A'}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-semibold">Email:</span> {s.email}
                      </p>
                    </div>
                    {isAdmin && (
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => router.push(`/dashboard/suppliers/${s._id}/edit`)} 
                          className="p-1 hover:bg-gray-200 rounded-full"
                          aria-label={`Edit ${s.name}`}
                        >
                          <PencilIcon className="h-5 w-5 text-gray-600"/>
                        </button>
                        <button 
                          onClick={() => handleDelete(s._id)} 
                          className="p-1 text-red-500 hover:bg-red-100 rounded-full"
                          aria-label={`Delete ${s.name}`}
                        >
                          <TrashIcon className="h-5 w-5"/>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No suppliers found.
          </div>
        )}
      </div>
    </div>
  );
}