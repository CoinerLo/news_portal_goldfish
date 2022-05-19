import { useContext, useState } from 'react';
import AuthContext from './context/AuthContext';
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import routes from './routes';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import NewsContainer from './containers/NewsContainer';
import Footer from './components/Footer';

const adminUsername = 'Admin';
const adminPassword = '12345';

const PageNotFound = () => (
    <div className="d-flex h-100 justify-content-center align-items-center">
        <h2>Oops, something went wrong</h2>
    </div>
);

const localStorageKeys = {
    loggedUserData: 'loggedUserData',
};

const AuthProvider = ({ children }) => {
    const userData = JSON.parse(localStorage.getItem(localStorageKeys.loggedUserData));
    const [user, setUser] = useState(userData ?? null);

    const logIn = (loggedUser) => {
        const { username, password } = loggedUser;
        if (username === adminUsername && password === adminPassword) {
            localStorage.setItem(localStorageKeys.loggedUserData, JSON.stringify(username));
            setUser(username);
            return true;
        }
        return false;
    };

    const logOut = () => {
        localStorage.removeItem(localStorageKeys.loggedUserData);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user, logIn, logOut
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const MainRoute = ({ children, ...props }) => {
    const { user } = useContext(AuthContext);

    return (
        <Route
            {...props}
            render={({ location }) => (user ? children
            : (<Redirect to={{ pathname: routes.loginPagePath(), state: { from: location } }} />))}
        />
    );
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="d-flex flex-column h-100">
                    <Navbar />
                    <Switch>
                        <MainRoute exact path={routes.profilePagePath()}>
                            <ProfilePage />
                        </MainRoute>
                        <Route exact path={routes.homePagePath()}>
                            <HomePage />
                        </Route>
                        <Route path={routes.newsPagePath()}>
                            <NewsContainer />
                        </Route>
                        <Route path={routes.loginPagePath()}>
                            <LoginPage />
                        </Route>
                        <Route path="*">
                            <PageNotFound />
                        </Route>
                    </Switch>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
