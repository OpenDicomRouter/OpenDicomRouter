import React, { Component } from 'react'
import { login } from './functions/UserFunctions'
import  Message  from  './policy-manager/ErrorMessage'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            error:false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit (e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        login(user).then((res) => {
            console.log(res)
            if (res!==undefined &&!res.error) {
                this.props.history.push(`/mypolicies`)
            }else{
                this.showError()
                this.setState({error:true,errorMessage:"Wrong Username or Password"})
            }
        })
    }
    showError(){
        this.setState({error:true})
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            this.setState({error:false})
          }, 3000)
      
          return () => {
            clearTimeout(timeId)
          }
    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={this.state.email}
                                    onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password </label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={this.state.password}
                                    onChange={this.onChange} />
                            </div>

                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Sign in
                            </button>
                           {this.state.error && <div className="invalid-feedback">{this.state.errorMessage}</div>}
                            
                        </form>
                    </div>
                </div>
                <div>
                {this.state.error && 
                <Message children={(                     
                    <div class="alert alert-danger alert-dismissible fade show">
                    <strong>Error!</strong> {this.state.errorMessage}
                    </div>)} variant={'Error'} ></Message>
                } 
                </div>
            </div>


        )
    }
}

export default Login