// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    viewFruit: {
      default: null,
      type: cc.Sprite
    },

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

    this.node.on('touchmove', this.onTouchmove, this);
    this.node.on('touchend', this.onTouchend, this);

    this.previewFruit(1);
  },

  onDestroy () {
    this.node.off('touchmove', this.onTouchmove, this);
    this.node.off('touchend', this.onTouchend, this);
  },

  onTouchmove(event) {
    var p = this.node.convertToNodeSpaceAR(event.getLocation());
    this.viewFruit.node.x = p.x;
  },

  onTouchend(event) {
    this.fruit = this.newFruit(this.nextNum, this.viewFruit.node.getPosition());
    this.updateScore(this.scores[this.nextNum]);
    this.previewFruit(parseInt(Math.random() * 5) + 1);
  },

  previewFruit(num) {
    this.nextNum = num || 1;
    if (this.viewFruit.node && this.viewFruit.node.children) {
      this.viewFruit.node.children.forEach((node) => {
        node.opacity = (node.name == this.nextNum) ? 255 : 0;
      })
    }
  },

  newFruit(num, p) {
    var fruit = cc.instantiate(this.prefabs[num]);
    this.node.addChild(fruit);
    fruit.setPosition(p);
    fruit.game = this;
    return fruit;
  },

  updateScore(addScore) {
    this.score += addScore;
    this.scoreLabel.string = this.score + '';
  },

  update(dt) {},
});
