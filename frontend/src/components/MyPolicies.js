import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { getAllPolicies,deletePolicy, createPolicy } from './policy-manager/PolicyFunctions'
import  Message  from  './policy-manager/ErrorMessage'
import { login, checkAuthentication } from './functions/UserFunctions'

class MyPolicies extends Component {

    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            user_id:'',
            policies:[],
            new_policy: {
                "user_name":"",
                "user_id":"",
                "policy_name":"",
                "policy_description":""
            },
           missingInput: false
           
        }
        this._deletePolicy = this._deletePolicy.bind(this);
        this._editPolicy = this._editPolicy.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
        this.onNameChange = this.onNameChange.bind(this)
        this.checkAuthentication = checkAuthentication.bind(this)
        //this.resetInputValidationState=this.resetInputValidationState(this);
    }

    componentDidMount () {
        //console.log("check authentication :", checkAuthentication())
        var [authenticated,decodedToken] = this.checkAuthentication();
        if (authenticated) {
            this.setState({
                first_name: decodedToken.sub.first_name,
                last_name: decodedToken.sub.last_name,
                email: decodedToken.sub.email,
                user_id: decodedToken.sub.id
            })
            getAllPolicies()
                .then(res => {
                    this.updatePolocies(res)
                })
        }else{
            this.props.history.push('/login')
        }
    }
    
    _deletePolicy=(id)=>{
        deletePolicy(id)
        getAllPolicies()
        .then(res => {
            this.updatePolocies(res)
        })
        
    }
    _editPolicy=(id)=>{
        this.props.history.push(`/policies/`+id)  
    }

    updatePolocies(res){
        if (res != null){
            const policies = res.data['result']
            const idx = Array.from(policies.keys())
            this.setState({policies,idx})
        }
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


    onDescriptionChange (e) {
        const new_policy = {
            "policy_name" : this.state.new_policy.policy_name,
            policy_description : e.target.value
        }
        this.setState({new_policy })
    }
    onNameChange(e){
        const new_policy = {
            "policy_name" : e.target.value,
            "policy_description" : this.state.new_policy.policy_description
        }
        this.setState({new_policy })
    }
    validateInputs(){
        var inputValid = false
        const name_not_empty = this.state.new_policy.policy_name.length > 0
        const description_not_empty = this.state.new_policy.policy_description.length > 0
        if (name_not_empty && description_not_empty){
            inputValid = true
        }
        return inputValid
    }
    resetInputValidationState(){
        this.setState({missingInput:false})
    }

    onSubmit(e){
        e.preventDefault()
        const newPolicy = {
            user_name: this.state.first_name + " "+ this.state.last_name,
            user_id: this.state.user_id,
            policy_name: this.state.new_policy.policy_name,
            policy_description: this.state.new_policy.policy_description,
        }
        const valid_input = this.validateInputs()
        if(valid_input){
            this.setState({missingInput:false})
            createPolicy(newPolicy)
            .then(res => {
                getAllPolicies()
                .then(res => {
                    this.updatePolocies(res)
                    
                })
            });
        }else{
            this.setState({missingInput:true})
            this.showError()
        }
    }

    
    render () {
        return (
            <div className="container">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Policies</h1>
                    </div>
                    <table class="table caption-top">
                    <caption>List of policies</caption>
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Creation Date</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                        <th scope="col"> Add </th>
                        
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                                <td> - </td>
                                <td> 
                                    <input type="text"
                                        className="form-control"
                                        name="policy_name"
                                        placeholder="Name"
                                        value={this.state.new_policy.policy_name}
                                        onChange={this.onNameChange} /> 
                                </td>
                                <td> 
                                    <input type="text"
                                        className="form-control"
                                        name="policy_description"
                                        placeholder="Description"
                                        value={this.state.new_policy.policy_description}
                                        onChange={this.onDescriptionChange} /> 
                                </td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td><button onClick={this.onSubmit} className="btn btn-success" type="submit">+</button></td>
                            </tr>
                    { this.state.policies.map((policy,index) => {
                            return (
                                <React.Fragment key={index}>
                                    <tr>
                                    <th scope="row">{index}</th>
                                    <td>{policy.policy_name}</td>
                                    <td>{policy.policy_description}</td>
                                    <td>{policy.policy_created}</td>
                                    <td><button onClick={this._editPolicy.bind(this, policy.policy_id)} class="btn btn-primary" type="submit">edit</button></td>
                                    <td><button onClick={this._deletePolicy.bind(this, policy.policy_id)} class="btn btn-danger" type="submit">delete</button></td>
                                    <td> -</td>
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
                        <strong>Error!</strong> Name and Description must be entered
                        </div>)} variant={'Error'} ></Message>
                    }            
                               
            </div>
        )
    }
}

export default MyPolicies