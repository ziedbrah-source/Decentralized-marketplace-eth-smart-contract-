const Marketplace = artifacts.require("Marketplace");

require("chai")
  .use(require("chai-as-promised"))
  .should();
// to use should.be.rejected
// testing the marketplace
contract("Marketplace", ([deployer, seller, buyer]) => {
  //deployer, seller, buyer are accounts[0][1][2].. in the ganache network.
  let marketplace;
  before(async () => {
    marketplace = await Marketplace.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await marketplace.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });
    it("has a name", async () => {
      const name = await marketplace.name();
      assert.equal(name, "Zieds marketplace");
    });
  });

  describe("products", async () => {
    let result, productCount;
    before(async () => {
      result = await marketplace.createProduct(
        "iPhone X",
        web3.utils.toWei("1", "Ether"),
        { from: seller }
      );
      // the result returns the event that we emitted.
      productCount = await marketplace.productCount();
    });
    it("creates product", async () => {
      // success
      assert.equal(productCount, 1);
      const event = result.logs[0].args;
      assert.equal(
        event.id.toNumber(),
        productCount.toNumber(),
        "id is correct"
      );
      assert.equal(event.name, "iPhone X", "name is correct");
      assert.equal(event.price, "1000000000000000000", "price is correct");
      assert.equal(event.owner, seller, "owner is correct");
      assert.equal(event.purchased, false, "purchased is correct");
      // failure
      //no name
      await marketplace.createProduct("", web3.utils.toWei("1", "Ether"), {
        from: seller,
      }).should.be.rejected;
      // price = zero.
      await marketplace.createProduct("hama", 0, {
        from: seller,
      }).should.be.rejected;
    });
  });
});
