class Room {
  constructor(
    id,
    name,
    description,
    profile_pic,
    messages,
    members,
    lastMessageReadIndex
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.lastMessage = "";
    this.lastTime = "";
    this.isactive = false;
    this.messages = messages;
    this.profile_pic = profile_pic;
    this.members = members;
    this.lastMessageReadIndex = lastMessageReadIndex;
  }
  updateLastMessage(message) {
    this.lastMessage = message;
  }
  updateLastTime(time) {
    this.lastTime = time;
  }
  updateIsActive(bool) {
    this.isactive = bool;
  }
}

export default Room;
