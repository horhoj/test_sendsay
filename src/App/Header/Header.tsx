import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { getRoutePath } from '../../router';
import styles from './Header.module.scss';
import * as icons from './HeaderIcon';

export const Header: FC = () => {
  return (
    <header className={styles.wrap}>
      <nav>
        <ul className={styles.navList}>
          <li>
            <NavLink
              className={styles.navLink}
              to={getRoutePath('RuntimePage')}
            >
              {icons.eyeIcon}
              Runtime
            </NavLink>
          </li>
          <li>
            <NavLink
              className={styles.navLink}
              to={getRoutePath('ConstructorPage')}
            >
              {icons.bracesIcon}
              Constructor
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
