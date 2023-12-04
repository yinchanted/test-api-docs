import { useEffect, useState } from "react";
import CodeBlock from "@theme/CodeBlock";
import Button from "@site/src/components/button/Button";
import * as x509 from "@peculiar/x509";
import { arrayBufferToBase64, getAppCredentials } from "./utils";

const Certificates = ({}) => {
  const [privateKeyPem, setPrivateKeyPem] = useState(null);
  const [publicKeyPem, setPublicKeyPem] = useState(null);
  const [generatingKeyPairs, setGeneratingKeyPairs] = useState(false);

  useEffect(() => {
    sessionStorage.removeItem("privateKey");
    sessionStorage.removeItem("certificate");
  }, []);

  const generateKeyPair = async () => {
    try {
      const { consumerKey } = getAppCredentials();
      if (!consumerKey) {
        return;
      }

      setGeneratingKeyPairs(true);

      x509.cryptoProvider.set(crypto);

      const alg = {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-256",
        publicExponent: new Uint8Array([1, 0, 1]),
        modulusLength: 2048,
      };

      const keys = await crypto.subtle.generateKey(alg, true, [
        "sign",
        "verify",
      ]);

      const cert = await x509.X509CertificateGenerator.createSelfSigned({
        serialNumber: "01",
        name: "CN=selfsigned,O=swift",
        notBefore: new Date(
          new Date().setFullYear(new Date().getFullYear() - 1)
        ),
        notAfter: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ),
        signingAlgorithm: alg,
        keys,
        extensions: [
          await x509.SubjectKeyIdentifierExtension.create(keys.publicKey),
        ],
      });

      const certPem = cert.toString("pem");

      const privateKeyBuffer = await crypto.subtle.exportKey(
        "pkcs8",
        keys.privateKey
      );
      const exportedKey = await crypto.subtle.exportKey("jwk", keys.privateKey);
      sessionStorage.setItem("privateKey", JSON.stringify(exportedKey));
      sessionStorage.setItem("certificate", certPem);

      setPrivateKeyPem(privateKeyToPem(privateKeyBuffer));
      setPublicKeyPem(certPem);
    } finally {
      setGeneratingKeyPairs(false);
    }
  };

  function privateKeyToPem(key) {
    const pemContents = arrayBufferToBase64(key);
    return `-----BEGIN PRIVATE KEY-----\n${pemContents}\n-----END PRIVATE KEY-----`;
  }

  return (
    <>
      <Button
        id="generateCertificate"
        text="Generate self-signed certificate"
        onClickHandler={generateKeyPair}
        disabled={generatingKeyPairs}
      />
      {privateKeyPem && publicKeyPem && (
        <div style={{ marginTop: "20px" }}>
          <CodeBlock
            style={{ marginBottom: "0" }}
            language="cert"
            title="Public key"
          >
            {publicKeyPem}
          </CodeBlock>
          <CodeBlock
            style={{ marginBottom: "0" }}
            language="cert"
            title="Private Key"
          >
            {privateKeyPem}
          </CodeBlock>
        </div>
      )}
    </>
  );
};

export default Certificates;
