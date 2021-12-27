import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// Name Servers mapping
abstract contract ERC721NSStorage is ERC721URIStorage {
    using Strings for uint256;

    // Optional mapping for token NSs
    mapping(uint256 => string) private _tokenNSs;

    function tokenNS(uint256 tokenId) public view virtual returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721NSStorage: NS query for nonexistent token"
        );
        string memory _tokenNS = _tokenNSs[tokenId];
        return _tokenNS;
    }
 
    function setTokenNS(uint256 tokenId, string memory _tokenNS)
        public
        virtual
    {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        _tokenNSs[tokenId] = _tokenNS;
    }

    function _burn(uint256 tokenId) internal virtual override {
        super._burn(tokenId);

        if (bytes(_tokenNSs[tokenId]).length != 0) {
            delete _tokenNSs[tokenId];
        }
    }
}