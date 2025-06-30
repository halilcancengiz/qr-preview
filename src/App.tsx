// src/App.tsx

import AppRoutes from "./routes/AppRoutes";
import "./index.css"
function App() {

  return (
    <div className="min-h-screen overflow-x-hidden flex">
      <AppRoutes />
    </div>
  );
}

export default App;