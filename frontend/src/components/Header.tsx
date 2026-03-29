import React from 'react';

import {
  MdAccountBox,
  MdFormatListBulleted,
  MdLogin,
  MdLogout,
  MdOutlineCalendarToday,
} from 'react-icons/md';
import NavItem from './NavItem';
import Logo from './Logo';
import { FiPlus } from 'react-icons/fi';
import type { NavItemProps } from '../utils/types';
import { useAuth } from '../hooks/useAuth';
import Button from './Button';
import { useError } from '../hooks/useError';
import { logout } from '../api/auth';
import { clearAccessToken } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';

const navItems: { [key: string]: NavItemProps } = {
  events: {
    to: '/',
    label: 'Events',
    icon: MdFormatListBulleted,
    variant: 'tertiary',
  },
  'my-events': {
    to: '/my-events',
    label: 'My Events',
    icon: MdOutlineCalendarToday,
    variant: 'tertiary',
  },
  'create-event': {
    to: '/create-event',
    label: 'Create Event',
    icon: FiPlus,
    variant: 'secondary',
  },
  login: {
    to: '/login',
    label: 'Login',
    icon: MdLogin,
    variant: 'secondary',
  },
  register: {
    to: '/register',
    label: 'Register',
    icon: MdAccountBox,
    variant: 'secondary',
  },
  profile: {
    to: '/profile',
    label: 'UserName should be here',
    icon: MdAccountBox,
    variant: 'tertiary',
  },
};

const Header: React.FC = () => {
  const { user, cleanAuth } = useAuth();

  const { setError } = useError();

  const navigate = useNavigate();

  const handleLogout = async () => {
    const { data, err } = await logout();

    if (err) {
      setError(err);
      return;
    }

    console.log('Server response on logout:', data?.message);

    cleanAuth();

    clearAccessToken();

    navigate('/login', { replace: true });
  };

  return (
    <header className="flex gap-2 justify-between items-center border-b border-gray-400 px-2 py-2 md:px-10">
      <Logo size={10}></Logo>

      <nav className="flex items-center gap-3">
        <NavItem {...navItems.events} />

        <NavItem {...navItems['my-events']} />

        <NavItem {...navItems['create-event']} />

        <div className="h-12 w-px bg-gray-400 mx-2"></div>

        {user ? (
          <>
            <NavItem
              {...{ ...navItems['profile'], label: user.name || 'Profile' }}
            />

            <Button label="" variant="tertiary" onClick={handleLogout}>
              <MdLogout size={16} />
            </Button>
          </>
        ) : (
          <>
            <NavItem {...navItems.login} />

            <NavItem {...navItems.register} />
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
