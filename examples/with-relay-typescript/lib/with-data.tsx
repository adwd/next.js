import React from 'react'
import { NextContext, NextStatelessComponent } from 'next';
import { fetchQuery, GraphQLTaggedNode } from 'react-relay';
import { Environment, RecordMap } from 'relay-runtime';

import { initEnvironment } from './create-relay-environment';
import { RelayProvider } from './relay-provider';

export default (ComposedComponent: NextStatelessComponent, options: { query?: GraphQLTaggedNode } = {}) => {
  return class WithData<Props extends { queryRecords: RecordMap }> extends React.Component<Props> {
    static displayName = `WithData(${ComposedComponent.displayName})`

    static async getInitialProps (ctx: NextContext) {
      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {}
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx)
      }

      let queryProps = {}
      let queryRecords = {}
      const environment = initEnvironment()

      if (options.query) {
        // Provide the `url` prop data in case a graphql query uses it
        // const url = { query: ctx.query, pathname: ctx.pathname }
        const variables = {}
        // TODO: Consider RelayQueryResponseCache
        // https://github.com/facebook/relay/issues/1687#issuecomment-302931855
        queryProps = await fetchQuery(environment, options.query, variables)
        queryRecords = environment.getStore().getSource().toJSON()
      }

      return {
        ...composedInitialProps,
        ...queryProps,
        queryRecords
      }
    }

    environment: Environment;

    constructor (props: Props) {
      super(props)
      this.environment = initEnvironment({
        records: props.queryRecords
      })
    }

    render () {
      return (
        <RelayProvider environment={this.environment} variables={{}}>
          <ComposedComponent {...this.props} />
        </RelayProvider>
      )
    }
  }
}
