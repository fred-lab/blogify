import React from 'react';
import MainNav from './partials/Main-nav';
import HeaderNav from './partials/Header-nav';

import Article from './Article/Article';

export default function Dashboard() {
  return (
    <section className="dashboard-container">
      <MainNav />
      <section className="dashbord-main">
        <HeaderNav />
        <main>
          <Article />
        </main>
      </section>
    </section>
  );
}
