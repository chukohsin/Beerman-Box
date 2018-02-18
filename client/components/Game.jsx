import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from "react-router-dom"

const mapStateToProps = state => ({ beers: state.rankBeer })

export class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = { ipa: false, stout: false, pale: false, sour: false, beerCount: 0, detail: false, water: false }
	}

	componentDidMount() {
		let self = this
		function gameConstructor () {
			let game = new Phaser.Game(1280, 640, Phaser.AUTO, 'game', { preload: preload, create: create, update: update })

			let map = null
			let Beerman = null
			let blob = null
			let beers = null

			let ipa = null
			let pale = null
			let stout = null
			let sour = null
			let waterGod = null
			let heart = null

			let cursors = null
			let speed = 200
			let threshold = 3
			let marker = new Phaser.Point()
			let turnPoint = new Phaser.Point()
			let directions = []
			let opposites = [ Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP ]
			let current = Phaser.NONE
			let turning = Phaser.NONE
			
			let introMusic = null
			let ipaSound = null
			let paleSound = null
			let sourSound = null
			let stoutSound = null
			let beerSound = null
			let orangeBlobSound = null
			let redBlobSound = null
			let waterSound = null
			let backGroundSound = null
			let heartSound = null


			let beerCount = null
			let clickStart = null
			let count = 0
			let timer = 0
			let restartSign = null

			let blankTiles = []
			let tileIndex = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
			tileIndex.splice(30, 1, 1)
			tileIndex.forEach((el, i) => {
			    if (el === 0) {
			        blankTiles.push([i % 20 * 32, Math.floor(i / 20) * 32])
			    }
			})
			let neonTiles = ['down-end', 'downleft-corner', 'downright-corner', 'left-end', 'leftright', 'right-end', 'topleft-corner', 'topright-corner', 'up-end', 'updown']

			function preload() {

				for (let i = 0; i < neonTiles.length; i++) {
					game.load.image(neonTiles[i], `./assets/neonMap/${neonTiles[i]}.png`)
				}
			    game.load.tilemap('maze', './assets/neonMap.json', null, Phaser.Tilemap.TILED_JSON)
			    game.load.image('beer', './assets/realBeer.png')
			    game.load.image('player', './assets/blobRight.png')
			    game.load.image('orangeBlob', './assets/orangeBlob.png')
			    game.load.image('redBlob', './assets/redBlob.png')
			    game.load.image('i-ipa', './assets/ipa/i-ipa.png')
			    game.load.image('p-ipa', './assets/ipa/p-ipa.png')
			    game.load.image('a-ipa', './assets/ipa/a-ipa.png')
			    game.load.image('a-pale', './assets/pale/a-pale.png')
			    game.load.image('p-pale', './assets/pale/p-pale.png')
			    game.load.image('l-pale', './assets/pale/l-pale.png')
			    game.load.image('e-pale', './assets/pale/e-pale.png')
			    game.load.image('s-sour', './assets/sour/s-sour.png')
			    game.load.image('o-sour', './assets/sour/o-sour.png')
			    game.load.image('u-sour', './assets/sour/u-sour.png')
			    game.load.image('r-sour', './assets/sour/r-sour.png')
			    game.load.image('s-stout', './assets/stout/s-stout.png')
			    game.load.image('t-stout', './assets/stout/t-stout.png')
			    game.load.image('o-stout', './assets/stout/o-stout.png')
			    game.load.image('u-stout', './assets/stout/u-stout.png')
			    game.load.image('water-god', './assets/waterGod.png')
			    game.load.image('me', './assets/me.png')
			    game.load.image('heart', './assets/heart.png')
			    game.load.audio('intro-music', './assets/sounds/pacman_beginning.wav')
				game.load.audio('chomp-music', './assets/sounds/pacman_chomp.wav')
				game.load.audio('ipa-sound', './assets/sounds/ipaSound.mp3')
				game.load.audio('pale-sound', './assets/sounds/paleSound.mp3')
				game.load.audio('sour-sound', './assets/sounds/sourSound.mp3')
				game.load.audio('stout-sound', './assets/sounds/stoutSound.mp3')
				game.load.audio('beer-sound', './assets/sounds/beerSound.mp3')
				game.load.audio('orangeBlob-sound', './assets/sounds/orangeBlobSound.mp3')
				game.load.audio('redBlob-sound', './assets/sounds/redBlobSound.mp3')
				game.load.audio('water-sound', './assets/sounds/waterSound.wav')
				game.load.audio('background-sound', './assets/sounds/backGroundSound.mp3')
				game.load.audio('heart-sound', './assets/sounds/heartSound.wav')
			}

			function create() {

			    game.stage.backgroundColor = '#000000'

			    game.physics.startSystem(Phaser.Physics.ARCADE)

			    map = game.add.tilemap('maze');
			    for (let i = 0; i < neonTiles.length; i++) {
					map.addTilesetImage(neonTiles[i], neonTiles[i])
				}
			    Beerman = map.createLayer('Tile Layer 1')

			    game.add.button(304, 528, 'me', actionOnClick, this, 0);

			    beerCount = game.add.text(680, 20, "BEER COUNT: 0", {
			        font: "50px Geo",
			        fill: "#F3F315",
			        align: "left"
			    })

			    clickStart = game.add.text(680, 250, "Click to Start!", {
					font: "100px Geo",
					fill: "#0000FF",
					align: "center",
					fontWeight: "bold",
					backgroundColor: "#ffffff"
			    })

			    introMusic = game.add.audio('intro-music')
			    introMusic.onStop.add(playBGM, this)
			    ipaSound = game.add.audio('ipa-sound')
			    paleSound = game.add.audio('pale-sound')
			    sourSound = game.add.audio('sour-sound')
			    stoutSound = game.add.audio('stout-sound')
			    beerSound = game.add.audio('beer-sound')
			    orangeBlobSound = game.add.audio('orangeBlob-sound')
			    redBlobSound = game.add.audio('redBlob-sound')
			    waterSound = game.add.audio('water-sound')
			    backGroundSound = game.add.audio('background-sound')
			    heartSound = game.add.audio('heart-sound')

			    blob = game.add.sprite(320, 32, 'player')
			    game.physics.arcade.enable(blob)

			    heart = game.add.physicsGroup()
			    heart.enableBody = true

			    waterGod = game.add.physicsGroup()
			    waterGod.enableBody = true
			    for (let i = 0; i < 8; i++) {
					waterGod.create(1000 + i * 32, 26, "water-god")
			    }
			    waterGod.onDestroy.add(waterDestroyCall, this)

			    ipa = game.add.physicsGroup()
			    ipa.enableBody = true
			    ipa.create(...randomBlank(), 'i-ipa')
			    ipa.create(...randomBlank(), 'p-ipa')
			    ipa.create(...randomBlank(), 'a-ipa')
			    ipa.onDestroy.add(ipaDestroyCall, this)

			    pale = game.add.physicsGroup()
			    pale.enableBody = true
			    pale.create(...randomBlank(), 'p-pale')
			    pale.create(...randomBlank(), 'a-pale')
			    pale.create(...randomBlank(), 'l-pale')
			    pale.create(...randomBlank(), 'e-pale')
			    pale.onDestroy.add(paleDestroyCall, this)

			    stout = game.add.physicsGroup()
			    stout.enableBody = true
			    stout.create(...randomBlank(), 's-stout')
			    stout.create(...randomBlank(), 't-stout')
			    stout.create(...randomBlank(), 'o-stout')
			    stout.create(...randomBlank(), 'u-stout')
			    stout.create(...randomBlank(), 't-stout')
			    stout.onDestroy.add(stoutDestroyCall, this)

			    sour = game.add.physicsGroup()
			    sour.enableBody = true
			    sour.create(...randomBlank(), 's-sour')
			    sour.create(...randomBlank(), 'o-sour')
			    sour.create(...randomBlank(), 'u-sour')
			    sour.create(...randomBlank(), 'r-sour')
			    sour.onDestroy.add(sourDestroyCall, this)


			    beers = game.add.physicsGroup()
			    beers.enableBody = true
			    for (let i = 0; i <  blankTiles.length; i++) {
			        beers.create(... blankTiles[i], 'beer')
			    }

			    blob.checkWorldBounds = true

			    map.setCollision([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], true, Beerman)
			    //  This resizes the game world to match the Beerman dimensions
			    Beerman.resizeWorld()

			    //Enable cursor keys so we can create some controls
			    cursors = game.input.keyboard.createCursorKeys()
			    game.input.onDown.addOnce(() => {
			    	clickStart.destroy()
					introMusic.fadeIn(2000)
					run(Phaser.RIGHT)
			    }, this)
			}

			function update() {

				game.physics.arcade.collide(blob, Beerman)
			    game.physics.arcade.overlap(blob, beers, drinkBeer, null, this)
			    game.physics.arcade.overlap(blob, ipa, drinkBeer, null, this)
			    game.physics.arcade.overlap(blob, stout, drinkBeer, null, this)
			    game.physics.arcade.overlap(blob, pale, drinkBeer, null, this)
			    game.physics.arcade.overlap(blob, sour, drinkBeer, null, this)
			    game.physics.arcade.overlap(blob, waterGod, drinkWater, null, this)
			    game.physics.arcade.overlap(blob, heart, gotHeart, null, this)

			    timer += game.time.elapsed

			    if (timer >= 400) {
				    	timer -= 400
				    	clickStart.visible = !clickStart.visible 
				    }

			    if (count < 100) {
			    	beerCount.addColor('#F3F315', 0)
			    	blob.loadTexture('player')
			    	speed = 200
			    }

			    if (count >= 100) {
			    	if (count == 100) orangeBlobSound.play()
			    	speed = 100
			    	beerCount.visible = true
			    	beerCount.addColor('#FEAA01', 0)
			    	blob.loadTexture('orangeBlob')
			    }

			    let inputSpeed = speed
				if (count >= 130) {
					if (count == 130) redBlobSound.play()
					blob.loadTexture('redBlob')
					beerCount.addColor('#FF0000', 0)
					if (timer >= 400) {
				    	timer -= 400
				    	beerCount.visible = !beerCount.visible 
				    }
					inputSpeed = -speed
				}
			    if (cursors.right.isDown) { blob.body.velocity.x = inputSpeed }
			    else if (cursors.left.isDown) { blob.body.velocity.x = -inputSpeed }
			    else if (cursors.up.isDown) { blob.body.velocity.y = -inputSpeed }
			    else if (cursors.down.isDown) { blob.body.velocity.y = inputSpeed }

			    if (ipa.countLiving() === 0) { ipa.destroy()}
			    if (pale.countLiving() === 0) { pale.destroy()}
			    if (stout.countLiving() === 0) { stout.destroy()}
			    if (sour.countLiving() === 0) { sour.destroy()}
			    if (waterGod.countLiving() === 0) { waterGod.destroy()}

			    marker.x = Phaser.Math.snapToFloor(Math.floor(blob.x), 32) / 32;
			    marker.y = Phaser.Math.snapToFloor(Math.floor(blob.y), 32) / 32;

			    if (blob.x < 0) blobComeBack(blob)
			    if (blob.y < 0) {
			    	blob.reset(blob.x, 608)
			    	blob.body.velocity.y = -speed
			    }
			    if (blob.y > 640) {
			    	blob.reset(blob.x, 0)
			    	blob.body.velocity.y = speed
			    }
			    if (blob.x > 1280) {
			    	blob.reset(0, 288)
			    	blob.body.velocity.x = speed
			    }

			    if (blob.x < 640){
					let x = marker.x
					let y = marker.y
					let i = Beerman.index
					directions[Phaser.LEFT] = map.getTileLeft(i, x, y)
					directions[Phaser.RIGHT] = map.getTileRight(i, x, y)
					directions[Phaser.UP] = map.getTileAbove(i, x, y)
					directions[Phaser.DOWN] = map.getTileBelow(i, x, y)
					checkKeys()
					if (turning !== Phaser.NONE) { turn() }
			    }
			}


			//HELPER FUNCTIONS
			function playBGM() {
				backGroundSound.volume = 0.8
				backGroundSound.loopFull()
			}

			function actionOnClick() {
				backGroundSound.fadeOut(5000)
				restartSign = game.add.text(100, 250, "Restarting!", {
					font: "100px Geo",
					fill: "#FF0000",
					align: "center",
					fontWeight: "bold",
					backgroundColor: "#ffffff"
			    })
			    restartSign.bringToTop()
				setTimeout(restart, 5000)
			}

			function waterDestroyCall() {
					heart.visible = false
					self.setState({ ipa: false, stout: false, pale: false, sour: false, detail: false, water: true  })
			}

			function ipaDestroyCall() {
					heart.create(680, 387, 'heart')
					game.sound.play('ipa-sound')
					self.setState({ ipa: true, stout: false, pale: false, sour: false, detail: false, water: false  })
			}

			function sourDestroyCall() {
					heart.create(680, 387, 'heart')
					game.sound.play('sour-sound')
					self.setState({ ipa: false, stout: false, pale: false, sour: true, detail: false, water: false  })
			}

			function paleDestroyCall() {
					heart.create(680, 387, 'heart')
					game.sound.play('pale-sound')
					self.setState({ ipa: false, stout: false, pale: true, sour: false, detail: false, water: false })
			}

			function stoutDestroyCall() {
					heart.create(680, 387, 'heart')
					game.sound.play('stout-sound')
					self.setState({ ipa: false, stout: true, pale: false, sour: false, detail: false, water: false  })
			}

			function gotHeart(char, heart) {
				heart.kill()
				game.sound.play('heart-sound')
				self.setState({ detail: true })
			}

			function drinkBeer(char, ipa) {
			    ipa.kill()
			    beerSound.play()
			    count++
			    beerCount.setText(`BEER COUNT: ${count}` )
			    if (beers.total === 0) {
			        restart()
			    }
			}

			function drinkWater(char, water) {
				water.kill()
				waterSound.play()
				count -= 10
				beerCount.setText(`BEER COUNT: ${count}` )
			}

			function blobComeBack(char) {
			    char.reset(1248, blob.y)
			    char.body.velocity.x = -speed
			}

			function run (direction) {
			    if (direction === Phaser.LEFT || direction === Phaser.UP) {
			        speed = -speed
			    }
			    if (direction === Phaser.LEFT || direction === Phaser.RIGHT) {
			        blob.body.velocity.x = speed
			    } else {
			        blob.body.velocity.y = speed
			    }
			    current = direction
			}

			function turn () {
			    let cx = Math.floor(blob.x);
			    let cy = Math.floor(blob.y);

			    if (!Phaser.Math.fuzzyEqual(cx, turnPoint.x, threshold) || !Phaser.Math.fuzzyEqual(cy, turnPoint.y, threshold))
			    {
			        return false;
			    }

			    //  Grid align before turning
			    blob.x = turnPoint.x
			    blob.y = turnPoint.y

			    blob.body.reset(turnPoint.x, turnPoint.y);

			    run(turning);

			    turning = Phaser.NONE;

			    return true;

			}

			function checkDirection(turnTo) {

			    if (turning === turnTo || directions[turnTo] === null || directions[turnTo].index !== Beerman.index) { return }
			    if (current === opposites[turnTo]) { run(turnTo) }
			    else {
			        turning = turnTo
			        turnPoint.x = (marker.x * 32) + (32 / 2);
			        turnPoint.y = (marker.y * 32) + (32 / 2);
			    }
			}

			function checkKeys() {
			    if (cursors.left.isDown && current !== Phaser.LEFT) { checkDirection(Phaser.LEFT) }
			    else if (cursors.right.isDown && current !== Phaser.RIGHT) { checkDirection(Phaser.RIGHT) }
			    else if (cursors.up.isDown && current !== Phaser.UP) { checkDirection(Phaser.UP) }
			    else if (cursors.down.isDown && current !== Phaser.DOWN) { checkDirection(Phaser.DOWN) }
			    else
			    {
			        //  This forces them to hold the key down to turn the corner
			        turning = Phaser.NONE;
			    }
			}

			function randomBlank() {
				return blankTiles.splice(Math.floor(Math.random() * blankTiles.length), 1)[0]
			}

			function restart() {
				self.setState({ ipa: false, stout: false, pale: false, sour: false, detail: false, water: false  })
				blob.reset(320, 32)
				restartSign.destroy()
				count = 0
				beers.callAll('revive')
				ipa.callAll('revive')
				pale.callAll('revive')
				stout.callAll('revive')
				sour.callAll('revive')
				waterGod.callAll('revive')
				introMusic.fadeIn(3000)
				run(Phaser.RIGHT)
			}

			return game
		}
gameConstructor()
	}

	render() {
		let targetStyle = ""
		if (this.state.ipa) targetStyle = "American-Style India Pale Ale"
		else if (this.state.stout) targetStyle = "American-Style Stout"
		else if (this.state.sour) targetStyle = "American-Style Sour Ale"
		else if (this.state.pale) targetStyle = "American-Style Pale Ale"

		let targetBeer = ""
		let targetArr = []
		if (this.props.beers.length){
			targetArr = this.props.beers.filter(beer => {
				if (beer.style) return beer.style.name === targetStyle && beer.rankTop !== null
			})
			targetBeer = targetArr[Math.floor(Math.random() * targetArr.length)]
		}
		return (
			<div >
				<div id="game" >
				</div>
				{
					targetBeer &&
					<div className="content">
						{
							!this.state.water &&
							<div>
								<div id="style">
									<h3 id="title">STYLE -> <span>{targetBeer.style.shortName}</span></h3>
									<p className="description" >{targetBeer.style.description}</p>
								</div>
								<div id="beer">
									<h3 id="title" >DRINK -> <span>{targetBeer.name}</span></h3>
									<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{targetBeer.brewery.name} / ABV: {targetBeer.abv}</p>
									{
										!this.state.detail ?
										<p className="description">{targetBeer.description}</p>
										: <p className="description">{targetBeer.description}</p>
									}
								</div>
							</div>

						}
					</div>
				}
				{
							this.state.water &&
							<div className="content"><h1 id="water">{'“ In wine there is wisdom, in beer there is freedom, in water there is bacteria. ”'}</h1></div>
				}
			</div>
		)
	}
}

const container = connect(mapStateToProps)(Game)
export default container

