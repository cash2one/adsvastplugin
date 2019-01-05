import VCPlayerObject from '../../VCPlayerObject';
import { PropTypes, agent } from 'playercore';
import AdVideoEl from './AdVideoEl';

export default class PlayerAdUnit extends VCPlayerObject {
    /**
 * Định nghĩa kiểu của props
 * @type {Object}
 */
    static propTypes = {
        player: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.selectPlayerAd()
    }

    createAdVideoEl() {
        let { player } = this.props;
        var PlayerAdUnit = new AdVideoEl({player});
        return PlayerAdUnit;
    }

    selectPlayerAd() {
        let { player } = this.props;
        let PlayerAdUnit;

        if (agent.isIOS) {
           PlayerAdUnit = player;
        }else{
            PlayerAdUnit = this.createAdVideoEl();
        }

        this.setState({
            PlayerAdUnit
        })
    }

    getPlayerAdUnit(){
        let {PlayerAdUnit} = this.state;

        if (!PlayerAdUnit){
            return;
        }

        return PlayerAdUnit;
    }
    
}