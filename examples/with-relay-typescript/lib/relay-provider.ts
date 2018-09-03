import React from 'react';
import PropTypes from 'prop-types'
import { Environment } from 'relay-runtime';

// Thank you https://github.com/robrichard
// https://github.com/robrichard/relay-context-provider

interface Props {
  environment: Environment;
  variables: {}
}

export class RelayProvider extends React.Component<Props> {
  static childContextTypes = {
    relay: PropTypes.object.isRequired
  }

  static propTypes = {
    environment: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
    children: PropTypes.node
  }

  getChildContext () {
    return {
      relay: {
        environment: this.props.environment,
        variables: this.props.variables
      }
    }
  }
  
  render () {
    return this.props.children
  }
}
