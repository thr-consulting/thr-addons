// @flow

import {Component} from 'react';

type Props = {
	load: (mod: any) => {},
	children: any,
};

type State = {
	mod: any,
};

export default class Bundle extends Component<Props, State> {
	componentWillMount() {
		this.load(this.props);
	}

	componentWillReceiveProps(nextProps: Props) {
		if (nextProps.load !== this.props.load) {
			this.load(nextProps);
		}
	}


	load(props: Props) {
		this.setState({
			mod: null,
		});
		props.load(mod => {
			this.setState({
				// handle both es imports and cjs
				mod: mod.default ? mod.default : mod,
			});
		});
	}

	render() {
		return this.props.children(this.state.mod);
	}
}
