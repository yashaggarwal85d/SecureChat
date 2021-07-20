import React, { Component } from 'react';
import { Text, View, Button } from 'native-base';
import * as Progress from 'react-native-progress';
import { PullMessagesFromBlockchain } from '../store/reducers/Socket';
import { connect } from 'react-redux';
import { LightTheme, DarkTheme } from '../appStyles';

class PullMsg extends Component {
  constructor(props) {
    super(props);
  }

  PullMsgResponse(status) {
    PullMessagesFromBlockchain(
      this.props.rooms[this.props.roomInd].id,
      this.props.user.token,
      status
    );
  }

  render() {
    var Theme = LightTheme;
    if (this.props.user.mode == 'dark') {
      Theme = DarkTheme;
    }

    if (this.props.rooms[this.props.roomInd].PullMessage.active) {
      var memCount = this.props.rooms[this.props.roomInd].members.length;
      var approvedMemCount =
        this.props.rooms[this.props.roomInd].PullMessage.membersApproved.length;
      var DuoButton = <></>;
      if (
        this.props.rooms[
          this.props.roomInd
        ].PullMessage.membersApproved.indexOf(this.props.user.id) === -1
      ) {
        DuoButton = (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Button
              success
              rounded
              style={{ marginRight: 10 }}
              onPress={() => this.PullMsgResponse(true)}
            >
              <Text style={{ fontFamily: 'Touche_Medium', fontSize: 12 }}>
                Yes
              </Text>
            </Button>
            <Button danger rounded onPress={() => this.PullMsgResponse(false)}>
              <Text style={{ fontFamily: 'Touche_Medium', fontSize: 12 }}>
                No
              </Text>
            </Button>
          </View>
        );
      }
      return (
        <View style={Theme.PullMsgView}>
          <View>
            <Text style={Theme.PullMsgHeading}>Pull Message request</Text>
          </View>
          <View style={{ margin: 8, flexDirection: 'row' }}>
            <View>
              <Progress.Bar progress={approvedMemCount / memCount} height={8} />
            </View>
            <View>
              <Text style={Theme.PullMsgMem}>
                {approvedMemCount}/{memCount}
              </Text>
            </View>
          </View>
          {DuoButton}
        </View>
      );
    } else {
      return <></>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms,
    user: state.user,
  };
};

export default connect(mapStateToProps)(PullMsg);
