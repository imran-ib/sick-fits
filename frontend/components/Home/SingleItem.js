import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Error from "../ErrorMessage";
import Head from "next/head";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
      largeImage
    }
  }
`;

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

export class SingleItem extends Component {
  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (loading) return <p>Loading....</p>;
          if (error)
            return (
              <p>
                OPSS... <Error error={error} />
              </p>
            );
          if (!data.item) {
            return <h1>Sorry there are no items for id : {this.props.id}</h1>;
          }
          console.log(data.item);
          return (
            <SingleItemStyles>
              <Head>
                <title>Sick Fits | {data.item.title}</title>
              </Head>
              <img src={data.item.largeImage} alt={data.title} />
              <div className="details">
                <h2>Viewing: {data.item.title}</h2>
                <p> {data.item.description}</p>
              </div>
            </SingleItemStyles>
          );
        }}
      </Query>
    );
  }
}

export default SingleItem;
