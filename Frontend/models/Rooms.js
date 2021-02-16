class Room {
  constructor(id, name, description, profile_pic, messages) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.lastMessage = "lastmessage";
    this.lastTime = "6:30PM";
    this.isactive = false;
    this.messages = messages;
    this.profile_pic = profile_pic;
  }
  updateLastMessage(message) {
    this.lastMessage = message;
  }
  updateLastTime(time) {
    this.lastTime = time;
  }
}

export default Room;
