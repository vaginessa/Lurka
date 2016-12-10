import proxify from './proxyUrls';

/**
 * Standardises a 4chan board.
 * 
 * @param  {Object} board   - Directly from 4chan's API
 * @param  {String} boardID - ID used to request board with
 * @return {Array}          - Extracted posts
 */
export function parseBoard( board, boardID ) {
    const img = `https://i.4cdn.org/${boardID}/`;
    var newBoard = [];
    log.app('Parsing board...')

    for (let page in board) {
        if (!board.hasOwnProperty(page)) return false;
        let threads = board[page]['threads'];
		for (let i = 0; i < threads.length; i++) {
		    formatThread(threads[i]);
		}
    }

    if (!newBoard.length) throw new Error("No threads extracted");
    log.app(`Created ${newBoard.length} board posts`);
    return newBoard;

    function formatThread(threadObj) {
        let ext = threadObj['ext']
        let smImg = img + threadObj['tim'] + "s.jpg"
        let lgImg = img + threadObj['tim'] + ext

        let thread = {
        	id: threadObj['no'],
        	date: threadObj['now'],
            title: threadObj['sub'] || "",
            comment: threadObj['com'],
            time: threadObj['tim'] || threadObj['time'] * 1000,
            imgsrc: {
                sm: proxify("/media", {url: smImg, provider: "4chan"}),
                lg: proxify("/media", {url: lgImg, provider: "4chan"})
            },
            replies: {
                textCount: threadObj['replies'],
                imgCount: threadObj['images'],
                ipCount: threadObj['unique_ips']
            }
        }
        newBoard.push(thread);
    }
}


/**
 * Standardises a 4chan thread.
 * 
 * @param  {Object} posts   - From the API
 * @param  {[type]} boardID - Board ID, used for creating media URLs
 * @return {[type]}         [description]
 */
export function parseThread( posts, boardID ) {
    const img = `https://i.4cdn.org/${boardID}/`;

    if (!posts || !posts.length) throw new Error("No thread posts supplied");
    log.app(`Created ${posts.length} 4chan posts`);

    const thread = posts.map( post => {
        let ext = post['ext']
        let smImg = img + post['tim'] + "s.jpg"
        let lgImg = img + post['tim'] + ext

        return {
            id: post['no'],
            date: post['now'],
            name: post['name'],
            hash: post['md5'],
            title: post['sub'] || "",
            time: post['tim'] || post['time'] * 1000,
            comment: post['com'],
            imgsrc: !!post['ext'] ? {
                sm: proxify("/media", {url: smImg, provider: "4chan"}),
                lg: proxify("/media", {url: lgImg, provider: "4chan"})
            } : null,
            ext
        }
    });

    try {
        return connectPosts(thread)
    } catch (e) {
        console.error(thread)
        log.error(e)
        return thread
    }
}


/**
 * Connects thread posts by checking who referenced who then merging 
 * references back into posts
 * 
 * @param  {Array} posts - Each thread post
 * @return {Array}       - Posts merged with references
 * 
 */
function connectPosts(posts) {
    // returns a list of IDs that quoted the current ID
    const ids = posts.map( post => post.id);
    const references = ids.map( (id, index) => {
        var refs = [];
        posts.map( ({ id:referer, comment }) => {
            // Check all comments for ID, add any that refer to ID
            if (comment && comment.includes(id)) {
                refs.push(referer)
            }
        })
        return refs
    });
    
    for (let i=0; i < ids.length; i++) {
        posts[i].references = references[i]
    }
    return posts
}


export function parseBoardList( boardList ) {
    log.app(`Discovered ${boardList.length} 4chan boards`);
    return boardList.map( ({ board, title }) => ({
        boardID: board, 
        description: `/${board}/ - ${title}`
    }));
}