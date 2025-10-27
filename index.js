#!/usr/bin/env node
const inquirer = require('inquirer');
const axios = require('axios');
const { Player } = require('./player');
const { Battle } = require('./battle');

async function startGame() {
  console.log("Bienvenue dans le jeu Pokémon CLI !");
  
 
  const { pokemonName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'pokemonName',
      message: 'Choisis ton Pokémon :',
    }
  ]);

  
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
  const pokemonData = res.data;

  
  const player = new Player(pokemonData.name, pokemonData.moves.slice(0, 5));
  const bot = new Player('bot', pokemonData.moves.slice(5, 10));

  
  const battle = new Battle(player, bot);
  await battle.start();
}

startGame();
