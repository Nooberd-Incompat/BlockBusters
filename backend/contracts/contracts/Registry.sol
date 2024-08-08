// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Identity.sol";

contract Registry {
    struct Disease {
        string name;
        string description;
        string ipfsHash;
        address submitter;
    }

    mapping(uint256 => Disease) public diseases;
    uint256 public diseaseCount;
    Identity identityContract;

    event DiseaseRegistered(
        uint256 diseaseId,
        string name,
        string ipfsHash,
        address submitter
    );

    constructor(address _identityContractAddress) {
        identityContract = Identity(_identityContractAddress);
    }

    function registerDisease(
        string memory _name,
        string memory _description,
        string memory _ipfsHash
    ) public {
        require(identityContract.isAuthorized(msg.sender), "Not authorized");

        diseaseCount++;
        diseases[diseaseCount] = Disease(
            _name,
            _description,
            _ipfsHash,
            msg.sender
        );

        emit DiseaseRegistered(diseaseCount, _name, _ipfsHash, msg.sender);
    }

    function getDisease(
        uint256 _diseaseId
    )
        public
        view
        returns (string memory, string memory, string memory, address)
    {
        Disease memory d = diseases[_diseaseId];
        return (d.name, d.description, d.ipfsHash, d.submitter);
    }
}
