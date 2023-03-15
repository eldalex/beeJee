import React from 'react';
import axios from 'axios';
import {API_URL} from "../../index";
import {Button, Input} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUser, setUserName, setPassword, setEncodeAuth} from "../../actions";

function LoginForm() {
    const dispatch = useDispatch();
    const {username, password, currentUser} = useSelector(state => state)
    const logout = () => {
        dispatch(setEncodeAuth(''))
        dispatch(setCurrentUser('Guest'))
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const authString = `${username}:${password}`;
        const encodedAuth = btoa(authString);
        dispatch(setEncodeAuth(encodedAuth))
        try {
            const response = await axios.get(API_URL + '/protected', {
                headers: {
                    Authorization: `Basic ${encodedAuth}`,
                },
            });
            if (response.data.result === 'Success') {
                dispatch(setCurrentUser('admin'))
            }
        } catch (error) {
            alert('К сожалению логин и пароль не верны, попробуйте ещё раз.')
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <Input required placeholder="login" type="text" value={username}
                       onChange={(e) => dispatch(setUserName(e.target.value))}/>
            </label>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label>
                <Input required placeholder="password" type="password" value={password}
                       onChange={(e) => dispatch(setPassword(e.target.value))}/>
            </label>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="submit">Login</Button>&nbsp;
            {currentUser === 'admin' ? <Button onClick={logout}>Logout</Button> : null}
        </form>
    );
}

export default LoginForm;