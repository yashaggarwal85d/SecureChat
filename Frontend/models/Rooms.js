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
    creator_id
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.lastMessage = "";
    this.lastTime = "";
    this.messages = messages;
    this.profile_pic = profile_pic;
    this.members = members;
    this.lastMessageReadIndex = lastMessageReadIndex;
    this.isGroup = isGroup;
    this.creator_id = creator_id;
  }
  updateLastMessage(message) {
    this.lastMessage = message;
  }
  updateLastTime(time) {
    this.lastTime = time;
  }
}

export default Room;
