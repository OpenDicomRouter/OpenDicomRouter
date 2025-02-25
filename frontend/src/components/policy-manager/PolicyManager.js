import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { getPolicy,
        updatePolicy} from './PolicyFunctions'
import Switch from "./Switch";
import ConditionList from './ConditionList';
import RuleList from './RuleList';
import ActionList from './ActionList';
import './PolicyManager.css'
import {  checkAuthentication } from '../functions/UserFunctions'

class MyPolicies extends Component {

    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            policy_id:'',
            policy: null,
            filter_properties:[],
            actionExecutionType:"",
            new_condition_submitted: false,
        }

        this.changeAnonymization = this.changeAnonymization.bind(this);
        this.changeActionExecutionType = this.changeActionExecutionType.bind(this);
        this.changePolicyActiveState = this.changePolicyActiveState.bind(this);
        this.conditionHandler = this.conditionHandler.bind(this);
        this.submitPolicyChanges = this.submitPolicyChanges.bind(this);
        this.checkAuthentication = checkAuthentication.bind(this)
    }

    componentDidMount () {

        const decodedToken = this.userActionAuthenticationCheck()

        var location = this.props.location.pathname.split('/');
        var policy_id = location[location.length - 1];

        this.setState({
            first_name: decodedToken.sub.first_name,
            last_name: decodedToken.sub.last_name,
            email: decodedToken.sub.email,
            user_id: decodedToken.sub.id,
            policy_id:policy_id
        })

        
        getPolicy(policy_id)
            .then(res => {
                this.updatePolicy(res)
            })
    }

    userActionAuthenticationCheck(){
        const [authenticated,decodedToken] = checkAuthentication()
        if(!authenticated){
            this.props.history.push('/login')
        }
        return decodedToken
    }

    updatePolicy(res){
        const policy = res.data['result']
        console.log("\n\n\npolicy\n " ,policy, "\n\n" )
        this.setState({policy:policy})
    }
   
     submitPolicyChanges(){
        this.userActionAuthenticationCheck()
        updatePolicy(this.state.policy)
     }

    changeAnonymization = (new_value) => {
        let newPolicy = JSON.parse(JSON.stringify(this.state.policy));
        newPolicy.policy_anonymize = new_value
        this.setState({policy:newPolicy})
    }

    conditionHandler(){
        this.setState({new_condition_submitted:!this.state.new_condition_submitted})
    } 

    changePolicyActiveState = (new_value) => {
        let newPolicy = JSON.parse(JSON.stringify(this.state.policy));
        newPolicy.policy_active = new_value
        this.setState({policy:newPolicy})
    }
    changeActionExecutionType = (event) => {
        const new_value = event.target.value
        const allowedExecutionTypes = ["OnStudy", "OnSeries", "OnInstance"];
        if (allowedExecutionTypes.includes(new_value)){
            let newPolicy = JSON.parse(JSON.stringify(this.state.policy));
            newPolicy.policy_actionExecutionType = new_value
            this.setState({policy:newPolicy})
        }
    }


    render () {
        if ((this.state.policy != null) && (this.state.policy_id!=null)){
            return (
                <div className="container">
                        <div>
                                <div>
                                    <div className="col-sm-8 mx-auto">
                                        <h1 className="text-center">Policy</h1>
                                    </div>
                                    <table className="table caption-top">
                                    <tbody>
                                        <tr>
                                            <td>Creator</td>
                                            <td>{this.state.policy.policy_user_name}</td>
                                        </tr>                            
                                        <tr>
                                            <td>Name</td>
                                            <td>{this.state.policy.policy_name}</td>
                                        </tr>
                                        <tr>
                                            <td>Description</td>
                                            <td>{this.state.policy.policy_description}</td>
                                        </tr>
                                        <tr>
                                            <td>Creation Date</td>
                                            <td>{this.state.policy.policy_created}</td>
                                        </tr>
                                        <tr>
                                            <td>Anonymize</td>
                                            <td> <Switch id={"1"} isOn={this.state.policy.policy_anonymize} onColor="#EF476F" handleToggle={()=>this.changeAnonymization(!this.state.policy['policy_anonymize'])} /></td>
                                        </tr>
                                        <tr>
                                            <td>Active</td>
                                            <td> <Switch id={"2"} isOn={this.state.policy.policy_active} onColor="#EF476F" handleToggle={()=>this.changePolicyActiveState(!this.state.policy['policy_active'])} /></td>
                                        </tr>
                                        <tr>
                                            <td>Apply On</td>
                                            <td>
                                            <div class="form-check form-check-inline" >
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="OnStudy" checked={this.state.policy.policy_actionExecutionType==="OnStudy"} onChange={this.changeActionExecutionType}/>
                                                <label class="form-check-label" for="inlineRadio1">Study</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="OnSeries"  checked={this.state.policy.policy_actionExecutionType==="OnSeries"} onChange={this.changeActionExecutionType}/>
                                                <label class="form-check-label" for="inlineRadio2">Series</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="OnInstance" checked={this.state.policy.policy_actionExecutionType==="OnInstance"} onChange={this.changeActionExecutionType}/>
                                                <label class="form-check-label" for="inlineRadio3">Instance </label>
                                                </div>
                                            </td>

                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>

                                        </tr>
                                            <button  onClick={this.submitPolicyChanges}class="btn btn-success" type="submit">Save Changes</button>
                                    </tbody>
                                    </table>
                                </div>
                                <ConditionList policy_id={this.state.policy_id} new_condition_submitted={this.state.new_condition_submitted} conditionHandler={this.conditionHandler}></ConditionList>
                                <RuleList policy_id={this.state.policy_id} new_condition_submitted={this.state.new_condition_submitted} conditionHandler={this.conditionHandler}></RuleList>
                                <ActionList policy_id={this.state.policy_id}></ActionList>
                        </div>
                </div>
            )
        }else{
            return (
                <div> 
                </div>
            )
        }

    }
}
//const Tab = ({ children }) => <div>{children}</div>;



export default MyPolicies