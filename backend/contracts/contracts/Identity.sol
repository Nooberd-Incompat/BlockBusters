// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Identity {
    enum Role {
        Patient,
        Researcher,
        Doctor
    }

    struct User {
        address addr;
        Role role;
        bool authorized;
    }

    mapping(address => User) public users;
    address public admin;

    event UserRegistered(address indexed user, Role role);
    event UserAuthorized(address indexed user);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerUser(address _user, Role _role) public onlyAdmin {
        users[_user] = User(_user, _role, false);
        emit UserRegistered(_user, _role);
    }

    function authorizeUser(address _user) public onlyAdmin {
        require(users[_user].addr != address(0), "User not registered");
        users[_user].authorized = true;
        emit UserAuthorized(_user);
    }

    function isAuthorized(address _user) public view returns (bool) {
        return users[_user].authorized;
    }
}
