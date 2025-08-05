import Sidebar from "../components/Sidebar/page";

export default function DashboardLayout({ children }) {
  // 'children' woh page hoga jo is layout ke andar render hoga (jaise aap ka page.js)
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar (Left Side) */}
      <Sidebar />

      {/* Main Content Area (Right Side) */}
      {/* flex-1 isko baaqi sari jagah de dega */}
      {/* overflow-y-auto content lamba hone par scrollbar dega */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}