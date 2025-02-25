import React, { Component } from 'react'
import ActionSelector from './ActionSelector'
import { createAction, getAllActionsId,getAllActions,deleteAction
    } from '../functions/ActionFunctions'; 
import {getAllActionObjects, getPossibleActionObjectsList} from '../functions/ActionObjectFunctions'

const max = 100000


class ActionList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedActionType:"",
            policy_id:"",
            new_action: this.getEmptyAction(),
            actions:[],
            actionObjects:[],
            actionObjectsSelectable: []
        }
        this._deleteAction = this._deleteAction.bind(this);
        this.show_details = this.show_details.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
        this.setSelectedActionType = this.setSelectedActionType.bind(this)
        this.setSelectedAction = this.setSelectedAction.bind(this)
        this.form = this.form.bind(this);
        this.form1 = this.form1.bind(this);
        this.onChange = this.onChange.bind(this)
        this.getActionObjectsFromJSON = this.getActionObjectsFromJSON.bind(this)
        this.getEmptyAction = this.getEmptyAction.bind(this)
    }
    getEmptyAction(){
        return {
            policy_id:"",
            created:"",
            objectType:"",
            objectName:"",
            actionObjectID:"",
            created:"",
            data:{}
        }
    }

    componentDidMount() {
        const policy_id = this.props.policy_id
        var new_action = this.state.new_action
        new_action.policy_id = policy_id
        this.setState({new_action:new_action})
        getAllActions(this.state.policy_id)
            .then(act=>{
                this.updateActions(act)
            })
     }

     componentWillMount(){
        getAllActionObjects()
        .then(actionObjectsJSON => {
            this.updateActionObjects(actionObjectsJSON)
        })
     }

     loadActions=(query)=>{
        return getAllActions(this.state.new_action.policy_id)
        .then((res)=>res.data.result)

 }

    updateActions(act){
        if (act != null){
            const actions1 = act.data['result']
            this.setState({policy_id:this.props.policy_id,actions:actions1})
        }
    }
    transformActionObject(actionObject){
        return {"label":actionObject.config.name,"value":actionObject._id}
    }

    updateActionObjects(actionObjectsJSON){
        if (actionObjectsJSON != null){
            const actionObjects = actionObjectsJSON.data

            const emptyActionObject = this.getEmptyAction()
            this.setState({actionObjects:actionObjects,newActionObject:emptyActionObject })
        }
    }
    getActionObjectsFromJSON(actionObjectsJSON){
        if (actionObjectsJSON != null){
            const actionObjects = actionObjectsJSON.data
            return actionObjects
        }else{
            return []
        }
    }
    _deleteAction=(id)=>{
        deleteAction(id).then(res =>{
            getAllActions(this.state.policy_id)
            .then(res => {
                this.updateActions(res)
            }) 
        })

    }

    show_details=(id, index)=>{
        if (this.state.editingIndex == index && this.state.show_details){
            this.setState({show_details:false})
        }else{
            this.setState({editingIndex: index,show_details:true});
        }
        
    }
    
    onSubmit(e){
        var action_to_submit = this.state.new_action;
        action_to_submit.policy_id = this.props.policy_id
        createAction(action_to_submit)
        .then(()=>{
            getAllActions(this.state.policy_id)
            .then(res=>{
                this.updateActions(res)
            })
        })

        var new_action = this.getEmptyAction()

        this.setState({new_action:new_action})
        this.setState({selectedActionType:""})
       
    }
    setSelectedActionType(actionType){
        var actionObjectsSelectable = this.state.actionObjects
        actionObjectsSelectable = this.state.actionObjects.filter(actionObject => actionObject.objectType == actionType.value)
        actionObjectsSelectable = actionObjectsSelectable.map(this.transformActionObject)
        this.setState({actionObjectsSelectable:actionObjectsSelectable,selectedActionType:actionType.value})
    }

    setSelectedAction(action){

        var new_action = this.state.new_action
        new_action.actionObjectID = action.value
        new_action.objectType = this.state.selectedActionType
        new_action.objectName = action.label
        this.setState({new_action:new_action})
    }

    onChange (e) {
        const target_key = e.target.name
        const target_value = e.target.value
        var new_action = this.state.new_action
        new_action.data[target_key] = target_value
        this.setState({new_action:new_action})
    }

    form1 = (eeee) => {
       // var test = eeee.action.actiontype.mail.to
        return(
            <form style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '10px'}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%'}}>
                    <label>To:</label>
                    <input readOnly type="text" value= {eeee.to} style={{width: '70%', height: '30px', padding: '5px'}}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginTop: '20px'}}>
                    <label>Subject:</label>
                    <input readOnly type="subject" value={eeee.subject} style={{width: '70%', height: '30px', padding: '5px'}}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginTop: '20px'}}>
                    <label>Message:</label>
                    <textarea readOnly value={eeee.message} rows="5" style={{width: '70%', height: '120px', padding: '5px'}}/>
                </div>
            </form>);
    }

    form = (eeee) => {
        return(
        <form style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '10px'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%'}}>
                <label>To:</label>
                <input
                type="text"
                id="to"
                name="to"
                onChange={this.onChange}
                style={{width: '70%', height: '30px', padding: '5px'}}
                />
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginTop: '20px'}}>
                <label>Subject:</label>
                <input
                type="subject"
                id="subject"
                name="subject"
                onChange={this.onChange}
                style={{width: '70%', height: '30px', padding: '5px'}}
                />
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginTop: '20px'}}>
                <label>Message:</label>
                <textarea
                id="message"
                name="message"
                onChange={this.onChange}
                rows="5"
                style={{width: '70%', height: '120px', padding: '5px'}}
                />
            </div>
        </form>);
    }
    
    render () {
       // if (this.props.policy_id != null){
        return (
            <div className="container">
                    <div className="col-sm-8 mx-auto">
                        <h2 className="text-center">Actions</h2>
                    </div>
                    <table class="table caption-top">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Action Type</th>
                            <th scope="col">Action Object</th>
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
                                    <ActionSelector
                                        options={getPossibleActionObjectsList()}
                                        setSelected={this.setSelectedActionType}
                                    />
                                </td>

                                {(this.state.selectedActionType.length > 0 && this.state.actionObjectsSelectable.length>0)? (
                                    <td>

                                    <ActionSelector
                                            options={this.state.actionObjectsSelectable}
                                            setSelected={this.setSelectedAction}
                                        />
                                    </td>
                                     ) : <td> - </td>} 
  
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td><button onClick={this.onSubmit} className="btn btn-success" type="submit">+</button></td>
                            </tr>
                            {this.state.new_action.objectType === "Mail"? (
                                     <tr><td colspan="7">{this.form()}</td></tr>
                                     ) : null}     
                            
                    {this.state.actions.map((action,index) => {
                            return (
                                <React.Fragment key={index}>
                                    <tr>
                                    <th scope="row">{index+1}</th>
                                    <td>{action.objectType}</td>
                                    <td>{action.objectName}</td>
                                    <td>{action.created}</td>
                                    <td>
                                    {(action.objectType === "Mail")? (
                                     <button onClick={this.show_details.bind(this, action['_id'], index)} class="btn btn-primary" type="submit">Show</button>) : null}    
                                    </td>
                                    <td><button onClick={this._deleteAction.bind(this, action['_id'])} class="btn btn-danger" type="submit">delete</button></td>
                                    <td> -</td>
                                    </tr>
                                    {(this.state.editingIndex === index && action.objectType === "Mail" && this.state.show_details)? (
                                     <tr><td colspan="7">{this.form1(action.data)}</td></tr>
                                     ) : null}      
                                </React.Fragment>
                            )
                        }
                    )}
                    </tbody>
                    </table>
                    
            </div>
        )
    }
//}
}

export default ActionList

