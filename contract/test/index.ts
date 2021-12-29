import { expect } from "chai";
import { ethers } from "hardhat";

describe("Web2Domains", function () {
  it("Should return the new NSs once it's changed", async function () {
    const [owner, badBoi] = await ethers.getSigners();
    const Web2Domains = await ethers.getContractFactory("Web2Domain");
    const w2d = await Web2Domains.deploy();
    await w2d.deployed();

    expect(
      w2d
        .connect(badBoi)
        .createW2D(
          owner.address,
          "https://hardhat.org/guides/vscode-tests.html"
        )
    ).to.be.revertedWith("Ownable: caller is not the owner");

    const domainTx = await w2d
      .connect(owner)
      .createW2D(owner.address, "https://hardhat.org/guides/vscode-tests.html");

    await domainTx.wait();

    await (await w2d.setTokenNS(1, "ns1.testdns.com,ns2.testdns.com")).wait();
    expect(await w2d.tokenNS(1)).to.equal("ns1.testdns.com,ns2.testdns.com");

    await w2d.connect(owner).burn(1);
    expect(w2d.tokenNS(1)).revertedWith("ERC721NSStorage: NS query for nonexistent token");

  });
});
