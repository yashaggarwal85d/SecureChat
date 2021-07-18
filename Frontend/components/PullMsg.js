import React, { Component } from 'react';
import { Text, View, Button } from 'native-base';
import * as Progress from 'react-native-progress';
import { PullMessagesFromBlockchain } from '../store/reducers/Socket';

class PullMsg extends Component {
  constructor(props) {
    super(props);
  }

  PullMsgResponse(status) {
    PullMessagesFromBlockchain(
      this.props.room.id,
      this.props.user.token,
      status
    );
  }

  render() {
    if (this.props.PullMsg.active) {
      var memCount = this.props.room.members.length;
      var approvedMemCount = this.props.PullMsg.membersApproved.length;
      var DuoButton = <></>;
      if (
        this.props.PullMsg.membersApproved.indexOf(this.props.user.id) === -1
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
        <View style={this.props.appStyles.PullMsgView}>
          <View>
            <Text style={this.props.appStyles.PullMsgHeading}>
              Pull Message request
            </Text>
          </View>
          <View style={{ margin: 8, flexDirection: 'row' }}>
            <View>
              <Progress.Bar progress={approvedMemCount / memCount} height={8} />
            </View>
            <View>
              <Text style={this.props.appStyles.PullMsgMem}>
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

export default PullMsg;
