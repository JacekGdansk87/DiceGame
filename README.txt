Dice Game

Points
Points are adde from each cube. Additionally we receive a bonus for:
Thre -Three same cubes            5 points
Four -Four same cubes            10 points
Full -Three and two same cubes   25 points
Small straight -Dices: 1,2,3,4,5 35 points
Big straight   -Dices: 2,3,4,5,6 40 points
General     -Five same cubes     50 points

Rules:
Game  
The Game lasts 10 turns, each player has three dice roll.
The first of them are always with 5 dice's. And next we roll only bad dice.
Each round we have 3 turns.

After 10 round we have end Game. 
The winner is the player who has the most points.

Combinations checking mechanism :
3 2 3 3 2

3 compare 2,3,3,2 = 2
2 compare 3,3,2 = 1
3 compare 3,2 = 1
3 compare 2 = 0 //3 -three, 4-full

3 2 3 3 3

3 compare 2,3,3,3 = 3
2 compare 3,3,3 = 0
3 compare 3,3 = 2
3 compare 3 = 6-four 

3,3,3,3,3
3 compare 3,3,3,3 = 4
3 compare 3,3,3 = 3
3 compare 3,3 = 2
3 compare 3 = 10-general 

1 2 3 4 5
0 0 0 0 0  
Condition of straight:
0 other Combinations 
we need one value 1 or 6
all dice are not null
//

Bot mechanism:
Bot is searching for two same dice. 
If he find then he remember first type and taking all same dice's.
If he find next two same dices then he remember second type and he also taking all same dice's.
//

