import config from '../../../package.json';
import Link from 'next/link';
import { Fragment } from 'react';

const { copyright } = config;

const Footer = () => {
  return (
    <Fragment>
      <ul className="flex flex-row justify-end space-x-5">
        <li>
          <Link href="/privacy-policy">
            <a>Privacy Policy</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a>Contact Info</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
      </ul>
      <div>{copyright}</div>
    </Fragment>
  );
};

export default Footer;
