import axios from "axios";

// communities
export const getCommunities = async () => {
    const communities = await axios.get('/api/community')
    return communities
}
export const getOneCommunity = async(communityId:  any) => {
    const data = {
        communityId
    }
    try{
        const users = await axios.post('/api/community', data)
        if(!users) throw new Error("users missing")
        return {status: true, message: users}
    }catch(err:  any){
        return {status: false, message: err}
    }
}
export const createCommunity = async(communityData: any) => {
    try{
       
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
export const createMission = async(data: any) => {
    try{
        const mission = await axios.post('/api/mission/create', data)
        if(!mission) throw new Error('error')
        return { status: true, message: mission}
    }catch(err: any){
        throw new Error("error creating mission" + err)
    } 
}
export const updateMission = async(missionData: any) => {
    try{
        
        await axios.put('/api/mission/edit', {
            missionData
        })
        return{status: true, message: "Mission successfully updated"}
    }catch(err: any){
        throw new Error('axios patch mission error' + err)
    }
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
        return {status: false, message: err}
    }
}
export const getOneUser = async(email:  any) => {
    const data = {
        email
    }
    try{
        const users = await axios.post('/api/users/getOne', data)
        if(!users) throw new Error("users missing")
        return {status: true, message: users}
    }catch(err:  any){
        return {status: false, message: err}
    }
}
//
export const getTags = async() => {
    try{
        const tags = await axios.get('/api/tags')
        return {status: true, message: tags}
    }catch(err){
        throw new Error('error getting tags' + err)
    }
}

export const getTag = async(communityId: any) => {
    try{
        const tags = await axios.post('/api/tags/tag', communityId)
        return {status: true, message: tags}
    }catch(err){
        throw new Error('error getting tags' + err)
    }
}
// 
export const getImage = async(communityId: any) => {
    try{
        const tags = await axios.post('/api/communityImage', communityId)
        return {status: true, message: tags}
    }catch(err){
        throw new Error('error getting Image' + err)
    }
}
export const createImage = async(imageData: any) => {
    try{
        const tags = await axios.post('/api/communityImage/create', imageData)
        return {status: true, message: tags}
    }catch(err){
        throw new Error('error creating Image' + err)
    }
}