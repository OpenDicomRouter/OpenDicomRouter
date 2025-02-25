import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { checkAuthentication } from './functions/UserFunctions'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            loggedIn: false
        }
    }

    componentDidMount () {
        
        const token = JSON.parse(localStorage.getItem("usertoken"))
        const decoded = jwt_decode(token)
        this.setState({
            first_name: decoded.sub.first_name,
            last_name: decoded.sub.last_name,
            email: decoded.sub.email
        })
    }
    componentWillMount(){
        var validToken = false
        try{
            const token = JSON.parse(localStorage.getItem("usertoken"))
            console.log(token)
            const decoded = jwt_decode(token) 
            if (token){
                let expirationDate = decoded.exp;
                    var current_time = Date.now() / 1000;
                    if(expirationDate < current_time)
                    {
                        localStorage.removeItem("usertoken");
                    }else{
                        validToken = true
                    }
            }
            this.setState({loggedIn: validToken})
        }
        catch (error) {
            console.error(error);
            localStorage.removeItem("usertoken");
            this.props.history.push(`/login`)
          }
          
    }

    render () {
        if (this.state.loggedIn){
            return (
                <div className="container">
                    <div className="jumbotron mt-5">
                        <div className="col-sm-8 mx-auto">
                            <h1 className="text-center">PROFILE</h1>
                        </div>
                        <table className="table col-md-6 mx-auto">
                            <tbody>
                                <tr>
                                    <td>First Name</td>
                                    <td>{this.state.first_name}</td>
                                </tr>
                                <tr>
                                    <td>Last Name</td>
                                    <td>{this.state.last_name}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{this.state.email}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }else{
            return (<div> Not Logged in</div>)
        }

    }
}

export default Profile
