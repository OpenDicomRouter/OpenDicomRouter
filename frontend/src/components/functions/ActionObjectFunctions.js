import axios from 'axios'

export const getAllActionObjects = () => {
    console.log("Retrieved Actions0")
    return axios
        .get('/action_objects')
        .then(response => {
            console.log("Retrieved ActionObjects")
            console.log(response)
            return response
        })
        .catch(err => {
            console.log(err)
        })
}

export const createActionObject = newActionObject => {
    var newActionObjectToPost = newActionObject
    console.log("New rule to post: ", newActionObjectToPost)
    return axios
        .post('/action_objects', newActionObjectToPost)
        .then(response => {
            console.log("Created ActionnObject")
        })
}

export const deleteActionObject = id => {
    return axios
        .delete('/action_objects/' + id)
        .then(response => {
            console.log("Deleted ActionObject")
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
}


export const getPossibleActionObjectsList = () =>{
    return [

        {
            label: "Mail",
            value: "Mail"
        },
        {
            label: "HTTP ",
            value: "HTTP"
        },
        {
            label: "FTP",
            value: "FTP"
        },
        {
            label: "Drop",
            value: "Drop"
        }
    ]
}

export const get_empty_actionObjectConfig = (objectType)=>{
    var newActionObjectConfig = {}
    switch(objectType) {
            case "Mail Object":
                newActionObjectConfig={
                    "name": "",
                    "smtp_host": "",
                    "smtp_port": "",
                    "user":"",
                    "password":""
                }
            break;
            case "FTP":
                newActionObjectConfig={
                    "name":"",
                    "servername": "",
                    "username": "",
                    "password": "",
                    "path":""
                }
            break;
            case "HTTP":
                // code block
                newActionObjectConfig={
                    "name":"",
                    "API URL": ""
                }
                break;
            default:
                newActionObjectConfig={}
        }
    return newActionObjectConfig
}
