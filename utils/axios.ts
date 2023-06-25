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