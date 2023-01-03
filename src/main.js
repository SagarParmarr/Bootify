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
    "BQDUhH4dDgHHwgBg4upOsn5ANrqhEJCoWHpEuM02G2vUxH5dWzJ-g6mXQBpGc5b9m7gzZWD0i7_gNC6ShxEBlSeFkIX99GuRWFAXkyG69_V5QccKN-0wGaP5VIa1_DrXDsvTDjs068suojsO9kLw4-sRe9E3PGjbRp85CuJawZAhAVKa7MJh_dJM59lMuKq3IowDbvJ92SbXEoAZncON-vjpaEI",
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
