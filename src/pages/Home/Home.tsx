// import { Link, useNavigate } from 'react-router-dom';
// import authService from '@/services/authService';
// import DummyAPIButtons from './DummyAPIButtons';

// import TodoCard from '@/components/TodoCard/TodoCard';
// import Swimlanes from './SwimlanesFull';
import SwimlaneBoardComponent from './SwimlaneBoardComponent';

// const TestHome = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="p-5">
//       <h1>Home Page</h1>
//       <p>Welcome to the Home page!</p>
//       <div>
//         <Link to="/login">Go to Login</Link>
//       </div>
//       <Link to="/signup">Go to Signup</Link>
//       <div>
//         <button
//           type="button"
//           onClick={async () => {
//             try {
//               await authService.logout();
//             } catch (error) {
//               console.log(error);
//             } finally {
//               navigate(0);
//             }
//           }}
//         >
//           Logout
//         </button>
//       </div>
//       <div>
//         <DummyAPIButtons />
//       </div>
//       <TodoCard
//         data={{ title: 'Sample', status: 'done', is_priority: false }}
//       />
//       <Swimlanes />
//     </div>
//   );
// };
//{/* <Swimlanes /> */}
const Home = () => {
  return <SwimlaneBoardComponent />;
};

export default Home;
