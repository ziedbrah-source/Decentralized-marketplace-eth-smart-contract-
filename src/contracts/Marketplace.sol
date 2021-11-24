pragma solidity ^0.5.0;

contract Marketplace{
    string public name;
    uint public productCount = 0;
    mapping(uint => Product) public products;
    

    struct Product{
        uint id;
        string name;
        uint price;
        address payable owner;
        bool purchased;
    }
    // an event to trigger when a product is created.
    event ProductCreated(uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
        );

    event ProductPurchased(uint id,
        string name,
        uint price,
        address payable owner,
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

    function purchaseProduct(uint _id) public payable{
        //test the product id 
        require(_id>0 && _id<=productCount,'invalid product');
        //fetch the product
        Product memory product=products[_id];
        // Require that the product has not been purchased already
        require(!product.purchased);
        //test if the buyer!=the owner
        require(product.owner!=msg.sender,'Owner cannot purchase his own product');
        // test if msg.value >= product price
        require(msg.value>=product.price,'not enough funds');
        
        address payable owner=product.owner;
        // Mark as purchased
        product.purchased = true;
        product.owner=msg.sender;
        products[_id]=product;
        
        // Pay the seller by sending them Ether
        address(owner).transfer(msg.value);
        emit ProductCreated(productCount,product.name,product.price,msg.sender,true);
    }
}

