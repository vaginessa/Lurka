import React, {Component} from 'react'
import {
    Overlay,
    Spinner
} from '~/components'

const threadConnect = (ThreadComponent) => {
    const ThreadHOC = (props) => {
        const {isThreadOpen, posts, closeThread, didInvalidate} = props

        console.log(props)
        return (
            <div className="Thread">
                <Overlay
                    isVisible={isThreadOpen && !didInvalidate}
                    onClick={closeThread}
                />
                <Spinner isSpinning={isThreadOpen && !posts.length && !didInvalidate}/>
                <ThreadComponent {...props} />
            </div>
        )
    }

    return ThreadHOC
}

export default threadConnect
