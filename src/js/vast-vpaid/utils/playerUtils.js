class playerUtils {
    static once(player, events, handler) {
        function listener() {
            for (var i = 0; i <  events.length; i++) {
                player.off(events[i], listener);
            }

            handler.apply(null, arguments);
        }

        events.forEach(function (event) {
            player.on(event, listener);
        });
    }
}

export default playerUtils;