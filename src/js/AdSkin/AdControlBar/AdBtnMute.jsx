import React, { Component } from 'react';
import { autobind, PropTypes } from 'playercore';

const playername = process.env.PLAYER;

class AdBtnMute extends Component {

    static propTypes = {
        player: PropTypes.object.isRequired
    }

    state = {
        muted: true
    }

    componentDidMount() {
        let { player } = this.props;
        let self = this;
        this.type = player.vastAd.adUnit().type;
        let PlayerAdUnit = player.vastAd.getPlayerAdUnit();

        let vastAd = player.vastAd;
        let snapshot = vastAd.snapshot();

        let volume = snapshot.muted ? 0 : snapshot.volume;
        try {
            vastAd.setAdVolume(volume).then(() => {
                vastAd.getAdVolume().then(volume => {
                    self.setState({
                        firstVolume: volume
                    });
                });
            });
        } catch (e) {
            //ignore
        }
        let isMuted = snapshot.muted;
        this.setState({ muted: isMuted });
        player.setTimeout(function () {
            self.setState({
                firstVolume: volume
            });
        }, 1000);

        PlayerAdUnit.on('volumechange', this.update);
        this.update();
    }

    @autobind
    update() {
        let self = this;
        let { player } = this.props;
        let vastAd = player.vastAd;
        let PlayerAdUnit = vastAd.getPlayerAdUnit();

        vastAd.getAdVolume().then((volume) => {
            let mute = PlayerAdUnit.muted();
            if (volume === 0 || mute ) {
                self.setState({
                    muted: true
                });
            } else {
                self.setState({
                    muted: false
                });
            }
        });
    }

    @autobind
    handleClick(e) {
        e.preventDefault();
        let { player } = this.props;
        let { firstVolume, muted} = this.state;
        let vastAd = player.vastAd;
        let PlayerAdUnit = vastAd.getPlayerAdUnit();

        vastAd.getAdVolume().then((volume) => {
            let volume_ = firstVolume === 0 ? 0.5 : firstVolume;
            PlayerAdUnit.muted(!muted);
            if (volume === 0 || muted) {
                vastAd.setAdVolume(volume_);
            } else {
                vastAd.setAdVolume(0);
            }
        });

    }

    render() {
        let { player } = this.props;
        let { muted } = this.state;
        let width = player.el_.clientWidth;
        if (width <= 170 || !player.options().params.adMuteToggle) {
            return null;
        }
        return (
            <div className={`${playername}-ad-btn-mute`} onClick={(e) => this.handleClick(e)}>
                <button>
                    <span className={`${playername}-ad-qmtwbs-base`}></span>
                    <span className={`${playername}-ad-qmtwbs-level`}></span>
                </button>
                {muted ? <span className={`${playername}-ad-line-mute`}></span> : null}
            </div>
        );
    }

}

export default AdBtnMute;