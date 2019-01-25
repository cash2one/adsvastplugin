import playercore, { autobind, playerconfig , agent } from 'playercore';
import DefaultAdPlugin from './DefaultAdPlugin';

const AD_TYPE = {
    PREROLL: 'preroll',
    MIDROLL: 'midroll',
    POSTROLL: 'postroll'
};

const Player = playercore.getComponent('Player');
const { DEFAULT } = playerconfig;

class AdsPlugin extends DefaultAdPlugin {

    static defaultProps = {
        adsCancelTimeout: 5000,
        enableAd: true
    }

    getDefaultProps(props) {
        var { player } = props;
        var { params, plugins } = player.options();
        var { ads, vast, ima } = params;

        var defaultProps = this.constructor.defaultProps;

        var customize_data = {};

        if (!plugins.kinghubAdmicroADSPlugin && Player.prototype.kinghubAdmicroADSPlugin) {
            customize_data.enableAd = false;
        }

        if (vast || ima) {
            customize_data.enableAd = true;
        }

        if (ads === false) {
            customize_data.enableAd = false;
        }

        return {
            ...defaultProps,
            ...customize_data
        };
    }

    constructor(props) {
        super(props);
        let { player, enableAd } = this.props;
        let { params } = player.options();

        // Kiểm tra xem có enable ad không
        if (!enableAd) {
            return;
        }

        // player.on(DEFAULT.EVENT.AD_ORDER_START_MIDROLL, this.startMidroll);
        // player.on(DEFAULT.EVENT.AD_ORDER_START_POSTROLL, this.startPostroll);
        if (params.adPostLoad && !agent.isIOS) {
            player.on('preparePostrollVast', this.preparePostroll);
        } else {
            player.on(DEFAULT.EVENT.AD_ORDER_START_POSTROLL, this.startPostroll);
        }
        player.on('prepareMidrollVast', this.handlePrepareMidroll);

        if (params.adPreLoad && !agent.isIOS) {
            player.one('updateMediaInfo', this.handleLoadAdPreroll);
        } else {
            player.one('play', this.preparePreroll);
        }

    }

    /**
     * Bước chuẩn bị để chạy preroll ad
     * @return {[type]} [description]
     */
    @autobind
    preparePreroll() {
        let self = this;
        let vastResponse;
        let { player } = this.props;

        let { params } = player.options();

        if (params.nopre) {
            return;
        }

        let { ima } = params;
        let vastUrl = self._getVastInAdmicro({ type: AD_TYPE.PREROLL, position: 0 });
        if (!vastUrl) {
            return;
        }

        player.one('timeupdate', function () {
            self.initAd({ vastUrl, vastResponse, ima, type: 'preroll' });
        });

    }

    @autobind
    preparePostroll() {
        let self = this;
        let preLoaded = true;

        let vastUrl = self._getVastInAdmicro({ type: AD_TYPE.POSTROLL, position: 0 });
        if (!vastUrl) {
            return;
        }

        this.getVastRespone(vastUrl).then(vast => {
            let vastUrl, vastResponse;
            if (typeof vast === 'string') {
                vastUrl = vast;
            } else if (typeof vast === 'object') {
                vastResponse = vast;
            } else {
                return;
            }
            self.initAd({ vastUrl, vastResponse, type: AD_TYPE.POSTROLL, preLoaded});
        });
    }


    /**
     *  Load trước media của ads
     */
    @autobind
    handleLoadAdPreroll() {
        let self = this;
        let { player } = this.props;
        let preLoaded = true;

        let { params } = player.options();

        if (params.nopre) {
            return;
        }

        let { ima } = params;
        let vastUrl = self._getVastInAdmicro({ type: AD_TYPE.PREROLL, position: 0 });
        if (!vastUrl) {
            return;
        }

        this.getVastRespone(vastUrl).then(vast => {
            let vastUrl, vastResponse;
            if (typeof vast === 'string') {
                vastUrl = vast;
            } else if (typeof vast === 'object') {
                vastResponse = vast;
            } else {
                return;
            }
            self.initAd({ vastUrl, vastResponse, ima, type: 'preroll', preLoaded });
        });

    }

    @autobind
    startMidroll(evt, vast) {
        let vastUrl, vastResponse;
        if (typeof vast === 'string') {
            vastUrl = vast;
        } else if (typeof vast === 'object') {
            vastResponse = vast;
        } else {
            return;
        }
        this.initAd({ vastUrl, vastResponse, type: 'midroll' });
    }

    @autobind
    handlePrepareMidroll(event, index) {
        let { player } = this.props;
        let self = this;
        let preLoaded = true;
        let { params } = player.options();
        var vastUrl = this._getVastInAdmicro({ type: AD_TYPE.MIDROLL, position: index });
        if (!vastUrl) {
            player.trigger(DEFAULT.EVENT.AD_MIDROLL_VASTRESPONSE);
            return;
        }

        this.getVastRespone(vastUrl).then(vast => {
            player.trigger(DEFAULT.EVENT.AD_MIDROLL_VASTRESPONSE, vast);
            let vastUrl, vastResponse;
            if (typeof vast === 'string') {
                vastUrl = vast;
            } else if (typeof vast === 'object') {
                vastResponse = vast;
            } else {
                return;
            }
            if (!params.adMidLoad || agent.isIOS ) {
                player.one(DEFAULT.EVENT.AD_ORDER_START_MIDROLL, self.startMidroll);
                return;
            }
            self.initAd({ vastUrl, vastResponse, type: 'midroll', preLoaded });
        }).catch(() => {
            player.trigger(DEFAULT.EVENT.AD_MIDROLL_VASTRESPONSE);
        });
    }

    @autobind
    startPostroll() {
        var vastUrl = this._getVastInAdmicro({ type: AD_TYPE.POSTROLL, position: 10 });
        if (vastUrl) {
            this._initAd({ vastUrl, type: 'postroll' });
        }
    }

    /**
     * Lấy vast url từ admicro plugin
     * @return {String|null}
     */
    _getVastInAdmicro(options = {}) {
        var { player } = this.props;
        var { params } = player.options();
        if (Player.prototype.kinghubAdmicroADSPlugin) {
            return Player.prototype.kinghubAdmicroADSPlugin.call(player, options);
        } else if (params.vast) {
            return params.vast;
        }
    }
}

export default AdsPlugin;