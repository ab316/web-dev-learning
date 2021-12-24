import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import TextEditor from "./TextEditor";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={`/documents/${uuidv4()}`} />}
          />
          <Route path="/documents/:id" element={<TextEditor />} />
        </Routes>
        {/* <TextEditor /> */}
      </Router>
    </div>
  );
}

export default App;
