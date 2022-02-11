export const GET_CREWMEMBERS = "GET_CREWMEMBERS";
export const ADD_CREWMEMBER = "ADD_CREWMEMBER";
export const UPDATE_CREWMEMBER = "UPDATE_CREWMEMBER";
export const DELETE_CREWMEMBER = "DELETE_CREWMEMBER";


export function getCrewmembers(movieId) {
    return {
        type: GET_CREWMEMBERS,
        payload: async() => {
            const response = await fetch(`/movies/${movieId}/crewmembers`)
            const data = response.json()
            return data
        }
    }
}

export function addCrewmember(movieId, crewmember) {
    return {
        type: ADD_CREWMEMBER,
        payload: async() => {
            let response = await fetch(`/movies/${movieId}/crewmembers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(crewmember)
            })
            response = await fetch(`/movies/${movieId}/crewmembers`)
            let data = response.json()
            return data
        }
    }
}

export function updateCrewmember(movieId, crewmemberId, crewmember) {
    return {
        type: UPDATE_CREWMEMBER,
        payload: async() => {
            await fetch(`/movies/${movieId}/crewmembers/${crewmemberId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(crewmember)
            })
            let response = await fetch(`/movies/${movieId}/crewmembers`)
            let json = response.json()
            return json
        }
    }
}

export function deleteCrewmember(movieId, crewmemberId) {
    return {
        type: DELETE_CREWMEMBER,
        payload: async() => {
            await fetch(`/movies/${movieId}/crewmembers/${crewmemberId}`, {
                method: 'DELETE'
            })
            let response = await fetch(`/movies/${movieId}/crewmembers`)
            let json = response.json()
            return json
        }
    }
}
