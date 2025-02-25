import React, { Component, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { getAllFilterProperties, 
         getFilterProperty, 
         getAllOperators, 
         getOperator
         } from '../functions/Utility_Functions';
import { getAllRules,
         createRule,
         deleteRule
         } from '../functions/RuleFunctions'; 
import { getAllConditions,
         getCondition
         } from '../functions/ConditionFunctions'; 
import LogicalOperatorSelector from './LogicalOperatorSelector';
import  Message  from  './ErrorMessage'
import AsyncSearchField from './AsyncSearchField';

class RuleList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            policy_id:"",
            rules:[],
            new_rule: {
                policy_id:"",
                rule_name:"",
                condition1_id:"",
                condition1_value:"",
                condition2_id:"",
                condition2_value:"",
                logical_operator:""
            },
            missingInput: false
        }
        this.deleteRule = this.deleteRule.bind(this);
        this.setCondition1 = this.setCondition1.bind(this);
        this.setCondition2 = this.setCondition2.bind(this);
        this.setSelectedLogicalOperator = this.setSelectedLogicalOperator.bind(this);
        this.submitNewRule = this.submitNewRule.bind(this);
        this.onChange = this.onChange.bind(this)
    }


    componentDidMount () {
        const policy_id = this.props.policy_id
        var new_rule = this.state.new_rule
        new_rule.policy_id = policy_id
        this.setState({new_rule:new_rule})

        getAllRules(policy_id)
            .then(res=>{
                this.updateRules(res)
            })
    }

    showError(){
        this.setState({missingInput:true})
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            this.setState({missingInput:false})
          }, 3000)
      
          return () => {
            clearTimeout(timeId)
          }
    }

    deleteRule=(ruleId)=>{
        deleteRule(ruleId)
        .then(res => {
            getAllRules(this.props.policy_id)
            .then(res => {
                this.updateRules(res)
            })
        })  
    }

    updateRules(res){
        if (res != null){
            const rules = res.data['result']
            this.setState({rules})
        }
    }
    
    loadConditions=(query)=>{
            return getAllConditions(this.props.policy_id)
            .then((res)=>res.data.result)
     }

     loadOptionsOperators=(query)=>{
        if (query.length >0){
         return getOperator(query)
         .then((res)=>{
          return res.data.operators});
        }else{
            return getAllOperators()
            .then((res)=>res.data.operators)
        }
     }

    setCondition1(condition1_id){
        if(condition1_id != undefined){
            var new_rule = this.state.new_rule
            new_rule.condition1_id = condition1_id._id
            this.setState({new_rule:new_rule})
        }
     }

    setCondition2(condition2_id){
        if(condition2_id != undefined){
            var new_rule = this.state.new_rule
            new_rule.condition2_id = condition2_id._id
            this.setState({new_rule:new_rule})
        }
    }

    setSelectedLogicalOperator(logicalOperator){
        var new_rule = this.state.new_rule
        new_rule.logical_operator = logicalOperator
        this.setState({new_rule:new_rule})
     }

    submitNewRule(){
        if(this.validateInputs()){
            createRule(this.state.new_rule)
            .then(()=>{
                getAllRules(this.props.policy_id)
                .then(res=>{
                    this.updateRules(res)
                    this.props.conditionHandler()
                })
                .then(()=>{
                    this.props.conditionHandler()
                })
            })
        
            var new_rule= {
                rule_name:'',
                policy_id:'',
                condition1_id:'',
                condition2_id:'',
                logical_operator:''
            }
            new_rule.policy_id = this.props.policy_id
            this.setState({new_rule:new_rule})
            this.state.new_rule.rule_name = ''
        } else{
            this.setState({missingInput:true})
            this.showError()
        }
    }

    validateInputs(){
        var inputValid = false
        const name_not_empty = this.state.new_rule.rule_name.length > 0
        const condition1_not_empty = this.state.new_rule.condition1_id.length > 0
        const condition2_not_empty = this.state.new_rule.condition2_id.length > 0
        var operator_not_empty = false
        if(this.state.new_rule.logical_operator.value!=undefined){
            operator_not_empty = true
        }
        if (name_not_empty && condition1_not_empty &&  condition2_not_empty && operator_not_empty){
            inputValid = true
        }
        return inputValid
    }

    onChange (e) {
        const target_key = e.target.name
        const target_value = e.target.value
        var new_rule = this.state.new_rule
        new_rule[target_key] = target_value
        this.setState({new_rule:new_rule})
    }
    changeRuleValue
    render () {
            return (
                <div className="container">
                        <div className="col-sm-8 mx-auto">
                            <h2 className="text-center">Rules</h2>
                        </div>

                        <table class="table caption-top">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Condition1</th>
                            <th scope="col">Logical Operation</th>
                            <th scope="col">Condition2</th>
                            <th scope="col"> Add / Delete </th>
                        </tr>
                    </thead>
                        <tbody>
                            <tr>
                                <td> 
                                    <input type="text"
                                        className="form-control"
                                        name="rule_name"
                                        placeholder="Value"
                                        value={this.state.new_rule.rule_name}
                                        onChange={this.onChange} /> 
                                </td>
                            <td>
                              <AsyncSearchField
                               setSelected={this.setCondition1} 
                               loadOptions={this.loadConditions}
                               getOptionLabel={(e) => e.property_key + " " + e.property_operator+" "+ e.property_value}
                               getOptionValue={(e) => e._id}
                               new_condition_submitted = {this.props.new_condition_submitted}
                               ></AsyncSearchField>
                            </td>
                            <td>
                                <LogicalOperatorSelector 
                                setSelected={this.setSelectedLogicalOperator}
                                new_condition_submitted = {this.props.new_condition_submitted}
                                ></LogicalOperatorSelector>
                            </td>
                            <td>
                              <AsyncSearchField 
                               setSelected={this.setCondition2} 
                               loadOptions={this.loadConditions}
                               getOptionLabel={(e) => e.property_key + " " + e.property_operator+" "+ e.property_value}
                               getOptionValue={(e) => e._id}
                               new_condition_submitted = {this.props.new_condition_submitted}
                               ></AsyncSearchField>
                            </td>
                            <td>
                                    <button 
                                        onClick={this.submitNewRule} 
                                        class="btn btn-success" 
                                        type="submit"
                                    >
                                        +
                                    </button>
                                    </td>
                            </tr>
                            { this.state.rules.map((rule,index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <tr>
                                                <td>{rule.rule_name}</td>
                                                <td>{rule.condition1_property_key} {rule.condition1_property_operator} {rule.condition1_property_value}</td>
                                                <td>{rule.logical_operator}</td>
                                                <td>{rule.condition2_property_key} {rule.condition2_property_operator} {rule.condition2_property_value}</td>
                                                <td>
                                                <button onClick={this.deleteRule.bind(this,rule['_id'])} class="btn btn-outline-danger">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                                                    </svg>
                                                </button>
                                                </td>
                                                </tr>
                                            </React.Fragment>
                                        )
                                    }
                            )}
                        </tbody>
                        </table>
                        {this.state.missingInput && 
                    <Message children={(                     
                        <div class="alert alert-danger alert-dismissible fade show">
                        <strong>Error!</strong> Name, condition and operator field cannot be empty.
                        </div>)} variant={'Error'} ></Message>
                    }  
                </div>
            )
      

    }
}

export default RuleList