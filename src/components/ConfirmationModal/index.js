// // src/components/ConfirmationModal/index.js

// 'use client';

// import { Fragment } from 'react';
// import { Dialog, Transition } from '@headlessui/react';
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

// export default function ConfirmationModal({ 
//   isOpen, 
//   onClose, 
//   onConfirm, 
//   title, 
//   message 
// }) {
//   return (
//     <Transition.Root show={isOpen} as={Fragment}>
//       <Dialog as="div" className="relative z-50" onClose={onClose}>
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//         </Transition.Child>

//         <div className="fixed inset-0 z-10 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//               enterTo="opacity-100 translate-y-0 sm:scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//               leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//             >
//               <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
//                 <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                   <div className="sm:flex sm:items-start">
//                     <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
//                       <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
//                     </div>
//                     <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                       <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
//                         {title}
//                       </Dialog.Title>
//                       <div className="mt-2">
//                         <p className="text-sm text-gray-500">
//                           {message}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
//                   <button
//                     type="button"
//                     className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
//                     onClick={onConfirm}
//                   >
//                     Yes, Logout
//                   </button>
//                   <button
//                     type="button"
//                     className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                     onClick={onClose}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// }







//-------------------------------------


'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message 
}) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-[95vw] transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex flex-col items-center sm:flex-row sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 flex flex-col-reverse gap-3 sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="w-full rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                    onClick={onConfirm}
                  >
                    Yes, Logout
                  </button>
                  <button
                    type="button"
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}