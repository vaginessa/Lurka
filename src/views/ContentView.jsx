import React, {
    Component,
    PropTypes
} from 'react';

import Board from '~/modules/Board'
import Thread from '~/modules/Thread'
import Header from '~/modules/Header'
import { onContentViewToggle } from '~/events/subscribers';

import {
    bindMembersToClass
} from '~/utils/react';

const {
    headerHeight
} = window.appSettings


class ContentView extends Component {

    constructor(props) {
        super(props);

        // inView: props.settings.activeView == "content"
        this.state = {
            inView:       true,
            hideDuration: 600,
            showDuration: 600,
            hideEasing:   [0.23, 1, 0.32, 1],
            showEasing:   [0.23, 1, 0.32, 1]
        }

        bindMembersToClass(this, 'toggleViewState');
    }

    @onContentViewToggle
    onToggle() {
        console.log('ContentView.onToggle(). inView:', this.state.inView)
        this.state.inView ? this.hide() : this.show();
    }

    hide() {
        $(this._view).velocity({
            translateY: window.innerHeight - headerHeight + 2, // 2 = header border
            translateZ: 0
        }, {
            duration: this.state.hideDuration,
            easing:   this.state.hideEasing,
            complete: this.toggleViewState
        });
    }

    show() {
        $(this._view).velocity({
            translateY: 0,
            translateZ: 0
        }, {
            duration: this.state.showDuration,
            easing:   this.state.showEasing,
            complete: this.toggleViewState
        });
    }

    toggleViewState() {
        this.setState({
            inView: !this.state.inView
        })
    }

    render() {
        const {
            id,
            ...restProps
        } = this.props;

        return (
            <section
              {...restProps}
              ref={ref => this._view = ref}
              className='View ContentView'>
              <Header.containers.MainHeader/>
              <Header.containers.SubHeader/>
              <Board />
              <Thread />
            </section>
        )
    }
}

ContentView.displayName = 'ContentView';

ContentView.propTypes = {
    className: PropTypes.string,
};

export default ContentView;
