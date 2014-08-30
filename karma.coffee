Config.title = ['KARMA', 'CHAMELEON']
# Config.captureArgs = [0.5, 4.8, 0.05]

window.initialize = ->
	Sound.setSeed 528
	@drums = []
	@drums.push Game.newSound().setDrum().setDrumPattern() for i in [1..4]
window.begin = ->
	drum.playPattern() for drum in @drums
	new Star for i in [1..30]
	@karma = new Karma
window.update = ->
	if Game.isBeginning
		Actor.scroll Star, - @karma.vel.x / 2, - @karma.vel.y / 2, 0, 1, 0, 1
	if Game.isBeginning && Game.ticks == 0
		Game.newText '[CLICK / TOUCH] RANDOM TURN'
			.setXy 0.075, 0.1
			.setDuration 300
			.alignLeft()
			.showOnce()

class Karma extends Actor
	initialize: ->
		Karma.turnSe = @newSound().setDrum().setVolume(1)
		Karma.destroySe = @newSound().setDrum().setVolume(5)
	begin: ->
		@drawing
			.setColor Color.yellow
			.addRect 0.060, 0.030
			.addRect 0.045, 0.045
			.addRect 0.030, 0.060
		@pos.setXy 0.5, 0.75
	update: ->
		if Game.ticks is 0 and Game.isBeginning
			@vel.addWay 0, 0.003
			@turn(false)
			return
		@destroy() if !@pos.isIn()
		if Mouse.isPressed
			@vel.rotate (0.rr 360)
			@turn(true)
		if Game.ticks % 600 is 0
			@vel.mul 1.1
		if Game.isBeginning
			Game.score += 1
	turn: (isPlay) ->
		Karma.turnSe.playNow() if isPlay
		@newParticle()
			.setColor Color.yellow
			.setSize 0.015
			.setNumber 30
			.setSpeed 0.004
			.setDuration 10
			.setWay @vel.getWay() - 180, 30
	destroy: ->
		Karma.destroySe.playNow()
		@newParticle()
			.setColor Color.red
			.setSize 0.06
			.setNumber 30
			.setSpeed 0.04
			.setDuration 60
		@remove()
		Game.end()

class Star extends Actor
	initialize: ->
		@setDisplayPriority 0.5
	begin: ->
		@drawing
			.addRect 0.01
		@pos.setXy (0.rr 1), (0.rr 1)
