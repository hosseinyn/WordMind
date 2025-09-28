<script setup>
import "~/styles/styles.css";
import {VApp , VMain , VContainer , VBtn} from "vuetify/components";
</script>

<template>
  <v-app>
    <v-main class="main">
      <v-container style="display: flex; flex-direction: column; margin-top: 30px; align-items: center;">
        <NuxtImg src="/Logo.png" height="140" style="border-radius: 10%;" />
        <br />
        <h1 style="font-size: 40px;">WoRdMiND</h1>
        <h3>Your world of word guess</h3>
      </v-container>


    </v-main>
  </v-app>
</template>
