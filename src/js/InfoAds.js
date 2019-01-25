import Preroll from './Preroll';
import Postroll from './Postroll';
import wrapperMidroll from './Midroll';
import sspAds from './linkSsp';

class InfoAds {
    constructor(){
        this.havePreroll = false;
        this.havePostroll = false;
    }


    getInfoAd(player, adRequest){
        this.player_ = player;
        this.adRequest_ = adRequest;
        this.classifiedAds();
    }

    classifiedAds(){
        let{ adRequest_} = this;
        let{ advertising, rules } = adRequest_;
        this.rules = rules;
        this.scheduleAds(advertising.schedule);
    }

    scheduleAds(schedule){
        let player = this.player_;
        let PrerollVastUrl;
        let PostrollVastUrl;
        let MidrollVastUrl = {};
        let numberIndex = 0;

        for (let i in schedule) {
            let isAddLinkSSP = schedule[i];

            if (schedule[i].offset === 'start') {
                PrerollVastUrl = schedule[i];

                PrerollVastUrl = PrerollVastUrl + this.createSsp(numberIndex, isAddLinkSSP);
            } else if (schedule[i].offset === 'end') {
                PostrollVastUrl = schedule[i];

                PostrollVastUrl = PostrollVastUrl + this.createSsp(numberIndex, isAddLinkSSP);
            } else {
                MidrollVastUrl[schedule[i].offset] = {};
                let { tag, skipoffset, repeat, repeatTime, durationLogical, durationValue} = schedule[i];

                tag = tag + this.createSsp(numberIndex, isAddLinkSSP);

                MidrollVastUrl[schedule[i].offset] = ({ tag, skipoffset, repeatTime, repeat, durationLogical, durationValue });
            }

            numberIndex++;
        }

        this._createPreroll(player, PrerollVastUrl);
        this._createMidroll(player, MidrollVastUrl);
        this._createPostroll(player, PostrollVastUrl);
    }

    createSsp(position, isAddLinkSSP){
        if(!isAddLinkSSP) return '';

        let player = this.player_;
        let ssp = sspAds.getLinkAds(player, {position: position});
        let category = typeof _ADM_Channel == 'undefined' ? '' : _ADM_Channel;
        let admtvcPgid = typeof admtvcPgid == 'undefined' ? '&lsn=&dgid=&i=' : admtvcPgid();

        return '&link=' + ssp + '&category=' + category + admtvcPgid;
    }

    _createPreroll(player, PrerollVastUrl){
        if (!PrerollVastUrl){
            return ;
        }

        this.havePreroll = true;
        Preroll(player, PrerollVastUrl);
    }

    _createMidroll(player, MidrollVastUrl) {
        if (!Object.keys(MidrollVastUrl).length){
            return;
        }
        wrapperMidroll(player, MidrollVastUrl, this.rules);
    }

    _createPostroll(player, PostrollVastUrl) {

        if (!PostrollVastUrl) {
            return;
        }

        this.havePostroll = true;
        Postroll(player, PostrollVastUrl);
    }
}

export default new InfoAds();