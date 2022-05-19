import React, { useContext } from 'react';
import {
    Navbar as NavbarBootstrap,
    Button,
    Container,
    Nav,
} from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import routes from '../routes.js';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const history = useHistory();
    const { pathname } = useLocation();

    return (
        <header>
            <NavbarBootstrap id="nav" className="shadow-sm navbar-expand-lg bg-white">
                <Container>
                    <NavbarBootstrap.Brand as={Link} to={routes.homePagePath()}>
                        <b>Gold</b><b className='text-danger'>fish</b> <span className='text-warning'>media</span>
                    </NavbarBootstrap.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={routes.homePagePath()}>На главную</Nav.Link>
                        <Nav.Link as={Link} to={routes.newsPagePath()}>Новости</Nav.Link>
                        <Nav.Link as={Link} to={routes.profilePagePath()}>Профиль</Nav.Link>
                    </Nav>
                    {user
                        ? <Button variant="secondary" onClick={logOut}>Выйти</Button>
                        : pathname !== routes.loginPagePath()
                            ? <Button variant="primary" onClick={() => history.push(routes.loginPagePath())}>Войти</Button>
                            : null
                    }
                </Container>
            </NavbarBootstrap>
        </header>
    );
};

export default Navbar;
