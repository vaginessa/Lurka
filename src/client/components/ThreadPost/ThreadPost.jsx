import React, { Component } from 'react'

import TimeAgo from '../TimeAgo'
import Line from '../Line'

// TODO: Move media rendering to ./Render.jsx
import {createMediaIfExists} from './Media' 
import {
    renderControls,
    renderRefs,
    renderTitle,
    renderMediaInfo
} from './Render'


export default class ThreadPost extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { controls, post: {
            id, name, title, date, media, comment, references, time
        }} = this.props

        return (
            <div id={"p"+id} className='thread-post clearfix'>
                <div className='post-info'>
                    {renderTitle(title)}
                    <span className='name'>{name}</span>
                    <span className='id'>#{id}</span>
                    <Line isVertical />
                    <TimeAgo time={time}/>
                    {renderControls(controls)}
                </div>
                {renderMediaInfo(media)}
                {createMediaIfExists(id, media)}
                <blockquote dangerouslySetInnerHTML={{__html: comment}}/>
                {renderRefs(references)}
            </div>
        )
    }
}
