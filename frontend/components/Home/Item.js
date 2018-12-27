import React, { Component } from "react";
import PropTypes from "prop-types";
import PriceTag from "./../styles/PriceTag";
import Title from "./../styles/Title";
import ItemStyles from "./../styles/ItemStyles";
import Link from "next/link";
import FormateMoney from "../../lib/formatMoney";
export class Item extends Component {
  static propTypes = {};

  render() {
    const { item } = this.props;
    return (
      <ItemStyles>
        {item.image && <img src={item.image} alt={item.title} />}
        <Title>
          <Link
            href={{
              pathname: "/item",
              query: { id: item.id }
            }}
          >
            <a>{item.title}</a>
          </Link>
        </Title>
        <PriceTag>{FormateMoney(item.price)}</PriceTag>
        <div>{item.description}</div>
        <div className="buttonList">
          <Link
            href={{
              pathname: "/update",
              query: { id: item.id }
            }}
          >
            <a>Edit ✏️</a>
          </Link>
          <button>
            <a>Add To Cart</a>
          </button>
          <button>
            <a>Delete</a>
          </button>
        </div>
      </ItemStyles>
    );
  }
}

export default Item;
