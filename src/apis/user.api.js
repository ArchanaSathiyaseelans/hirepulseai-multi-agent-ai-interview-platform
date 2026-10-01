import api from "../utils/axios"

export const formatNameFromEmail = (email) => {
    if (!email) return 'User';
    const prefix = email.split('@')[0];
    const clean = prefix.replace(/[0-9]+$/, '').replace(/[._-]+/g, ' ').trim();
    if (!clean) return prefix;
    return clean.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
};

export const getCurrentUser = async () => {
    try {
        const response = await api.get("/api/me")
        return response.data
    } catch (error) {
        return null
    }
}

export const updateUserProfile = async (data) => {
    try {
        const response = await api.post("/api/user/update", data)
        return response.data
    } catch (error) {
        console.error("Update profile error:", error)
        throw error
    }
}

export const logoutUser = async () => {
    try {
        const response = await api.get("/api/auth/logout")
        return response.data
    } catch (error) {
        console.error("Logout error:", error)
        return { success: false }
    }
}

export const useCoins = async (data)=>{
    try {
        const response = await api.post("/api/auth/use-coins" , data)
        return response.data
    } catch (error) {
        console.error(error)
        throw error;
    }
}