// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./interfaces/IRuleInterface.sol";
import "./Structs.sol";
import "./RuleExample.sol";

contract RuleModule {
 

    mapping(uint256 => Rule) public rules;
    uint256 ruleCount;
    address public smartNotary;

    constructor(){
        smartNotary = msg.sender;
        // create and add example rule
        RuleExample re = new RuleExample("example rule");
        addRule("example rule",address(re));
    }

    function addRule(string memory name, address ref) public {
        require(msg.sender == smartNotary, "Only Smart Notary");
        rules[ruleCount + 1] = Rule(name, ref);
        ruleCount += 1;
    }
    
    function _checkRule(IRuleInterface rule, address _smartClient)
        private
        returns (RuleResult memory)
    {
        return rule.checkRule(_smartClient);
    }

    function checkAllRules(address _smartClient) public returns (RuleResult memory results){
        for (uint256 i = 0; i < ruleCount; i++) {
            IRuleInterface rule = IRuleInterface(rules[i].ref);
            RuleResult memory result = _checkRule(rule,_smartClient);
            if (!result.respected){
                return result;
            }
        }
        RuleResult memory okResult = RuleResult({respected:true,reason:"all good"});
        return okResult;
    }
}
