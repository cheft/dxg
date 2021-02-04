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
        game.islock = true;
        setTimeout(() => {
          var pos1 = self.node.getPosition();
          var pos2 = other.node.getPosition();
          pos1.x = (pos1.x + pos2.x) / 2;
          pos1.y = (pos1.y + pos2.y) / 2;
          
          let level = parseInt(self.tag) + 1;
          game.newFruit(level, pos1);
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
