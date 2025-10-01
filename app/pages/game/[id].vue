<script setup>
import { io } from 'socket.io-client';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { VContainer, VBtn, VTextField, VLabel } from "vuetify/components";

const send_word = ref("");
const user_answer = ref("");
const error_text = ref("");
const socket = io("http://localhost:3000");
const route = useRoute();

const handleCheckWord = () => {
  if (user_answer.value.length < 10) {
    error_text.value = "Your answer is under 10 char."
    return
  } else if (user_answer.value.length == 10) {

    if (send_word.value === user_answer.value) {
      alert("WIN!")
      socket.emit("user_status", { room: route.params.id, status: "win" });
      navigateTo("/");
    } else {
      alert("LOOSE!")
      socket.emit("user_status", { room: route.params.id, status: "loose" });
      navigateTo("/")
    }

  }

}

const handleChangeAnswer = (e) => {
  user_answer.value = e.target.value;
}

onMounted(() => {
  socket.emit("join_room", route.params.id);
})

socket.on("join_failed" , () => {
    alert("This room is not available for play.");
    navigateTo("/");
})

socket.on("receive_word", word => {
  send_word.value = word;
})

</script>

<template>
  <Header />
  <v-container
    style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; margin-top: -160px;">
    <v-label style="font-size: 24px; letter-spacing: 8px; margin-bottom: 40px; background-color: #fff; color: #000; min-width: 30%; height: 40px; border-radius: 6px; text-align: center; padding-left: 18px;">
      {{
        send_word
          ? send_word
            .split("")
            .map((ch, i) => (i === 1 || i === 3 || i === 5 ? ch : "_"))
            .join(" ")
          : ""
      }}
    </v-label>

    <v-text-field placeholder="Enter the word" width="60%" @change="handleChangeAnswer" minlength="10" maxlength="10" />

    <v-btn color="primary" width="140" v-if="send_word != ''" @click="handleCheckWord">Check</v-btn>

  </v-container>


</template>
