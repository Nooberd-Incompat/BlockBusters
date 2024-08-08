// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Identity.sol";

contract DataSharing {
    struct AccessRequest {
        uint256 diseaseId;
        address requester;
        bool approved;
    }

    mapping(uint256 => AccessRequest) public accessRequests;
    uint256 public requestCount;
    Identity identityContract;

    event AccessRequested(
        uint256 requestId,
        uint256 diseaseId,
        address requester
    );
    event AccessApproved(uint256 requestId);

    constructor(address _identityContractAddress) {
        identityContract = Identity(_identityContractAddress);
    }

    function requestAccess(uint256 _diseaseId) public {
        require(identityContract.isAuthorized(msg.sender), "Not authorized");

        requestCount++;
        accessRequests[requestCount] = AccessRequest(
            _diseaseId,
            msg.sender,
            false
        );

        emit AccessRequested(requestCount, _diseaseId, msg.sender);
    }

    function approveAccess(uint256 _requestId) public {
        require(identityContract.isAuthorized(msg.sender), "Not authorized");

        AccessRequest storage request = accessRequests[_requestId];
        request.approved = true;

        emit AccessApproved(_requestId);
    }

    function isAccessApproved(uint256 _requestId) public view returns (bool) {
        return accessRequests[_requestId].approved;
    }
}
