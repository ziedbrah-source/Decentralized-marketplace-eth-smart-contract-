pragma solidity ^0.5.0;

contract Marketplace{
    string public name;
    uint public productCount = 0;
    mapping(uint => Product) products;
    

    struct Product{
        uint id;
        string name;
        uint price;
        address owner;
        bool purchased;
    }
    // an event to trigger when a product is created.
    event ProductCreated(uint id,
        string name,
        uint price,
        address owner,
        bool purchased
        );

    constructor() public{
        name="Zieds marketplace";
    }

    function createProduct(string memory _name,uint _price)public{ // memory just tells solidity to make an exact space to the variable at runtime.
        require(bytes(_name).length>0,'The name must be not empty');
        require(_price>0,'The price needs to be greater than 0');
        productCount++;
        products[productCount]=Product(productCount,_name,_price,msg.sender,false);
        emit ProductCreated(productCount,_name,_price,msg.sender,false);

    }
}

