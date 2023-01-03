import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import "./assets/stylesheets/main.css";

const app = createApp(App);
app.config.globalProperties = {
  $clientId: "ac9159c4fb2b4c6b94ff2f7a6d04abb6",
  $clientSecret: "45b60a7f490945e9868eaf17339229d4",
  $sdkToken:
    "BQC-nYd3h6ruD2l2cpy0rGvpWgMYHUYN4E-aIjHRX6G10R4QPK-VckHIMThQfboKSaOUIrLeuTLZEDfyPHVoHo8xYgd5I3dXQk4HiLV4YqzUJ70vKKTw0sD_Q9PelF_gXKuUmBxGS46xYyzOwlGiDbALsC_PRWm6_EIibGS0GNsdQcnlJVJc6Ix4gifnQoH5cVNvdc7IFT0cCHN4ijzcplE3wVk",
  $extractArtistNames: (artists) => {
    let artistNames = "";
    artists.forEach((artist) => {
      if (artistNames != "") artistNames += ", ";
      artistNames += artist.name;
    });
    return artistNames;
  },
};
app.use(VueAxios, axios).use(router).mount("#app");
