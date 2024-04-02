import axios from 'axios';

export const fetchUserProfile = async function () {
    const profile = await axios.get('http://localhost:3001/user/profile', {
        withCredentials: true
    })
    return await profile.data
}

export const fetchUserRatings = async () => {
    const ratings = await axios.get(`http://localhost:3002/stats/ratings`, {
        withCredentials: true
    })
    return await ratings.data
}

export const fetchNavBarContent = async function () {
    const response = await axios.get('http://localhost:3001/user/profile', {
        withCredentials: true
    })
    const data = await response.data

    const content: navBarContent = {
        username: data.username,
        picture: data.profile_picture
    }

    return content
}

export type navBarContent = {
    username: string,
    picture: string
}