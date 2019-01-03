import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import Form from "./../styles/Form";
import formateMoney from "../../lib/formatMoney";
import Error from "../ErrorMessage";
import Router from "next/router";

const SINGL_ITEM_QUERY = gql`
  query SINGL_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

class UpdateItems extends Component {
  state = {};

  handleInputChange = e => {
    //get name tyle and value from event
    const { name, type, value } = e.target;
    // check if the value is number parsefloat it
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({
      [name]: val
    });
  };
  updateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state
      }
    });
  };
  render() {
    return (
      <Query query={SINGL_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading....</p>;
          if (!data.item) return <p>No Item with the id {this.props.id}</p>;
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(updateItem, { loading, error }) => (
                <Form onSubmit={e => this.updateItem(e, updateItem)}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Title
                      <input
                        id="title"
                        type="text"
                        name="title"
                        defaultValue={data.item.title}
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
                        defaultValue={data.item.price}
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
                        defaultValue={data.item.description}
                        placeholder="Enter Description Description"
                        required
                        onChange={this.handleInputChange}
                      />
                    </label>
                    <button type="submit">
                      Sav{loading ? "ing" : "e"} Changes
                    </button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateItems;
export { UPDATE_ITEM_MUTATION };
