// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./DataCapAPI.sol";
import "./cbor/BigIntCbor.sol";
import "./SmartNotary.sol";

contract SmartClient {
    //TODO review visibility
    bytes public name;
    address payable private smartNotary; // the SmartNotary contract who initialized this Client
    address payable[] public notaries; // list of notaries who accepted this client. can be setted only at contract initialization
    address public clientOwner; // the address of the owner of this contract
    mapping(address => bool) public notariesSet; // needed to map notaries

    BigInt private totalAllowanceRequested; // the full DC amount requested by this contract
    BigInt public dataCapThreshold; //should be 25/100
    // uint currentBalance; useless, can use balance from datacap actor/api
    uint256 private datacapFee = 1000000000000000000; // 10^18 wei 

    event RefillAsked(uint256 amount);
    event DealInitialized(uint256 amount);
    event DealDenied(bytes reason);

    constructor(
        BigInt memory _totalAllowanceRequested,
        address _clientOwner,
        address _smartNotary,
        bytes memory _name
    ) {
        clientOwner = _clientOwner;
        totalAllowanceRequested = _totalAllowanceRequested;
        smartNotary = payable(_smartNotary);
        name = _name;
    }

    function getTotalAllowanceRequested() public view returns (BigInt memory) {
        return totalAllowanceRequested;
    }

    function getnotaries() public view returns (address payable[] memory) {
        return notaries;
    }

    function isNotaryStakingHere(address addr) public view returns (bool) {
        return notariesSet[addr];
    }

    function addNotary(address payable notary) public {
        notaries.push(notary);
        notariesSet[notary] = true;
    }


    function getBalance() public returns (BigInt memory balance) {
        return _getBalance();
    }

    function _getBalance() internal returns (BigInt memory balance) {
        bytes memory addr = abi.encodePacked(address(this));
        balance = DataCapAPI.balance(addr);
        return balance;
    }

    // this function is needed to claim the datacap (invoked by the owner or notaries)
    // at the end set isDataCapClaimable to false
    function claimDataCap() public payable returns (bool) {
        require(msg.sender == clientOwner, "Only Owner");
        require(msg.value >= datacapFee, "Fee too low");

        SmartNotary sn = SmartNotary(address(smartNotary));

        //check if is claimable
        bool check = sn.checkRefill();
        require(check, "Datacap not claimable");

        sn.refillDatacap(totalAllowanceRequested);

        uint256 feeForProtocol = (msg.value * 5) / 100; // 5% of fee
        smartNotary.transfer(feeForProtocol);

        uint256 totFeeForNotaries = msg.value - feeForProtocol;
        uint256 feeForEachNotary = totFeeForNotaries / notaries.length;

        require(totFeeForNotaries >= feeForEachNotary * notaries.length);
        for (uint256 i = 0; i < notaries.length; i++) {
            notaries[i].transfer(feeForEachNotary);
        }
        return true;
    }

    function convert(bytes20 _0xAddress)
        public
        pure
        returns (bytes memory f4Address)
    {
        // Filecoin prefix for F4 address
        // bytes memory prefix = bytes("0xf1");

        // Concatenate prefix with 0x address
        // f4Address = new bytes(24);

        // assembly {
        //     mstore(add(f4Address, 4), prefix)
        //     mstore(add(f4Address, 8), _0xAddress)
        // }
        // return f4Address;
    }

    function makeDeal(BigInt memory _requestedAmount) public {
        // require(
        //     msg.sender == clientOwner,
        //     "Only the client owner can invoke this method."
        // );
        // uint256 currentBalance = abi.decode(getBalance().val, (uint256));
        // uint256 dcAmount = abi.decode(totalAllowanceRequested.val, (uint256));
        // uint256 dataCapTh = abi.decode(dataCapThreshold.val, (uint256));
        // uint256 requestedAmount = abi.decode(_requestedAmount.val, (uint256));
        // // if (currentBalance < (dcAmount * dataCapTh) / 100) {
        // //     _askRefill();
        // // }
        // if (currentBalance > requestedAmount) {
        //     //IDEA 💡 the client can hold a list of SP who is using, when making deals
        //     // maybe can put a mock value
        //     // execute deal
        //     currentBalance -= requestedAmount;
        //     emit DealInitialized(requestedAmount);
        //     //decrease dataCap
        //     DataCapAPI.burnFrom(
        //         DataCapTypes.BurnFromParams({
        //             owner: abi.encodePacked(address(this)),
        //             amount: _requestedAmount
        //         })
        //     );
        // } else {
        //     bytes memory reason = "Amount requested is too high.";
        //     emit DealDenied(reason);
        // }
    }
}
