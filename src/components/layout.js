import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"


const Base = ( { header, main } ) => {
  return (
    <div
      style={{
        backgroundColor: 'rgb(166, 169, 211)',
        height: '100%'
      }}
    >
      <header>{ header }</header>
      <main>{ main }</main>
      <footer>

      </footer>
    </div>
  );
}

const Container = ( { children } ) => {
  return (
    <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          fontFamily: `share-tech-mono, mono`,
        }}
      >
      {children}
    </div>
  );
}

const Layout = ( { title, children } ) => {
  const header = (
    <h3
      style={{
        fontFamily: `share-tech-mono, mono`,
        marginTop: 0,
      }}
    >
      <Link
        style={{
          boxShadow: `none`,
          textDecoration: `none`,
          color: `inherit`,
        }}
        to={`/`}
      >
        {title}
      </Link>
    </h3>
  );
  const container = <Container>{children}</Container>
  return (
    <Base header={header} main={container} />
  );
}

const LayoutIndex = ({ title, children }) => {
  const header = (
    <h1
      style={{
        ...scale(1.5),
        marginBottom: rhythm(1.5),
        marginTop: 0,
        fontFamily: `share-tech-mono, mono`,
      }}
    >
      <Link
        style={{
          boxShadow: `none`,
          textDecoration: `none`,
          color: `inherit`,
        }}
        to={`/`}
      >
        {title}
      </Link>
    </h1>
  );

  return (
    <Base header={header} main={children} />
  );
};

export {Layout, LayoutIndex}