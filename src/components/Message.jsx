const Message = ({ message, bgColor }) => {
  // Remember that styles in React use the name in CAMELCASE, so the object below has that form in its property names
  let styles = {
    padding: '1rem',
    marginBottom: '1rem',
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: bgColor,
  };

  return (
    <div style={styles}>
      {/* <p>{message}</p> */}
      <p dangerouslySetInnerHTML={{ __html: message }} />
    </div>
  );
};

export default Message;
