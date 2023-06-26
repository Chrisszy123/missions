import axios from "axios";

// communities
export const getCommunities = async () => {
    const communities = await axios.get('/api/community')
    return communities
}
export const createCommunity = async(communityData: any) => {
    try{
        console.log(communityData)
        await axios.post('/api/community/create', {
            communityData
        })
        return {status: true, message: "success"}
    }catch(err: any){
        throw new Error('axios post community error' + err)
    }
}
export const updateCommunity = async(communityData: any) => {
    try{
        console.log(communityData)
        await axios.put('/api/community/edit', {
            communityData
        })
        return{status: true, message: "community successfully updated"}
    }catch(err: any){
        throw new Error('axios patch community error' + err)
    }
}

// missions
export const getMissions = async () => {
    const missions = await axios.get('/api/mission')
    return missions
}

// users
export const createUser = async(userData: any) => {
    try{
        const user = await axios.post('/api/users/create', {userData})
        return {status: true, message: user}
    }catch(err: any){
        throw new Error('error creating user' + err)
    }
    
}
export const getUsers = async() => {
    try{
        const users = await axios.get('/api/users')
        if(!users) throw new Error("users missing")
        return {status: true, message: users}
    }catch(err:  any){
        throw new Error("error getting users" + err)
    }
}