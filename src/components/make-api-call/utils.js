export function getAppCredentials() {
  const consumerKey = sessionStorage.getItem("consumerKey");
  const consumerSecret = sessionStorage.getItem("consumerSecret");  
  if (!consumerKey || !consumerSecret) {
    const element = document.getElementById("consumerKey");
    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.scrollY;
    const middle = absoluteElementTop - window.innerHeight / 2;
    window.scrollTo(0, middle);
    alert("Both Consumer Key and Consumer Secret must be set");
  }

  return { consumerKey, consumerSecret };
}

export function getCertificate() {
  const certificate = sessionStorage.getItem("certificate");
  const privateKey = sessionStorage.getItem("privateKey");
  if (!certificate) {
    const element = document.getElementById("generateCertificate");
    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.scrollY;
    const middle = absoluteElementTop - window.innerHeight / 2;
    window.scrollTo(0, middle);
    alert("Generate certificate first");
  }
  return { certificate, privateKey };
}

export function getJwt() {
  const jwt = sessionStorage.getItem("jwt");
  if (!jwt) {
    const element = document.getElementById("generateJwt");
    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.scrollY;
    const middle = absoluteElementTop - window.innerHeight / 2;
    window.scrollTo(0, middle);
    alert("Generate JWT first");
    return null;
  }
  return jwt;
}

export function getAccessToken() {
  const accessToken = sessionStorage.getItem("accessToken");
  if (!accessToken) {
    const element = document.getElementById("accessToken");
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.scrollY;
      const middle = absoluteElementTop - window.innerHeight / 2;
      window.scrollTo(0, middle);
      alert("Copy the access token from the response of the cURL command first");
    } else {
      alert("Retrieve the OAuth access token first");
    }
  }
  return accessToken;
}

export function isWindows() {
  const userAgent = window.navigator.userAgent;
  return userAgent.indexOf("Win") != -1;
}

export function getQuote() {
  return isWindows() ? '"' : "'";
}

export function getEscapeCharacter() {
  return isWindows() ? "\\" : "";
}

export function arrayBufferToBase64(arrayBuffer) {
  const byteArray = new Uint8Array(arrayBuffer);
  let byteString = "";
  byteArray.forEach((byte) => {
    byteString += String.fromCharCode(byte);
  });
  return btoa(byteString);
}

export function base64UrlEncode(str) {
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export function stringToUint8Array(contents) {
  const encoded = btoa(encodeURIComponent(contents));
  return base64ToUint8Array(encoded);
}

export function base64ToUint8Array(base64Contents) {
  base64Contents = base64UrlEncode(base64Contents);
  const content = atob(base64Contents);
  return new Uint8Array(content.split("").map((c) => c.charCodeAt(0)));
}