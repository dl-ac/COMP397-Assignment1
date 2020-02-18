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

Final Fantasy VII Slot Machine has five reels and ten pay lines. The user inserts money (in this case, using the virtual
money on the screen, as there is no place to add real money) into the machine and receives credits to play (\$0.01 is
equal one credit).

## Game Play Mechanics

First, the user selects how much it will bet on the game and how many pay lines to play. The final bet value will be the
bet value times the pay lines selected.

Then, the player can press the spin button to start the game. Next, the game will check if he has enough credits and
then will start spinning. The user can press the spin button again to stop each reel or wait for it finishes. The game
will start the stop process of the first reel after 3 seconds, and then 1 second for each other. However, it
calculates the results before the beginning spin and credits the winnings after the last reel stop spinning.
Additionally, the game adds a percentage of the bet to jackpot value. If a Jackpot happens, the game will credit the
jackpot value into the user's credits and returns it to its initial value.

## Controls

Buttons control this game on the screen; there is no keyboard interaction.

The following buttons are available:

- Money credits - Add the value to the player's credits
  - CAD\$ 2
  - CAD\$ 5
  - CAD\$ 20
  - CAD\$ 100
- Bet One: switch between these bet values 1, 2, 3, 5, 10, 15, 20, 25, 30, 50, 75, and 100. It verifies the player's
  credits before switching.
- Bet Max: the maximum bet value that the user has credits to spend. It can reduce the number of pay lines to find the
  value, but will not increase automatically.
- Pay Lines: switch between these bet values 1, 3, 5, 7, 9, 10. It verifies the player's credits before switching.
- Spin: if the user's credits value is greater than the bet value, it will start spinning the reels.
- Reset: return all the values to their initial value, but not the reels images.
- Quit: close the game

## Interface Sketch

![Interface Sketch](/Assets/images/gameSketch.jpeg)

## Screen Description

- Start Screen

![Start Screen](/Assets/images/startScreenSample.png)

- Play Screen

![Start Screen](/Assets/images/playScreenSample.png)

- End Game Screen

![Start Screen](/Assets/images/endScreenSample.png)

## Scoring

The game will score the player based on the bet value and a multiplier. The multiplier will be based on the following
table:

| Slot      | 2x  | 3x  | 4x   | 5x   |
| --------- | --- | --- | ---- | ---- |
| Red XIII  | 0   | 5   | 25   | 100  |
| Cid       | 0   | 5   | 25   | 100  |
| Vincent   | 0   | 5   | 25   | 100  |
| Yuffie    | 0   | 5   | 40   | 150  |
| Tifa      | 0   | 5   | 40   | 150  |
| Barret    | 5   | 30  | 100  | 750  |
| Aeris     | 5   | 35  | 150  | 1000 |
| Cloud     | 5   | 40  | 400  | 2000 |
| Sephiroth | 10  | 100 | 1000 | 5000 |

The jackpot will be activated only if the player bets the max value (100) on the highest multiplier (5000).

Paylines:

These are the ten pay lines available in the game. To count slots, it should match the same figure slot from left to right.
It will not count if the figure is not sequential (i.e. the equals figures on reel 2, 3, 4, 5). It will use this line order when
deciding the results.

![Pay lines](/Assets/images/payLinesImage.png)

## Art / Multimedia Index

- Reels slots:

| Sephiroth                                  | Cloud                              | Aeris                              | Barret                               | Blank                                  |
| ------------------------------------------ | ---------------------------------- | ---------------------------------- | ------------------------------------ | -------------------------------------- |
| ![Sephiroth](/Assets/images/Sephiroth.png) | ![Cloud](/Assets/images/Cloud.png) | ![Aeris](/Assets/images/Aeris.png) | ![Barret](/Assets/images/Barret.png) | ![Blank](/Assets/images/BlankReel.png) |

| Tifa                             | Yuffie                               | Vincent                                | Cid                            | Red XIII                                |
| -------------------------------- | ------------------------------------ | -------------------------------------- | ------------------------------ | --------------------------------------- |
| ![Tifa](/Assets/images/Tifa.png) | ![Yuffie](/Assets/images/Yuffie.png) | ![Vincent](/Assets/images/Vincent.png) | ![Cid](/Assets/images/Cid.png) | ![Red XIII](/Assets/images/RedXIII.png) |

- Buttons

| Bet One                                  | Bet Max                                  | Pay Lines                                    |
| ---------------------------------------- | ---------------------------------------- | -------------------------------------------- |
| ![Bet One](/Assets/images/betOneBtn.png) | ![Bet Max](/Assets/images/betMaxBtn.png) | ![Pay Lines](/Assets/images/payLinesBtn.png) |

| Spin                                | Reset                                 | Quit                                |
| ----------------------------------- | ------------------------------------- | ----------------------------------- |
| ![Spin](/Assets/images/spinBtn.png) | ![Reset](/Assets/images/resetBtn.png) | ![Quit](/Assets/images/quitBtn.png) |

- Frames

| Small frame                                   | Large frame                             |
| --------------------------------------------- | --------------------------------------- |
| ![Small Frame](/Assets/images/frameSmall.png) | ![Large](/Assets/images/frameLarge.png) |

- Backgrounds

![Reel window background](/Assets/images/background.png)

![Normal background](/Assets/images/backgroundOriginal.png)

- Fonts
  - Digital Mono
  - Stint Ultra Condensed
