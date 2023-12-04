import React from 'react';
import {Redirect, useLocation} from '@docusaurus/router';

const Index = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const requestPath = queryParams.get("request_path");
  if (requestPath) { 
    return <Redirect to={requestPath} />;
  } else {
    return <Redirect to="/docs/consumer/getting-started/swift-api-platform" />;
  }
};

export default Index;