// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./IRuleInterface.sol";
import "./SmartNotary.sol";

//example rule: the Smart Client should be accepted
contract RuleExample is IRuleInterface {
    string public name;
    address public smartNotary;

    constructor(string memory _name) {
        name = _name;
        smartNotary = msg.sender;
    }

    function checkRule(address _smartClient) external view override returns (RuleResult memory) {
        SmartNotary sm = SmartNotary(smartNotary);
        bool isAccepted = sm.isSmartClientAccepted(_smartClient);
        RuleResult memory res = RuleResult({respected: isAccepted, reason: "test"});
        return res;
    }
}
