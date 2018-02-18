import axios from 'axios'

const GOT_RANKTOP_FROM_SERVER = "GOT_RANKTOP_FROM_SERVER"
//const EDIT_RANKTOP = "EDIT_RANKTOP"

export function gotRankTopFromServer(rankTop) {
	const action = { type: GOT_RANKTOP_FROM_SERVER, rankTop }
	return action
}

export function fetchRankTop() {
	return function thunk(dispatch) {
		return axios
		.get('/api/beers')
		.then(res => res.data)
		.then(topbeers => {
			const action = gotRankTopFromServer(topbeers)
			dispatch(action)
		})
	}
}

export default function rankTopReducer(state = [], action) {
	switch (action.type) {
		case GOT_RANKTOP_FROM_SERVER:
			return action.rankTop
		default:
			return state
	}
}
