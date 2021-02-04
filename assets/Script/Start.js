var global = require('Global');

cc.Class({
  extends: cc.Component,

  properties: {
    score_label: {
      default: null,
      type: cc.Label,
    },
    start_btn: {
      default: null,
      type: cc.Button,
    }
  },

  onLoad() {
    this.score_label.string = global.score;
    this.start_btn.node.on('click', this.startGame, this);
  },

  startGame() {
    global.score = 0;
    cc.director.loadScene("Game");
  }

  // start () {},
  // update (dt) {},
});
