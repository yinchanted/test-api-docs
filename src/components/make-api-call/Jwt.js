import { useState, useEffect } from "react"
import Button from "@site/src/components/button/Button";
import CodeBlock from "@theme/CodeBlock"
import {
  getAppCredentials,
  getCertificate,
  base64UrlEncode,
  stringToUint8Array,
  arrayBufferToBase64,
} from "./utils";
import Admonition from "@theme/Admonition"

const Jwt = ({}) => {
  const [jwtHeader, setJwtHeader] = useState(null);
  const [jwtPayload, setJwtPayload] = useState(null);
  const [encodedJwt, setEncodedJwt] = useState(null);
  const [generatingJwt, setGeneratingJwt] = useState(false);

  useEffect(() => {
    sessionStorage.removeItem("jwt");
  }, []);

  const generateJwt = async () => {
    try {
      const { consumerKey } = getAppCredentials();
      if (!consumerKey) {
        return;
      }

      const { certificate, privateKey } = getCertificate();
      if (!certificate) {
        return;
      }

      const key = await crypto.subtle.importKey(
        "jwk",
        JSON.parse(privateKey),
        {
          name: "RSASSA-PKCS1-v1_5",
          hash: "SHA-256",
        },
        true,
        ["sign"]
      );

      setGeneratingJwt(true);

      const x5c = certificate
        .replace(/-----BEGIN CERTIFICATE-----/, "")
        .replace(/-----END CERTIFICATE-----/, "")
        .replace(/\n/g, "");

      const header = { alg: "RS256", typ: "JWT", x5c: [x5c] };
      setJwtHeader(header);

      const payload = {
        iss: getAppCredentials().consumerKey,
        sub: "CN=selfsigned,O=swift",
        aud: "sandbox.swift.com/oauth2/v1/token",
        exp: Math.floor(Date.now() / 1000) + 15 * 60,
        iat: Math.floor(Date.now() / 1000),
        nbf: Math.floor(Date.now() / 1000),
        jti:
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
      };

      setJwtPayload(payload);

      const base64Header = base64UrlEncode(btoa(JSON.stringify(header)));
      const base64Payload = base64UrlEncode(btoa(JSON.stringify(payload)));

      const signature = await crypto.subtle.sign(
        {
          name: "RSASSA-PKCS1-v1_5",
          hash: "SHA-256",
        },
        key,
        stringToUint8Array(`${base64Header}.${base64Payload}`)
      );

      const base64Signature = base64UrlEncode(arrayBufferToBase64(signature));
      const encoded = `${base64Header}.${base64Payload}.${base64Signature}`;

      // Store the encoded JWT
      setEncodedJwt(encoded);
      sessionStorage.setItem("jwt", encoded);
    } finally {
      setGeneratingJwt(false);
    }
  };

  const openJwtIo = () => {
    const url = `https://jwt.io/#debugger-io?token=${encodedJwt}`;
    window.open(url, "_blank");
  }

  return (
    <>
      <Button
        id="generateJwt"
        disabled={generatingJwt}
        text="Generate and sign JWT"
        onClickHandler={generateJwt}
      />
      {jwtHeader && jwtPayload && encodedJwt && (
        <>
          <div style={{ marginTop: "20px" }}>
            <CodeBlock language="json" title="JWT Header">
              {JSON.stringify(jwtHeader, null, 2)}
            </CodeBlock>
            <CodeBlock language="json" title="JWT Payload">
              {JSON.stringify(jwtPayload, null, 2)}
            </CodeBlock>
            <CodeBlock
              language="jwt"
              title="Encoded JWT including the signature"
            >
              {encodedJwt}
            </CodeBlock>
          </div>
          <Admonition type="info">
            <p>
              <a href="https://jwt.io" target="_blank">
                jwt.io
              </a>{" "}
              can also be used to decode the JWT and see the header and payload
              in a more readable format.
            </p>
            <Button
              text="Decode token on jwt.io"
              onClickHandler={openJwtIo}
            />
          </Admonition>
        </>
      )}
    </>
  );
};

export default Jwt;
