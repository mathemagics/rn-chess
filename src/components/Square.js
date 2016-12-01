import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { clickSquare } from '../actions';

class Square extends Component {
  constructor(props) {
    super(props);


    this.defaultColor = this.props.color === 'black' ? '#C98F55' : '#F0D9C2';
    this.state = {
      highlighted: false,
    };
    switch (props.loc) {
      case '00':
        this.state = { ...this.state, piece: '\u2656' };
        break;
      default:
        break;
    }
  }
  componentWillReceiveProps(nextProps) {
    const { highlighted, loc } = nextProps;
    if (highlighted.includes(loc)) {
      this.setState({ highlighted: true });
    } else if (this.state.highlighted) {
      this.setState({ highlighted: false });
    }
  }

  pressSquare() {
    this.props.clickSquare(this.props.loc);
  }

  render() {
  const squareStyles = {
          height: 36,
          width: 36,
          borderColor: 'black',
          borderWidth: 1,
          backgroundColor: this.state.highlighted ? 'green' : this.defaultColor
        };
    return (
      <TouchableWithoutFeedback onPress={this.pressSquare.bind(this)}>
        <View style={squareStyles}>
          <Text>{this.state.piece}</Text>
        </View>

      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = ({ chess }) => {
 const { highlighted } = chess;
 return { highlighted };
};

export default connect(mapStateToProps, { clickSquare })(Square);
