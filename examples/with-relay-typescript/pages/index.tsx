import React from 'react';
// import withData from 'lib/with-data';
// import { graphql } from 'react-relay';
import { Todos } from '../components/Todos';
// import Link from 'next/link'

const Index = () => (
  <div>
    <Todos />
  </div>
);

export default Index;

// export default withData(Index, {
//   query: graphql`
//         query pages_indexQuery {
//             viewer {
//                 ...BlogPosts_viewer
//             }
//         }
//     `
// })