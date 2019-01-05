import React, { Component } from 'react';
import {PropTypes} from 'playercore';

const playername = process.env.PLAYER;

class AdFullScreenToggle extends Component {
    static propTypes = {
        player: PropTypes.object.isRequired,
        className: PropTypes.string
    }

    static defaultProps = {
        className: ''
    }

    handleClick(evt) {
        evt.preventDefault();
        let { player } = this.props;
        if (!player.isFullscreen()) {
            player.requestFullscreen();
        } else {
            player.exitFullscreen();
        }

        player.setTimeout(() => {
            this.r_button.blur();
            player.el_.focus();
        }, 0);
    }

    className() {
        let { className } = this.props;
        let classArr = [`${playername}-ad-control ${className} ${playername}-button ad-full-screen-toggle`];

        return classArr.join(' ');
    }

    render() {
        let className = this.className();
        return (
            <button
                ref={(button) => { this.r_button = button; }}
                className={className}
                onClick={(evt) => this.handleClick(evt)}
            >

            </button>
        );
    }
}

export default AdFullScreenToggle;
