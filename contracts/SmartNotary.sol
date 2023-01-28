// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "./cbor/BigIntCbor.sol";
import "./SmartClient.sol";

/**
FOR SIMPLICITY NOTARY WILL STAKE the same amount of FIL for each clients
not1: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
not2: 0x1C9E05B29134233e19fbd0FE27400F5FFFc3737e
deployer: 0x921c7f9be1e157111bA023CBa7bC29e66B85A940
client owner: 0x39806bDCBd704970000Bd6DB4874D6e98cf15123
*/
contract SmartNotary {
    address payable private owner;
    address[] public smartClients;
    mapping(address => bool) public clientOwnerHasSmartClients;
    mapping(address => bool) public simpleNotaries;
    mapping(address => bool) public acceptedClients;
    mapping(address => uint256) public notariesToStakes; //map each notary to the staked amount of fil

    uint256 public totalValueStaked;
    //uint256 public stakingFee = 1000000000000000000; // 1 FIL

    event NewSmartClientCreated(
        address indexed _client,
        bytes _name,
        BigInt _fullDcAmount
    );
    event Staked(address indexed notary, address indexed smartClient, uint256 nOfNotaries);

    constructor() {
        owner = payable(msg.sender);
        simpleNotaries[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266] = true; // just for teasting
        simpleNotaries[0x1C9E05B29134233e19fbd0FE27400F5FFFc3737e] = true; // just for teasting
    }

    function getOwner() public view returns (address payable) {
        return owner;
    }

    function getSmartClients() public view returns (address[] memory) {
        return smartClients;
    }

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

    // allows notaries to present new clients to the protocol
    function createSmartClient(
        address _clientOwner,
        bytes memory _name,
        BigInt memory _fullDcAmount
    ) public payable {
        require(msg.value >= 1, "required 1 wei");
        require(simpleNotaries[address(msg.sender)], "Only Notaries");
         require(
        !clientOwnerHasSmartClients[_clientOwner],
           "Client Already Proposed"
        );

        //create client
        SmartClient smartClient = new SmartClient(
            //notaries,
            _fullDcAmount,
            _clientOwner,
            address(this),
            _name
        );
        smartClient.addNotary(payable(msg.sender));
        smartClients.push(address(smartClient));
        clientOwnerHasSmartClients[_clientOwner] = true;

        // notary stake FIl -review
        notariesToStakes[msg.sender] += msg.value;
        totalValueStaked += msg.value;
        payable(address(this)).transfer(msg.value);



        //add the client to this contract

        emit Staked(msg.sender, address(smartClient), 1);
    }

    // allows notaries to stake on clients already proposed
    function supportSmartCLient(address _smartClient) public payable {
        require(msg.value >= 1, "required 1 wei");
        require(simpleNotaries[address(msg.sender)], "Only Notaries");
        require(
            !acceptedClients[_smartClient],
            "Smart Client is already accepted"
        );
        //TODO CHECK that the notary didnt staked on this
        SmartClient smartClient = SmartClient(_smartClient);
        bool  isNotaryAlreadyStaking  = smartClient.isNotaryStakingHere(msg.sender);
        require(!isNotaryAlreadyStaking, "Notary already staked");



        smartClient.addNotary(payable(msg.sender));


        notariesToStakes[msg.sender] += msg.value;
        totalValueStaked += msg.value;
        payable(address(this)).transfer(msg.value);

        uint256 nOfNotaries = smartClient.getnotaries().length;
        
        emit Staked(msg.sender, _smartClient, nOfNotaries);
    }

    function grantFirstRoundDataCap(address _smartClient) public {
        require(msg.sender == owner, "Only owner"); //owner of this contract
        require(!acceptedClients[_smartClient], "Already granted"); //owner of this contract

        //first make the client accepted
        acceptedClients[_smartClient] = true;

        // grantDatacap
        SmartClient smartClient = SmartClient(address(_smartClient));
        BigInt memory totDcRequested = smartClient.getTotalAllowanceRequested();
        _grantDataCap(_smartClient, totDcRequested);
    }

    // grant datacap to SmartClients when they need it
    function _grantDataCap(address _smartClient, BigInt memory _dataCap)
        internal
    {
        // TODO implement
    }

    // this function grants datacap to client and pay fees to protocol and notaries
    function refillDatacap(BigInt memory _dataCap) public {
        require(acceptedClients[msg.sender], "Only Smart Client");
        _grantDataCap(msg.sender, _dataCap);
    }

    //for now just check if the smart Client is accepted
    function checkRefill() public view returns  (bool) {
        bool isRefillable = acceptedClients[msg.sender];
        //SmartClient smartClient = SmartClient(msg.sender);
        // to implement later on --> if client follow the rule, set isDatacapClaimable to true
        //smartClient.setDataCapPermission();
        return isRefillable;
    }

    function withdrawAll() public {
        string memory mess1 = "Only owner can withdraw tokens.";
        require(msg.sender == owner, mess1);

        address payable payableSender = payable(msg.sender);
        uint256 amount = address(this).balance;
        payableSender.transfer(amount);
    }
}
