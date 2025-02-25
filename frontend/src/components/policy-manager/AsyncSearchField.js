import React, { Component } from 'react'
import AsyncSelect from "react-select/async";
//import makeAnimated from "react-select/animated";
import customStyles from './SelectorStyle'
import { createContext } from 'react';

class AsyncSearchField extends Component {
    selectRef = null;
    
    clearValue = () => {
        this.selectRef.select.select.clearValue()
      };

    constructor(props) {
        super(props)
        this.state = {
            query: "",
            selectKey: Math.floor(Math.random() * 1000)
          }
        this.setQuery = this.setQuery.bind(this)       
    }

    setQuery(query){
        this.setState({query})
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props.new_condition_submitted != nextProps.new_condition_submitted) {
            if (nextProps.new_condition_submitted){
                this.clearValue()
                this.setState({selectKey:Math.floor(Math.random() * 1000)})
            }
        }
        }

    render () {
        return (
            <div class="SearchfieldContainer">
            <AsyncSelect
            key={this.state.selectKey}
            styles={customStyles}
            ref={ref => {
                this.selectRef = ref;
            }}
            cacheOptions
            defaultOptions
            getOptionLabel={this.props.getOptionLabel}
            getOptionValue={this.props.getOptionValue}
            loadOptions={this.props.loadOptions}
            onInputChange={(value) => {this.setQuery(value)}}
            onChange={(value) => this.props.setSelected(value)}
            filterOption={null}
        />
            </div>

        )
    }
}
export default AsyncSearchField