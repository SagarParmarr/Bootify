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
    "BQDckoC8Vx1Qtf1zAYnTr3LQvpgxmZptfN_pVO7jdqcIFwpCKlN4jQLhrC2C4aZqc9atA3WugGJd-YJz3YchHHcu2pLCsUcKIT84KhosWXE200XN9X581mccQFCCAczgL2NCdOoO-ndjTkF2qr9ZlicY8NuFeoqGclxOiSIJGikTio9KuW7ymrrjUUmDmJlewzcYxy-Hnfjk4_RQUCGpPSMNBYw",
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
