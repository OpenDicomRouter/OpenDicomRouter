import axios from 'axios'

/**
 * getAllConditions - A function to retrieve all conditions for a given policy_id
 *
 * @param {string} policy_id  The policy_id for which the conditions need to be retrieved
 * @return {Promise}  A promise that returns the response data if resolved or an error if rejected
 */
 export const getAllConditions =(policy_id) => {
    return axios
        .get('/condition/'+policy_id)
        .then(response => {
            console.log(response)
            return response
        })
        .catch(err=>{
            console.log(err)
        })
}

/**
 * createCondition - A function to create a new condition
 *
 * @param {Object} newCondition  An object that contains the new condition data
 * @return {undefined}  Returns nothing, only logs "Created Condition" on success
 */
export const createCondition = newCondition => {
    var conditionToPost = newCondition
    conditionToPost.property_key = newCondition.key_property.Keyword
    delete conditionToPost.key_property
    conditionToPost.property_operator = newCondition.property_operator.operator

    console.log("New rule to post : ", conditionToPost)
    return axios
        .post('/condition',conditionToPost)
        .then(response => {
            console.log("Created Condition")
        })
}

/**
 * getCondition - A function to retrieve a condition for a given id
 *
 * @param {string} id  The id for which the condition needs to be retrieved
 * @return {Promise}  A promise that returns the response data if resolved or an error if rejected
 */
export const getCondition = async id => {
    try {
        const response = await axios
            .get('/conditions/' + id)
        return response
    } catch (err) {
        console.log(err)
    }
}

/**
 * deleteCondition - A function to delete a condition for a given id
 *
 * @param {string} id  The id for which the condition needs to be deleted
 * @return {Promise}  A promise that returns the response data if resolved or an error if rejected
 */
export const deleteCondition = id =>{
    return axios
        .delete('/conditions/'+id)
        .then(response => {
            console.log("Deleted Condition")
            console.log(response)
        })
        .catch(err=>{
            console.log(err)
        })
}


export const getConditionRule = (policy_id, condition_id) => {
    return axios
        .get('/ruleCondition/'+policy_id+'/'+condition_id)
        .then(response => {
            return response
        })
        .catch(err=>{
            console.log(err)
        })
}