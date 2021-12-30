pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC721NSStorage.sol";

contract Web2Domain is Ownable, ERC721NSStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _lastTokenId;

    constructor() ERC721("Web2Domain", "W2D") {}

    function burn(uint256 tokenId) public onlyOwner() {
        super._burn(tokenId);
    }

    function createW2D(address player, string memory tokenURI)
        public
        onlyOwner()
        returns (uint256)
    {
        _lastTokenId.increment();

        uint256 newItemId = _lastTokenId.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
