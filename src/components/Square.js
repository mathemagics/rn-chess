import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { clickSquare } from '../actions';

class Square extends Component {
  constructor(props) {
    super(props);


    this.defaultColor = this.props.color === 'black' ? '#C98F55' : '#F0D9C2';
    this.state = {
      prevHigh: [],
      highlighted: false,
    };
    switch (props.loc) {
      case '00':
      case '07':
        this.state = { ...this.state, piece: '\u2656' };
        break;
      case '01':
      case '06':
        this.state = { ...this.state, piece: '\u2658' };
        break;
      case '02':
      case '05':
        this.state = { ...this.state, piece: '\u2657' };
        break;
      case '03':
        this.state = { ...this.state, piece: '\u2655' };
        break;
      case '04':
        this.state = { ...this.state, piece: '\u2654' };
        break;
      case '10':
      case '11':
      case '12':
      case '13':
      case '14':
      case '15':
      case '16':
      case '17':
        this.state = { ...this.state, piece: '\u2659' };
        break;
      case '60':
      case '61':
      case '62':
      case '63':
      case '64':
      case '65':
      case '66':
      case '67':
        this.state = { ...this.state, piece: '\u265F' };
        break;
      case '70':
      case '77':
        this.state = { ...this.state, piece: '\u265C' };
        break;
      case '71':
      case '76':
        this.state = { ...this.state, piece: '\u265E' };
        break;
      case '72':
      case '75':
        this.state = { ...this.state, piece: '\u265D' };
        break;
      case '73':
        this.state = { ...this.state, piece: '\u265B' };
        break;
      case '74':
        this.state = { ...this.state, piece: '\u265A' };
        break;
      default:
        break;
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, prevHigh: this.props.highlighted });
    const { highlighted, loc } = nextProps;
    // console.log(highlighted, 'and', loc);
    if (highlighted.includes(loc)) {
      this.setState({ highlighted: true });
    } else if (this.state.highlighted) {
      this.setState({ highlighted: false });
    }
  }

  pressSquare() {
    const { loc, board, highlighted } = this.props;
    this.props.clickSquare(loc, board, highlighted);
  }

  render() {
  const squareStyles = {
          height: 35,
          width: 35,
          borderColor: 'black',
          borderWidth: 1,
          backgroundColor: this.state.highlighted ? 'green' : this.defaultColor,
          overflow: 'hidden'
        };
    return (
      <TouchableWithoutFeedback onPress={this.pressSquare.bind(this)}>
        <View style={squareStyles}>
          <Text style={styles.pieceStyles}>{this.state.piece}</Text>
        </View>

      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  pieceStyles: {
    textAlign: 'center',
    fontSize: 34,
    color: 'black',
    alignSelf: 'center',
    lineHeight: 38
  }
};

const mapStateToProps = ({ chess }) => {
 const { highlighted, board } = chess;
 return { highlighted, board };
};

export default connect(mapStateToProps, { clickSquare })(Square);
