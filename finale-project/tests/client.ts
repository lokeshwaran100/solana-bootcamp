const playerone = pg.wallet;

// Generate keypair for the new account
const playertwo = web3.Keypair.generate();
const game = web3.Keypair.generate();

async function player01(game, x, y) {
  const txHash = await pg.program.methods
    .selectPoint(x, y)
    .accounts({
      game: game.publicKey,
      player: playerone.publicKey,
    })
    .signers([])
    .rpc();
  console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);

  // Confirm transaction
  await pg.connection.confirmTransaction(txHash);

  // Fetch the created account
  const created_game_account = await pg.program.account.game.fetch(
    game.publicKey
  );

  // console.log("Player 1:", created_game_account.players[0].toString());
  // console.log("Player 2:", created_game_account.players[1].toString());
  console.log(
    `Moves => P1: ${created_game_account.playerOneMovePos.toString()}, P2: ${created_game_account.playerTwoMovePos.toString()}`
  );
  // console.log("Player 2 Moves:", created_game_account.playerTwoMovePos.toString());
  console.log("Winner:", created_game_account.winner.toString());
}

async function player02(game, x, y) {
  const txHash = await pg.program.methods
    .selectPoint(x, y)
    .accounts({
      game: game.publicKey,
      player: playertwo.publicKey,
    })
    .signers(playertwo)
    .rpc();
  console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);

  // Confirm transaction
  await pg.connection.confirmTransaction(txHash);

  // Fetch the created account
  const created_game_account = await pg.program.account.game.fetch(
    game.publicKey
  );

  // console.log("Player 1:", created_game_account.players[0].toString());
  // console.log("Player 2:", created_game_account.players[1].toString());
  console.log(
    `Moves => P1: ${created_game_account.playerOneMovePos.toString()}, P2: ${created_game_account.playerTwoMovePos.toString()}`
  );
  // console.log("Player 1 Moves:", created_game_account.playerOneMovePos.toString());
  // console.log("Player 2 Moves:", created_game_account.playerTwoMovePos.toString());
  console.log("Winner:", created_game_account.winner.toString());
}

// Send transaction
const txHash = await pg.program.methods
  .newGame(playertwo.publicKey)
  .accounts({
    game: game.publicKey,
    player1: playerone.publicKey,
    systemProgram: web3.SystemProgram.programId,
  })
  .signers([game])
  .rpc();
console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);

// Confirm transaction
await pg.connection.confirmTransaction(txHash);

// await player02(game, "3", "3");
// await player01(game, "2", "3");
// await player02(game, "2", "2");
// await player01(game, "1", "2");
// await player02(game, "1", "1");


// await player01(game, "3", "3");
// await player02(game, "2", "3");
// await player01(game, "2", "2");
// await player02(game, "1", "2");
// await player01(game, "1", "1");


// await player01(game, "3", "3");
// await player02(game, "2", "3");
// await player01(game, "2", "2");
// await player02(game, "1", "2");
// await player01(game, "1", "1");
// await player02(game, "3", "1");

// await player01(game, "3", "3");
// await player02(game, "3", "3");

// await player01(game, "3", "3");
// await player01(game, "1", "3");

await player02(game, "3", "3")
await player01(game, "2", "3")
await player02(game, "2", "2")
await player01(game, "1", "2")
await player02(game, "1", "3")
await player01(game, "3", "1")
await player02(game, "2", "1")
await player01(game, "1", "1")
await player02(game, "3", "2")
