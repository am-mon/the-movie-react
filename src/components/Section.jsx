const PageTemplate = ({ children }) => {
  return (
    <div className="container box-border py-10 md:py-20 px-3 mx-auto">
      {children}
    </div>
  );
};

export default PageTemplate;
