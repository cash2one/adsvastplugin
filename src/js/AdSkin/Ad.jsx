import React, { Component}from 'react';
import { PropTypes, autobind, playerconfig} from 'playercore';
import SkipToggle from './SkipToggle.jsx';
//import AdMuteToggle from './AdMuteToggle.jsx';
import ClickThrough from './ClickThrough.jsx';
import AdControlBar from './AdControlBar';


const { DEFAULT } = playerconfig;

class Ad extends Component {

    static propTypes = {
        player: PropTypes.object.isRequired
    }

    state = {
        isShow: false,
    }

    componentDidMount() {
        let { player } = this.props;
        player.on(DEFAULT.EVENT.AD_START, this._handleAdStart);
        player.on(DEFAULT.EVENT.AD_END, this._handleAdEnd);
        player.on(DEFAULT.EVENT.USER_SKIP_AD, this._handleAdSkip);
        player.on(DEFAULT.EVENT.VAST_AD_VIDEO_COMPLETE, this._handleAdMediaEnd);
        player.on(DEFAULT.EVENT.VPAID_AD_VIDEO_COMPLETE, this._handleAdMediaEnd);

        player.on(DEFAULT.EVENT.VAST_AD_VIDEO_START, this._handleVastStart);
        player.on(DEFAULT.EVENT.VPAID_AD_START, this._handleVpaidStart);
    }

    componentWillUnmount() {
        let { player } = this.props;
        player.off(DEFAULT.EVENT.AD_START, this._handleAdStart);
        player.off(DEFAULT.EVENT.AD_END, this._handleAdEnd);
        player.off(DEFAULT.EVENT.USER_SKIP_AD, this._handleAdSkip);
        player.off(DEFAULT.EVENT.VAST_AD_VIDEO_COMPLETE, this._handleAdMediaEnd);
        player.off(DEFAULT.EVENT.VPAID_AD_VIDEO_COMPLETE, this._handleAdMediaEnd);

        player.off(DEFAULT.EVENT.VAST_AD_VIDEO_START, this._handleVastStart);
        player.off(DEFAULT.EVENT.VPAID_AD_START, this._handleVpaidStart);
    }

    @autobind
    _handleAdStart() {

    }

    @autobind
    _handleAdMediaEnd() {
        this.setState({
            isShow: false,
        });
    }

    @autobind
    _handleAdSkip() {
        this.setState({
            isShow: false,
        });
    }


    @autobind
    _handleAdEnd() {
        this.setState({
            isShow: false
        });
    }

    @autobind
    _handleVastStart() {
        this.setState({
            isShow: true
        });
    }

    @autobind
    _handleVpaidStart() {
        this.setState({
            isShow: true
        });
    }

    render() {
        let { isShow } = this.state;

        if (!isShow) {
            return null;
        }

        return (
            <div className="ad-container" style={{width : '100%', height : '100%'}}>
                <ClickThrough key="clickThrough" player={this.props.player} ref={(c) => { this.clickThrough = c; }} />
                <SkipToggle key="skipToggle" player={this.props.player} ref={(c) => { this.skipToggle = c; }} /> 
                <AdControlBar key="adControlBar" player={this.props.player} ref={(c) => { this.adControlBar = c; }} />,
            </div>
        );
    }
}

export default Ad;