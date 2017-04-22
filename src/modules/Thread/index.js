import Thread from './Thread'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    closeThread,
    monitorThread,
    unmonitorThread,
    scrollHeader,
    toggleHeaderPanel
} from '~/redux/actions';

function mapStateToProps({ status, thread, display }) {
    return {
        isThreadOpen: display.isThreadOpen,
        isCommentPanelOpen: display.isCommentPanelOpen,
        isDrawerOpen: display.isDrawerOpen,
        boardID: status.boardID,
        threadID: status.threadID,
        ...thread
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        closeThread,
        monitorThread,
        unmonitorThread,
        scrollHeader,
        toggleHeaderPanel
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Thread)