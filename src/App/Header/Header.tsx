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
              to={getRoutePath('ConstructorPage')}
            >
              {icons.eyeIcon}
              Constructor
            </NavLink>
          </li>
          <li>
            <NavLink
              className={styles.navLink}
              to={getRoutePath('RuntimePage')}
            >
              {icons.bracesIcon}
              Runtime
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
