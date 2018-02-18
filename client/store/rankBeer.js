import axios from 'axios'

const GOT_RANKBEER_FROM_SERVER = "GOT_RANKBEER_FROM_SERVER"

export function gotRankBeerFromServer(rankBeer) {
	const action = { type: GOT_RANKBEER_FROM_SERVER, rankBeer }
	return action
}

export function fetchRankBeer() {
	return dispatch => (
		axios.get('/api/beers')
		.then(res => res.data)
		.then(rankbeer => {
			const action = gotRankBeerFromServer(rankbeer)
			dispatch(action)
		})
	)
}

export default function rankBeerReducer(state = [], action) {
	switch(action.type) {
		case GOT_RANKBEER_FROM_SERVER:
			return action.rankBeer
		default:
			return state
	}
}

