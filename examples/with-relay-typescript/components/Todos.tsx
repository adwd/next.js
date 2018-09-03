import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import { environment } from '../lib/create-relay-environment';
import { TodosQuery } from './__generated__/TodosQuery.graphql';

class TodosQueryRenderer extends QueryRenderer<TodosQuery> {}

export class Todos extends React.Component {
  render() {
    return (
      <TodosQueryRenderer
        environment={environment}
        query={graphql`
          query TodosQuery {
            todos {
              text
              done
            }
          }
        `}
        variables={{}}
        render={({error, props}) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (!props) {
            return <div>Loading</div>;
          }

          return (
            <ul>
              {props.todos.map((todo, index) => (
                <li key={index}>
                  <p>{todo.text}</p>
                  <p>{todo.done}</p>
                </li>
              ))}
            </ul>
          );
        }}
      />
    );
  }
}
