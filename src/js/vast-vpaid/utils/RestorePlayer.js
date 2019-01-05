import VCPlayerObject from '../../VCPlayerObject';
import playerUtils from './playerUtils';
import { log, PropTypes, autobind, playerconfig, agent } from 'playercore';

const { DEFAULT } = playerconfig;

export default class RestorePlayer extends VCPlayerObject {

    /**
     * Định nghĩa kiểu của props
     * @type {Object}
     */
    static propTypes = {
        player: PropTypes.object.isRequired,
        vastAd: PropTypes.object.isRequired,
        preLoaded: PropTypes.bool
    };

    constructor(props) {
        super(props);
        let { player } = this.props;
        this._volumeChangeVpaid = this._volumeChangeVpaid.bind(this);
        this._savePlayerSnapshot();
        playerUtils.once(player, [DEFAULT.EVENT.AD_END], this._handleRestorePlayer);
    }

    _savePlayerSnapshot() {
        let { player } = this.props;
        let self = this;
        // Trên mobile nếu gọi play ngay khi init xong 
        // => ở vị trí preroll player.paused() === true
        // => check thêm ad position để set gia trị playing
        let snapshot ;

        player.on(DEFAULT.EVENT.VPAID_AD_VOLUME_CHANGE, this._volumeChangeVpaid);
        player.one('snapshotPlayer',function (){
            let playing = !player.paused() || player.vastAd.adPosition() !== 'postroll';
            snapshot = {
                playing,
                ended: player.ended(),
                duration: player.duration(),
                src: player.currentSrc(),
                currentTime: player.currentTime(),
                type: player.currentType(),
                volume: player.volume(),
                muted: player.muted()
            };

            self.setState({
                snapshot
            });
            if (playing){
                player.pause();
            }
        })
    }

    _volumeChangeVpaid() {
        let { snapshot } = this.state;
        let { player } = this.props;
        let vastAd = player.vastAd;

        vastAd.getAdVolume().then((volume) => {
            if (volume === 0) {
                snapshot.muted = true;

            } else {
                snapshot.muted = false;
            }
        });
    }

    snapshot() {
        return this.state.snapshot;
    }

    @autobind
    _handleRestorePlayer() {
        let { snapshot } = this.state;
        let { player } = this.props;

        player.off(DEFAULT.EVENT.VPAID_AD_VOLUME_CHANGE, this._volumeChangeVpaid);

        if (!snapshot) {
            this._resumePlayback(playing);
            return;
        }

        let needRestore = this._needRestoreSrc(snapshot);
        let { playing } = snapshot;
        player.vastAd = null;

        if (!needRestore) {
            // Không cần restore source thì gọi play và set lại current time
            player.currentTime(snapshot.currentTime);
            this._resumePlayback(playing);
            return;
        }

        // Đối với trường hợp cần restore lại source thì xử lý
        player.one('canplay', this._tryToResume.bind(this, snapshot));
        this._ensureCanplayEvtGetsFired();

        // Trên PC khi đổi luồng thì cần reset lại player
        if (!agent.isMobile) {
            player.reset();
        }


        // restore lại src và currentTime
        player.src({ src: snapshot.src, type: snapshot.type });
        player.currentTime(snapshot.currentTime);
        player.trigger('waiting');

        // Trên safari cần call load để báo source change
        if (!agent.isMobile) {
            player.load();
        }

        this._resumePlayback(playing);
    }

    @autobind
    _tryToResume(snapshot) {
        let { player } = this.props;
        let self = this;
        try {
            if (player.currentTime() !== snapshot.currentTime) {
                player.one('seeked', function () {
                    self._resumePlayback(snapshot.playing);
                });
                player.currentTime(snapshot.currentTime);

            } else {
                // if needed and no seek has been performed, restore playing status immediately
                this._resumePlayback(snapshot.playing);
            }

        } catch (e) {
            log.warn('Failed to resume the content after an advertisement', e);
        }
    }

    _ensureCanplayEvtGetsFired() {
        let { player } = this.props;
        var timeoutId = setTimeout(function () {
            player.trigger('canplay');
        }, 1000);

        player.one('canplay', function () {
            clearTimeout(timeoutId);
        });
    }

    /**
     * Resume play video chính
     */
    _resumePlayback(playing) {
        var { player } = this.props;
        let { snapshot } = this.state;
        let { currentTime, muted, volume} = snapshot;
        if (!this.triggerRestorePlayback_) {
            player.trigger(DEFAULT.EVENT.AD_RESTORED_PLAYBACK);
            this.triggerRestorePlayback_ = true;
        }

        if (!playing) {
            return;
        }

        player.currentTime(currentTime);
        player.muted(muted);
        player.volume(volume);

        setTimeout(function () {
            player.play(true);
        }, 0);
    }

    /**
     * Kiểm tra có cần set lại source sau khi chạy quảng cáo hay không
     * @return {Boolean} [description]
     */
    _needRestoreSrc(snapshot) {
        var { player } = this.props;

        var src = player.src();

        if (!player.vastAd.adUnit()) {
            return false;
        }

        // Nếu hiện tại không có src thì return true
        let type = player.vastAd.adUnit().type;
        if (!src) {
            return true;
        }

        if (src !== snapshot.src) {
            return true;
        }

        if (agent.isIOS) {
            return true;
        }


        // Nếu quảng cáo trước đó là Vast thì return false
        if (type === 'VAST' || type ==='VPAID') {
            return false;
        }

        // Nếu src hiện tại dạng mediasource/blob thì không cần restore
        if (/mediasource|blob/.test(src)) {
            return false;
        }

        // Nếu src là link có chứa m3u8 tức chơi native hls thì cần restore lại
        if (/m3u8/gi.test(src)) {
            return true;
        }

        // So sánh src được snapshot và src hiện tại, nếu khác nhau thì cần restore
        return src !== snapshot.src;
    }
}