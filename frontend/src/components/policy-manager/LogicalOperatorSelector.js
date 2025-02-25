import React, { Component } from 'react'
import Select from 'react-select'
import customStyles from './SelectorStyle'

const logicalOperators= [
    {
    label:"AND",
    value: "AND"},
    {
      label:"OR",
      value:"OR"
    }
]

class LogicalOperatorSelector extends Component {

  constructor(props) {
    super(props)    
  }

  clearValue = () => {
    this.selectRef.select.clearValue()
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.new_condition_submitted != nextProps.new_condition_submitted) {
        if (nextProps.new_condition_submitted){
            this.clearValue()
        }
      }
    }

    render () {
        return (
            <Select 
            styles={customStyles}
            ref={ref => {
              this.selectRef = ref;
            }}
            options={logicalOperators} 
            onChange={(value) => this.props.setSelected(value)}
            />
        )
    }
}
export default LogicalOperatorSelector