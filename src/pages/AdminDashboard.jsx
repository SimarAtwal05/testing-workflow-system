import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ENGINEER");

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("ENGINEER");

  const loadUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const createUser = async () => {
    try {
      await api.post("/admin/users", {
        name,
        email,
        password,
        role,
      });

      setName("");
      setEmail("");
      setPassword("");
      setRole("ENGINEER");

      loadUsers();

      alert("User Created Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to create user");
    }
  };

  const updateUser = async (id) => {
    try {
      await api.put(`/admin/users/${id}`, {
        name: editName,
        role: editRole,
      });

      setEditingId(null);

      loadUsers();

      alert("User Updated Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update user");
    }
  };

  const deleteUser = async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this user?"
      );

      if (!confirmed) return;

      await api.delete(`/admin/users/${id}`);

      loadUsers();

      alert("User Deleted Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete user");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <hr />

      <h2>Create User</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="ADMIN">ADMIN</option>
        <option value="HEAD">HEAD</option>
        <option value="ENGINEER">ENGINEER</option>
      </select>

      <br />
      <br />

      <button onClick={createUser}>
        Create User
      </button>

      <hr />

      <h2>All Users</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            {editingId === user.id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) =>
                    setEditName(e.target.value)
                  }
                />

                <br />
                <br />

                <select
                  value={editRole}
                  onChange={(e) =>
                    setEditRole(e.target.value)
                  }
                >
                  <option value="ADMIN">
                    ADMIN
                  </option>

                  <option value="HEAD">
                    HEAD
                  </option>

                  <option value="ENGINEER">
                    ENGINEER
                  </option>
                </select>

                <br />
                <br />

                <button
                  onClick={() =>
                    updateUser(user.id)
                  }
                >
                  Save
                </button>

                <button
                  onClick={() =>
                    setEditingId(null)
                  }
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p>
                  <strong>ID:</strong>{" "}
                  {user.id}
                </p>

                <p>
                  <strong>Name:</strong>{" "}
                  {user.name}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {user.email}
                </p>

                <p>
                  <strong>Role:</strong>{" "}
                  {user.role}
                </p>

                <button
                  onClick={() => {
                    setEditingId(user.id);
                    setEditName(user.name);
                    setEditRole(user.role);
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteUser(user.id)
                  }
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;