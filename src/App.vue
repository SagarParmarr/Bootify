<template>
  <RouterView></RouterView>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      deviceId: "",
    };
  },
  async beforeCreate() {
    try {
      // const ClientId = "ac9159c4fb2b4c6b94ff2f7a6d04abb6";
      // const ClientSecret = "45b60a7f490945e9868eaf17339229d4";

      const ClientId = this.$clientId;
      const ClientSecret = this.$clientSecret;

      const {
        data: { access_token },
      } = await this.axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        data: "grant_type=client_credentials",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(ClientId + ":" + ClientSecret),
        },
      });
      sessionStorage.setItem("accessToken", access_token);
    } catch (error) {
      console.log("error: ", error);
    }
  },
  created() {
    const spt = document.createElement("script");
    spt.setAttribute("src", "https://sdk.scdn.co/spotify-player.js");
    document.head.appendChild(spt);
    spt.onload = () => {
      window.onSpotifyWebPlaybackSDKReady = () => {
        console.log("===>", this.$sdkToken);
        const token = this.$sdkToken;
        const player = new Spotify.Player({
          name: "Bootify",
          getOAuthToken: (cb) => {
            cb(token);
          },
          volume: 0.5,
        });
        console.log("player: ", player);
        // Ready
        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
          sessionStorage.setItem("deviceId", device_id);
        });
        // Not Ready
        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });
        player.addListener("initialization_error", ({ message }) => {
          console.error(message);
        });
        player.addListener("authentication_error", ({ message }) => {
          console.error(message);
        });
        player.addListener("account_error", ({ message }) => {
          console.error(message);
        });
        player.connect();
      };
    };
  },
};
</script>

<style>
#app {
  font-family: "Poppins-Regular";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
