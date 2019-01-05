import React, { Component } from 'react';
import { PropTypes, autobind ,playerconfig } from 'playercore';


const {DEFAULT}  = playerconfig;

/**
 * @class ClickThrough
 */
class ClickThrough extends Component {

    static propTypes = {
        player: PropTypes.object.isRequired
    }

    state = {
        url: null
    }

    componentDidMount() {
        let { player } = this.props;
        let type = player.vastAd.adUnit().type;
        if (type !== 'VPAID') {
            player.trigger(DEFAULT.EVENT.VAST_AD_VIDEO_SHOW);
        }
    }

    @autobind
    updateBlocker(url) {
        this.setState({
            url
        });
    }

    @autobind
    _clickthrough(evt) {
        let { player } = this.props;
        let adUnit = player.vastAd.adUnit();
        let paused = adUnit.isPaused();
        if (paused) {
            player.play();
            evt.stopPropagation();
            return false;
        }

        adUnit.clickThrough();
    }

    render() {
        let { url } = this.state;

        if (!url) {
            return null;
        }

        return (
            <a
                className={'ad-clickthrough-blocker'}
                onClick={this._clickthrough}
                href={url}
                target='_blank'
                rel="noopener noreferrer"
            >
            </a>
        );
    }
}

export default ClickThrough;