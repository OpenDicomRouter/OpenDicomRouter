import React, { Component} from 'react'
import { getAllFilterProperties, 
         getFilterProperty, 
         getAllOperators, 
         getOperator} from '../functions/Utility_Functions';
import { getAllConditions,
         deleteCondition,
         createCondition,getConditionRule
         } from '../functions/ConditionFunctions'; 
import  Message  from  './ErrorMessage'
import AsyncSearchField from './AsyncSearchField';


class ConditionList extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            policy_id:"",
            conditions:[],
            new_condition: {
                policy_id:"",
                key_property:"",
                property_operator:"",
                property_value:"",
                description:""
            },
            
            filter_properties:[],
            ruleAvailable: false,
            missingInput: false
        }
        
        this.deleteCondition = this.deleteCondition.bind(this);
        this.setSelectedKeyWord = this.setSelectedKeyWord.bind(this);
        this.setSelectedOperator = this.setSelectedOperator.bind(this);
        this.loadOptionsKeywords = this.loadOptionsKeywords.bind(this);
        this.loadOptionsOperators = this.loadOptionsOperators.bind(this);
        this.submitNewCondition = this.submitNewCondition.bind(this);
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount () {
        const policy_id = this.props.policy_id
        var new_condition = this.state.new_condition
        new_condition.policy_id = policy_id
        this.setState({new_condition:new_condition})
        getAllFilterProperties()
            .then(res =>{
                this.updateFilterProperties(res)
            })
            getAllConditions(policy_id)
            .then(res=>{
                this.updateConditions(res)
            })
    }

    deleteCondition=(conditionId)=>{
        getConditionRule(this.props.policy_id, conditionId)
            .then(res => {
                if(res.data.result.length==0){
                    this.setState({ruleAvailable:false})
                    deleteCondition(conditionId).then(res =>{
                    getAllConditions(this.state.policy_id)
                    .then(res => {
                        this.updateConditions(res)
                        this.props.conditionHandler()
                    }) 
                }).then(()=>{
                    this.props.conditionHandler()
                })}
                else{
                    this.setState({ruleAvailable:true})
                    this.showErrorRuleAvailable()
                }
        })
    }

    updateConditions(res){
        if (res != null){
            const conditions = res.data['result']
            this.setState({policy_id:this.props.policy_id,conditions:conditions})
        }
    }

    updateFilterProperties(res){
        if (res != null){
            var filter_properties= res.data.filterproperties;
            filter_properties = filter_properties.map((x,index) => {
                x.value=index
                return x
            });
            this.setState({filter_properties:filter_properties})
        }else{
            console.log("res is null")
        }
    }

    setSelectedKeyWord(keyWord){
        var new_condition = this.state.new_condition
        new_condition.key_property=keyWord
        this.setState({new_condition:new_condition})
    }

    loadOptionsKeywords=(query)=>{
        if (query.length >0){
         return getFilterProperty(query)
         .then((res)=>{
          return res.data.filterproperties});
        }else{
            return getAllFilterProperties()
            .then((res)=>res.data.filterproperties)
        }
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
 
    setSelectedOperator(property_operator){
        var new_condition = this.state.new_condition
        new_condition.property_operator = property_operator
        this.setState({new_condition:new_condition})
     }


     submitNewCondition(){
        if(this.validateInputs()){
            createCondition(this.state.new_condition)
            .then(()=>{
                getAllConditions(this.state.policy_id)
                .then(res=>{
                    this.updateConditions(res)
                    this.loadOptionsKeywords("")
                    this.props.conditionHandler()
                })
                .then(()=>{
                    this.props.conditionHandler()
                })
            })
        
            var new_condition= {
                policy_id:"",
                key_property:"",
                property_operator:"",
                property_value:"",
                description:""
            }
            new_condition.policy_id = this.state.policy_id
            this.setState({new_condition:new_condition})
            this.setSelectedKeyWord(null)
            this.state.new_condition.description = ''
            this.state.new_condition.property_value = ''
        } else {
            this.setState({missingInput:true})
            this.showErrorMissingInput()
        }
    }

    validateInputs(){
        var inputValid = false
        const key_property = Object.keys(this.state.new_condition.key_property).length > 0
        const property_operator = Object.keys(this.state.new_condition.property_operator).length > 0
        const property_value = this.state.new_condition.property_value.length > 0
        const description = this.state.new_condition.description.length > 0
        
        if (key_property && property_operator &&  property_value && description){
            inputValid = true
        }
        return inputValid
    }

    showErrorRuleAvailable(){
        this.setState({ruleAvailable:true})
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            this.setState({ruleAvailable:false})
          }, 4000)
      
          return () => {
            clearTimeout(timeId)
          }
    }

    showErrorMissingInput(){
        this.setState({missingInput:true})
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            this.setState({missingInput:false})
          }, 4000)
      
          return () => {
            clearTimeout(timeId)
          }
    }

    onChange (e) {
        const target_key = e.target.name
        const target_value = e.target.value
        var new_condition = this.state.new_condition
        new_condition[target_key] = target_value
        this.setState({new_condition:new_condition})
    }

    changeconditionValue
    render () {
      return (
                <div className="container">
                        <div className="col-sm-8 mx-auto">
                            <h2 className="text-center">Conditions</h2>
                        </div>

                        <table class="table caption-top">
                        <thead>
                        <tr>
                        <th scope="col">DICOM Tag</th>
                        <th scope="col">Operation</th>
                        <th scope="col">Value</th>
                        <th scope="col">Comment</th>
                        <th scope="col"> Add / Delete </th>
                        </tr>
                    </thead>
                        <tbody>
                            <tr>
                            <td>
                               <AsyncSearchField 
                               setSelected={this.setSelectedKeyWord} 
                               filterproperties={[]}
                               loadOptions={this.loadOptionsKeywords}
                               getOptionLabel={(e) => e.Keyword}
                               getOptionValue={(e) => e._id}
                               new_condition_submitted = {this.props.new_condition_submitted}
                               ></AsyncSearchField>
                            </td>
                            <td>
                               <AsyncSearchField 
                               setSelected={this.setSelectedOperator} 
                               filterproperties={[]}
                               loadOptions={this.loadOptionsOperators}
                               getOptionLabel={(e) => e.operator}
                               getOptionValue={(e) => e.id}
                               new_condition_submitted = {this.props.new_condition_submitted}
                               ></AsyncSearchField>
                            </td>
                                <td> 
                                    <input type="text"
                                        className="form-control"
                                        name="property_value"
                                        placeholder="Value"
                                        value={this.state.new_condition.property_value}
                                        onChange={this.onChange} /> 
                                </td>
                                <td> 
                                    <input type="text"
                                        className="form-control"
                                        name="description"
                                        placeholder="Comment"
                                        value={this.state.new_condition.description}
                                        onChange={this.onChange} /> 
                                </td>
                                <td>
                                    <button 
                                        onClick={this.submitNewCondition} 
                                        class="btn btn-success" 
                                        type="submit"
                                    >
                                        +
                                    </button>
                                    </td>
                            </tr>
                            { this.state.conditions.map((condition,index) => {
                                   
                                        return (
                                            <React.Fragment key={index}>
                                                <tr>
                                                <td>{condition.property_key}</td>
                                                <td>{condition.property_operator}</td>
                                                <td>{condition.property_value}</td>
                                                <td>{condition.description}</td>
                                                <td>
                                                <button onClick={this.deleteCondition.bind(this,condition['_id'])} class="btn btn-outline-danger">
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
                        {this.state.ruleAvailable && 
                    <Message children={(                     
                        <div class="alert alert-danger alert-dismissible fade show">
                        <strong>Error!</strong> Condition cannot be deleted because it is used in a rule
                        </div>)} variant={'Error'} ></Message>
                    }  
                    {this.state.missingInput && 
                    <Message children={(                     
                        <div class="alert alert-danger alert-dismissible fade show">
                        <strong>Error!</strong> DICOM Tag, Operation, Value and Comment field cannot be empty.
                        </div>)} variant={'Error'} ></Message>
                    }
                </div>
            )
    }
}

export default ConditionList