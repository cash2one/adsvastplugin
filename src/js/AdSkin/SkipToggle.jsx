import React, { Component } from 'react';
import { autobind, PropTypes, log, playerconfig } from 'playercore';

const { DEFAULT } = playerconfig;

const playername = process.env.PLAYER;

/**
 * @class SkipToggle
 */
class SkipToggle extends Component {

    static propTypes = {
        player: PropTypes.object.isRequired,
        skipOffset: PropTypes.number,
    }

    static defaultProps = {
        skipOffset: 6
    }

    state = {
        timeLeft: 6,
        started: false,
        skipped: false
    }

    componentDidMount() {
        //let {player} = this.props;
        //player.on('timeupdate', this.update);
        this.intervalRemainingTime_ = setInterval(this.update, 200);
    }

    componentWillUnmount() {
        //let {player} = this.props;
        //player.off('timeupdate', this.update);
        clearInterval(this.intervalRemainingTime_);
    }

    _getAdDuration() {
        let { player } = this.props;
        let adUnit = player.vastAd.adUnit();
        let self = this;
        adUnit.getAdDuration()
            .then(duration => {
                self.adDuration = duration;
            });

        // start test iab
        let vasResponse = player.vastAd.vastResponse();
        let bid = vasResponse.ads[0].id;

        if (bid === 543706) {
            this.skipOffset = 8;
        }

        // end test iab
    }

    /**
	 * Update thời gian còn lại mà client có thể skip ad
	 */
    @autobind
    update() {
        let { player, skipOffset } = this.props;

        if (!player.vastAd) {
            return;
        }

        let adUnit = player.vastAd.adUnit();
        let self = this;

        if (!this.adDuration) {
            this._getAdDuration();
            return;
        }

        this.skipOffset = adUnit.getSkipOffSet();

        // start test iab
        skipOffset = this.skipOffset || skipOffset;

        // end test iab

        adUnit.getAdRemainingTime()
            .then(remainingTime => {
                let timeLeft = Math.ceil(skipOffset + remainingTime - self.adDuration);
                self.setState({
                    timeLeft,
                    started: true
                });
            });
    }

    @autobind
    _skipAd(evt) {
        evt.preventDefault();
        let { timeLeft, skipped } = this.state;
        if (timeLeft > 0 || skipped) {
            return;
        }

        this.setState({
            skipped: true
        });

        log.trace('<SkipToggle._skipAd>');
        let { player } = this.props;
        player.trigger(DEFAULT.EVENT.USER_SKIP_AD);
    }

    render() {
        let adCanSkip;
        let { timeLeft, skipped, started } = this.state;
        let label = timeLeft > 0 ? `${timeLeft} giây` : 'Bỏ Qua';
        if (label === 'Bỏ Qua') {
            adCanSkip = 'ad-canskip';
        }

        if (skipped || !started) {
            return null;
        }

        return (
            <button
                className={`ad-skip ${adCanSkip} ${playername}-button`}
                onClick={this._skipAd}
            >
                {label}

            </button>
        );
    }
}

export default SkipToggle;