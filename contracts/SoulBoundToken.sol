// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@kaiachain/contracts/KIP/token/KIP17/KIP17.sol";
import "@kaiachain/contracts/utils/Counters.sol";
import "@kaiachain/contracts/access/Ownable.sol";

contract SoulBoundToken is KIP17, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    uint256 internal price;

    constructor() KIP17("SoulBoundToken", "SBT") {}

    function mint(address to) public payable {
        require(
            balanceOf(to) == 0,
            "This address already has a SoulBoundToken"
        );
        require(msg.value >= price, "Insufficient funds");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256
    ) internal pure override {
        require(
            from == address(0) || to == address(0),
            "This a Soulbound token. It cannot be transferred."
        );
    }

    function setPrice(uint256 _price) public onlyOwner {
        require(_price > 0, "the price must be more than 0!");
        price = _price;
    }

    function getPrice() public view returns (uint256) {
        return price;
    }

    function withdraw() public payable onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
