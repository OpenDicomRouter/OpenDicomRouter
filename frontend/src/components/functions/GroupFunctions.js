import axios from 'axios'


/**
 * createGroup - function to create a new group
 *
 * @param {Object} newGroup - new group to be created
 * @return {Promise}  - Promise that resolves to the response from the server after sending a post request to the '/group' endpoint with the new group as the request body
 */
 export const createGroup = newGroup => {
    var groupToPost = newGroup
    groupToPost.logical_operator = newGroup.logical_operator.value

    return axios
        .post('/group',newGroup)
        .then(response => {
            console.log("Created Group")
        })
}

/**
 * getAllGroups - function to retrieve all groups associated with a policy
 *
 * @param {Number} policy_id - id of the policy associated with the groups to be retrieved
 * @return {Promise}  - Promise that resolves to the response from the server after sending a get request to the '/groups/' + policy_id endpoint
 */
export const getAllGroups =(policy_id) => {
    return axios
        .get('/groups/'+policy_id)
        .then(response => {
            return response
        })
        .catch(err=>{
            console.log(err)
        })
}

/**
 * getGroups - function to retrieve all groups associated with a policy
 *
 * @param {Number} policy_id - id of the policy associated with the groups to be retrieved
 * @return {Promise}  - Promise that resolves to the response from the server after sending a get request to the '/group/' + policy_id endpoint
 */
export const getGroups = policy_id => {
    return axios
        .get('/group/'+policy_id)
        .then(response => {
            return response
        })
        .catch(err=>{
            console.log(err)
        })
}

/**
 * deleteGroup - function to delete a group
 *
 * @param {Number} id - id of the group to be deleted
 * @return {Promise}  - Promise that resolves to the response from the server after sending a delete request to the '/group/' + id endpoint
 */
export const deleteGroup = id =>{
    return axios
        .delete('/group/'+id)
        .catch(err=>{
            console.log(err)
        })
}