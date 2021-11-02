const Content = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
};

export default Content;
