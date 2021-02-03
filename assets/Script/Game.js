// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    fruit: {
      default: null,
      type: cc.Sprite,
    },

    prefabs: {
      default: [],
      type: [cc.Prefab]
    },
  },

  onLoad() {
    cc.director.getPhysicsManager().enabled = true;

    cc.director.getCollisionManager().enabled = true;
    // cc.director.getCollisionManager().enabledDebugDraw = true;

    // this.node.on('touchstart', this.onTouchstart, this);
    // this.node.on('touchmove', this.onTouchmove, this);
    this.node.on('touchend', this.onTouchend, this);
    window.game = this;
  },

  onDestroy () {
    this.node.off('touchend', this.onTouchend, this);
  },

  onTouchend(event) {
    var p = this.node.convertToNodeSpaceAR(event.getLocation());
    // this.fruit.node.x = p.x;
    var num = parseInt(Math.random() * 2) + 1;
    this.newFruit(num, p);
  },

  newFruit(num, p) {
    var fruit = cc.instantiate(this.prefabs[num]);
    this.node.addChild(fruit);
    fruit.setPosition(p);
    fruit.enabledContactListener = true;
  },

  update(dt) {
    
  },
});
