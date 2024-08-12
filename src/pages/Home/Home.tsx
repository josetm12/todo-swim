import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Home page!</p>
      <div>
        <Link to="/login">Go to Login</Link>
      </div>
      <Link to="/signup">Go to Signup</Link>
    </div>
  );
};

export default Home;
