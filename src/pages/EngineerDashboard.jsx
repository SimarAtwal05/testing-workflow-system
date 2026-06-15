import { useEffect, useState } from "react";
import api from "../services/api";

function EngineerDashboard() {

  const [requests, setRequests] = useState([]);

  const [observations, setObservations] = useState({});
  const [conclusions, setConclusions] = useState({});

  const loadRequests = async () => {
    try {

      const res =
        await api.get(
          "/requests/assigned/me"
        );

      setRequests(res.data);

    } catch (error) {

      console.error(error);

    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const submitResult = async (
    requestId
  ) => {

    try {

      await api.post(
        "/results",
        {
          requestId,

          observations:
            observations[
              requestId
            ] || "",

          conclusion:
            conclusions[
              requestId
            ] || ""
        }
      );

      alert(
        "Result Submitted"
      );

      loadRequests();

    } catch (error) {

      console.error(error);

      alert(
        "Submission Failed"
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
        Engineer Dashboard
      </h1>

      <hr />

      <h2>
        Assigned Requests
      </h2>

      {requests.length === 0 ? (

        <p>
          No Requests Assigned
        </p>

      ) : (

        requests.map(
          (request) => (

            <div
              key={request.id}
              style={{
                border:
                  "1px solid #ccc",
                padding: "15px",
                marginBottom:
                  "15px",
                borderRadius:
                  "8px"
              }}
            >

              <h3>
                Request #
                {request.id}
              </h3>

              <p>
                <strong>
                  Type:
                </strong>{" "}
                {
                  request.testType
                }
              </p>

              <p>
                <strong>
                  Status:
                </strong>{" "}
                {
                  request.status
                }
              </p>

              <p>
                <strong>
                  Temperature:
                </strong>{" "}
                {
                  request.temperature ??
                  "N/A"
                }
              </p>

              {request.result ? (

                <div>

                  <h4>
                    Submitted
                    Result
                  </h4>

                  <p>
                    <strong>
                      Observations:
                    </strong>{" "}
                    {
                      request
                        .result
                        .observations
                    }
                  </p>

                  <p>
                    <strong>
                      Conclusion:
                    </strong>{" "}
                    {
                      request
                        .result
                        .conclusion
                    }
                  </p>

                </div>

              ) : (

                <>

                  <textarea
                    placeholder="Observations"
                    rows="4"
                    cols="50"
                    onChange={(
                      e
                    ) =>
                      setObservations(
                        {
                          ...observations,
                          [request.id]:
                            e
                              .target
                              .value
                        }
                      )
                    }
                  />

                  <br />
                  <br />

                  <textarea
                    placeholder="Conclusion"
                    rows="4"
                    cols="50"
                    onChange={(
                      e
                    ) =>
                      setConclusions(
                        {
                          ...conclusions,
                          [request.id]:
                            e
                              .target
                              .value
                        }
                      )
                    }
                  />

                  <br />
                  <br />

                  <button
  onClick={() =>
    submitResult(
      request.id,
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
    submitResult(
      request.id,
      "SUBMITTED"
    )
  }
>
  Submit Result
</button>
                </>

              )}

            </div>

          )
        )

      )}

    </div>
  );
}

export default EngineerDashboard;