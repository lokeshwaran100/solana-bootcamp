import * as anchor from '@project-serum/anchor';
const playerone = pg.wallet;

//const playerone = web3.Keypair.generate();
// Generate keypair for the new account
const playertwo = web3.Keypair.generate();
const game = web3.Keypair.generate();


// let airdropSignature = await pg.connection.requestAirdrop(
//   playerone.publicKey,
//   web3.LAMPORTS_PER_SOL,
// );
// await pg.connection.confirmTransaction( airdropSignature);

// sleep(1000);

// airdropSignature = await pg.connection.requestAirdrop(
//   playertwo.publicKey,
//   web3.LAMPORTS_PER_SOL,
// );
// await pg.connection.confirmTransaction(airdropSignature);

// const balance = await pg.connection.getBalance(playerone.publicKey);
// console.log(`My balance: ${balance / web3.LAMPORTS_PER_SOL} SOL`);
// const balance = await pg.connection.getBalance(playertwo.publicKey);
// console.log(`My balance: ${balance / web3.LAMPORTS_PER_SOL} SOL`);


async function player01(game, x, y) {
  
  const txHash = await pg.program.methods
    .selectPoint(x,y)
    .accounts({
      game: game.publicKey,
      player: playerone.publicKey,
    })
    .signers([]])
    .rpc();
  console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);

  // Confirm transaction
  await pg.connection.confirmTransaction(txHash);

  // Fetch the created account
  const created_game_account = await pg.program.account.game.fetch(
    game.publicKey
  );

  console.log("On-chain data is:", created_game_account.players[0].toString());
  console.log("On-chain data is:", created_game_account.players[1].toString());
  console.log("On-chain data is:", created_game_account.playerOneMovePos.toString());
  console.log("On-chain data is:", created_game_account.playerTwoMovePos.toString());
  console.log("On-chain data is:", created_game_account.winner.toString());
}

async function player02(game, x, y) {
  
  const txHash = await pg.program.methods
    .selectPoint(x,y)
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

  console.log("On-chain data is:", created_game_account.players[0].toString());
  console.log("On-chain data is:", created_game_account.players[1].toString());
  console.log("On-chain data is:", created_game_account.playerOneMovePos.toString());
  console.log("On-chain data is:", created_game_account.playerTwoMovePos.toString());
  console.log("On-chain data is:", created_game_account.winner.toString());
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

// Fetch the created account
// const created_game_account = await pg.program.account.game.fetch(
//   game.publicKey
// );

// console.log("On-chain data is:", created_game_account.players[0].toString());
// console.log("On-chain data is:", created_game_account.players[1].toString());
// console.log("On-chain data is:", created_game_account.playerOneMovePos.toString());
// console.log("On-chain data is:", created_game_account.playerTwoMovePos.toString());
// console.log("On-chain data is:", created_game_account.winner.toString());

// const txHash = await pg.program.methods
//   .selectPoint("1", "3")
//   .accounts({
//     game: game.publicKey,
//     player: playerone.publicKey,
//   })
//   .signers([])
//   .rpc();
// console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);

// // Confirm transaction
// await pg.connection.confirmTransaction(txHash);

// const txHash = await pg.program.methods
//   .selectPoint("1", "2")
//   .accounts({
//     game: game.publicKey,
//     player: playertwo.publicKey,
//   })
//   .signers([playertwo])
//   .rpc();
// console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);

// // Confirm transaction
// await pg.connection.confirmTransaction(txHash);

// // Fetch the created account
// const created_game_account = await pg.program.account.game.fetch(
//   game.publicKey
// );

// console.log("On-chain data is:", created_game_account.players[0].toString());
// console.log("On-chain data is:", created_game_account.players[1].toString());
// console.log("On-chain data is:", created_game_account.playerOneMovePos.toString());
// console.log("On-chain data is:", created_game_account.playerTwoMovePos.toString());
// console.log("On-chain data is:", created_game_account.winner.toString());

await player02(game, "1", "1")
await player01(game, "2", "3")
await player02(game, "2", "2")
await player01(game, "2", "1")
await player02(game, "3", "2")
await player01(game, "3", "1")