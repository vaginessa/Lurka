import './Media.styles'
import React from 'react'
import {
    Icon,
    Image,
    ImageWithChild,
    Video,
    DualMedia,
    ButtonCircle
} from '~/components'

const i = window.appSettings.icons;

const Media = ({ media, onLargeImageClick }) => {
    if (!media)
        return null

    const { thumbnail, srcLarge, filetype, height, width } = media

    // TODO: Lazy load thread thumbnails
    return (
        <DualMedia className="ThreadMedia"
            thumbnail={<Image src={thumbnail}/>}>
            {
                filetype === ".webm"
                    ? <Video loop autoPlay muted
                        src={srcLarge}
                        type="video/mp4"
                        className="ThreadMedia--expanded"/>
                    : <ThreadImage src={srcLarge} onClick={onLargeImageClick}/>
            }
        </DualMedia>
    )
}

const ThreadImage = ({ src, onClick }) => {
    return (
        <ImageWithChild className="ThreadMedia--expanded" src={src}>
            <ButtonCircle className="ThreadMedia__FullscreenIcon"
                onClick={onClick}>
                <Icon name={i.threadPostImageFullscreen}/>
            </ButtonCircle>
        </ImageWithChild>
    );
}

Media.displayName = 'Media';

export default Media;

