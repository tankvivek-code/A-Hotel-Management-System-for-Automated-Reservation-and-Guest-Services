import { Outlet } from "react-router-dom";

const ManagerLayout = () => {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
    </main>
  );
};

export default ManagerLayout;
