import axios from "axios";

// communities
export const getCommunities = async () => {
    const communities = await axios.get('/api/community')
    return communities
}

// missions
export const getMissions = async () => {
    const missions = await axios.get('/api/mission')
    return missions
}

export const createCommunity = async(communityData: any) => {
    try{
        console.log(communityData)
        await axios.post('/api/community/create', {
            communityData
        })
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
    }catch(err: any){
        throw new Error('axios patch community error' + err)
    }
}