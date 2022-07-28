/* eslint-disable no-undef */
/**
 * Adds support for multi-touch gestures using the Event.js library.
 * Fires the following custom events:
 * - touch:gesture
 * - touch:drag
 * - touch:orientation
 * - touch:shake
 * - touch:longpress
 */
function stringifyEvent(e) {
  const obj = {};
  for (let k in e) {
    obj[k] = e[k];
  }
  return JSON.stringify(
    obj,
    (k, v) => {
      if (v instanceof Node) return "Node";
      if (v instanceof Window) return "Window";
      return v;
    },
    " "
  );
}

(function () {
  fabric.util.object.extend(
    fabric.Canvas.prototype,
    /** @lends fabric.Canvas.prototype */ {
      /**
       * Method that defines actions when an Event.js gesture is detected on an object. Currently only supports
       * 2 finger gestures.
       * @param {Event} e Event object by Event.js
       * @param {Event} self Event proxy object by Event.js
       */
      __onTransformGesture: function (e, self) {
        if (
          this.isDrawingMode ||
          !e.touches ||
          e.touches.length !== 2 ||
          "gesture" !== self.gesture
        ) {
          return;
        }

        var target = this.findTarget(e);

        this.fire("touch:gesture", {
          target: target,
          e: e,
          self: self,
        });
      },
    }
  );
})();
