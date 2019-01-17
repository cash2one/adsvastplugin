import React, { Component } from 'react';
import { PropTypes, playerconfig, autobind } from 'playercore';
import MidrollMarket from './MidrollMarket';
import formatTime from '../utils/formatTime';
import InfoAds from '../InfoAds';
import durationRule from '../utils/durationRule';

const { DEFAULT } = playerconfig;

class MidrollDisPlay extends Component {
    static propTypes = {
        player: PropTypes.object.isRequired,
        infoAd: PropTypes.object,
        rules: PropTypes.object
    }

    state = {
        renderMidroll: true,
    }

    constructor(props) {
        super(props);
        let { player } = this.props;

        player.on(DEFAULT.EVENT.PLAYER_ENDED_CONTEND, this._handleEnded);
    }

    componentDidMount() {
        let { player } = this.props;
        player.on('durationchange', this._checkDuration);
        player.on('loadedmetadata', this._checkDuration);
    }

    componentWillUnmount() {
        let { player } = this.props;
        player.off('durationchange', this._checkDuration);
        player.off('loadedmetadata', this._checkDuration);
    }

    @autobind
    _checkDuration() {
        let { player } = this.props;

        let duration = player.duration();
        if (!duration || duration < 40) {
            return;
        }

        if (Number.isNaN(duration) || duration === 0) {
            return;
        }

        player.off('loadedmetadata', this._checkDuration);
        player.off('durationchange', this._checkDuration);

        this.setState({
            duration
        });

        this._updatePosition();
    }

    /**
     * Get all positions on the mid roll
     */
    _updatePosition() {
        let { infoAd } = this.props;
        let sortInfoAd = [];
        let { duration } = this.state;
        let arrayAds = [];

        Object.keys(infoAd).map(function (key) {
            let timeAds = formatTime(key, duration);
            arrayAds[timeAds];
        });

        for (let key in infoAd) {
            let { skipoffset, tag, durationLogical, durationValue, repeat, repeatTime} = infoAd[key];
            let timeAds = formatTime(key, duration);
            let accept = durationRule({ duration, durationValue, durationLogical });

            if (accept) {
                sortInfoAd.push([skipoffset, tag, timeAds, true]);
                if (repeat) {
                    for (let i = timeAds + repeatTime; i < duration; i += repeatTime) {
                        sortInfoAd.push([skipoffset, tag, i, false]);
                    }
                }
            }
        }

        sortInfoAd.sort(function (a, b) {
            return a[2] - b[2];
        });

        this._sortAdsRule(sortInfoAd);
    }

    /**
     *  Reorder ads by rule
     */
    _sortAdsRule(sortInfoAd) {
        let {rules} = this.props;
        let { duration } = this.state;

        let timeBetweenAds = rules.timeBetweenAds || 0;
        let startOn = rules.startOn || 1;
        let timeAdsAgree;

        if (InfoAds.havePreroll) {
            timeAdsAgree = timeBetweenAds;
        }

        sortInfoAd.map(function (info, index) {
            if (info[2] < startOn) {
                delete sortInfoAd[index];
                return;
            }

            if (index === 0 && !InfoAds.havePreroll) {
                timeAdsAgree = info[2] + timeBetweenAds;
            } else {
                if (info[2] <= timeAdsAgree) {
                    delete sortInfoAd[index];
                    return;
                } else {
                    if (sortInfoAd[index][3]) {
                        timeAdsAgree = info[2] + timeBetweenAds;
                    } else {
                        if (sortInfoAd[index + 1] !== undefined) {
                            if (sortInfoAd[index + 1][3]) {
                                if ((sortInfoAd[index + 1][2] - info[2]) < timeBetweenAds) {
                                    delete sortInfoAd[index];
                                    return;
                                }
                                timeAdsAgree = info[2] + timeBetweenAds;
                            } else {
                                timeAdsAgree = info[2] + timeBetweenAds;
                            }
                        } else {
                            if (InfoAds.havePostroll && (duration - info[2]) < timeBetweenAds) {
                                delete sortInfoAd[index];
                                return;
                            }
                        }
                    }
                }
            }
        });

        this.setState({
            sortInfoAd
        });
    }

    @autobind
    _reRenderMidroll() {
        this.setState({ renderMidroll: true });
    }

    @autobind
    _handleEnded() {
        let { player } = this.props;
        player.off('play', this._reRenderMidroll);
        player.one('play', this._reRenderMidroll);

        this.setState({ renderMidroll: false });
    }

    render() {
        let { player } = this.props;
        let { renderMidroll, duration, sortInfoAd } = this.state;
        if (!renderMidroll || !duration || !sortInfoAd) {
            return null;
        }

        return (
            <div className='midroll-display'>
                {
                    sortInfoAd.map(function (info, index) {
                        return (
                            <MidrollMarket key={`midroll -display ${index}`}
                                seconds={info[2]}
                                vastUri={info[1]}
                                skipoffset={info[0]}
                                player={player}
                                duration={duration}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

export default MidrollDisPlay;