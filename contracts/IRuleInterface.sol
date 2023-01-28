// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "./Structs.sol";


interface IRuleInterface {
    function checkRule(address _smartClient) external returns (RuleResult memory);
}