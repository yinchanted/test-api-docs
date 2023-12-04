import { useState, useEffect } from "react"
import CodeBlock from "@theme/CodeBlock"
import { getAppCredentials, getJwt, getQuote } from "./utils"
import Button from "@site/src/components/button/Button";

const TokenRequest = () => {
  const [request, setRequest] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    sessionStorage.removeItem("accessToken");
  }, []);

  const makeRequest = async () => {
    const validJwt = getJwt();
    if (!validJwt) {
      return;
    }

    const { consumerKey, consumerSecret } = getAppCredentials();
    const jwt = getJwt();

    const quote = getQuote();

    const req = `curl -H ${quote}Content-Type: application/x-www-form-urlencoded${quote} -H ${quote}Authorization: Basic ${btoa(
      `${consumerKey}:${consumerSecret}`
    )}${quote} -d ${quote}grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&scope=swift.preval!p&assertion=${jwt}${quote} https://sandbox.swift.com/oauth2/v1/token`;

    setResponse({
      refresh_token_expires_in: "86399",
      token_type: "Bearer",
      access_token: "xArFyOryUlP9uohTzTPBhdanmvMm",
      refresh_token: "GZt3cFKdwbS9ArcmbVdMASpucnAR1Qyw",
      expires_in: "1799",
    });

    setRequest(req);
  };

  return (
    <>
      <Button text="Build OAuth token request" onClickHandler={makeRequest} />
      {request && (
        <div style={{ marginTop: "20px" }}>
          <p>Execute the cURL to make the API call from the terminal</p>
          <CodeBlock
            language="bash"
            title="cURL command to make the OAuth token request"
          >
            {request}
          </CodeBlock>
          <p>The response of the cURL command should look like this:</p>
          <CodeBlock
            language="json"
            title="Token response example with the access token"
            metastring="{4}"
          >
            {JSON.stringify(response, null, 2)}
          </CodeBlock>
          <p>
            Copy the access token from the response. It is valid for 30 minutes.
          </p>
          <input
            id="accessToken"
            style={{
              padding: "10px",
              fontSize: "16px",
              border: "2px solid var(--ifm-color-primary)",
              borderRadius: "4px",
            }}
            type="text"
            placeholder="Access token"
            onChange={(e) =>
              sessionStorage.setItem("accessToken", e.target.value)
            }
          />
        </div>
      )}
    </>
  );
};

export default TokenRequest;
