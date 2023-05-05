import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Importing context providers
import { UserContextProvider } from "./context/UserContext";
import { ReloaderContextProvider } from "./context/Reloader";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ReloaderContextProvider>
        <UserContextProvider>
            <App />
        </UserContextProvider>
    </ReloaderContextProvider>
);