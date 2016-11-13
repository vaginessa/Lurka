import initialState from './initialState';
import { 
    BOARD_LOADED, 
    BOARD_REQUEST, 
    BOARD_SCROLL_BOTTOM,

    BOARD_LIST_LOADED, 
    BOARD_LIST_REQUEST,

    THREAD_LOADED, 
    THREAD_REQUEST, 
    THREAD_DESTROY,

    PROVIDER_CHANGE,
    BOARD_CHANGE,
    THREAD_CHANGE
} from '../constants'

export default function (state = initialState.content, action) {
    switch (action.type) {

        case BOARD_REQUEST:
        case THREAD_REQUEST:
        case BOARD_LIST_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                requestType: action.type  // for logging error to user...?
            })

        case BOARD_LOADED:
            return Object.assign({}, state, {
                board: {
                    posts: action.payload,
                    limit: initialState.content.board.limit
                },
                isFetching: false
            })

        case BOARD_SCROLL_BOTTOM:
            const { board } = state;
            board.limit = action.payload

            return Object.assign({}, state, {board})

        case BOARD_LIST_LOADED:
            const boardlist = {}[action.key] = action.payload

            return Object.assign({}, state, {
                boardlist,
                isFetching: false
            })

        case THREAD_LOADED:
            return Object.assign({}, state, {
                thread: {posts: action.payload},
                isFetching: false
            })

        case THREAD_DESTROY:
            const history = {}[state.threadID] = state.thread.posts
            return Object.assign({}, state, {
                thread: { history, posts: [] }
            })

        case PROVIDER_CHANGE:
            return Object.assign({}, state, {
                provider: action.payload
            })

        case BOARD_CHANGE:
            return Object.assign({}, state, {
                boardID: action.payload
            })

        case THREAD_CHANGE:
            return Object.assign({}, state, {
                threadID: action.payload
            })

        default:
            return state
    }
}
