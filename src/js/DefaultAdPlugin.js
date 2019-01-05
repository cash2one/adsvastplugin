import {Plugin} from 'playercore';

import Vast from './vast-vpaid';

class DefaultAdPlugin extends Plugin {

    static defaultProps = {
        adsCancelTimeout: 5000
    }

    getDefaultProps() {

        var defaultProps = this.constructor.defaultProps;

        var customize_data = {};

        return {
            ...defaultProps,
            ...customize_data
        };
    }

    constructor(props) {
        super(props);
    }

    /**
     * Init ad theo vastUrl
     * @param  {Object}  options
     * @param  {String}  options.vastUrl  Url của vast
     */
    initAd({ vastUrl, vastResponse, ima, type, preLoaded }) {
        var self = this;
        var { player } = this.props;
        let callOrigPlay = player.play;
        var firstCallPlay = false;

        player.play = function () {
            if (firstCallPlay) {
                return;
            }

            firstCallPlay = true;
            player.play = callOrigPlay;
            self._initAd({ vastUrl, vastResponse, ima, type, preLoaded });
        };

        player.play();
    }

    /**
     * Init ad  
     * @param  {Object}  options
     * @param  {String}  options.vastUrl
     * @param  {Object}  options.vastResponse
     */
    _initAd({ vastUrl, vastResponse, ima, type, preLoaded }) {
        var { player } = this.props;

        if (player.vastAd) {
            return;
        }

        new Vast({
            player,
            adTagUrl: vastUrl,
            vastResponse,
            ima,
            type,
            preLoaded
        });
    }

    getVastRespone(vastUrl) {
        return Vast.getVASTResponse(vastUrl);
    }
}

export default DefaultAdPlugin;