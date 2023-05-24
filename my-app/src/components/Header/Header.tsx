import { NavLink } from 'react-router-dom';
import CrossedEllipsesIcon from './CrossedEllipsesIcon';

const Header = () => {
  return (
    <header>
      <div className="title">
        <CrossedEllipsesIcon />
        <h1>Jobored</h1>
      </div>
      <nav className="navigation">
        <NavLink to="/">Поиск Вакансий</NavLink>
        <NavLink to="/favorites">Избранное</NavLink>
      </nav>
    </header>
  );
};

export default Header;
