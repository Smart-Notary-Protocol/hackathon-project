// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import ".lib/filecoin-solidity-contracts/v0.8/DataCapAPI.sol";
import ".lib/filecoin-solidity-contracts/v0.8/cbor/BigIntCbor.sol";

//TODOS
// create a smartNotary to initialize (use verified registry there)

// Calls to DataCapAPI:
//  balance
//  decreaseAllowance
contract SmartClient {
    bytes name;
    address smartNotary; // the SmartNotary contract who initialized this Client
    address[] notaries; // list of notaries who accepted this client. can be setted only at contract initialization
    address clientOwner; // the address of the owner of this contract

    BigInt fullDcAmount; // the full DC amount requested by this contract
    BigInt dataCapThreshold; //should be 25/100
    // uint currentBalance; useless, can use balance from datacap actor/api

    event RefillAsked(uint256 amount);
    event DealInitialized(uint256 amount);
    event DealDenied(bytes reason);

    //need to map notaries
    mapping(address => bool) public notariesSet;

    constructor(
        address[] memory _notaries,
        BigInt memory _fullDcAmount,
        address _clientOwner,
        address _smartNotary,
        bytes memory _name
    ) {
        clientOwner = _clientOwner;
        notaries = _notaries;
        fullDcAmount = _fullDcAmount;
        smartNotary = _smartNotary;
        name = _name;

        for (uint256 i = 0; i < _notaries.length; i++) {
            notariesSet[_notaries[i]] = true;
        }
    }

    function _getBalance() internal returns (BigInt memory balance) {
        bytes memory addr = abi.encodePacked(address(this));
        balance = DataCapAPI.balance(addr);
        return balance;
    }

    function getBalance() public returns (BigInt memory balance) {
        return _getBalance();
    }

    function makeDeal(BigInt memory _requestedAmount) public {
        require(
            msg.sender == clientOwner,
            "Only the client owner can invoke this method."
        );

        //BigInt memory balance = getBalance();
        uint256 currentBalance = abi.decode(getBalance().val, (uint256));
        uint256 dcAmount = abi.decode(fullDcAmount.val, (uint256));
        uint256 dataCapTh = abi.decode(dataCapThreshold.val, (uint256));
        uint256 requestedAmount = abi.decode(_requestedAmount.val, (uint256));

        if (currentBalance < (dcAmount * dataCapTh) / 100) {
            _askRefill();
            // return;
        }

        if (currentBalance > requestedAmount) {
            //IDEA 💡 the client can hold a list of SP who is using, when making deals
            // maybe can put a mock value
            // execute deal
            currentBalance -= requestedAmount;
            emit DealInitialized(requestedAmount);
            //decrease dataCap
            DataCapAPI.burnFrom(
                DataCapTypes.BurnFromParams({
                    owner: abi.encodePacked(address(this)),
                    amount: _requestedAmount
                })
            );
        } else {
            bytes memory reason = "Amount requested is too high.";
            emit DealDenied(reason);
        }
    }

    function _askRefill() internal {
        uint256 currentBalance = abi.decode(getBalance().val, (uint256));
        uint256 dcAmount = abi.decode(fullDcAmount.val, (uint256));
        uint256 refillAmount = dcAmount - currentBalance;

        //TODO call the function from smart notary contract
        // smartNotary.call.value(fullDcAmount - currentBalance)("refillDC")

        emit RefillAsked(refillAmount);
    }
}
