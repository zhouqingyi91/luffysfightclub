import { Link } from 'react-router-dom';
import css from './Unauthorized.module.css';

const Unauthorized = () => {
  return (
    <div id={css.unauthorized}>
      <h1>Unauthorized</h1>
      <p>You do not have access to the requested page.</p>
      <Link to='/'>Go to Homapage</Link>
    </div>
  );
};

export default Unauthorized;