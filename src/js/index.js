import playercore  from 'playercore';
import AdsPlugin from './AdsPlugin';
import React from 'react';
import Ad from './AdSkin';
import Vast from './vast-vpaid';
import dom from './vast-vpaid/utils/dom';

playercore.Vast = Vast ;

const AdsPlayerPlugin = function () {
    let player = this;
    new AdsPlugin({ player });

    player.one('ready',function(){
        let ele = (
            <Ad key="ad" player={player} ref={(c) => { this.container.ad = c; }} /> 
        );
        player.container.addChild(ele);
        var overlayAd = document.createElement('div');
        overlayAd.style.background = 'rgba(0,0,0,0.7)';
        overlayAd.style.transition = 'all 1s ease 0s';
        overlayAd.style.opacity = 0;
        dom.addClass(overlayAd, 'overlay-ad');
        player.overlay.append(overlayAd);
    });
};

playercore.registerPlugin('AdsPlayerPlugin', AdsPlayerPlugin);  