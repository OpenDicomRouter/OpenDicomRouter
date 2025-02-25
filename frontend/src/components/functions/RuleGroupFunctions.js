import axios from 'axios'

export const createRuleGroup = newRuleGroup => {
    /**
     * Creates a new rule group with the given data.
     * @param {Object} newRuleGroup - The new rule group data with properties: logical_operator, policy_id and name.
     * @returns {Promise} - The axios response after posting the new rule group.
     */
    var groupToPost = newRuleGroup
    groupToPost.logical_operator = newRuleGroup.logical_operator.value
    return axios
        .post('/ruleGroup',newRuleGroup)
        .then(response => {
            console.log("Created RuleGroup")
        })
}

export const getAllRuleGroups =(policy_id) => {
    /**
     * Retrieves all the rule groups for the given policy_id.
     * @param {Number} policy_id - The policy id of the rule groups to retrieve.
     * @returns {Promise} - The axios response after retrieving the rule groups.
     */
    return axios
        .get('/ruleGroups/'+policy_id)
        .then(response => {
            return response
        })
        .catch(err=>{
            console.log(err)
        })
}

export const getRuleGroups = policy_id => {
    /**
     * Retrieves the rule groups for the given policy_id.
     * @param {Number} policy_id - The policy id of the rule groups to retrieve.
     * @returns {Promise} - The axios response after retrieving the rule groups.
     */
    return axios
        .get('/ruleGroup/'+policy_id)
        .then(response => {
            return response
        })
        .catch(err=>{
            console.log(err)
        })
}

export const deleteRuleGroup = id =>{
    /**
     * Deletes the rule group with the given id.
     * @param {Number} id - The id of the rule group to delete.
     * @returns {Promise} - The axios response after deleting the rule group.
     */
    return axios
        .delete('/ruleGroup/'+id)
        .then(response => {
            console.log(response)
        })
        .catch(err=>{
            console.log(err)
        })
}