class Room {
  constructor(
    id,
    name,
    description,
    profile_pic,
    messages,
    members,
    lastMessageReadIndex,
    isGroup,
    creator_id,
    PullMessage
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.lastMessage = '';
    this.lastTime = '';
    this.messages = messages;
    this.profile_pic = profile_pic;
    this.members = members;
    this.lastMessageReadIndex = lastMessageReadIndex;
    this.isGroup = isGroup;
    this.creator_id = creator_id;
    this.dark = false;
    this.PullMessage = PullMessage;
  }
  updateLastMessage(message) {
    this.lastMessage = message;
  }
  updateLastTime(time) {
    this.lastTime = time;
  }
  updateDark(dark) {
    this.dark = dark;
  }
}

export default Room;
