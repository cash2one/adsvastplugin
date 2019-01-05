import VCPlayerObject from '../../VCPlayerObject';
import { PropTypes, playerconfig} from 'playercore';
import dom from './dom';

const { DEFAULT } = playerconfig;

export default class AdVideoEl extends VCPlayerObject {
    /**
* Định nghĩa kiểu của props
* @type {Object}
*/
    static propTypes = {
        player: PropTypes.object.isRequired,
    };

    constructor(props){
        super(props);
        let {player} = this.props;
        this.createAdVideoEl()
        this._dispose = this._dispose.bind(this);
        player.on(DEFAULT.EVENT.AD_END, this._dispose);
        player.on(DEFAULT.EVENT.USER_SKIP_AD, this._dispose);
        player.on(DEFAULT.EVENT.VAST_AD_VIDEO_COMPLETE, this._dispose);
        player.on(DEFAULT.EVENT.VPAID_AD_VIDEO_COMPLETE, this._dispose);
    }

    componentWillUnmount() {
        let { player } = this.props;
        player.off(DEFAULT.EVENT.AD_END, this._dispose);
        player.off(DEFAULT.EVENT.USER_SKIP_AD, this._dispose);
        player.off(DEFAULT.EVENT.VAST_AD_VIDEO_COMPLETE, this._dispose);
        player.off(DEFAULT.EVENT.VPAID_AD_VIDEO_COMPLETE, this._dispose);
    }

    _dispose(){
        let { videoEl } = this.state;
        let { player } = this.props;

        dom.remove(videoEl);
        videoEl = null;
        player.overlay.getElementsByClassName('overlay-ad')[0].style.opacity = '0'
    }

    createAdVideoEl(){
        let {player} = this.props;
        var videoEl = document.createElement('video');
        videoEl.style.display = 'none';
        dom.addClass(videoEl, 'VideoEl-container');
        player.overlay.getElementsByClassName('overlay-ad')[0].append(videoEl)
        this.setState({
            videoEl
        })
        videoEl.addEventListener('playing',function(){
            videoEl.style.display = 'block';
            player.overlay.getElementsByClassName('overlay-ad')[0].style.opacity = '1'

        })
    }

    src(source){
        let { videoEl} = this.state;
        videoEl.src = source.src;
    }

    on(event , cb){
        let {videoEl} = this.state;
        videoEl.addEventListener(event , cb);
    }

    off(event , cb){
        let { videoEl } = this.state;
        videoEl.removeEventListener(event, cb);
    }

    currentTime(){
        let { videoEl } = this.state;
        return videoEl.currentTime ;
    }

    duration(){
        let { videoEl } = this.state;
        return videoEl.duration;
    }

    load(){
        let { videoEl } = this.state;
        videoEl.load();
    }

    volume(volume){
        let { videoEl } = this.state;
        if (typeof volume !=='number'){
            return videoEl.volume;
        }
        videoEl.volume = volume;
    }

    paused(){
        let { videoEl } = this.state;
        return videoEl.paused;
    }

    play(){
        let { videoEl } = this.state;
        let {player} = this.props;
        player.trigger('play')
        videoEl.play();
    }

    pause(){
        let { videoEl } = this.state;
        let { player } = this.props;
        player.trigger('pause')
        videoEl.pause();
    }

    preload(pre){
        let { videoEl } = this.state;
        videoEl.preload = pre;
    }

    muted(_mute){
        let { videoEl } = this.state;
        if (_mute  !== undefined){
            videoEl.muted = _mute;
        }

        return videoEl.muted;
    }

}