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
        if (game.islock) {
          return;
        }
        var pos = self.node.getPosition();
        game.islock = true;
        setTimeout(() => {
          self.node.destroy();
          other.node.destroy();
          game.newFruit(parseInt(self.tag) + 1, pos); // TODO: position
          game.islock = false;
        }, 0);
      }
    }
  },
});
