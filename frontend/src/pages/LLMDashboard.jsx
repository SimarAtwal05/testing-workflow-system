import { useEffect, useState } from "react";
import api from "../services/api";

function LLMDashboard() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const runAnalysis = async () => {
    try {
      setLoading(true);

      const res = await api.get("/llm/test");

      setAnalysis(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to run LLM analysis");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runAnalysis();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>LLM Reviewer Dashboard</h1>

      <button onClick={runAnalysis} disabled={loading}>
        {loading ? "Analyzing..." : "Run Analysis"}
      </button>

      <hr />

      {analysis && (
        <pre
          style={{
            background: "#111",
            color: "#0f0",
            padding: "15px",
            marginTop: "20px",
          }}
        >
          {JSON.stringify(analysis, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default LLMDashboard;