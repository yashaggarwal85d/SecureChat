import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatScreenComponent from "../../components/ChatListComponent";
import { fillData } from "../../store/actions/RoomActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class LightChatScreen extends React.Component {
  async componentDidMount() {
    await this.props.fillData();
  }
  render() {
    return <ChatScreenComponent {...this.props} CHATLIST={this.props.rooms} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fillData }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    rooms: state.room.rooms,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LightChatScreen);
