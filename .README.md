# Slot Machine - Final Fantasy VII

COMP 397 - Web Game Programming
Assignment 1
Prof. Tom Tsiliopoulus

![Enumox Logo](/Assets/images/companyLogo.png)
Enumox studios

## Version history

| Version | Date       | Name      | Description     |
| ------- | ---------- | --------- | --------------- |
| 1.0.0   | 2020-02-15 | Ailton L. | Initial version |

## Game Description

Final Fantasy VII Slot Machine has five reels and ten pay lines. The user inserts money (in this case, using the virtual money on the screen, as there is no place to add real money) into the machine and receives credits to play (\$0.01 is equal one credit).

## Game Play Mechanics

First, the user selects how much it will bet on the game and how many pay lines to play. The final bet value will be the bet value times the pay lines selected.

Then, the player can press the spin button to start the game. Next, the game will check if he has enough credits and then will start spinning. The user can press the spin button again to stop each reel or wait for it finishes. The game will start the stop process of the first reel after 3 seconds, and then 1 second for each other. However, it calculates the results before the beginning spin and credits the winnings after the last reel stop spinning. Additionally, the game adds a percentage of the bet to jackpot value. If a Jackpot happens, the game will credit the jackpot value into the user's credits and returns it to its initial value.

## Controls

Buttons control this game on the screen; there is no keyboard interaction.

The following buttons are available:

- Money credits - Add the value to the player's credits
  -- CAD$ 2
-- CAD$ 5
  -- CAD$ 20
-- CAD$ 100
- Bet One: switch between these bet values 1, 2, 3, 5, 10, 15, 20, 25, 30, 50, 75, and 100. It verifies the player's credits before switching.
- Bet Max: the maximum bet value that the user has credits to spend. It can reduce the number of pay lines to find the value, but will not increase automatically.
- Pay Lines: switch between these bet values 1, 3, 5, 7, 9, 10. It verifies the player's credits before switching.
- Spin: if the user's credits value is greater than the bet value, it will start spinning the reels.
- Reset: return all the values to their initial value, but not the reels images.
- Quit: close the game

## Interface Sketch

![Interface Sketch](/Assets/images/sketch.png)

## Screen Description

- Start Screen
  ![Start Screen](/Assets/images/startScreen.png)

- Play Screen
  ![Start Screen](/Assets/images/playScreen.png)

- End Game Screen
  ![Start Screen](/Assets/images/endScreen.png)

## Scoring

## Art / Multimedia Index

- Reels slots:

Sephiroth ![Sephiroth](/Assets/images/Sephiroth.png) | Cloud ![Cloud](/Assets/images/Cloud.png)
