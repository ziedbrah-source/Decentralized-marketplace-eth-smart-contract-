import React, { Component } from "react";

class Main extends Component {
  render() {
    return (
      <div id="content">
        <h1>Add Product</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const name = this.productName.value;
            const price = window.web3.utils.toWei(
              this.productPrice.value.toString(),
              "Ether"
            );
            this.props.createProduct(name, price);
          }}
        >
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => {
                this.productName = input;
              }}
              className="form-control"
              placeholder="Product Name"
              required
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => {
                this.productPrice = input;
              }}
              className="form-control"
              placeholder="Product Price"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </form>
        <p>&nbsp;</p>
        <h2>Buy Product</h2>
        {this.props.products.map((product) => {
          console.log(product[0].toString());
          console.log(product[1].toString()); //Rolex
          console.log(product[2].toString()); //eth in gwei
          console.log(product[3]);
          console.log(product[4]);
          return 1;
        })}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody id="productList">
            {this.props.products.map((product) => (
              <tr>
                <th scope="row">{product[0].toString()}</th>
                <td></td>
                <td>
                  {window.web3.utils.fromWei(product[2].toString(), "Ether")}
                </td>
                <td>{product[3]}</td>
                <td>
                  {!product[4] ? (
                    <button
                      name={product[0].toString()}
                      value={product[2].toString()}
                      onClick={(event) => {
                        this.props.purchaseProduct(
                          event.target.name, // the name is the id
                          event.target.value
                        );
                      }}
                    >
                      Buy
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
