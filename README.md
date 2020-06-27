

# Flappy Pong #


## Background ##

Because Flappy Bird and Pong clones are gauche now
## Functionality & MVP ##

With this Pacifism game, users will be able to:

- Flap
- Pong
- Score

## Architecture and Technologies ##

#### This project will use ####

* Vanilla `JavaScript` for game logic
* `HTML Canvas` for game rendering
* `HTML5` and `CSS` for page placement and styling
* `Webpack` to bundle js files

#### In addition to the entry file, the application will have the following scripts ####

* `game.js`
	- will handle logic for creating and updating necessary Canvas elements
	- will keep track of boundaries and prevent objects from going out of bounds

* `game_view.js`
	- will render necessary game objects to the DOM
	- will hold key handler logic for movement
	- takes care of requesting animation frames

* `score.js`
	- will handle updating score and multipliers

* `util.js`
	- this is where utility functions will be stored, especially those dealing with vectors and inheritance

* `moving_object.js`
	- this will be the parent class for diamonds, gates and the player
	- it will store methods that handle movement, collision and rendering

* `ball.js` (inherits from `moving_object`)
	- specific collision mechanics
	- specific movement mechanics

* `paddle.js` 
	- specific collision mechanics, incrementing multiplier and disappearing
