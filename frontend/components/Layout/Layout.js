import React, { Component } from "react";
import Header from "../Header_Footer/Header";
import Footer from "../Header_Footer/Footer";
import Meta from "./Meta";
import styled, { ThemeProvider } from "styled-components";

const theme = {
  red: "#FF0000",
  black: "#393939",
  grey: "#3A3A3A",
  lightgrey: "#E1E1E1",
  offWhite: "#EDEDED",
  maxWidth: "1000px",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)"
};

const PageStyle = styled.div`
  background: #ffffff;
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

export class Page extends Component {
  render() {
    const { children } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <PageStyle>
          <Meta />
          <Header />
          <Inner>{children}</Inner>
          <Footer />
        </PageStyle>
      </ThemeProvider>
    );
  }
}

export default Page;
