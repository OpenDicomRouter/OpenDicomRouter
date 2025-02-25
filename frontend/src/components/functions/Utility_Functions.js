import axios from 'axios'

/**
 * getAllFilterProperties - function to retrieve all filter properties from the server
 * @returns {Object} - Axios response object containing the filter properties data
 */
 export const getAllFilterProperties =() => {
    return axios
        .get('/filterproperties')
        .then(response => {
            return response
        })
        .catch(err=>{
            console.log(err)
        })
}

/**
 * getFilterProperty - function to retrieve a specific filter property from the server
 * @param {string} query - the id of the filter property to be retrieved
 * @returns {Object} - Axios response object containing the filter property data
 */
export const getFilterProperty = query => {
    return axios
        .get('/filterproperties/'+query)
        .then(response => {
            return response
        })
        .catch(err=>{
            console.log(err)
        })
}

/**
 * getConditionProperty - function to retrieve a specific condition property from the server
 * @param {string} query - the id of the condition property to be retrieved
 * @returns {Object} - Axios response object containing the condition property data
 */
export const getConditionProperty = query => {
    return axios
        .get('/condition/'+query)
        .then(response => {
            return response
        })
        .catch(err=>{
            console.log(err)
        })
}

/**
 * getAllConditions - function to retrieve all conditions from the server
 * @returns {Object} - Axios response object containing the conditions data
 */
export const getAllConditions=() => {
    return axios
        .get('/condition')
        .then(response => {
            return response
        })
        .catch(err=>{
            console.log(err)
        })
}

/**
 * getAllConditions1 - function to retrieve conditions for a specific policy id from the server
 * @param {string} policy_id - the id of the policy to retrieve conditions for
 * @returns {Object} - Axios response object containing the conditions data
 */
export const getAllConditions1 =(policy_id) => {
    return axios
        .get('/condition/'+policy_id)
        .then(response => {
            return response
        })
        .catch(err=>{
            console.log(err)
        })
}

/**
 * getAllOperators - function to retrieve all operators from the server
 * @returns {Object} - Axios response object containing the operators data
 */

export const getAllOperators =() => {
    return axios
        .get('/operators')
        .then(response => {
            return response
        })
        .catch(err=>{
            console.log(err)
        })
}

/**
 * getOperator - function to retrieve operator from the server
 * @returns {Object} - Axios response object containing the operator data
 */
export const getOperator = query => {
    return axios
        .get('/operators/'+query)
        .then(response => {
            return response
        })
        .catch(err=>{
            console.log(err)
        })
}

