<script setup>
import "~/styles/styles.css";
import {VApp , VMain , VContainer , VBtn} from "vuetify/components";
</script>

<template>
      <Header />

      <v-container style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 14px; margin-top: -160px;">
        <v-btn color="primary">
            <NuxtLink to="/create" style="color: #fff; text-decoration: none;">Create a room</NuxtLink>
        </v-btn>

        <v-btn color="primary">
            <NuxtLink to="/join" style="color: #fff; text-decoration: none;">Join a room</NuxtLink>
        </v-btn>


      </v-container>
</template>