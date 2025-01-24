import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
import { Button } from 'react-bootstrap';
import AuthService from '../Services/AuthService';


const NavBar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    setIsAuthenticated(false)
    AuthService.logout()
  }
  return <>

    <Navbar className="Navbar">
     
        <Navbar.Brand>
          <Link className="navbar-titre" to={"/"}>M.GALERIE</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-txt">
            {isAuthenticated == false ? <>

              <Link className="navbar-txt" to={"/signin"}>S'inscrire</Link>
              <Link className="navbar-txt" to={"/login"}>Se connecter</Link>

            </> : <>
              <div className='nav-profil'>
                <Link className="navbar-txt" to={"/profil"}>Profil</Link>
                <Button className ="deconnexion" onClick={handleLogout}>Déconnexion</Button>
              </div>
            </>}

          </Nav>
        </Navbar.Collapse>
      
    </Navbar>
  </>

}


export default NavBar;