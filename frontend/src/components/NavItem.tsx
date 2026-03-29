import React from 'react';
import { NavLink } from 'react-router-dom';
import { button } from './variants/button';
import type { NavItemProps } from '../utils/types';

const NavItem: React.FC<NavItemProps> = ({
  to,
  label,
  icon: Icon,
  variant,
}: NavItemProps) => {
  return (
    <NavLink to={to} className={button({ variant })}>
      <span className="tap-target"></span>
      <Icon className="size-4" />
      <span className="hidden sm:inline">{label}</span>
    </NavLink>
  );
};

export default NavItem;
