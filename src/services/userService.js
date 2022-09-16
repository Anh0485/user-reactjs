import axios from '../axios'



const handleLoginApi = (userEmail, userPassword) => {
    //goi server nodejs 
    //de goi 
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUser = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)

}

const createNewService = (data) => {
    console.log('check data from service : ', data)
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    // return axios.delete('/api/delete-user', )
    return axios.delete('/api/delete-user', {
        // headers: {
        //   Authorization: authorizationToken
        // },
        data: {
            id: userId
        }
    });
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

export { handleLoginApi, getAllUser, createNewService, deleteUserService, editUserService }

