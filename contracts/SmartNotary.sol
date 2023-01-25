// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import ".lib/filecoin-solidity-contracts/v0.8//cbor/BigIntCbor.sol";
import ".lib/filecoin-solidity-contracts/v0.8/SmartClient.sol";


/**
FOR SIMPLICITY NOTARY WILL STAKE the same amount of FIL for each clients
*/
contract SmartNotary {
    address[] public smartClients;
    mapping(address => bool) public simpleNotaries;
    mapping(address => bool) public acceptedClients;
    mapping(address => uint256) public clientsToProposalNumber; // maps number of proposal for each clients
    mapping(address => uint256) public clientsToStake; // maps each client to its total value staked
    mapping(address => address[]) public clientsToNotaries; // maps each client to the notaries staking on it
    uint256 public totalValueStaked;

    event NewSmartClientCreated(
        address indexed _client,
        bytes _name,
        BigInt _fullDcAmount
    );
    event Staked(address indexed notary, uint256 amount);

    // Adds a simple notary to this contract.
    // Simple notaries are people/organization who take responsibility over presented clients
    function addSimpleNotary() public {
        require(
            !simpleNotaries[address(msg.sender)],
            "Notary is already registered"
        );
        // idea 💡 here can be added some logic to accept or not the notary
        simpleNotaries[address(msg.sender)] = true;
    }

    // let simple notaries present new clients
    function presentCreateNewClient(
        address _client,
        bytes memory _name,
        BigInt memory _fullDcAmount
    ) public {
        require(
            !acceptedClients[_client],
            "Smart Client is already registered"
        );
        require(
            simpleNotaries[address(msg.sender)],
            "Clients can be presented only by Notaries"
        );

        if (clientsToProposalNumber[_client] == 0) {
            _proposeClient(_client, msg.sender); // add client to clientsToProposalNumber and stake
        } else {
            _acceptClient(_client, _name, _fullDcAmount, msg.sender); // remove client from clientsToProposalNumber, add it to acceptedClients, stake and create SmartClient
        }
    }

    function _proposeClient(address _client, address _notary) private {
        clientsToProposalNumber[_client] = 1;
        clientsToNotaries[_client][0];
        _stake(_client);
    }

    function _acceptClient(
        address _client,
        bytes memory _name,
        BigInt memory _fullDcAmount,
        address _notary
    ) private {
        clientsToProposalNumber[_client] = 0;
        acceptedClients[_client] = true;
        clientsToNotaries[_client][1];
        _stake(_client);
        _createSmartClient(_client, _name, _fullDcAmount);
    }

    function _createSmartClient(
        address _clientOwner,
        bytes memory _name,
        BigInt memory _fullDcAmount
    ) private {
        // create client
        address[] memory notaries = clientsToNotaries[_clientOwner];
        SmartClient smartClient = new SmartClient(
            notaries,
            _fullDcAmount,
            _clientOwner,
            address(this),
            _name
        );
        // grant datacap
        emit NewSmartClientCreated(_clientOwner, _name, _fullDcAmount);
    }

    // stake FIL on the client to reach 100 FIL -- Just for the Hackathon
    function _stake(address _client) public payable {
        require(msg.value > 0, "Stake amount is 0");
        clientsToStake[_client] += msg.value;
        totalValueStaked += msg.value;
        emit Staked(msg.sender, msg.value);
    }

    

    // grant datacap to SmartClients when they need it - can be called only from smart clients
    function grantDataCap(address _client, uint256 _dataCap) public {
        // require smart client is the caller
        // TODO - checks rules and if conditions are met, grant datacap
    }
}
