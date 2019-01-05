import React, { Component } from 'react';
import { PropTypes, autobind, playerconfig } from 'playercore';
const { DEFAULT } = playerconfig;

const playername = process.env.PLAYER;

/**
 * @class AdPlayToggle
 */
class AdPlayToggle extends Component {

    static propTypes = {
        player: PropTypes.object.isRequired
    }

    state = {
        url: null,
        is_playing: true,
    }

    componentDidMount() {
        let { player } = this.props;
        let PlayerAdUnit = player.vastAd.getPlayerAdUnit();
        player.trigger(DEFAULT.EVENT.VAST_AD_VIDEO_SHOW);

        PlayerAdUnit.on('play', this.handlePlay);
        PlayerAdUnit.on('pause', this.handlePause);

    }

    componentWillUnmount() {
        let { player } = this.props;
        let PlayerAdUnit = player.vastAd.getPlayerAdUnit();

        PlayerAdUnit.off('play', this.handlePlay);
        PlayerAdUnit.off('pause', this.handlePause);
    }

    @autobind
    handlePlay() {
        this.setState({
            is_playing: true,
        });
    }

    @autobind
    handlePause() {
        this.setState({
            is_playing: false
        });
    }

    className() {
        let classArr = [`${playername}-ad-control ${playername}-button ad-play-control`];

        let { is_playing } = this.state;

        if (is_playing) {
            classArr.push('playing');
        }

        return classArr.join(' ');
    }

    @autobind
    handleClick(e) {
        e.preventDefault();
        let { player } = this.props;
        let paused = player.vastAd.isPaused();

        if (paused) {
            player.play();
        } else {
            player.pause();
        }
    }

    render() {
        let className = this.className();

        return (
            <button
                className={className}
                onClick={(e) => this.handleClick(e)}
            >
            </button>
        );
    }
}

export default AdPlayToggle;