import { useEffect, useState } from "react"

const AppCredentials = () => {
  const [consumerKey, setConsumerKey] = useState('');
  const [consumerSecret, setConsumerSecret] = useState('');

  useEffect(() => {
    //setConsumerKey(sessionStorage.getItem("consumerKey"));
    //setConsumerSecret(sessionStorage.getItem("consumerSecret"));
    setConsumerKey("82QSBEAQsBdwuNF6sTjAaYCRLOKG2vtj");
    setConsumerSecret("HMge6LGk11TnlapQ");
  }, []);

  useEffect(() => {
    if (consumerKey !== null) {
      sessionStorage.setItem("consumerKey", consumerKey);
    }
  }, [consumerKey]);

  useEffect(() => {
    if (consumerSecret !== null) {
      sessionStorage.setItem("consumerSecret", consumerSecret);
    }
  }, [consumerSecret]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", maxWidth: "200px" }}
    >
      <input
        id="consumerKey"
        style={{
          padding: "10px",
          fontSize: "16px",
          marginBottom: "10px",
          border: "2px solid var(--ifm-color-primary)",
          borderRadius: "4px",
        }}
        type="text"
        placeholder="Consumer Key"
        value={consumerKey}
        onChange={(e) => setConsumerKey(e.target.value)}
      />
      <input
        id="consumerSecret"
        style={{
          padding: "10px",
          fontSize: "16px",
          border: "2px solid var(--ifm-color-primary)",
          borderRadius: "4px",
        }}
        type="text"
        placeholder="Consumer Secret"
        value={consumerSecret}
        onChange={(e) => setConsumerSecret(e.target.value)}
      />
    </div>
  );
};

export default AppCredentials;
