import React from 'react';
import { Link } from 'gatsby';
import Prism from 'prismjs';

import { IndexLayout } from '../components/layout';
import SEO from '../components/seo';
import indexStyle from '../components/css/index.module.css';
import 'prismjs/themes/prism-tomorrow.css';

const CodeSnippet = () => {
  const code = `
  let us, have, fun;
  try {
    const code = '';
    while (have, fun);
  } finally {
    this;
  }
  `;
  const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');
  return (
    <div className={indexStyle.codeSnippet}>
      <pre>
        <code
          className={indexStyle.code}
          dangerouslySetInnerHTML={{ __html: html }}
        ></code>
      </pre>
    </div>
  );
};

const Index = () => (
  <IndexLayout>
    <SEO title="Home" />
    <div className={indexStyle.bannerContainer}>
      <CodeSnippet></CodeSnippet>
    </div>
    <div className={indexStyle.linkBlockContainer}>
      <Link className={indexStyle.linkBlock} to="/blogs">
        Blog
      </Link>
      <Link className={indexStyle.linkBlock} to="/mini-apps">
        Mini Apps
      </Link>
      <Link className={indexStyle.linkBlock} to="/about">
        About
      </Link>
    </div>
  </IndexLayout>
);

export default Index;
