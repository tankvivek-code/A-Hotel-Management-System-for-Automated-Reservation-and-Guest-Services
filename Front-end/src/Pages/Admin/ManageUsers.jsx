import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../Component/PrimaryButton";
import Primaryinput from "../../Component/Primaryinput";
import AdminQuickActionCards from "../../Component/common/adminQuickActionCards";

const API = "http://localhost:5000/api/admin/users";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const token = localStorage.getItem("accessToken");

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    const res = await axios.get(API, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= CREATE USER ================= */
  const createUser = async () => {
    await axios.post(API, form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    resetForm();
    fetchUsers();
  };

  /* ================= UPDATE USER ================= */
  const updateUser = async () => {
    const payload = {
      name: form.name,
      role: form.role,
    };

    if (form.password.trim() !== "") {
      payload.password = form.password;
    }

    await axios.put(`${API}/${editingUser._id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    resetForm();
    fetchUsers();
  };

  /* ================= DELETE USER ================= */
  const deleteUser = async (id) => {
    await axios.delete(`${API}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUsers();
  };

  const resetForm = () => {
    setEditingUser(null);
    setForm({ name: "", email: "", password: "", role: "user" });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Manage Users</h1>
        <p className="text-slate-500 text-sm">
          Create, update and manage system users
        </p>
      </div>

      <AdminQuickActionCards />

      {/* USER FORM */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h2 className="text-lg font-semibold mb-6">
          {editingUser ? "Edit User" : "Create New User"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Primaryinput
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Primaryinput
            placeholder="Email Address"
            disabled={editingUser}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <Primaryinput
            type="password"
            placeholder={editingUser ? "New Password (optional)" : "Password"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <select
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 transition"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {editingUser ? (
            <>
              <PrimaryButton
                text="Update User"
                onClick={updateUser}
                className="bg-yellow-500 hover:bg-yellow-600"
              />
              <PrimaryButton
                text="Cancel"
                onClick={resetForm}
                className="bg-gray-400 hover:bg-gray-500"
              />
            </>
          ) : (
            <PrimaryButton
              text="Create User"
              onClick={createUser}
              className="bg-green-600 hover:bg-green-700"
            />
          )}
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u._id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className="px-4 py-3 text-slate-600">{u.email}</td>
                  <td className="px-4 py-3 capitalize">{u.role}</td>
                  <td className="px-4 py-3 flex flex-wrap gap-2">
                    <PrimaryButton
                      text="Edit"
                      onClick={() => {
                        setEditingUser(u);
                        setForm({
                          name: u.name,
                          email: u.email,
                          password: "",
                          role: u.role,
                        });
                      }}
                      className="bg-blue-600 hover:bg-blue-700"
                    />
                    <PrimaryButton
                      text="Delete"
                      onClick={() => deleteUser(u._id)}
                      className="bg-red-600 hover:bg-red-700"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <p className="text-center py-6 text-slate-500">No users found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
