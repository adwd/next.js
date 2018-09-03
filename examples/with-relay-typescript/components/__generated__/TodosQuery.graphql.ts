/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type TodosQueryVariables = {};
export type TodosQueryResponse = {
    readonly todos: ReadonlyArray<{
        readonly text: string;
        readonly done: boolean;
    }>;
};
export type TodosQuery = {
    readonly response: TodosQueryResponse;
    readonly variables: TodosQueryVariables;
};



/*
query TodosQuery {
  todos {
    text
    done
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "text",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "done",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "TodosQuery",
  "id": null,
  "text": "query TodosQuery {\n  todos {\n    text\n    done\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "TodosQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "todos",
        "storageKey": null,
        "args": null,
        "concreteType": "Todo",
        "plural": true,
        "selections": [
          v0,
          v1
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "TodosQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "todos",
        "storageKey": null,
        "args": null,
        "concreteType": "Todo",
        "plural": true,
        "selections": [
          v0,
          v1,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = '9586cc0a02214b847b347dca831f7ace';
export default node;
