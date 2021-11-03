import config from '../../../package.json';

const { copyright } = config;

const Footer = () => {
  return <div>{copyright}</div>;
};

export default Footer;
