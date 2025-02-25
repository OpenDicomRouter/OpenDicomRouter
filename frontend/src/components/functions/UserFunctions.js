import axios from 'axios'
import jwt_decode from 'jwt-decode'
import React from 'react' 

export const setAuthToken = token => {
    console.log("set Auth Token : ", token)
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else
        delete axios.defaults.headers.common["Authorization"];
 }

export const register = newUser => {
    /**
     * Register a new user
     * 
     * @param {Object} newUser - The new user information
     * @param {string} newUser.first_name - The first name of the user
     * @param {string} newUser.last_name - The last name of the user
     * @param {string} newUser.email - The email of the user
     * @param {string} newUser.password - The password of the user
     * 
     * @returns {Promise} - A Promise that resolves when the user is registered
     */
    return axios
        .post("users/register", {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        })
        .then(response => {
            console.log("Registered")
        })
}

export const login = user => {
    /**
     * Login an existing user
     * 
     * @param {Object} user - The user information
     * @param {string} user.email - The email of the user
     * @param {string} user.password - The password of the user
     * 
     * @returns {Promise} - A Promise that resolves with the user's token when the user is successfully logged in
     */
    return axios
        .post("users/login", {
            email: user.email,
            password: user.password
        })
        .then(response => {
            localStorage.setItem('usertoken', response.data.result.token)
            return response.data.result.token
        })
        .catch(err => {
            console.log(err)
        })
}

export const checkAuthentication = () =>{
    var validToken = false
    var decoded = {}
    try {
        const token = localStorage.usertoken
        decoded = jwt_decode(token) 
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
      }catch{

      } 
      return [validToken,decoded]
};

