// Generated by CoffeeScript 1.7.1
var Karma, Star,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Config.title = ['KARMA', 'CHAMELEON'];

window.initialize = function() {
  var i, _i, _results;
  Sound.setSeed(528);
  this.drums = [];
  _results = [];
  for (i = _i = 1; _i <= 4; i = ++_i) {
    _results.push(this.drums.push(Game.newSound().setDrum().setDrumPattern()));
  }
  return _results;
};

window.begin = function() {
  var drum, i, _i, _j, _len, _ref;
  _ref = this.drums;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    drum = _ref[_i];
    drum.playPattern();
  }
  for (i = _j = 1; _j <= 30; i = ++_j) {
    new Star;
  }
  return this.karma = new Karma;
};

window.update = function() {
  if (Game.isBeginning) {
    Actor.scroll(Star, -this.karma.vel.x / 2, -this.karma.vel.y / 2, 0, 1, 0, 1);
  }
  if (Game.isBeginning && Game.ticks === 0) {
    return Game.newText('[CLICK / TOUCH] RANDOM TURN').setXy(0.075, 0.1).setDuration(300).alignLeft().showOnce();
  }
};

Karma = (function(_super) {
  __extends(Karma, _super);

  function Karma() {
    return Karma.__super__.constructor.apply(this, arguments);
  }

  Karma.prototype.initialize = function() {
    Karma.turnSe = this.newSound().setDrum().setVolume(1);
    return Karma.destroySe = this.newSound().setDrum().setVolume(5);
  };

  Karma.prototype.begin = function() {
    this.drawing.setColor(Color.yellow).addRect(0.060, 0.030).addRect(0.045, 0.045).addRect(0.030, 0.060);
    return this.pos.setXy(0.5, 0.75);
  };

  Karma.prototype.update = function() {
    if (Game.ticks === 0 && Game.isBeginning) {
      this.vel.addWay(0, 0.003);
      this.turn(false);
      return;
    }
    if (!this.pos.isIn()) {
      this.destroy();
    }
    if (Mouse.isPressed) {
      this.vel.rotate(0..rr(360));
      this.turn(true);
    }
    if (Game.ticks % 600 === 0) {
      this.vel.mul(1.1);
    }
    if (Game.isBeginning) {
      return Game.score += 1;
    }
  };

  Karma.prototype.turn = function(isPlay) {
    if (isPlay) {
      Karma.turnSe.playNow();
    }
    return this.newParticle().setColor(Color.yellow).setSize(0.015).setNumber(30).setSpeed(0.004).setDuration(10).setWay(this.vel.getWay() - 180, 30);
  };

  Karma.prototype.destroy = function() {
    Karma.destroySe.playNow();
    this.newParticle().setColor(Color.red).setSize(0.06).setNumber(30).setSpeed(0.04).setDuration(60);
    this.remove();
    return Game.end();
  };

  return Karma;

})(Actor);

Star = (function(_super) {
  __extends(Star, _super);

  function Star() {
    return Star.__super__.constructor.apply(this, arguments);
  }

  Star.prototype.initialize = function() {
    return this.setDisplayPriority(0.5);
  };

  Star.prototype.begin = function() {
    this.drawing.addRect(0.01);
    return this.pos.setXy(0..rr(1), 0..rr(1));
  };

  return Star;

})(Actor);
