import Axios from 'axios';

import API from '-/config/api.localhost'
import {alertMessage} from './alert'
import {secondsAgo} from '~/utils'
import {
    BOARD_REQUESTED,
    BOARD_LOADED,
    BOARD_INVALIDATED,
    BOARD_CHANGE
} from '../types';


export default function fetchBoard(boardID, callback) {
    const url = API.board(boardID)
    console.log('Action FetchBoard()', url);

    return (dispatch, getState) => {
        const state = getState()
        if (!shouldRequestBoard(state)) {
            console.warn(`Board request rejected: ${url}`)
            return
        }

        if ( boardCachedAndRecent(state, boardID)) {
            dispatch(loadBoardFromCache(state, boardID))
            dispatch(setBoard(boardID))
            // TODO: Use timeago for cache alerts to show how old cached item is
            dispatch(alertMessage({
                message: `Loaded from cache: /${boardID}/`,
                type: "success"
            }))
            return
        }

        dispatch(requestBoard(boardID))
        dispatch(alertMessage({
            message: `Requesting /${boardID}/`,
            type: "info"
        }))

        return Axios.get(url).then( data => {
            dispatch(receiveBoard(data))
            dispatch(setBoard(boardID))
            callback && callback();
        })
        .catch( err => {
            console.error(err)
            dispatch(alertMessage({
                message: `From board ${boardID}: ${err.response.data}`,
                type: "error",
                time: 20000
            }))
            dispatch(invalidateBoard(err.response.data))
        });
    }
}

export function requestBoard(boardID) {
    return {
        type: BOARD_REQUESTED,
        payload: boardID
    }
}

export function receiveBoard(board){
    return {
        type: BOARD_LOADED,
        posts: board.data || [],
        receivedAt: Date.now()
    }
}

export function invalidateBoard(error) {
    return {
        type: BOARD_INVALIDATED
    }
}

export function setBoard( boardID ) {
    return {
        type: BOARD_CHANGE,
        payload: boardID
    }
}

export function shouldRequestBoard({ board, settings }) {
    const requestThrottle = settings.internal.requestThrottle
    const lastRequested = secondsAgo(board.receivedAt)

    console.log(`shouldRequestBoard(): ${lastRequested} > ${requestThrottle} = ${lastRequested > requestThrottle}`)
    return !board.isFetching && lastRequested > requestThrottle
}

export function boardCachedAndRecent({cache, settings}, boardID) {
    const maxBoardAge = settings.internal.maxBoardAge
    const board = cache.board[boardID]

    if (!board){
        console.warn('Board was not in cache')
    } else {
        console.warn(`DID EXIST. ${secondsAgo(board.receivedAt)} < ${maxBoardAge} = ${secondsAgo(board.receivedAt) < maxBoardAge}`)
        console.warn(board)
    }
    return board && secondsAgo(board.receivedAt) < maxBoardAge
}

export function loadBoardFromCache({ cache }, boardID) {
    const board = cache.board[boardID]
    return {
        type: BOARD_CACHE_LOADED,
        payload: board,
        boardID,
    }
}


