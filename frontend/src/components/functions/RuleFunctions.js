import axios from 'axios'


/**
 * createRule - This function creates a new rule using the axios library and making a POST request to the API endpoint "/rule".
 * The new rule to be created is passed as an argument and is stored in the variable "newRule".
 * The value of the logical operator of the new rule is extracted from the "newRule" object and stored in the variable "ruleToPost".
 * The function returns the axios POST request, which will resolve to a "Created Rule" message in the console if successful.
 * In case of any error, it logs the error to the console.
 *
 * @param  {Object} newRule The new rule to be created.
 * @return {Object}         Axios POST request.
 */
 export const createRule = newRule => {
    var ruleToPost = newRule
    ruleToPost.logical_operator = newRule.logical_operator.value
    return axios
        .post('/rule',newRule)
        .then(response => {
            console.log("Created Rule")
        })
        .catch(err=>{
            console.log(err)
        })
}
/**
 * This function retrieves all the rules of a policy from the backend API.
 * @param {String} policy_id The id of the policy.
 * @returns {Promise} A promise that resolves to the response of the API request.
 */
export const getAllRules =(policy_id) => {
    return axios
        .get('/rules/'+policy_id)
        .then(response => {
            console.log("Retrieved Rules")
            return response
        })
        .catch(err => {
            console.log(err)
        })
}

/**
 * This function retrieves a single rule from the backend API.
 * @param {String} id The id of the rule.
 * @returns {Promise} A promise that resolves to the response of the API request.
 */
export const getRule = id => {
    return axios
        .get('/rules/'+id)
        .then(response => {
            console.log("Retrieved Rule")
            return response
        })
        .catch(err => {
            console.log(err)
        })
}

/**
 * This function retrieves all the rules of a policy from the backend API.
 * @param {String} policy_id The id of the policy.
 * @returns {Promise} A promise that resolves to the response of the API request.
 */
export const getRules = policy_id => {
    return axios
        .get('/rule/'+policy_id)
        .then(response => {
            console.log("Retrieved Rules")
            return response
        })
        .catch(err => {
            console.log(err)
        })
}

/**
 * This function deletes a rule from the backend API.
 * @param {String} id The id of the rule.
 * @returns {Promise} A promise that resolves to the response of the API request.
 */
export const deleteRule = id =>{
    console.log("Deleting Rule" + id)
    return axios
        .delete('/rules/'+id)
        .then(response => {
            console.log("Deleted")
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
}