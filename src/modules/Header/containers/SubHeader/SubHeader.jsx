import React, {
    PureComponent,
    PropTypes
} from 'react';
import cx from 'classnames';

import './SubHeader.styles';

import { HeaderItem, TitledIcon } from '../../components';
import {
    LogoText,
    SearchBar,
    Icon,
    Pipe
} from '~/components';

import {onSubHeaderToggle} from '~/events/subscribers';

// TODO: Is this needed?
import {emitContentViewToggle} from '~/events/publishers';

import { bindMembersToClass } from '~/utils/react';
import { isFunction } from '~/utils/types';

const i = window.appSettings.icons;
const {subheaderHeight, headerHeight} = window.appSettings


class SubHeader extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            isOpen: true
        }

        bindMembersToClass(this, 'onSubHeaderToggle');

        this.animateInStyles = {
            translateY: subheaderHeight,
            translateZ: 0,
            opacity: 1,
        }

        this.animateInOpts = {
            duration: 400,
            easing: [0, 0, 0.2, 1]
        }

        this.animateOutStyles = {
            translateY: 0,
            translateZ: 0,
            opacity: 0,
        }

        this.animateOutOpts = {
            duration: 375,
            easing: [0.25, 0.46, 0.45, 0.94],
        }
    }

    render() {
        const {
            boardID,
            threadID,
            boardList,
            searchBoard
        } = this.props

        return (
            <div className='SubHeader' ref={r => this._subheader = r}>
              <div className='background' />
              <div className='content'>
                <HeaderItem className='SubHeader--left'>
                  <TitledIcon name={i.footerSort} title='Sort'/>
                </HeaderItem>
                <HeaderItem className='SubHeader--center SubHeader__search'>
                  <SearchBar placeholder={`Quick search`} onChange={searchBoard}/>
                </HeaderItem>
                <HeaderItem className='SubHeader--right'>
                  <TitledIcon name={i.footerFilter} title='Filter'/>
                </HeaderItem>
              </div>
            </div>
        )
    }

            // <div className='content'>
            //     <HeaderItem className='SubHeader--left'>
            //         <Icon name="android-lock"/>
            //         <Pipe className="SubHeader__Pipe"/>
            //         <TitledIcon name={i.navbarCompose} title='New Post'/>
            //         <Pipe className="SubHeader__Pipe"/>
            //         <TitledIcon name={i.navbarRefresh} title='Refresh'/>
            //     </HeaderItem>
            //     <HeaderItem className='SubHeader--center SubHeader__search'>
            //       <SearchBar placeholder={`Quick search`} onChange={searchBoard}/>
            //     </HeaderItem>
            //     <HeaderItem className='SubHeader--right'>
            //       <TitledIcon name={i.footerSort} title='Sort'/>
            //       <Pipe className="SubHeader__Pipe"/>
            //       <TitledIcon name={i.footerFilter} title='Filter'/>
            //       <Pipe className="SubHeader__Pipe"/>
            //       <TitledIcon name={i.footerLayout} title='Layout'/>
            //     </HeaderItem>
            //   </div>


    @onSubHeaderToggle
    onSubHeaderToggle(override, customAni, callback) {
        let willBeOpen;

        if (override !== undefined) {
            if (override === this.state.isOpen)
                return
            willBeOpen = !!override
        } else {
            willBeOpen = !this.state.isOpen
        }

        const options = Object.assign(willBeOpen ? this.animateInOpts : this.animateOutOpts, customAni);
        const styles = willBeOpen ? this.animateInStyles : this.animateOutStyles;

        options.complete = () => {
            this.setState({isOpen: willBeOpen});
            isFunction(callback) && callback();
        }

        this.animate(styles, options);
    }

    animate(styles, options) {
        this._subheader && $(this._subheader).velocity(styles, options);
    }
}

export default SubHeader;


                // <HeaderItem className='SubHeader--right'>
                //   <Icon name={i.footerInfo} />
                //   <Icon name={i.footerClose} />
                // </HeaderItem>
