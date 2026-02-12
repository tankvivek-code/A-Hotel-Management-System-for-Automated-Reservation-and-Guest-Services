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
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      <div className="mb-8">
        <AdminQuickActionCards />
      </div>

      {/* ================= USER FORM ================= */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="font-semibold mb-4">
          {editingUser ? "Edit User" : "Create User"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Primaryinput
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Primaryinput
            placeholder="Email"
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
            className="border rounded px-3 py-2"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        <div className="mt-4 flex gap-3">
          {editingUser ? (
            <>
              <PrimaryButton
                className="bg-yellow-500"
                text="Update"
                onClick={updateUser}
              />
              <PrimaryButton
                className="bg-gray-400"
                text="Cancel"
                onClick={resetForm}
              />
            </>
          ) : (
            <PrimaryButton
              className="bg-green-600"
              text="Create"
              onClick={createUser}
            />
          )}
        </div>
      </div>

      {/* ================= USERS TABLE ================= */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 capitalize">{u.role}</td>
                  <td className="p-3 flex gap-2">
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
                    />

                    <PrimaryButton
                      className="bg-red-600"
                      text="Delete"
                      onClick={() => deleteUser(u._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <p className="text-center text-slate-500 py-4">No users found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
