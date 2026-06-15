import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ReportPage() {
  const { id } = useParams();

  const [report, setReport] = useState(null);

  const loadReport = async () => {
    try {

      const res =
        await api.get(
          `/reports/${id}`
        );

      setReport(res.data);

    } catch (error) {

      console.error(error);

      alert(
        "Failed To Load Report"
      );

    }
  };

  useEffect(() => {
    loadReport();
  }, []);

  if (!report) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      style={{
        padding: "20px"
      }}
    >

      <h1>
        Testing Report
      </h1>

      <hr />

      <p>
        <strong>
          Request ID:
        </strong>{" "}
        {report.requestId}
      </p>

      <p>
        <strong>
          Test Type:
        </strong>{" "}
        {report.testType}
      </p>

      <p>
        <strong>
          Temperature:
        </strong>{" "}
        {report.temperature ??
          "N/A"}
      </p>

      <p>
        <strong>
          Observations:
        </strong>{" "}
        {report.observations}
      </p>

      <p>
        <strong>
          Conclusion:
        </strong>{" "}
        {report.conclusion}
      </p>

      <hr />

      <p>
        <strong>
          Tested By:
        </strong>{" "}
        {report.testedBy}
      </p>

      <p>
        <strong>
          Approved By:
        </strong>{" "}
        {report.approvedBy}
      </p>

    </div>
  );
}

export default ReportPage;