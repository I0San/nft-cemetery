//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTCemetery {
    address public constant BURN_ADDRESS = address(1);

    struct Grave {
        address nftOwner;
        address nftContract;
        uint256 nftId;
        string inscription; // Inscription on a gravestone
        uint256 burried;    // Block number when burned
    }

    Grave[] public graveyard;

    event nftBurried(address indexed _nftOwner, address indexed _nftAddress, uint256 _nftId, string _inscription, uint _burried);

    function burryMyNFT(address nftAddress, uint256 tokenId, string memory inscription ) public {
        require(bytes(inscription).length <=50, "Inscription is limited to 50 characters.");
        
        IERC721(nftAddress).safeTransferFrom(msg.sender, BURN_ADDRESS, tokenId);

        Grave memory newGrave = Grave({
            nftOwner: msg.sender,
            nftContract: nftAddress,
            nftId: tokenId,
            inscription: inscription,
            burried: block.number
        });
        
        graveyard.push(newGrave);

        emit nftBurried(msg.sender, nftAddress, tokenId, inscription, block.number);
    }

    function getGraveyard(uint page, uint pageSize) public view returns (Grave[] memory, uint) {
        require(page > 0, "page number should be greater than 0");
        require(pageSize > 0, "pageSize should be greater than 0");

        uint total = graveyard.length;
        uint start = (page - 1) * pageSize;
        uint end = start + pageSize > total ? total : start + pageSize;

        Grave[] memory result = new Grave[](end - start);

        for (uint i = start; i < end; i++) {
            result[i - start] = graveyard[i];
        }

        return (result, total);
    }
}
