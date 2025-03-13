import { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
import AuthService from '../Services/AuthService';
import StyleService from "../Services/StyleService";
import { toast } from "react-toastify";

const NavBar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 428);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [styles, setStyles] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 428);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchStyle = async () => {
      try {
        const response = await StyleService.allStyle();
        setStyles(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStyle();
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    AuthService.logout();
    setIsMenuOpen(false);
    toast.error("Vous êtes maintenant déconnecté");
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleStyleClick = (styleId) => {
    // Force navigate with navigation trigger
    navigate(`/styleByID/${styleId}`, { replace: true });
    // Add reload if on the same page
    if (location.pathname.includes(`/styleByID/${styleId}`)) {
      window.location.reload();
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <Navbar className="Navbar">
        <div className="container-navbar">
          <Navbar.Brand>
            <Link className="navbar-titre" to={"/"}>M.GALERIE</Link>
          </Navbar.Brand>
          
          {!isMobile ? (
            <Nav className="nav-txt">
              {isAuthenticated === false ? (
                <>
                  <Link className="navbar-txt" to={"/signin"}>Inscription</Link>
                  <Link className="navbar-txt" to={"/login"}>Connexion</Link>
                </>
              ) : (
                <div className='nav-profil'>
                  <Link className="navbar-txt" to={"/profil"}>Profil</Link>
                  <Link className="navbar-txt" onClick={handleLogout}>Déconnexion</Link>
                </div>
              )}
            </Nav>
          ) : (
            <div className="burger-menu-container">
              <button 
                className={`burger-button ${isMenuOpen ? 'open' : ''}`}
                onClick={toggleMenu}
                aria-label="Menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          )}
        </div>
      </Navbar>

      {isMobile && (
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            <div className="mobile-auth-links">
              {isAuthenticated === false ? (
                <>
                  <Link className="mobile-menu-link auth-link" to={"/signin"} onClick={() => setIsMenuOpen(false)}>S'inscrire</Link>
                  <Link className="mobile-menu-link auth-link" to={"/login"} onClick={() => setIsMenuOpen(false)}>Se connecter</Link>
                </>
              ) : (
                <>
                  <Link className="mobile-menu-link auth-link" to={"/profil"} onClick={() => setIsMenuOpen(false)}>Profil</Link>
                  <Link className="mobile-menu-link auth-link" onClick={handleLogout}>Déconnexion</Link>
                </>
              )}
            </div>
            
            <div className="mobile-styles-section">
              <h3 className="mobile-menu-title">Courants artistiques</h3>
              <div className="mobile-styles-list">
                {styles.map((style) => (
                  <div 
                    key={style.id_style}
                    className="mobile-menu-link style-link"
                    onClick={() => handleStyleClick(style.id_style)}
                  >
                    {style.style}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;