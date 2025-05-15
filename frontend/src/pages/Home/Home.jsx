import { useAuth } from "../../hooks/useAuth";
import { Banner } from "../../components/Banner/Banner";
import { BienvenidaPublica } from "../../components/Bienvenida/BienvenidaPublica";
import { BienvenidaCliente } from "../../components/Bienvenida/BienvenidaCliente";
import { BienvenidaEntrenador } from "../../components/Bienvenida/BienvenidaEntrenador";
import { FeaturesSection } from "../../components/Section/FeaturesSection";
import "./Home.css";

export const Home = () => {
  const { usuario, isCliente, isEntrenador, isAutenticado } = useAuth();

  return (
    <div className="home-container">
      <Banner />
      <div className="home-card">
        {!isAutenticado && <BienvenidaPublica />}
        {isCliente && <BienvenidaCliente nombre={usuario.nombres} />}
        {isEntrenador && <BienvenidaEntrenador nombre={usuario.nombres} />}
      </div>
      <FeaturesSection />
    </div>
  );
};
