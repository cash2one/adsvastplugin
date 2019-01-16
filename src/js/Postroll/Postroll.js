import DefaultAd from '../default/DefaultAd';
import {playerconfig , Plugin, autobind} from 'playercore';
import durationRule from '../utils/durationRule';

const POSTROLLSTATE = {
    IDLE: 'IDLE',
    RUNNING: 'RUNNING',
    SUCCESS: 'SUCCESS'
};

const {DEFAULT} = playerconfig;
const playername = process.env.PLAYER;

class Postroll extends Plugin {

    defaultProps = {
        // Số lần sẽ chạy postroll, mặc định sẽ chạy mãi
        number: -1
    }

    state = {
        count: 0,
        postrollstate: POSTROLLSTATE.IDLE
    }

    constructor(props){
        super(props);
        let {player} = this.props;
        player.on(DEFAULT.EVENT.PLAYER_ENDED_CONTEND, this.handleContentEnded);
        player.on('durationchange', this.checkDurationIsGreat);
        player.on('play', this.checkDurationIsGreat);
        player.on('loadedmetadata', this.checkDurationIsGreat);
    }

    @autobind
    checkDurationIsGreat(){
        let {player} = this.props;
        let duration = player.duration();

        if (Number.isNaN(duration)) {
            return;
        }

        let { params } = player.options();
        if (duration < 40 || params.openPostroll || playername === 'AutoproBetaPlayer' || params.postroll) {
            return;
        }

        player.trigger('postrollignore');

        player.off(DEFAULT.EVENT.PLAYER_ENDED_CONTEND, this.handleContentEnded);
        player.off('durationchange', this.checkDurationIsGreat);
        player.off('play', this.checkDurationIsGreat);
        player.off('loadedmetadata', this.checkDurationIsGreat);
    }

    PreparePostroll(){
        let { player } = this.props;
        let self = this;
        this.setState({
            postrollstate: POSTROLLSTATE.RUNNING
        });

        player.one(DEFAULT.EVENT.AD_END, function () {
            // Lắng nghe và xử lý khi chạy postroll xong
            self.setState({
                postrollstate: POSTROLLSTATE.SUCCESS
            });

            player.one('play', function () {
                self.setState({
                    postrollstate: POSTROLLSTATE.IDLE
                });
                player.currentTime(0);
            });

            player.trigger(DEFAULT.EVENT.AD_ENDED_POSTROLL);
        });

        // Trigger yêu cầu core chạy postroll
        this.startPostroll();
    }

    startPostroll(){
        let { infoAd } = this.props;
        let vastUrl = infoAd.tag;
        let skipoffset = infoAd.skipoffset;

        DefaultAd._initAd({ skipoffset , vastUrl, type: 'postroll' });
    }

    @autobind
    handleContentEnded(){
        let { count, postrollstate } = this.state;
        let { player, number } = this.props;

        if (postrollstate !== 'IDLE') {
            return;
        }

        this.setState({
            count: ++count
        });

        // Nếu number = 0 thì không chạy quảng cáo.
        if (count > number && number >= 0) {
            // Không chạy postroll thì clear listenner
            player.off(DEFAULT.EVENT.PLAYER_ENDED_CONTEND, this.handleContentEnded);
            player.play = this.oriPlay;
            return;
        }

        this.PreparePostroll();
    }
}
export default function (player, infoAd) {
    player.one('play', function () {
        player.one('timeupdate', function () {
            let duration = player.duration();
            let { durationValue, durationLogical } = infoAd;
            let accept = durationRule({ duration, durationValue, durationLogical });
            if (!accept) {
                return;
            }
            new Postroll({ player, infoAd });
        });
    });
}