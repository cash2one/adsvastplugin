import { Vast } from 'playercore';

class DefaultAd {
    _getPlayer(player){
        this.player = player;
    }

    initAd({ vastUrl, vastResponse, ima, type, skipoffset}) {
        var self = this;
        var player_ = this.player;
        let callOrigPlay = player_.play;
        var firstCallPlay = false;

        player_.play = function () {
            if (firstCallPlay) {
                return;
            }

            firstCallPlay = true;
            player_.play = callOrigPlay;
            self._initAd({ vastUrl, vastResponse, ima, type, skipoffset});
        };

        player_.play();
    }

    _initAd({ vastUrl, vastResponse, ima, type, skipoffset }) {
        var player = this.player;

        if (player.vastAd) {
            return;
        }

        new Vast({
            player,
            adTagUrl: vastUrl,
            vastResponse,
            ima,
            type,
            skipoffset
        });
    }

    getVastRespone(vastUrl) {
        return Vast.getVASTResponse(vastUrl);
    }
}

export default new DefaultAd();
