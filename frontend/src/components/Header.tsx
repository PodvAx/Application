import React from 'react';

import {
  MdFormatListBulleted,
  MdLogin,
  MdOutlineCalendarToday,
} from 'react-icons/md';
import NavItem from './NavItem';
import type { NavItemProps } from '../types/nav-item-props';
import Logo from './Logo';
import { FiPlus } from 'react-icons/fi';

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
};

const Header: React.FC = () => {
  return (
    <header className="flex gap-2 justify-between items-center border-b border-gray-400 px-2 py-2 md:px-10">
      <Logo size={20}></Logo>

      <nav className="flex items-center gap-3">
        <NavItem {...navItems.events} />

        <NavItem {...navItems['my-events']} />

        <NavItem {...navItems['create-event']} />

        <div className="h-12 w-px bg-gray-400 mx-2"></div>

        <NavItem {...navItems.login} />
      </nav>
    </header>
  );
};

export default Header;
