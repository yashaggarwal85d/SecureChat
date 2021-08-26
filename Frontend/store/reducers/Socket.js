import io from 'socket.io-client';
import { BASEAPI } from '../../constants/APIstore';

export const socket = io(BASEAPI);

export const JoinRooms = (token) => {
  return socket.emit('connectedUser', token);
};

export const registerForPushNotifications = (token, NotificationToken) => {
  return socket.emit('registerForPushNotifications', token, NotificationToken);
};

export const SendMessage = (roomId, token, message, spk) => {
  return socket.emit('message', roomId, token, message, spk);
};

export const setPublickey = (token, pk) => {
  return socket.emit('setPublickey', token, pk);
};

export const UpdatelastMessageReadIndex = (roomId, token) => {
  return socket.emit('UpdatelastMessageReadIndex', roomId, token);
};

export const CheckOnline = (token, userId) => {
  return socket.emit('checkOnline', token, userId);
};

export const promptMember = (token, roomId) => {
  return socket.emit('leaveGroup', token, roomId);
};

export const promptMemberandAdd = (token, roomId, memberId) => {
  return socket.emit('addMember', token, roomId, memberId);
};

export const promptMemberandRemove = (token, roomId, memberId) => {
  return socket.emit('removeMember', token, roomId, memberId);
};

export const promptGroup = (token, roomId) => {
  return socket.emit('newGroup', token, roomId);
};

export const logoutSocket = () => {
  return socket.emit('logout');
};

export const updateProfilePic = (token, url) => {
  return socket.emit('profile_pic', token, url);
};

export const updateRoomProfilePic = (token, roomId, url) => {
  return socket.emit('roomProfile_pic', token, roomId, url);
};

export const updateRoomNameDesc = (token, roomId, name, description) => {
  return socket.emit('roomNameDesc', token, roomId, name, description);
};

export const addPromptMessage = (roomId, token, message, spk) => {
  return socket.emit('addPrompt', roomId, token, message, spk);
};

export const addImageMessage = (roomId, token, message, spk) => {
  return socket.emit('addImage', roomId, token, message, spk);
};

export const PushMessagesToBlockchain = (roomId, token) => {
  return socket.emit('PushMessagesToBlockchain', roomId, token);
};

export const PullMessagesFromBlockchain = (roomId, token, status) => {
  return socket.emit('PullMessagesFromBlockchain', roomId, token, status);
};
