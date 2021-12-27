pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC721NSStorage.sol";

contract Web2Domain is Ownable, ERC721NSStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _lastTokenId; 

    constructor() ERC721("Web2Domain", "W2D") {}

    function awardItem(address player, string memory tokenURI)
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
