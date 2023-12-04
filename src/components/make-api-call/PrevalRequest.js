import { useState } from "react";
import CodeBlock from "@theme/CodeBlock";
import { getAccessToken, getQuote, isWindows } from "./utils";
import Button from "@site/src/components/button/Button";

const PrevalRequest = () => {
  const [request, setRequest] = useState(null);

  const makeRequest = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      return;
    }

    let payload = JSON.stringify({
      correlation_identifier: "112211221122",
      context: "BENR",
      uetr: "97ed4827-7b6f-4491-a06f-b548d5a7512d",
      creditor_account: "7892368367",
      creditor_name: "DEF Electronics",
      creditor_agent: { bicfi: "AAAAUS2L" },
    });

    if (isWindows()) {
      payload = payload.replace(/"/g, '\\"');
    }

    const quote = getQuote();
    const req =
      `curl -H ${quote}Content-Type: application/json${quote}` +
      ` -H ${quote}x-bic: cclabebb${quote}` +
      ` -H ${quote}Authorization: Bearer ${accessToken}${quote}` +
      ` -d ${quote}${payload}${quote}` +
      ` https://sandbox.swift.com/swift-preval-pilot/v2/accounts/verification`;
    setRequest(req);
  };

  return (
    <>
      <Button
        text="Build Pre-Validation request"
        onClickHandler={makeRequest}
      />
      {request && (
        <div style={{ marginTop: "20px" }}>
          <p>
            Execute the cURL to make the API call and copy the access token from
            the response and
          </p>
          <CodeBlock
            language="bash"
            title="cURL command to make the Pre-Validation request"
          >
            {request}
          </CodeBlock>
        </div>
      )}
    </>
  );
};

export default PrevalRequest;
