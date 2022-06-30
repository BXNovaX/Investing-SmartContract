pragma solidity ^0.8.0;
contract investment{
    struct Users{
        uint investedAmount;
        uint profit;
        uint profitWithdrawn;
        uint timeStart;
        uint timeEnd;
        bool isStarted;
    }
    mapping(address => Users) public investors;
    function invest() public payable {
        require(msg.value >= 0, "Please Enter more than 0")
        if(investors[msg.sender].timeStart == false){
            investors[msg.sender].timeStart = block.timestamp;
            investors[msg.sender].isStarted = true;
            investors[msg.sender].timeEnd = block.timestamp + 30 days;
        }
        investors[msg.sender].investedAmount += msg.value;
        investors[msg.sender].profit += ((msg.value * 5 * 30 ) / (1000)); 
        //15 percent profit
    }
    function showcrrentProfit() public view returns (uint) {
        uint local_profit;
        if (block.timestamp <= investors[msg.sender].timeEnd) {
            if ( (((investors[msg.sender].profit + investors[msg.sender].profitWithdrawn) * (block.timestamp - investors[msg.sender].timeStart)) / (30 * (5 days))) > investors[msg.sender].profitWithdrawn ) {
            local_profit = (((investors[msg.sender].profit + investors[msg.sender].profitWithdrawn) * (block.timestamp - investors[msg.sender].timeStart)) / (30 * (5 days))) - investors[msg.sender].profitWithdrawn; 
            return local_profit;
            } else {
                return 0;
            }
        }
        if (block.timestamp > investors[msg.sender].timeEnd) {
            return investors[msg.sender].profit;
        }
    }
        function withdraw_profit() public payable returns(bool){
        uint current_profit = current_profit();
        investors[msg.sender].profitWithdrawn = investors[msg.sender].profitWithdrawn + current_profit;
        investors[msg.sender].profit = investors[msg.sender].profit - current_profit;
        payable(msg.sender).transfer(current_profit);
        return true;
    }
}