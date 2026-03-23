import React from 'react';
import { NavLink } from 'react-router-dom';
import type { NavItemProps } from '../types/nav-item-props';
import { button } from './variants/button';

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
