import React from 'react';
import MidrollDisplay from './MidrollDisplay';


export default function (player, infoAd, rules) {
    let ele = (
        <MidrollDisplay key="MidrollDisplay" infoAd={infoAd} player={player} rules={rules}></MidrollDisplay>
    );
    player.container.controlBar.progressControl.progressSlider.addChild(ele);

}