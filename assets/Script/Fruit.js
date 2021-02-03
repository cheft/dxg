cc.Class({
  extends: cc.Component,

  properties: {
  },

  // onLoad () {},
  // start () {},
  // update (dt) {},

  // 只在两个碰撞体开始接触时被调用一次
  onBeginContact: function (contact, self, other) {
    if (self.tag === other.tag) {
      if (self.node && other.node) {
        let game = self.node.game;
        if (game.islock) {
          return;
        }
        var pos = self.node.getPosition();
        game.islock = true;
        setTimeout(() => {
          let level = parseInt(self.tag) + 1;
          game.newFruit(level, pos); // TODO: position
          self.node.destroy();
          other.node.destroy();
          var addScore = game.scores[level] - game.scores[level - 1] * 2;
          game.updateScore(addScore);
          game.islock = false;
        }, 0);
      }
    }
  },
});
