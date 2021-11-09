const anchor = require("@project-serum/anchor");
const assert = require("assert");
const { SystemProgram } = anchor.web3;

describe("mysolanaapp", () => {
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Mysolanaapp;

  it("It initializes the account!", async () => {
    const baseAccount = anchor.web3.Keypair.generate();
    await program.rpc.initialize("Hello World", {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    assert.ok(account.data === "Hello World");
    _baseAccount = baseAccount;
  });

  it("It updates the created account!", async () => {
    const baseAccount = _baseAccount;
    await program.rpc.update("updated msg", {
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log(`account.data: ${account.data}`);
    console.log(`account.dataList: ${account.dataList}`);
    assert.ok(account.data === "updated msg");
    assert.ok(account.dataList.length === 2);
  });
});
