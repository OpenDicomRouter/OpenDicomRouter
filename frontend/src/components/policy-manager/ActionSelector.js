import React, { Component } from 'react'
import Select from 'react-select'
import customStyles from './SelectorStyle'


class ActionSelector extends Component {

    render () {
      if(this.props.options != null && this.props.options.length>0){
        return (
            <Select 
            styles={customStyles}
            options={this.props.options}
            onChange={(value) => this.props.setSelected(value)}
            />
        )
      }else{
        return(
            <div>
                loading
            </div>
        )
      }

    }
}
export default ActionSelector
