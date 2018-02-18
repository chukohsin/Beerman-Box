import axios from 'axios'

const GOT_STYLES_FROM_SERVER = "GOT_STYLES_FROM_SERVER"

export function gotStylesFromServer(styles) {
	const action = { type: GOT_STYLES_FROM_SERVER, styles}
	return action
}

export const fetchStyles = () => dispatch => (
	axios
	.get('/api/styles')
	.then(res => {
		const action = gotStylesFromServer(res.data)
		dispatch(action)
	})
)

export default function styleReducer(styles = [], action) {
	switch (action.type) {
		case GOT_STYLES_FROM_SERVER:
			return action.styles
		default:
			return styles
	}
}
