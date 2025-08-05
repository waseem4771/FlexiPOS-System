
// // src/components/Sidebar.js (FINAL VERSION WITH CONFIRMATION MODAL)

// 'use client';

// // ===== YAHAN 3 BADLAV KIYE GAYE HAIN =====
// import { useState } from 'react'; // 1. useState ko import kiya gaya hai
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { signOut } from 'next-auth/react'; 
// import ConfirmationModal from '@/components/ConfirmationModal'; // 2. Naya Modal import kiya gaya hai

// // Heroicons - Zaroori icons import kiye gaye hain
// import {
//   Squares2X2Icon,
//   ComputerDesktopIcon,
//   ShoppingCartIcon,
//   ArchiveBoxIcon,
//   CircleStackIcon,
//   UserGroupIcon,
//   TruckIcon,
//   BanknotesIcon,
//   DocumentChartBarIcon,
//   UsersIcon,
//   Cog6ToothIcon,
//   UserIcon,
//   ArrowRightOnRectangleIcon,
// } from '@heroicons/react/24/outline';

// // Logo ke liye icon import karain
// import { BuildingStorefrontIcon } from '@heroicons/react/24/solid';

// const menuItems = [
//   { name: 'Dashboard', icon: Squares2X2Icon, href: '/dashboard' },
//   { name: 'POS Terminal', icon: ComputerDesktopIcon, href: '/dashboard/pos' },
//   { name: 'Sales / Orders', icon: ShoppingCartIcon, href: '/dashboard/sales' },
//   { name: 'Products', icon: ArchiveBoxIcon, href: '/dashboard/products' },
//   { name: 'Inventory', icon: CircleStackIcon, href: '/dashboard/inventory' },
//   { name: 'Customers', icon: UserGroupIcon, href: '/dashboard/customers' },
//   { name: 'Suppliers', icon: TruckIcon, href: '/dashboard/suppliers' },
//   { name: 'Payments', icon: BanknotesIcon, href: '/dashboard/payments' },
//   { name: 'Reports', icon: DocumentChartBarIcon, href: '/dashboard/reports' },
//   { name: 'Staff Management', icon: UsersIcon, href: '/dashboard/staff' },
//   { name: 'Settings', icon: Cog6ToothIcon, href: '/dashboard/settings' },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();
  
//   // ===== 3. NAYI STATE VARIABLE BANAYI GAYI HAI =====
//   const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

//   return (
//     // Fragment (<>) ka istemaal zaroori hai, kyunki ab 2 elements hain: aside aur modal
//     <> 
//       <aside className="bg-white w-64 flex-shrink-0 flex flex-col shadow-2xl">
        
//         {/* --- LOGO & NAVIGATION LINKS SECTION (No Changes Needed) --- */}
//         <div className="h-20 flex items-center justify-center border-b px-6">
//           <Link href="/dashboard" className="group w-full">
//             <div className="relative flex items-center h-12 transform transition-transform duration-300 ease-out group-hover:scale-105">
//               <BuildingStorefrontIcon className="h-12 w-12 text-slate-700 absolute left-2 top-1/2 -translate-y-1/2 z-10" />
//               <div className="absolute left-8 h-10 w-[160px] bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-r-lg rounded-bl-[24px] flex items-center justify-center z-20 shadow-lg">
//                 <span 
//                   className="text-white font-bold text-lg tracking-wider pl-6"
//                   style={{ textShadow: '0px 1px 2px rgba(0, 0, 0, 0.4)' }}
//                 >
//                   POS System
//                 </span>
//               </div>
//             </div>
//           </Link>
//         </div>
//         <nav className="flex-1 overflow-y-auto pt-4">
//           <ul>
//             {menuItems.map((item) => {
//               const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
//               return (
//                 <li key={item.name} className="px-4 mb-1">
//                   <Link href={item.href}>
//                     <div className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${ isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100' }`}>
//                       <item.icon className={`h-6 w-6 mr-3 ${ isActive ? 'text-white' : 'text-gray-500' }`} />
//                       <span className="font-medium text-sm">{item.name}</span>
//                     </div>
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         {/* --- BOTTOM USER/LOGOUT SECTION (Yahan Badlav Hua Hai) --- */}
//         <div className="p-4 border-t mt-auto">
//           <Link href="/dashboard/profile" className="flex items-center p-3 w-full rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
//             <UserIcon className="h-6 w-6 mr-3 text-gray-500" />
//             <span className="font-medium text-sm">My Profile</span>
//           </Link>
          
