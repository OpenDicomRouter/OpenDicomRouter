import React, { Component } from 'react'
import { getAllOperators, 
         getOperator
         } from '../functions/Utility_Functions';
import { getAllGroups,
        createGroup,
        deleteGroup
        } from '../functions/GroupFunctions'; 
import AsyncSearchField from './AsyncSearchField';
import LogicalOperatorSelector from './LogicalOperatorSelector';
import { getAllRuleGroups } from '../functions/RuleGroupFunctions';



class GroupList extends Component {
    constructor() {
        super()
        this.state = {
            policy_id:"",
            groups:[],
            new_group: {
                policy_id:"",
                group_name:"",
                rg1_id:"",
                rg2_id:"",
                rg3_id:"",
                rg4_id:"",
                rg5_id:"",
                rg6_id:"",
                logical_operator:""
            }
        }
        this.deleteGroup = this.deleteGroup.bind(this);
        this.setGroupName = this.setGroupName.bind(this);
        this.setRg1 = this.setRg1.bind(this);
        this.setRg2 = this.setRg2.bind(this);
        this.setRg3 = this.setRg3.bind(this);
        this.setRg4 = this.setRg4.bind(this);
        this.setRg5 = this.setRg5.bind(this);
        this.setRg6 = this.setRg6.bind(this);
        this.setSelectedLogicalOperator = this.setSelectedLogicalOperator.bind(this);
        this.submitNewGroup = this.submitNewGroup.bind(this);
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount () {
        const policy_id = this.props.policy_id
        var new_Group = this.state.new_group
        new_Group.policy_id = policy_id
        this.setState({new_Group:new_Group})

        getAllGroups(policy_id)
            .then(res=>{
                this.updateGroups(res)
                console.log(res)
            })
    }

    deleteGroup=(groupId)=>{
        deleteGroup(groupId)
        getAllGroups(groupId)
        .then(res => {
            this.updateGroups(res)
        })  
    }

    updateGroups(res){
        if (res != null){
            const groups = res.data['result']
            console.log(groups)
            this.setState({groups})
        }
    }
    
    loadRuleGroups=(query)=>{
            return getAllRuleGroups(this.props.policy_id)
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

     setRg1(rg1_id){
        var new_group = this.state.new_group
        new_group.rg1_id = rg1_id._id
        new_group.rg1=rg1_id.name
        console.log(new_group.rg1)
        this.setState({new_group:new_group})
     }

     setRg2(rg2_id){
        var new_group = this.state.new_group
        new_group.rg2_id = rg2_id._id
        new_group.rg2=rg2_id.name
        this.setState({new_group:new_group})
     }

     setRg3(rg3_id){
        var new_group = this.state.new_group
        new_group.rg3_id = rg3_id._id
        new_group.rg3=rg3_id.name
        this.setState({new_group:new_group})
     }

     setRg4(rg4_id){
        var new_group = this.state.new_group
        new_group.rg4_id = rg4_id._id
        new_group.rg4=rg4_id.name
        this.setState({new_group:new_group})
     }

     setRg5(rg5_id){
        var new_group = this.state.new_group
        new_group.rg5_id = rg5_id._id
        new_group.rg5=rg5_id.name
        this.setState({new_group:new_group})
     }

     setRg6(rg6_id){
        var new_group = this.state.new_group
        new_group.rg6_id = rg6_id._id
        new_group.rg6=rg6_id.name
        this.setState({new_group:new_group})
     }

     setRule2(rule2_id){
        var new_ruleGroup = this.state.new_group
        new_ruleGroup.rule2_id = rule2_id._id
        console.log("blabla"+new_ruleGroup.condition2_property_key)
        new_ruleGroup.rule2_value=rule2_id.condition2_property_key + " " + rule2_id.condition2_property_operator+ " "+rule2_id.condition2_property_value
        this.setState({new_ruleGroup:new_ruleGroup})
    }

    setGroupName(name){
        var new_group = this.state.new_group
        new_group.group_name = name
        this.setGroupName({new_group:new_group})
    }

 
    setSelectedLogicalOperator(logicalOperator){
        var new_ruleGroup = this.state.new_group
        new_ruleGroup.logical_operator = logicalOperator
        this.setState({new_ruleGroup:new_ruleGroup})
     }

    groups(policy_id){
        return getAllRuleGroups(policy_id)
        .then((res)=>{
         return res});
    }

    extendRule(){

        
    }

    submitNewGroup(){
        createGroup(this.state.new_group)
        .then(()=>{
            getAllGroups(this.state.policy_id)
            .then(res=>{
            this.updateGroups(res)
            })
        })
      
        var new_group= {
                group_name:"",
                rg1_id:"",
                rg2_id:"",
                rg3_id:"",
                rg4_id:"",
                rg5_id:"",
                rg6_id:"",
                logical_operator:""
        }

        new_group.group_name = this.state.group_name
        new_group.policy_id = this.state.policy_id
        new_group.rg1 = this.state.rg1
        new_group.rg2 = this.state.rg2
        new_group.rg3 = this.state.rg3
        new_group.rg4 = this.state.rg4
        new_group.rg5 = this.state.rg5
        new_group.rg6 = this.state.rg6
        new_group.logical_operator = this.state.logical_operator
        this.setState({new_group:new_group})
    }

    onChange (e) {
        const target_key = e.target.name
        const target_value = e.target.value
        var new_group = this.state.new_group
        new_group[target_key] = target_value
        this.setState({new_group:new_group})
    }

    changeGroupValue
    render () {
        if (this.state.policy_id != null){
            return (
                <div className="container">
                        <div className="col-sm-8 mx-auto">
                            <h2 className="text-center">Groups</h2>
                        </div>
                        <br></br>
                        <table class="table caption-top">
                        <thead>
                        <tr>
                            <th scope="col">GroupName</th>
                            <th scope="col">Rule/Group1</th>
                            <th scope="col">Logical Operation</th>
                            <th scope="col">Rule/Group2</th>
                            <th scope="col"> Add / Delete </th>
                        </tr>
                    </thead>
                        <tbody>
                            <tr>
                                <td> 
                                    <input type="text"
                                        className="form-control"
                                        name="group_name"
                                        placeholder="Value"
                                        value={this.state.new_group.group_name}
                                        onChange={this.onChange} /> 
                                </td>
                            <td>
                              <AsyncSearchField 
                               setSelected={this.setRg1} 
                               loadOptions={this.loadRuleGroups}
                               getOptionLabel={(e) => e.rulegroup_name}
                               getOptionValue={(e) => e}
                               ></AsyncSearchField>
                            </td>
                            <td>
                                <LogicalOperatorSelector setSelected={this.setSelectedLogicalOperator}/>
                            </td>
                            <td>
                              <AsyncSearchField 
                               setSelected={this.setRg2} 
                               loadOptions={this.loadRuleGroups}
                               getOptionLabel={(e) => e.rulegroup_name}
                               getOptionValue={(e) => e}
                               ></AsyncSearchField>
                            </td>
                            <td>
                                    <button 
                                        onClick={this.extendRule} 
                                        class="btn btn-success" 
                                        type="submit"
                                    >
                                        Extend Rule
                                    </button>
                            </td>
                            <td>
                                    <button 
                                        onClick={this.submitNewGroup} 
                                        class="btn btn-success" 
                                        type="submit"
                                    >
                                        +
                                    </button>
                            </td>
                            </tr>
                            { this.state.groups.map((group,index) => {
                                    console.log(this)
                                        return (
                                            <React.Fragment key={index}>
                                                <tr>
                                                <td>{group.group_name}</td>
                                                <td>{group.rg1_name}</td>
                                                <td>{group.logical_operator}</td>
                                                <td>{group.rg2_name}</td>
                                                <td>
                                                <button onClick={this.deleteGroup.bind(this,group['_id'])} class="btn btn-outline-danger">
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

export default GroupList