class Player {
  constructor(name, moves) {
    this.name = name;
    this.hp = 300;
    this.moves = moves.map(m => ({
      name: m.move.name,
      pp: Math.floor(Math.random() * 10) + 5,
      power: Math.floor(Math.random() * 50) + 20,
      accuracy: Math.floor(Math.random() * 100),
    }));
  }

  chooseMove() {
    return this.moves[Math.floor(Math.random() * this.moves.length)];
  }

  takeDamage(amount) {
    this.hp -= amount;
    if (this.hp < 0) this.hp = 0;
  }

  isAlive() {
    return this.hp > 0;
  }
}

module.exports = { Player };
