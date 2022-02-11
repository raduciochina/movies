export const GET_MOVIES = 'GET_MOVIES'
export const ADD_MOVIE = 'ADD_MOVIE'
export const UPDATE_MOVIE = 'UPDATE_MOVIE'
export const DELETE_MOVIE = 'DELETE_MOVIE'

export function getMovies() {
    return {
        type: GET_MOVIES,
        payload: async() => {
            const response = await fetch(`/movies`)
            const data = response.json()
            return data
        }
    }
}

export function addMovie(movie) {
    return {
        type: ADD_MOVIE,
        payload: async() => {
            let response = await fetch(`/movies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            })
            response = await fetch(`/movies`)
            let data = response.json()
            return data
        }
    }
}

export function updateMovie(movieId, movie) {
    return {
        type: UPDATE_MOVIE,
        payload: async() => {
            await fetch(`/movies/${movieId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            })
            let response = await fetch(`/movies`)
            let json = response.json()
            return json
        }
    }
}

export function deleteMovie(movieId) {
    return {
        type: DELETE_MOVIE,
        payload: async() => {
            await fetch(`/movies/${movieId}`, {
                method: 'DELETE'
            })
            let response = await fetch(`/movies`)
            let json = response.json()
            return json
        }
    }
}