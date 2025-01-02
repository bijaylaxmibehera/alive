import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.jsx";
import store from "./app/store.js";

const CLIENT_ID="446229778131-dmgf9up1bm38majt44k017bm4trl5m03.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <Router>
          <App />
        </Router>
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);
