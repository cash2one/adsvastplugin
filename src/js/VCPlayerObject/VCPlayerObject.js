import {PropTypes , log} from 'playercore';

/**
 * BaseClass của VCPlayer
 * @class VCPlayerObject
 */
class VCPlayerObject {

    /**
     * Định nghĩa kiểu của props
     * @type {Object}
     */
    static propTypes = {
      
    }

    /**
     * Định props default
     * @type {Object}
     */
    static defaultProps = {

    }

    state = {
        
    }

    /**
     * Tạo một instance của class SkyGoObject
     * @param  {Object} props
     */
    constructor(props) {
        this._validProps(props);
        this._initProps(props);
    }

    /**
     * get default props
     * @return {Object}       Trả về props default (static defaultProps)
     */
    getDefaultProps() {
        return this.constructor.defaultProps;
    }

    /**
     * Hàm set state
     * @param {Object} state={}
     */
    setState(state = {}) {
        var old_state = this.state || {};
        this.state = {...old_state, ...state};

        log.stateInfo({
            label: this.constructor.name,
            prevState: old_state, 
            nextState: state
        });
    }

    /**
     * Hàm update props
     * @param  {Object} props
     */
    updateProps(props = {}) {
        var old_props = this.props || {};
        this.props = {...old_props, ...props};
    }

    /**
     * Hàm init props. 
     * ```js
     * var defaultProps = this.getDefaultProps(props);
     * this.props = {...defaultProps, ...props};
     *  ```
     * @param  {Object} props Props được truyền vào trong constructor
     */
    _initProps(props) {
        var defaultProps = this.getDefaultProps(props);
        this.props = {...defaultProps, ...props};
    }

    /**
     * Hàm valid props truyền vào hàm constructor khi khởi tạo đối tượng dựa trên propTypes
     */
    _validProps(props) {
        var propTypes = this.constructor.propTypes;

        PropTypes.checkPropTypes(propTypes, props, 'prop', this.constructor.name);
    }
}

export default VCPlayerObject;