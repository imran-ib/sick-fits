import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Item from "./Item";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      description
      price
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ListItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidht};
`;

export default class Items extends Component {
  render() {
    return (
      <Center>
        <Query query={ALL_ITEMS_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error : {error.message}</p>;
            return (
              <ListItem>
                {data.items.map(item => (
                  <Item key={item.id} item={item} />
                ))}
              </ListItem>
            );
          }}
        </Query>
      </Center>
    );
  }
}