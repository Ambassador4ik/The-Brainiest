import axios from 'axios';

export const fetchUserProfile = async function () {
    const profile = await axios.get('http://localhost:3001/user/profile', {
        withCredentials: true
    })
    return await profile.data
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