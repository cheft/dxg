// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var global = require('Global');

cc.Class({
  extends: cc.Component,

  properties: {
    viewFruit: {
      default: null,
      type: cc.Sprite
    },

    line: {
      default: null,
      type: cc.Node,
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

    cc.director.getPhysicsManager().enabled = true;

    // cc.director.getCollisionManager().enabled = true;
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
    if (!this.line.active) {
      return;
    }
    var p = this.node.convertToNodeSpaceAR(event.getLocation());
    this.viewFruit.node.x = p.x;
  },

  onTouchend() {
    if (!this.line.active) {
      return;
    }
    this.line.active = false;
    this.viewFruit.node.children.forEach((node) => {
      node.active = false
    })

    this.fruit = this.newFruit(this.nextNum, this.viewFruit.node.getPosition());
    this.updateScore(this.scores[this.nextNum]);
    
    setTimeout(() => {
      this.line.active = true;
      this.previewFruit(parseInt(Math.random() * 5) + 1);
    }, 300);
  },

  previewFruit(num) {
    this.nextNum = num || 1;
    this.viewFruit.node.x = 0;
    this.viewFruit.node.scale = 0.5;
    this.viewFruit.node.children.forEach((node) => {
      if(node.name == this.nextNum) {
        node.active = true;
        return;
      }
    })
  },

  newFruit(num, p) {
    var fruit = cc.instantiate(this.prefabs[num]);
    this.node.addChild(fruit);
    fruit.setPosition(p);
    fruit.game = this;
    return fruit;
  },

  updateScore(addScore) {
    global.score += addScore;
    this.scoreLabel.string = global.score;
  },

  update(dt) {
    if (this.viewFruit.node.scale < 1) {
      this.viewFruit.node.scale += 0.04;
    }
  },
});
