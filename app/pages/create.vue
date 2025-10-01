<script setup>
import { ref } from "vue";
import { io } from "socket.io-client";
import { VContainer , VBtn , VTextField , VLabel } from "vuetify/components";

const entred_word = ref("");
const entred_room_id = ref("");
const show_send_word = ref(false);
const error_text = ref("");
const user_win = ref("");
const user_id = ref("");
const socket = io("http://localhost:3000");

const handleChangeWord = (e) => entred_word.value = e.target.value;
const handleChangeRoomId = (e) => entred_room_id.value = e.target.value;

const handleCreateRoom = () => {
  socket.emit("join_room", entred_room_id.value);

  show_send_word.value = true;
}

socket.on("join_failed" , () => {
    alert("This room is already exists.");
    navigateTo("/");
})

const handleSendMessage = () => {
  if (entred_word.value.length != 10) {
    error_text.value = "Your word is under 10 char.";
    return;
  } else if (entred_word.value.length == 10) {

    error_text.value = "Sent.";

    socket.emit("send_word", { room: entred_room_id.value, msg: entred_word.value });

    user_id.value = '';

  }

}

socket.on("user_joined", id => {
  user_id.value = id;
})

socket.on("user_status", status => {
  if (status === "win") user_win.value = "User won";
  else if (status === "loose") user_win.value = "User lost";
})

</script>

<template>
  <Header />
  <v-container style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; margin-top: -160px;">
    <v-label>Room id</v-label>
    <v-text-field placeholder="Enter room id..." width="60%" @change="handleChangeRoomId" />
    <v-btn color="primary" width="140" @click="handleCreateRoom">Start</v-btn>

    <v-container v-if="show_send_word" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;">
      <h3>Link : http://localhost:3000/game/{{ entred_room_id }}</h3>

      <v-label v-if="user_win != ''" style="font-size: 40px;">{{ user_win }}</v-label>

      <h4 v-if="user_id != ''">User joined : {{ user_id }}</h4>

      <v-label>Your Word</v-label>
      <v-text-field placeholder="Enter your word..." width="60%" @change="handleChangeWord" minlength="10" maxlength="10" />

      <v-label v-if="error_text != '' " style="color: red;">{{ error_text }}</v-label>

      <v-btn v-if="user_id != ''" color="primary" width="140" @click="handleSendMessage">Send</v-btn>
    </v-container>
  </v-container>
</template>