//           {/* LOGOUT BUTTON AB SIRF MODAL KHOLEGA */}
//           <button
//             onClick={() => setIsLogoutModalOpen(true)} // Ab yeh sirf state ko badalta hai
//             className="flex items-center p-3 w-full rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
//           >
//             <ArrowRightOnRectangleIcon className="h-6 w-6 mr-3 text-gray-500" />
//             <span className="font-medium text-sm">Logout</span>
//           </button>
//         </div>
//       </aside>

//       {/* MODAL COMPONENT KO YAHAN RENDER KIYA GAYA HAI */}
//       <ConfirmationModal
//         isOpen={isLogoutModalOpen}
//         onClose={() => setIsLogoutModalOpen(false)}
//         onConfirm={() => signOut({ callbackUrl: '/login' })}
//         title="Confirm Logout"
//         message="Are you sure you want to log out of your account?"
//       />
//     </>
//   );
// }








//-----------------------------------------------------------





'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react'; 
import ConfirmationModal from '@/components/ConfirmationModal';

// Heroicons imports
import {
  Squares2X2Icon,
  ComputerDesktopIcon,
  ShoppingCartIcon,
  ArchiveBoxIcon,
  CircleStackIcon,
  UserGroupIcon,
  TruckIcon,
  BanknotesIcon,
  DocumentChartBarIcon,
  UsersIcon,
  Cog6ToothIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';

import { BuildingStorefrontIcon } from '@heroicons/react/24/solid';

const menuItems = [
  { name: 'Dashboard', icon: Squares2X2Icon, href: '/dashboard' },
  { name: 'POS Terminal', icon: ComputerDesktopIcon, href: '/dashboard/pos' },
  { name: 'Sales / Orders', icon: ShoppingCartIcon, href: '/dashboard/sales' },
  { name: 'Products', icon: ArchiveBoxIcon, href: '/dashboard/products' },
  { name: 'Inventory', icon: CircleStackIcon, href: '/dashboard/inventory' },
  { name: 'Customers', icon: UserGroupIcon, href: '/dashboard/customers' },
  { name: 'Suppliers', icon: TruckIcon, href: '/dashboard/suppliers' },
  { name: 'Payments', icon: BanknotesIcon, href: '/dashboard/payments' },
  { name: 'Reports', icon: DocumentChartBarIcon, href: '/dashboard/reports' },
  { name: 'Staff Management', icon: UsersIcon, href: '/dashboard/staff' },
  { name: 'Settings', icon: Cog6ToothIcon, href: '/dashboard/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Close sidebar when route changes
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        className={`md:hidden fixed z-50 top-4 left-4 p-2 rounded-md bg-white shadow-lg transition-all ${
          isMobileSidebarOpen ? 'rotate-90' : ''
        }`}
        aria-label="Toggle menu"
      >
        {isMobileSidebarOpen ? (
          <XMarkIcon className="h-6 w-6 text-gray-700" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-gray-700" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          bg-white w-64 flex-shrink-0 flex flex-col shadow-2xl
          fixed md:relative h-full z-40 transition-all duration-300
          ${isMobile ? 'transform' : ''}
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-center border-b px-6">
          <Link href="/dashboard" className="group w-full">
            <div className="relative flex items-center h-12 transform transition-transform duration-300 ease-out group-hover:scale-105">
              <BuildingStorefrontIcon className="h-12 w-12 text-slate-700 absolute left-2 top-1/2 -translate-y-1/2 z-10" />
              <div className="absolute left-8 h-10 w-[160px] bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-r-lg rounded-bl-[24px] flex items-center justify-center z-20 shadow-lg">
                <span 
                  className="text-white font-bold text-lg tracking-wider pl-6"
                  style={{ textShadow: '0px 1px 2px rgba(0, 0, 0, 0.4)' }}
                >
                  POS System
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto pt-4">
          <ul>
            {menuItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/dashboard' && pathname.startsWith(item.href));
              return (
                <li key={item.name} className="px-4 mb-1">
                  <Link href={item.href}>
                    <div className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                      isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                    }`}>
                      <item.icon className={`h-6 w-6 mr-3 ${
                        isActive ? 'text-white' : 'text-gray-500'
                      }`} />
                      <span className="font-medium text-sm">{item.name}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t mt-auto">
          <Link 
            href="/dashboard/profile" 
            className="flex items-center p-3 w-full rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <UserIcon className="h-6 w-6 mr-3 text-gray-500" />
            <span className="font-medium text-sm">My Profile</span>
          </Link>
          
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="flex items-center p-3 w-full rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <ArrowRightOnRectangleIcon className="h-6 w-6 mr-3 text-gray-500" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileSidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => signOut({ callbackUrl: '/login' })}
        title="Confirm Logout"
        message="Are you sure you want to log out of your account?"
      />
    </>
  );
}