import React from 'react';
import { Link } from 'gatsby';

import { rhythm } from '../utils/typography';
import { StaticQuery, graphql } from 'gatsby';
import navStyles from '../components/css/nav.module.css';
import layoutStyles from '../components/css/layout.module.css';

const Nav = () => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
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
    render={( data ) => (
      <nav className={navStyles.container}>
        <input className={navStyles.menuBtn} type="checkbox" id="menu-btn" />
        <label className={navStyles.menuIcon} htmlFor="menu-btn">
          <span className={navStyles.navicon}></span>
        </label>

        <ul className={navStyles.menu} >
          {data.site.siteMetadata.menuLinks.map(link => (
            <li
              key={link.link}
            >
              <Link to={link.link}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )}
  />
);


const Base = ( { title, children } ) => {
  const header = (
    <h3 className={layoutStyles.header}>
      <Link
        className={layoutStyles.headerLink}
        to={`/`}
      >
        {title}
      </Link>
    </h3>
  );
  return (
    <div className={layoutStyles.container}>
      <header>
        <div className={layoutStyles.headerContainer}>
          { header }
          <Nav/>
        </div>
      </header>
      <main>{children}</main>
      <footer className={layoutStyles.footer}>
          Copyright © 2020 T Lee
      </footer>
    </div>
  );
};

const Container = ( { children } ) => {
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

const Layout = ( { title, children } ) => {
  return (
    <Base title={title}>
      <Container>
        { children }
      </Container>
    </Base>
  );
};

const IndexLayout = ({ title, children }) => {
  return (
    <Base title={title}>
      { children }
    </Base>
  );
};

export {Layout, IndexLayout};