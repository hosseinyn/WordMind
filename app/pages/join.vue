<script setup>
import "~/styles/styles.css";
import { VContainer , VBtn , VTextField , VLabel } from "vuetify/components";
import { ref } from 'vue';

const room_id = ref("");

const handleChangeId = (e) => {
  room_id.value = e.target.value;
}

const handleShowLink = () => {
  if (room_id != "") {
    navigateTo(`/game/${room_id.value}`);
  }
}


</script>

<template>
      <Header />

      <v-container style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; margin-top: -160px;">
        
        <v-label>Room id</v-label>
        <v-text-field placeholder="Enter your room id... (Only two players can play in each room)" width="60%" @change="handleChangeId" />

        <v-btn color="primary" width="140" @click="handleShowLink">Start</v-btn>

      </v-container>
</template>