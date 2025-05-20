import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import { LanguageProvider } from "./context/LanguageContext"; 
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <LanguageProvider>
      <Router>

      </Router>
    </LanguageProvider>
  );
}
export default App;