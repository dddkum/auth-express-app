import $api from '../app/api/api'

export const getUsers = async () => {
    try {
        const response = await $api.get('/api/users')
        return response.data
    } catch (error) {
        console.error('get users error', error)
    }
}
