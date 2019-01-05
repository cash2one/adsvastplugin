import InLine from './InLine';
import Wrapper from './Wrapper';

class Ad {
    constructor(adJTree) {
        this._initialize(adJTree);
    }

    _initialize(adJTree) {
        this.id = adJTree.attr('id');
        this.sequence = adJTree.attr('sequence');

        if (adJTree.inLine) {
            this.inLine = new InLine(adJTree.inLine);
        }

        if (adJTree.wrapper) {
            this.wrapper = new Wrapper(adJTree.wrapper);
        }
    }
}

export default Ad;