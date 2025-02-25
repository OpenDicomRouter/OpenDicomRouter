import axios from 'axios'

export const getAllActionsId =(id) => {
    return axios
        .get('/actions/'+id)
        .then(response => {
            console.log("Retreived Rules")
            return response
        })
        .catch(err=>{
            console.log(err)
        })
}

export const getAllActions =(policy_id) => {
    console.log("Retreived Actions0")
    return axios
        .get('/actions/'+policy_id)
        .then(response => {
            console.log("Retreived Actions")
            console.log(response)
            return response
        })
        .catch(err=>{
            console.log(err)
        })
}

export const createAction = newAction => {
    var actionToPost = newAction
    //actionToPost.logical_operator = newAction.logical_operator.value
    console.log("New rule to post : ", actionToPost)
    return axios
        .post('/action',newAction)
        .then(response => {
            console.log("Created Action")
        })
}

export const deleteAction = id =>{
    return axios
        .delete('/actions/'+id)
        .then(response => {
            console.log("Deleted Action")
            console.log(response)
        })
        .catch(err=>{
            console.log(err)
        })
}
export const createDummyAction = () => {
    const action = {
        created:"",
        blabla:"",
        actiontype : {
                type: {
                    label:"",
                    value:""
                },
                mail:{
                    to:"",
                    subject:"",
                    message:""
                }
        },
        actionObject : {
            label : "",
            value :""
        }
    }
    return action
}
