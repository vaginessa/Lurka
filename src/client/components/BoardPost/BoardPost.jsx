import React from 'react';
import Tooltip from '../Tooltip';

export default ({ post, fetchThread, reshuffle }) => {
    const {id, title, comment, date, imgsrc, replies} = post;
    return (
        <div 
            id={"t"+id}
            className="board-post"
            onClick={() => fetchThread(id)}
        >
            <img src={imgsrc.sm} onLoad={reshuffle}/>
            <Tooltip>
                <div className="count">
                    <span>
                        <span>
                            <i className="mdi mdi-comment-text"></i>
                            <b>{replies.textCount}</b>
                        </span>
                        <span className="updater updater-replycount">
                            +1
                        </span>
                    </span>
                    <span>
                        <span>
                            <i className="mdi mdi-message-image"></i>
                            <b>{replies.imgCount}</b>
                        </span>
                        <span className="updater updater-imgcount">
                            +1
                        </span>
                    </span>
                </div>
            </Tooltip>
            <div className="op">
                <b dangerouslySetInnerHTML={{__html: title}} className="title" />
                <div dangerouslySetInnerHTML={{__html: comment}} />
            </div>
        </div>
    )
}
