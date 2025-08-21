![code coverage badge](https://github.com/macrespo42/red-tetris/actions/workflows/ci_client.yml/badge.svg)  
![code coverage badge](https://github.com/macrespo42/red-tetris/actions/workflows/ci_server.yml/badge.svg)

# Red Tetris

An online battle royal tetris game

## Presentation

Ready to play? Click [here](http://redtetris.duckdns.org:5173/)

Red Tetris is a fast-paced multiplayer game where the goal is to be the last player standing. You can create or join a room to challenge your friends in a battle of wits and speed.

![homepage](./screenshot/homepage.png)

Then wait for your friends to join

![lobby](./screenshot/loby.png)

And enjoy!

![game](./screenshot/game.png)

During the game, you'll see a mini-map of your opponents' fields on the right side of the screen. Just next to your own field, a list of available commands is displayed to help you control your game.

## Rules

The last player alive wins!
Each time you clear a line, you send (number of lines cleared - 2) garbage lines to your opponents. These garbage lines appear at the bottom of their field, complicating their game and pushing them closer to defeat.

In solo mode, the objective is simply to score the maximum number of points.

## Gamemodes

We have several unique gamemodes availables:

- Broken Piece: You have a chance to receive a "broken piece," which cannot be used to clear any lines
- Sudden Death: The first player to clear a line wins the game
- Domination: All penalties are doubled, making for an intense, high-stakes match
- Quick: The game speed is significantly increased, putting your reflexes to the ultimate test
