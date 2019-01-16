import DefaultAd from '../default/DefaultAd';
import durationRule from '../utils/durationRule';

const playername = process.env.PLAYER;

export default function (player, infoAd) {
    let { params } = player.options_;
    let {skipoffset} = infoAd ;

    if (playername !== 'AutoproBetaPlayer' ){
        if (params.nopre) {
            return;
        }
    }

    let { ima } = params;
    player.one('play',function(){
        player.one('timeupdate', function () {
            let  duration  = player.duration();
            let { durationValue, durationLogical } = infoAd;
            let accept = durationRule({ duration, durationValue, durationLogical});
            if (!accept){
                return ;
            }

            DefaultAd.getVastRespone(infoAd.tag).then(vastResponse => {
                DefaultAd.initAd({ skipoffset ,vastResponse, ima, type: 'preroll' });
            });
        });
    });
}