var id = new URLSearchParams(window.location.search).get("room");
if (id == null || id.length < 3) {
  id = prompt("Please enter Room ID");
  window.location.search = "?room=" + id;
}
document.title += " - " + id;
document.getElementById('room').innerHTML = id;
const textBox = document.getElementById("textbox");
const socket = io("/");
socket.emit("newUserRoom", id);
socket.on("newUser", () => {
  socket.emit("sendText", id, textBox.value);
});
socket.on("receiveText", text => {
  textBox.value = text;
});
textBox.addEventListener("keyup", () => {
  socket.emit("sendText", id, textBox.value);
});
