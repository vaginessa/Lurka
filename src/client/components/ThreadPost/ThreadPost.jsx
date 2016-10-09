import React from 'react';
import {
    createMediaIfExists
} from './Media'

export default function ({post, children}) {
    const { id, title, date, imgsrc, comment, ext } = post

    const SRC = imgsrc
    const ID = 'thread-media-' + id

    return (
        <div className='thread-post'>
            <div className='thread-post-info'>
                {() => {if (title) return <span className='thread-post-title'>{title}</span>}}
                {children}
                <span className='thread-post-number'>No.{id}</span>
                <span className='thread-post-backlink'></span>
                <span className='thread-post-options'>dd</span>
            </div>
            {createMediaIfExists(ID, SRC, ext)}
            <blockquote dangerouslySetInnerHTML={{__html: comment}}/>
        </div>
    )
}

