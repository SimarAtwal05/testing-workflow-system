import { useState } from "react";
import api from "../services/api";

function RequestDashboard() {

  const [testType, setTestType] =
    useState("NDT");

  const [temperature, setTemperature] =
    useState("");

  const createRequest = async (
    status
  ) => {

    try {

      await api.post(
        "/requests",
        {
          testType,
          temperature:
            testType === "NDT"
              ? Number(
                  temperature
                )
              : null,
          status
        }
      );

      alert(
        `Request ${status}`
      );

      setTemperature("");

    } catch (error) {

      console.error(error);

      alert(
        "Failed To Create Request"
      );

    }
  };

  return (
    <div
      style={{
        padding: "20px"
      }}
    >

      <h1>
        Testing Request Portal
      </h1>

      <hr />

      <label>
        Test Type
      </label>

      <br />

      <select
        value={testType}
        onChange={(e) =>
          setTestType(
            e.target.value
          )
        }
      >
        <option value="NDT">
          NDT
        </option>

        <option value="DT">
          DT
        </option>
      </select>

      <br />
      <br />

      {testType === "NDT" && (

        <>
          <label>
            Temperature
          </label>

          <br />

          <input
            type="number"
            value={temperature}
            onChange={(e) =>
              setTemperature(
                e.target.value
              )
            }
          />

          <br />
          <br />
        </>

      )}

      <button
        onClick={() =>
          createRequest(
            "DRAFT"
          )
        }
      >
        Save Draft
      </button>

      <button
        style={{
          marginLeft: "10px"
        }}
        onClick={() =>
          createRequest(
            "SUBMITTED"
          )
        }
      >
        Submit Request
      </button>

    </div>
  );
}

export default RequestDashboard;