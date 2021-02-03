// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    scoreLabel: {
      default: null,
      type: cc.Label
    },

    prefabs: {
      default: [],
      type: [cc.Prefab]
    },
  },

  onLoad() {
    this.scores = [0, 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];
    this.score = 0;

    cc.director.getPhysicsManager().enabled = true;

    cc.director.getCollisionManager().enabled = true;
    // cc.director.getCollisionManager().enabledDebugDraw = true;

    this.node.on('touchstart', this.onTouchstart, this);
    this.node.on('touchmove', this.onTouchmove, this);
    this.node.on('touchend', this.onTouchend, this);
  },

  onDestroy () {
    this.node.off('touchstart', this.onTouchstart, this);
    this.node.off('touchmove', this.onTouchmove, this);
    this.node.off('touchend', this.onTouchend, this);
  },

  onTouchstart(event) {
    var p = this.node.convertToNodeSpaceAR(event.getLocation());
    p.y = this.node.height / 2 - 100; // TODO:
    var num = parseInt(Math.random() * 5) + 1;
    this.fruit = this.newFruit(num, p);
    this.updateScore(this.scores[num]);
    cc.director.getPhysicsManager().enabled = false;
  },

  onTouchmove(event) {
    var p = this.node.convertToNodeSpaceAR(event.getLocation());
    p.y = this.node.height / 2 - 100; // TODO:
    this.fruit.setPosition(p);
  },

  onTouchend(event) {
    cc.director.getPhysicsManager().enabled = true;
  },

  newFruit(num, p) {
    var fruit = cc.instantiate(this.prefabs[num]);
    this.node.addChild(fruit);
    fruit.game = this;
    fruit.setPosition(p);
    return fruit;
  },

  updateScore(addScore) {
    this.score += addScore;
    this.scoreLabel.string = this.score + '';
  },

  update(dt) {},
});
