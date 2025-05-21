import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import { LanguageProvider } from "./context/LanguageContext"; 
import { BrowserRouter as Router } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { Banner } from "./components/Banner";
import { UploadForm } from "./components/UploadForm";
import { Roadmap } from "./components/Roadmap";
import { MetricsDescription } from "./components/MetricsDescription";
function App() {
  return (
    <LanguageProvider>
      <Router>
        <NavBar/>
        <Banner/>
        <UploadForm/>
        <Roadmap/>
        <MetricsDescription/>
        <Footer/>
      </Router>
    </LanguageProvider>
  );
}
export default App;