import { useEffect, useState } from "react";
import api from "../services/api";

function HeadDashboard() {
  const [requests, setRequests] = useState([]);
  const [engineers, setEngineers] = useState([]);

  const loadRequests = async () => {
    try {
      const res = await api.get("/requests");
      setRequests(res.data);
    } catch (error) {
      console.error("Failed to load requests:", error);
    }
  };

  const loadEngineers = async () => {
    const fakeEngineers = [
      { id: 1, name: "Engineer A" },
      { id: 2, name: "Engineer B" },
      { id: 3, name: "Engineer C" }
    ];

    setEngineers(fakeEngineers);
  };

  useEffect(() => {
    loadRequests();
    loadEngineers();
  }, []);

  const assignEngineer = async (requestId, engineerId) => {
    if (!engineerId) return;

    try {
      await api.patch(`/requests/${requestId}/assign`, {
        engineerId: Number(engineerId),
      });

      await loadRequests();

      alert("Engineer Assigned");
    } catch (error) {
      console.error(error);
      alert("Assignment Failed");
    }
  };

  const approveRequest = async (requestId) => {
    try {
      await api.patch(`/requests/${requestId}/approve`);

      await loadRequests();

      alert("Request Approved");
    } catch (error) {
      console.error(error);
      alert("Approval Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Head Dashboard</h1>
      <hr />

      <h2>All Testing Requests</h2>

      {requests.length === 0 ? (
        <p>No Requests Found</p>
      ) : (
        requests.map((request) => (
          <div
            key={request.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <h3>Request #{request.id}</h3>

            <p>
              <strong>Type:</strong> {request.testType}
            </p>

            <p>
              <strong>Status:</strong> {request.status}
            </p>

            <p>
              <strong>Temperature:</strong>{" "}
              {request.temperature ?? "N/A"}
            </p>

            <p>
              <strong>Created By:</strong>{" "}
              {request.createdBy?.name ||
                request.createdBy?.email ||
                "Unknown"}
            </p>

            <p>
              <strong>Assigned Engineer:</strong>{" "}
              {request.assignedEngineer?.name || "Not Assigned"}
            </p>

            <hr />

            <h4>Assign Engineer</h4>

            <select
              defaultValue=""
              onChange={(e) =>
                assignEngineer(request.id, e.target.value)
              }
            >
              <option value="">Select Engineer</option>

              {engineers.map((eng) => (
                <option key={eng.id} value={eng.id}>
                  {eng.name}
                </option>
              ))}
            </select>

            <br />
            <br />

            {request.status === "PENDING_APPROVAL" && (
              <button onClick={() => approveRequest(request.id)}>
                Approve Request
              </button>
            )}

            {request.status === "APPROVED" && (
              <a href={`/report/${request.id}`}>
                <button>View Report</button>
              </a>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default HeadDashboard;