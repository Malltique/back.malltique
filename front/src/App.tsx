import { useState } from "react";
import "./App.css";
import { AuthClient, CategoriesClient } from "./components";

function App() {
    const [tab, setTab] = useState("Auth");
    return (
        <div>
            <h1>Malltique backend</h1>
            <select
                onChange={(x) => {
                    setTab(x.target.value);
                }}
                value={tab}
                title="Active API"
                style={{ fontSize: "larger", marginBottom: "15px" }}
            >
                <option value="Auth">Auth</option>
                <option value="Categories">Categories</option>
            </select>

            {tab === "Auth" && <AuthClient />}
            {tab === "Categories" && <CategoriesClient />}
        </div>
    );
}

export default App;
