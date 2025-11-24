const inquirer = require('inquirer');

class Battle {
  constructor(player, bot) {
    this.player = player;
    this.bot = bot;
  }

  async start() {
    console.log(`Combat entre ${this.player.name} et ${this.bot.name} !`);

    while (this.player.isAlive() && this.bot.isAlive()) {
      
      const { move } = await inquirer.prompt([
        {
          type: 'list',
          name: 'move',
          message: 'Choisis ton attaque :',
          choices: this.player.moves.map(m => m.name),
        }
      ]);

      const playerMove = this.player.moves.find(m => m.name === move);
      const botMove = this.bot.chooseMove();

      this.attack(this.player, this.bot, playerMove);
      if (!this.bot.isAlive()) break;

      this.attack(this.bot, this.player, botMove);
    }

    console.log(this.player.isAlive() ? " Tu as gagné !" : "Tu as perdu !");
  }

  attack(attacker, defender, move) {
    console.log(`${attacker.name} utilise ${move.name}!`);
    if (move.pp <= 0) {
      console.log("Plus de PP pour ce move !");
      return;
    }

    move.pp--;
    const chance = Math.random() * 100;

    if (chance <= move.accuracy) {
      defender.takeDamage(move.power);
      console.log(` ${defender.name} perd ${move.power} HP (reste ${defender.hp})`);
    } else {
      console.log(" L'attaque échoue !");
    }
  }
}

module.exports = { Battle };
