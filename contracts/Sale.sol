pragma solidity ^0.4.20;


contract Token {
  function transfer(address to, uint tokens) public returns (bool success);
  function decimals() public returns (uint);
  function balanceOf(address _addr) public returns (uint);
  
}

contract Sale {
  
  Token public token;
  uint public decimals;
  uint public rate;
  uint public participants;
  address public owner = address(0x411a57cfa9f2c43dd6e983544753592a03e684d2b8);

  constructor(address _token) public {
    token = Token(_token);
    decimals = token.decimals();
    rate = 100000;
  }

  mapping(address => bool) public participated;
  
  function sale() payable public returns(bool) {
    require(!participated[msg.sender], "Sender has already participated.");
    if(msg.value == 0 * 1 trx) {
      
      token.transfer(msg.sender, 100 * (10 ** decimals));
      
    } else if(msg.value == 100 * 1 trx) {
        
        uint tokens = msg.value * rate;
        token.transfer(msg.sender, tokens);
        
    } else {
      revert();
    }
    
    participants++;
    participated[msg.sender] = true;

  }

  function withdrawTRX() public {
    require(msg.sender == owner);
    owner.transfer(address(this).balance);
  }

  function withdrawTokens() public {
    require(msg.sender == owner);
    uint balance = token.balanceOf(address(this));
    token.transfer(msg.sender, balance);
  }
    
    
}
  
  