import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { getAllPolicies, deletePolicy, createPolicy } from './policy-manager/PolicyFunctions'
import ActionSelector from './policy-manager/ActionSelector'
import { createActionObject, getAllActionObjects,deleteActionObject, get_empty_actionObjectConfig,getPossibleActionObjectsList } from './functions/ActionObjectFunctions'


class ActionObjects extends Component {
    constructor() {
        super()
        this.state = {
            newActionObject: this.getEmptyActionObject(),
            actionObjects: []
        }
        this._deleteActionObject = this._deleteActionObject.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setSelectedActionType = this.setSelectedActionType.bind(this);
        this.mailForm = this.mailForm.bind(this);
        this.ftpForm = this.ftpForm.bind(this);
        this.httpForm = this.httpForm.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getEmptyActionObject = this.getEmptyActionObject.bind(this)
    }

    componentDidMount () {
        getAllActionObjects()
        .then(actionObjectsJSON => {
            this.updateActionObjects(actionObjectsJSON)
        })
        
    }
    updateActionObjects(actionObjectsJSON){
        if (actionObjectsJSON != null){
            const actionObjects = actionObjectsJSON.data
            const emptyActionObject = this.getEmptyActionObject()
            this.setState({actionObjects:actionObjects,newActionObject:emptyActionObject })
        }
    }

    getEmptyActionObject=()=>{
        return {
            objectType:"",
            config: {}
        }
    }

    _deleteActionObject = (id) => {
        deleteActionObject(id)
        .then(res => {
            getAllActionObjects()
            .then(actionObjectsJSON => {
                this.updateActionObjects(actionObjectsJSON)
            })
        })

    }
    
    onSubmit(e) {
        var actionObject = this.state.newActionObject
        const submitPossible = actionObject.objectType != "" && actionObject.config.name !=""
        if(submitPossible){
        var creation = new Date().toISOString()
        actionObject.creation = creation
        createActionObject(actionObject)
            .then(() => {
                getAllActionObjects()
                    .then(actionObjectsJSON => {
                        this.updateActionObjects(actionObjectsJSON)
                    })
            })

        }
    }

    setSelectedActionType(actionType) {
        var newActionObjectConfig = get_empty_actionObjectConfig(actionType)
        var currentActionObject = this.state.newActionObject
        currentActionObject.objectType = actionType.value
        currentActionObject.config = newActionObjectConfig
        
        this.setState({ newActionObject: currentActionObject })
    }
    
    onChange(e) {
        const target_key = e.target.name
        const target_value = e.target.value
        var newActionObject = this.state.newActionObject
        newActionObject.config[target_key] = target_value

        //new_action.action.actiontype.mail = e.action.actiontype.mail
        this.setState({ newActionObject: newActionObject })
    }


    mailForm = () => {
        return (
            <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%' , marginTop: '20px'}}>
                    <label>Object Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={this.onChange}
                        style={{ width: '70%', height: '30px', padding: '5px' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%' , marginTop: '20px'}}>
                    <label>From Address:</label>
                    <input
                        type="text"
                        id="from_addr"
                        name="from_addr"
                        onChange={this.onChange}
                        style={{ width: '70%', height: '30px', padding: '5px' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%' , marginTop: '20px'}}>
                    <label>SMTP Host:</label>
                    <input
                        type="text"
                        id="smtp_host"
                        name="smtp_host"
                        onChange={this.onChange}
                        style={{ width: '70%', height: '30px', padding: '5px' }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginTop: '20px' }}>
                    <label>SMTP Port:</label>
                    <input
                        type="text"
                        id="smtp_port"
                        name="smtp_port"
                        onChange={this.onChange}
                        style={{ width: '70%', height: '30px', padding: '5px' }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginTop: '20px' }}>
                    <label>User:</label>
                    <input
                        type="text"
                        id="user"
                        name="user"
                        onChange={this.onChange}
                        style={{ width: '70%', height: '30px', padding: '5px' }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginTop: '20px' }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={this.onChange}
                        style={{ width: '70%', height: '30px', padding: '5px' }}
                    />
                </div>

            </form>);
    }

    ftpForm = () => {
        return (
            <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%' , marginTop: '20px'}}>
                    <label>Object Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={this.onChange}
                        style={{ width: '70%', height: '30px', padding: '5px' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%' , marginTop: '20px'}}>
                    <label>FTP Address:</label>
                    <input
                        type="text"
                        id="servername"
                        name="servername"
                        onChange={this.onChange}
                        style={{ width: '70%', height: '30px', padding: '5px' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginTop: '20px' }}>
                    <label>FTP Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={this.onChange}
                        style={{ width: '70%', height: '30px', padding: '5px' }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginTop: '20px' }}>
                    <label>FTP Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={this.onChange}
                        style={{ width: '70%', height: '30px', padding: '5px' }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginTop: '20px' }}>
                    <label>Storage Path:</label>
                    <input
                        type="text"
                        id="path"
                        name="path"
                        onChange={this.onChange}
                        style={{ width: '70%', height: '30px', padding: '5px' }}
                    />
                </div>
            </form>);
    }
    httpForm = () => {
        return (
            <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%' , marginTop: '20px'}}>
                    <label>Object Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={this.onChange}
                        style={{ width: '70%', height: '30px', padding: '5px' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%' , marginTop: '20px'}}>
                    <label>HTTP Address:</label>
                    <input
                        type="text"
                        id="servername"
                        name="servername"
                        onChange={this.onChange}
                        style={{ width: '70%', height: '30px', padding: '5px' }}
                    />
                </div>
            </form>);
    }
    render() {
        return (
            <div className="container">
                <div className="col-sm-8 mx-auto">
                    <h2 className="text-center">Action Objects</h2>
                </div>
                <table class="table caption-top">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Action Type</th>
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
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td><button onClick={this.onSubmit} className="btn btn-success" type="submit">+</button></td>
                        </tr>
                        {this.state.newActionObject.objectType === "Mail" ? (
                            <tr><td colspan="7">{this.mailForm()}</td></tr>
                        ) : null}                       
                         {this.state.newActionObject.objectType === "FTP" ? (
                            <tr><td colspan="7">{this.ftpForm()}</td></tr>
                        ) : null}
                         {this.state.newActionObject.objectType === "HTTP" ? (
                            <tr><td colspan="7">{this.httpForm()}</td></tr>
                        ) : null}

                    </tbody>
                </table>
                <table class="table caption-top">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Action Type</th>
                            <th scope="col">Action Object Name</th>
                            <th scope="col">Properties</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.actionObjects.map((actionObject, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <tr  style={{ alignItems: 'center', padding: '10px', marginTop: '5px' }}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{actionObject.objectType}</td>
                                        <td>{actionObject.config.name}</td>

                                        {Object.keys(actionObject.config).map((keyName, i) => (
                                            <tr>
                                            {keyName !== 'password' && 
                                                <td key={i} style={{ alignItems: 'center', padding: '10px', marginTop: '5px' }}>
                                                    {keyName}: {actionObject.config[keyName]}
                                                </td>
                                            }
                                        </tr>
                                        ))}
                                        
                                        <td><button onClick={this._deleteActionObject.bind(this, actionObject['_id'])} class="btn btn-danger" type="submit">delete</button></td>
                                    </tr>
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

export default ActionObjects