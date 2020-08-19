import React from 'react';
import { Link } from 'gatsby';

import { rhythm, scale } from '../utils/typography';
import { StaticQuery, graphql } from 'gatsby';
import navStyles from '../components/css/nav.module.css';
import layoutStyles from '../components/css/layout.module.css';

const Nav = ({ data }) => {
  return (
    <nav className={navStyles.container}>
      <input className={navStyles.menuBtn} type="checkbox" id="menu-btn" />
      <label className={navStyles.menuIcon} htmlFor="menu-btn">
        <span className={navStyles.navicon}></span>
      </label>

      <ul className={navStyles.menu}>
        {data.site.siteMetadata.menuLinks.map(link => (
          <li key={link.link}>
            <Link to={link.link}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const Header = () => {
  return (
    <StaticQuery
      query={graphql`
        query SiteHeaderQuery {
          site {
            siteMetadata {
              title
              menuLinks {
                name
                link
              }
            }
          }
        }
      `}
      render={data => (
        <header>
          <div className={layoutStyles.headerContainer}>
            <h3 className={layoutStyles.header}>
              <Link className={layoutStyles.headerLink} to={`/`}>
                {data.site.siteMetadata.title}
              </Link>
            </h3>
            <Nav data={data} />
          </div>
        </header>
      )}
    />
  );
};

const Base = ({ children }) => {
  return (
    <div className={layoutStyles.container}>
      <Header />
      <main>{children}</main>
      <footer className={layoutStyles.footer} style={{ ...scale(-2 / 5) }}>
        Copyright © 2020 T Lee
      </footer>
    </div>
  );
};

const Container = ({ children }) => {
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(30),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      {children}
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <Base>
      <Container>{children}</Container>
    </Base>
  );
};

const IndexLayout = ({ children }) => {
  return <Base>{children}</Base>;
};

export { Layout, IndexLayout };
