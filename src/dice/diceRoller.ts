import { DiceRoll, exportFormats } from 'rpg-dice-roller';


export function rollDice(diceRoll: string): string {
  let rollString: string;

  try {
    const roll = new DiceRoll(diceRoll);
    console.log("Roll: " + roll);
    console.log("Dice Roll: " + roll.output);
    return roll.output;
  } catch (error) {
    console.log("Dice Rolling Error: " + error);
    return '';
  }

}

