const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'black',
      backgroundColor:'white',
      padding: 10,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 200,
      backgroundColor:'white'
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }
  }

  export default customStyles