import { Outlet } from "react-router-dom";

const ManagerLayout = () => {
  return (
    <>
      {/* MANAGER CONTENT */}
      <main className="min-h-screen bg-slate-50 p-4 md:p-8">
        <Outlet />
      </main>
    </>
  );
};

export default ManagerLayout;
