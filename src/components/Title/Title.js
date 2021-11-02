const Title = ({ title }) => {
  return <div dangerouslySetInnerHTML={{ __html: title }} />;
};

export default Title;
