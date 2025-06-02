import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import { LanguageProvider } from "./context/LanguageContext"; 
import { BrowserRouter as Router } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { Banner } from "./components/Banner";
import { UploadForm } from "./components/UploadForm";
import { MetricsDescription } from "./components/MetricsDescription";
import { ModelMetrics } from "./components/ModelMetrics";
import { Demo } from "./components/Demo";

const API_URL = process.env.REACT_APP_API_URL+"/video";

function App() {
  
  return (
    <LanguageProvider>
      <Router>
        <NavBar/>
        <Banner/>
        <UploadForm apiUrl={API_URL}/>
        <Demo/>
        <ModelMetrics/>
        <MetricsDescription/>
        <Footer/>
      </Router>
    </LanguageProvider>
  );
}
export default App;