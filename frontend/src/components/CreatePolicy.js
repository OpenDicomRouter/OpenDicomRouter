import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { createPolicy } from './PolicyFunctions'

class CreatePolicy extends Component {
    constructor() {
        super()
        this.state = {
            user_id: '',
            policy_name: '',
            policy_description: '',
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    componentDidMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            user_id: decoded.sub.id,
        })
    }

    onSubmit (e) {
        e.preventDefault()
        console.log(this.state)
        const newPolicy = {
            user_id: this.state.user_id,
            policy_name: this.state.policy_name,
            policy_description: this.state.policy_description,
        }

        createPolicy(newPolicy).then(res => {
            this.props.history.push(`/myPolicies`)
        })
    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Create new Policy</h1>
                            <div className="form-group">
                                <label htmlFor="policy_name">Policy Name</label>
                                <input type="text"
                                    className="form-control"
                                    name="policy_name"
                                    placeholder="Enter a new name for the Policy"
                                    value={this.state.policy_name}
                                    onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="policy_description">Policy Description</label>
                                <textarea type="text"
                                    className="form-control"
                                    name="policy_description"
                                    placeholder="Enter a Description"
                                    value={this.state.policy_description}
                                    onChange={this.onChange} />
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreatePolicy
