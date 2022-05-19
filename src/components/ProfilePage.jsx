import { useContext } from 'react';
import AuthContext from '../context/AuthContext';


const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    console.log(user)
    return (
        <main className="d-flex flex-column align-content-center text-center">
            <h1 className="h1 mt-5">Профиль пользователя</h1>
            <div className="row mt-4">
                <h2 className="h3">{user}</h2>
            </div>
        </main>
    )
}

export default ProfilePage;
