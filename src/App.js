import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GridDisplay from "./component/GridDisplay";
import UserLogin from "./component/UserLogin";
import "./App.css";
import ProfilePage from "./component/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<UserLogin />} />

        <Route path="/grid" element={<GridDisplay />} />

        <Route path="/profile/:id" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
