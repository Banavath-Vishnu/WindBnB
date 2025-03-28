import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error, setError] = useState('');

  async function registerUser(ev) {
    ev.preventDefault();
    setError('');
    
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      await axios.post('/api/register', {
        name,
        email,
        password,
      });
      alert('Registration successful. Now you can log in');
    } catch (e) {
      if (e.response?.data?.errors?.email?.message) {
        setError('Email already exists');
      } else if (e.response?.data?.message) {
        setError(e.response.data.message);
      } else {
        setError('Registration failed. Please try again later');
      }
    }
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input type="text"
                 placeholder="John Doe"
                 value={name}
                 onChange={ev => setName(ev.target.value)} />
          <input type="email"
                 placeholder="your@email.com"
                 value={email}
                 onChange={ev => setEmail(ev.target.value)} />
          <input type="password"
                 placeholder="password"
                 value={password}
                 onChange={ev => setPassword(ev.target.value)} />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}