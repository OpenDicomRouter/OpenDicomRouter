import React, { Component } from 'react'
import { getAllFilterProperties, 
         getFilterProperty, 
         getAllOperators, 
         getOperator
         } from '../functions/Utility_Functions';
import { getAllRuleGroups,
        getRuleGroups,
        createRuleGroup,
        deleteRuleGroup
        } from '../functions/RuleGroupFunctions'; 
import AsyncSearchField from './AsyncSearchField';
import LogicalOperatorSelector from './LogicalOperatorSelector';
import { getAllRules } from '../functions/RuleFunctions';

class RuleGroupList extends Component {
    constructor() {
        super()
        this.state = {
            policy_id:"",
            groups:[],
            new_ruleGroup: {
                policy_id:"",
                rulegroup_name:"",
                rule1_id:"",
                rule2_id:"",
                logical_operator:""
            }
        }
        this.deleteRuleGroup = this.deleteRuleGroup.bind(this);
        this.setRuleGroupName = this.setRuleGroupName.bind(this);
        this.setRule1 = this.setRule1.bind(this);
        this.setRule2 = this.setRule2.bind(this);
        this.setSelectedLogicalOperator = this.setSelectedLogicalOperator.bind(this);
        this.submitNewRuleGroup = this.submitNewRuleGroup.bind(this);
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount () {
        const policy_id = this.props.policy_id
        var new_ruleGroup = this.state.new_ruleGroup
        new_ruleGroup.policy_id = policy_id
        this.setState({new_ruleGroup:new_ruleGroup})

        getAllRuleGroups(policy_id)
            .then(res=>{
                this.updateRuleGroups(res)
                console.log(res)
            })
    }

    deleteRuleGroup=(ruleId)=>{
        deleteRuleGroup(ruleId)
        getAllRuleGroups(ruleId)
        .then(res => {
            this.updateRuleGroups(res)
        })  
    }

    updateRuleGroups(res){
        if (res != null){
            const groups = res.data['result']
            console.log(groups)
            this.setState({groups})
        }
    }
    
    loadRules=(query)=>{
            return getAllRules(this.props.policy_id)
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

     setRule1(rule1_id){
        console.log(rule1_id)
        var new_ruleGroup = this.state.new_ruleGroup
        new_ruleGroup.rule1_id = rule1_id._id
        new_ruleGroup.rule1_value=rule1_id.condition1_property_key + " " + rule1_id.condition1_property_operator+ " "+rule1_id.condition1_property_value+" "+rule1_id.logical_operator+" "+rule1_id.condition2_property_key + " " + rule1_id.condition2_property_operator+ " "+rule1_id.condition2_property_value
        console.log(new_ruleGroup.rule1_value)
        this.setState({new_ruleGroup:new_ruleGroup})
     }


     setRule2(rule2_id){
        var new_ruleGroup = this.state.new_ruleGroup
        new_ruleGroup.rule2_id = rule2_id._id
        console.log("blabla"+new_ruleGroup.condition2_property_key)
        new_ruleGroup.rule2_value=rule2_id.condition2_property_key + " " + rule2_id.condition2_property_operator+ " "+rule2_id.condition2_property_value
        this.setState({new_ruleGroup:new_ruleGroup})
    }

    setRuleGroupName(name){
        var new_ruleGroup = this.state.new_ruleGroup
        new_ruleGroup.rule_name = name
        this.setRuleName({new_ruleGroup:new_ruleGroup})
    }

 
    setSelectedLogicalOperator(logicalOperator){
        var new_ruleGroup = this.state.new_ruleGroup
        new_ruleGroup.logical_operator = logicalOperator
        this.setState({new_ruleGroup:new_ruleGroup})
     }

    rules(policy_id){
        return getAllRules(policy_id)
        .then((res)=>{
         return res});
    }


    submitNewRuleGroup(){
        createRuleGroup(this.state.new_ruleGroup)
        .then(()=>{
            getAllRuleGroups(this.state.policy_id)
            .then(res=>{
            this.updateRuleGroups(res)
            })
        })
      
        var new_ruleGroup= {
            ruleGroup_name:"",
            policy_id:"",
            rule1_id:"",
            rule1_value:"",
            rule2_id:"",
            rule2_value:"",
            logical_operator:""
        }
        new_ruleGroup.ruleGroup_name = this.state.ruleGroup_name
        new_ruleGroup.policy_id = this.state.policy_id
        new_ruleGroup.rule1_id = this.state.rule1_id
        new_ruleGroup.rule1_value = this.state.rule1_value
        new_ruleGroup.rule2_id = this.state.rule2_id
        new_ruleGroup.rule2_value = this.state.rule2_value
        new_ruleGroup.logical_operator = this.state.logical_operator
        this.setState({new_ruleGroup:new_ruleGroup})
    }

    onChange (e) {
        const target_key = e.target.name
        const target_value = e.target.value
        var new_ruleGroup = this.state.new_ruleGroup
        new_ruleGroup[target_key] = target_value
        this.setState({new_ruleGroup:new_ruleGroup})
    }

    changeRuleValue
    render () {
        if (this.state.policy_id != null){
            return (
                <div className="container">
                        <div className="col-sm-8 mx-auto">
                            <h2 className="text-center">Rule Groups</h2>
                        </div>

                        <table class="table caption-top">
                        <thead>
                        <tr>
                            <th scope="col">RuleGroupName</th>
                            <th scope="col">Rule1</th>
                            <th scope="col">Logical Operation</th>
                            <th scope="col">Rule2</th>
                            <th scope="col"> Add / Delete </th>
                        </tr>
                    </thead>
                        <tbody>
                            <tr>
                                <td> 
                                    <input type="text"
                                        className="form-control"
                                        name="rulegroup_name"
                                        placeholder="Value"
                                        value={this.state.new_ruleGroup.rulegroup_name}
                                        onChange={this.onChange} /> 
                                </td>
                            <td>
                              <AsyncSearchField 
                               setSelected={this.setRule1} 
                               loadOptions={this.loadRules}
                               getOptionLabel={(e) => e.rule_name}
                               getOptionValue={(e) => e}
                               ></AsyncSearchField>
                            </td>
                            <td>
                                <LogicalOperatorSelector setSelected={this.setSelectedLogicalOperator}/>
                            </td>
                            <td>
                              <AsyncSearchField 
                               setSelected={this.setRule2} 
                               loadOptions={this.loadRules}
                               getOptionLabel={(e) => e.rule_name}
                               getOptionValue={(e) => e}
                               ></AsyncSearchField>
                            </td>
                            <td>
                                    <button 
                                        onClick={this.submitNewRuleGroup} 
                                        class="btn btn-success" 
                                        type="submit"
                                    >
                                        +
                                    </button>
                                    </td>
                            </tr>
                            { this.state.groups.map((rule,index) => {
                                    console.log(this)
                                        return (
                                            <React.Fragment key={index}>
                                                <tr>
                                                <td>{rule.rulegroup_name}</td>
                                                <td>{rule.rule1_name}</td>
                                                <td>{rule.logical_operator}</td>
                                                <td>{rule.rule2_name}</td>
                                                <td>
                                                <button onClick={this.deleteRuleGroup.bind(this,rule['_id'])} class="btn btn-outline-danger">
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
                </div>
            )
        }else{
            return (
                <div> 
                <h1> Loading </h1>
            </div>
            )
        }

    }
}

export default RuleGroupList