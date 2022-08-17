import About from "../components/About";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import NavBar from "../components/NavBar";
import Resume from "../components/Resume";
import { usePortfolio } from "../store/PortfolioContext";

const HomePage = () => {
  const { loading } = usePortfolio();
  if (loading) return <LoadingSpinner />;
  return (
    <div>
      <NavBar />
      <Hero />
      <Contact />
      <About />
      <Resume />
      <Footer />
    </div>
  );
};

export default HomePage;
