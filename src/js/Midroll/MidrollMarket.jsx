import React, { Component } from 'react';
import { PropTypes, autobind , playerconfig } from 'playercore';
import DefaultAd from '../default/DefaultAd';

const {DEFAULT} = playerconfig;
const MIDROLL_STATE = {
    IDLE: 'IDLE',
    PREPAIRING: 'PREPAIRING',
    RUNNING: 'RUNNING',
    DISPOSE: 'DISPOSE'
};

var isCounting = false;
var checkAdStart = {
    adStart : false,
};

class MidrollMarket extends Component {

    static propTypes = {
        player: PropTypes.object.isRequired,
        duration: PropTypes.number,
        seconds: PropTypes.number,
        skipoffset: PropTypes.number,
        vastUri: PropTypes.string,
    };
    
    state = {
        left: null,
        dispose: false
    };

    midrollState_ = MIDROLL_STATE.IDLE;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let { player } = this.props;
        player.on('timeupdate', this.checkToStartMidroll);
        player.on('ignoreEventAds', this.handleStopOrResume);
        player.on(DEFAULT.EVENT.AD_END, this.handleStopOrResume);
        // Trong trường hợp chạy midroll thì cũng cần stopHandleEvent
        player.on(DEFAULT.EVENT.AD_START, this.stopHandleEvent);

        
        this.updatePosition();
    }


    componentWillUnmount() {
        let { player } = this.props;
        player.off('timeupdate', this.checkToStartMidroll);
        player.off('ignoreEventAds', this.handleStopOrResume);
        player.off(DEFAULT.EVENT.AD_END, this.handleStopOrResume);
        player.off(DEFAULT.EVENT.AD_START, this.stopHandleEvent);
    }

    updatePosition() {
        let { seconds, duration} = this.props;

        let percent = seconds / duration;

        let left = percent * 100 + '%';
        let starttime = percent * duration;

        this.setState({
            left,
            starttime
        });
    }

    dispose() {
        let { player } = this.props;
        player.off('timeupdate', this.checkToStartMidroll);
        player.off('ignoreEventAds', this.handleStopOrResume);
        player.off(DEFAULT.EVENT.AD_END, this.handleStopOrResume);
        player.off(DEFAULT.EVENT.AD_START, this.stopHandleEvent);
        this.setState({
            dispose: true
        });
        if (!this.currentTime_){
            return;
        }
        isCounting = false;
        checkAdStart = {
            adStart : true,
            currentTime: this.currentTime_,
        };
    }

    /**
     * + Khi có bất kì một marker nào đó yêu cầu start midroll thì các marker các cần ngừng việc kiểm tra chạy midroll
     * + Khi dispose thì cũng cần ngừng việc kiểm tra
     */
    @autobind
    stopHandleEvent() {
        let { player } = this.props;
        player.off('timeupdate', this.checkToStartMidroll);
    }

    @autobind
    resumeHandleEvent() {
        this.stopHandleEvent();
        let self = this;

        let { player } = this.props;
        // sau khi ad end thì có thể có trường hợp chưa set lại source nên duration sẽ là duration của ad
        // => listen sự kiện timeupdate rồi mới xử lý
        player.one('timeupdate', function () {

            player.on('timeupdate', self.checkToStartMidroll);
        });
    }

    @autobind
    handleStopOrResume() {
        if (this.midrollState_ === MIDROLL_STATE.IDLE) {
            this.resumeHandleEvent();
        } else {
            this.dispose();
        }
    }

    /**
     * Kiểm tra thời gian hiện tại có phù hợp để start midroll
     */
    @autobind
    checkToStartMidroll() {
        this.midrollPrepare();
        this.midrollCountDown();
    }

    _handleGetVastResponse(vastResponse){
        if (this.midrollState_ !== MIDROLL_STATE.PREPAIRING) {
            return;
        }

        this.vastResponse = vastResponse;
    }

    _getVastResponse(){
        let { vastUri } = this.props;
        let self = this;
        DefaultAd.getVastRespone(vastUri).then(vastResponse => {
            return self._handleGetVastResponse(vastResponse);
        }).catch(() => {
            return self.dispose();
        });
    }

    @autobind
    midrollPrepare() {
        let { player } = this.props;
        if (this.midrollState_ !== MIDROLL_STATE.IDLE) {
            return;
        }

        let { starttime } = this.state;
        let currentTime = player.currentTime();

        if (currentTime + 6 >= starttime) {
            if (isCounting){
                return;
            }
            if (checkAdStart.currentTime > starttime){
                if (checkAdStart.adStart){
                    this.dispose();
                    return;
                }
            }
            isCounting = true;
            this.midrollState_ = MIDROLL_STATE.PREPAIRING;
            this._getVastResponse();
        }
    }

    @autobind
    midrollCountDown() {

        if (this.midrollState_ !== MIDROLL_STATE.PREPAIRING || !this.vastResponse) {
            return;
        }

        let { player } = this.props;
        let { starttime } = this.state;
        let currentTime = player.currentTime();
        let timeToStart = Math.round(starttime - currentTime);

        timeToStart = timeToStart >= 0 && timeToStart <= 5 ? timeToStart : null;

        if (currentTime > starttime) {
            this.currentTime_ = currentTime;
            this.stopHandleEvent();
            this._startMidroll();
        }

        if (timeToStart === 0) {
            this.midrollState_ = MIDROLL_STATE.RUNNING;
            this.currentTime_ = currentTime;
            this.stopHandleEvent();
            this._startMidroll();
        }

        this.setState({
            timeToStart
        });
    }

    _startMidroll(){
        let { skipoffset } = this.props;
        let vastUrl, vastResponse;
        if (typeof this.vastResponse === 'string') {
            vastUrl = this.vastResponse;
        } else if (typeof this.vastResponse === 'object') {
            vastResponse = this.vastResponse;
        } else {
            return;
        }
        DefaultAd.initAd({ skipoffset , vastUrl, vastResponse, type: 'midroll' });
    }

    render() {
        let { left, dispose, timeToStart } = this.state;
        if (dispose || timeToStart <= 0 || !left) {
            return null;
        }

        return (
            <div>
                <div className="midroll-marker" style={{ left: left }} />
                {typeof timeToStart === 'number' ? <div className="countdown-midroll">Quảng cáo sau: <span>{timeToStart}s</span></div> : ''}
            </div>
        );
    }
}

export default MidrollMarket;