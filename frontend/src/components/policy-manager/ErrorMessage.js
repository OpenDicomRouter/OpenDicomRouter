const Message = ({ variant, children }) => {


  // If show is true this will be returned
  return (
    <div className={`alert alert-${variant}`}>
      {children}
    </div>
  )
}

Message.defaultPros = {
  variant: 'info',
}

export default Message;