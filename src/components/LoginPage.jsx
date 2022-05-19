import { useRef, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import {
    Button,
    Card,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { NavLink, useHistory } from 'react-router-dom';
import routes from '../routes.js';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
    const history = useHistory();
    const { logIn } = useContext(AuthContext);
    const nameInput = useRef(null);

    useEffect(() => {
        nameInput.current.focus();
    }, [nameInput]);

    const validationSchema = Yup.object({
        username: Yup.string()
            .required('Введите ваше имя'),
        password: Yup.string()
            .required('Введите пароль'),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema,
        validateOnChange: false,
        onSubmit: (value, { setErrors }) => {
            try {
                const isLogin = logIn(value);
                if (isLogin) {
                    history.replace(routes.profilePagePath());
                } else {
                    throw new Error('Имя пользователя или пароль введены не верно')
                }
            } catch (e) {
                console.log(e);
                nameInput.current.select();
                setErrors({ password: e.message });
            }
        },
    });

    return (
        <div className="container-fluid flex-grow-1">
            <div className="row justify-content-center align-content-center h-100">
                <div className="col-xl-8 col-xxl-6">
                    <Card id="logIn" className="shadow-sm">
                        <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                            <div><img src="https://ra-goldfish.com/assets/template/images/logo-dark.png" alt="Логотип регистрации" /></div>
                            <Form className="w-sm-50" onSubmit={formik.handleSubmit}>
                                <h1 className="text-center mb-4">Войти</h1>
                                <FormGroup className="form-floating mb-3">
                                    <FormControl
                                        ref={nameInput}
                                        type="text"
                                        id="username"
                                        name="username"
                                        autoComplete="username"
                                        placeholder="Ваше имя"
                                        onChange={formik.handleChange}
                                        value={formik.values.username}
                                        isInvalid={formik.touched.username && Boolean(formik.errors.username)}
                                    />
                                    <FormLabel htmlFor="username">Ваше имя</FormLabel>
                                </FormGroup>
                                <FormGroup className="form-floating mb-5">
                                    <FormControl
                                        type="password"
                                        id="password"
                                        name="password"
                                        autoComplete="curent-password"
                                        placeholder="Пароль"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        isInvalid={formik.touched.password && Boolean(formik.errors.password)}
                                    />
                                    <FormLabel htmlFor="password">Пароль</FormLabel>
                                    <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
                                </FormGroup>
                                <Button type="submit" className="mb-3 w-100" variant="outline-primary">Войти</Button>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <div className="d-flex flex-column align-items-center">
                                <span className="small mb-2">Нет аккаунта?</span>
                                <NavLink to={routes.homePagePath()}>Регистрация</NavLink>
                            </div>
                        </Card.Footer>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
