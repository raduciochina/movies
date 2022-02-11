import { combineReducers } from 'redux'

import movie from './movie-reducer'
import crewmember from './crewmember-reducer'

export default combineReducers({
    movie,
    crewmember
})