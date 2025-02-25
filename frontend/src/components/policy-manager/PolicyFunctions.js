import axios from 'axios'

export const createPolicy = newPolicy => {
    return axios
        .post('/policies',{
            user_name: newPolicy.user_name,
            user_id: newPolicy.user_id,
            policy_name: newPolicy.policy_name,
            policy_description: newPolicy.policy_description
        })
        .then(response => {
            console.log("Created Policy")
        })
}

export const getAllPolicies =() => {
    return axios
        .get('/policies')
        .then(response => {
            console.log("Retreived Policies")
            return response
        })
        .catch(err=>{
            console.log(err)
        })
}

export const getPolicy = id => {
    return axios
        .get('/policies/'+id)
        .then(response => {
            console.log("Retreived Policy")
            console.log(response)
            return response
        })
        .catch(err=>{
            console.log(err)
        })
}

export const deletePolicy = id =>{
    return axios
        .delete('/policies/'+id)
        .then(response => {
            console.log("Deleted")
        })
        .catch(err=>{
            console.log(err)
        })
}
export const updatePolicy = policy =>{
    return axios
        .put('/policies/'+policy.policy_id,policy)
        .then(response => {
            console.log("Updated ",response)
        })
        .catch(err=>{
            console.log(err)
        })
}