import React, { Component } from 'react';
import { PropTypes, playerconfig } from 'playercore';
// import AdPlayToggle from './AdPlayToggle';
import AdBtnMute from './AdBtnMute';
// import AdFullScreenToggle from './AdFullScreenToggle';

const { DEFAULT } = playerconfig;
/**
 * @class AdControlBar
 */
class AdControlBar extends Component {

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

    render() {
        let { player } = this.props;

        return (
            <div className="Ad-controlBar">
                {/* <AdPlayToggle player={player} /> */}
                <AdBtnMute player={player} />
                {/* <AdFullScreenToggle player={player}/> */}
            </div>
        );
    }
}

export default AdControlBar;