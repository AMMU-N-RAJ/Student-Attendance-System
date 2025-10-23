import React,{useState} from 'react';
import './login.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';

function Login() {
    const history = useNavigate();
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const signIn = async(e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential);// successfully created a new user
            // Optionally navigate to another page:
            history("/");
        } catch (error) {
            alert(error.message);
        }
    }
    const register = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential);// successfully created a new user
            // Optionally navigate to another page:
            history("/");
        } catch (error) {
            alert(error.message);
        }
    }
    return (
    <div className="login">
        <Link to="/">
            <img className="login__logo"
                src="https://upload.wikimedia.org/wikipedia/en/6/6b/Cet_emblem.jpg"
            />
        </Link>

        <div className="login__container">
            <h1>Sign-in</h1>
            <form>
                <h5>Username (Email)</h5>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>

                <h5>Password</h5>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>

                <button type='submit' onClick={signIn} className="login__signInButton">Sign In</button>

                
                <button onClick={register} className="login__registerButton">Create Account</button>
            </form>

        </div>
    </div>
  )
}

export default Login;