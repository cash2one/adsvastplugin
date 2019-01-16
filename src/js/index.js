import playercore from 'playercore';
import pxhr from './p-xhr';
import InfoAds from './InfoAds';
import DefaultAd from './default/DefaultAd';
const Player = playercore.getComponent('Player');

const adsVastPlugin = function () {
    let player = this;
    let adRequest;
    let { params, plugins} = player.options();

    if (params.ads === false || (!plugins.kinghubAdmicroADSPlugin && Player.prototype.kinghubAdmicroADSPlugin)) {
        return;
    }

    let url = params.adInfoUrl || 'http://103.69.195.214:8000/file/demo.json' ;

    DefaultAd._getPlayer(player);

    player.one('ready', function () {
        pxhr({
            url: url,
            method: 'GET'
        }).then((result) => {
            adRequest = JSON.parse(result);
            InfoAds.getInfoAd(player, adRequest);
        });
    });

};

playercore.registerPlugin('adsVastPlugin', adsVastPlugin);  