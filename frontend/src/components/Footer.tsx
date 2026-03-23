import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col gap-10 border-t border-gray-400 mt-20 p-2">
      <section className="grid items-center justify-items-center grid-cols-2 gap-x-5 gap-y-5 md:grid-cols-12 lg:grid-cols-12">
        <Logo size={20} className="col-span-2 m-auto md:col-span-3" />

        <section className="col-span-2 flex flex-col gap-2 items-center md:col-span-6">
          <h3 className="font-bold text-lg">EventManager</h3>
          <p className="mt-4">Simple platform for event management</p>
          <p className="font-semibold text-sm">Built by Oleksandr Podvoiskyi</p>
        </section>

        <section className="col-span-2 flex gap-5 mt-5 md:col-span-3 md:mt-0">
          <Link
            to="https://github.com/PodvAx"
            target="_blank"
            className="transition-colors duration-300 hover:text-indigo-600 active:text-indigo-500"
          >
            <FaGithub className="size-7" />
          </Link>

          <Link
            to="https://www.linkedin.com/in/oleksandr-podvoiskyi/"
            target="_blank"
            className="transition-colors duration-300 hover:text-indigo-600 active:text-indigo-500"
          >
            <FaLinkedin className="size-7" />
          </Link>

          <Link
            to="mailto:oleksandr.podvoiskyi@gmail.com"
            className="transition-colors duration-300 hover:text-indigo-600 active:text-indigo-500"
          >
            <MdEmail className="size-7" />
          </Link>
        </section>
      </section>

      <span className="text-sm text-gray-500 self-center">
        © 2026 Oleksandr Podvoiskyi. All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
