import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Form from "./../styles/Form";
import formateMoney from "../../lib/formatMoney";
import Error from "../ErrorMessage";
import Router from "next/router";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItems extends Component {
  state = {
    title: "cool new item",
    description: "that is some coool stuff",
    image: "some.png",
    largeImage: "some-large.png",
    price: 12000
  };

  handdleImageUpload = async e => {
    console.log("uploadding image");
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "sickfits");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/iib-webdevs/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = res.json().then(result => {
      console.log(result);
      this.setState({
        image: result.secure_url,
        largeImage: result.eager[0].secure_url
      });
    });
  };

  handleInputChange = e => {
    //get name tyle and value from event
    const { name, type, value } = e.target;
    // check if the value is number parsefloat it
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({
      [name]: val
    });
  };
  render() {
    const { title, description, image, largeImage, price } = this.state;
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={async e => {
              e.preventDefault();
              return createItem().then(res => {
                console.log(res);
                return Router.push({
                  pathname: "/item",
                  query: { id: res.data.createItem.id }
                });
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="image">
                Image
                <input
                  id="image"
                  type="file"
                  name="image"
                  placeholder="upload a image"
                  required
                  onChange={this.handdleImageUpload}
                />
                {image && <img src={image} alt="upload preview" width="200" />}
              </label>

              <label htmlFor="title">
                Title
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={title}
                  placeholder="title"
                  required
                  onChange={this.handleInputChange}
                />
              </label>

              <label htmlFor="price">
                Price
                <input
                  id="price"
                  type="number"
                  name="price"
                  value={price}
                  placeholder="Price"
                  required
                  onChange={this.handleInputChange}
                />
              </label>

              <label htmlFor="description">
                Description
                <textarea
                  id="description"
                  type="text"
                  name="description"
                  value={description}
                  placeholder="Enter Description Description"
                  required
                  onChange={this.handleInputChange}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItems;
export { CREATE_ITEM_MUTATION };
