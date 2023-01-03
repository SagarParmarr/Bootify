<template>
  <div class="controller-container">
    <div class="track-info">
      <template v-if="track">
        <div class="image">
          <img :src="track.imageUrl" alt="" />
        </div>
        <div class="title">{{ track.name }}</div>
        <div class="artists">
          {{ this.$extractArtistNames(track.artists) }}
        </div>
      </template>
    </div>
    <div>
      <div class="music-box-wrapper">
        <div class="skip-buttons">
          <i class="material-icons"> skip_previous </i>
        </div>
        <div class="play-button-wrapper">
          <div class="play-button" @click="handlePlay()">
            <i class="material-icons">
              {{ music.play ? "pause" : "play_arrow" }}
            </i>
          </div>
        </div>
        <div class="skip-buttons" @click="skipToNextTrack()">
          <i class="material-icons"> skip_next </i>
        </div>
      </div>
    </div>
    <div class="volume-controller"></div>
  </div>
</template>

<script>
export default {
  props: {
    track: Object,
  },
  data() {
    return {
      music: {
        play: false,
      },
      playerInstance: null,
      deviceId: "",
    };
  },
  methods: {
    initialization() {
      const deviceId = sessionStorage.getItem("deviceId");
      this.deviceId = deviceId;
      const playerInstance = new Spotify.Player({
        name: "Bootify",
        getOAuthToken: (cb) => {
          cb(this.$sdkToken);
        },
        volume: 0.3,
      });
      this.playerInstance = playerInstance;
    },
    playBootify(track) {
      try {
        const play = ({
          spotify_uri,
          playerInstance: {
            _options: { getOAuthToken },
          },
        }) => {
          getOAuthToken((access_token) => {
            fetch(
              `https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`,
              {
                method: "PUT",
                body: JSON.stringify({
                  uris: [spotify_uri],
                }),
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${access_token}`,
                },
              }
            );
          });
        };
        console.log("track: ", track);
        if (this.playerInstance) {
          play({
            playerInstance: this.playerInstance,
            spotify_uri: track.uri,
          });
          this.music.play = true;
        }
      } catch (error) {
        console.log("error: ", error);
      }
    },
    getCurrentPlayingTrackInfo() {
      try {
        const getCurrentPlayingTrack = ({
          playerInstance: {
            _options: { getOAuthToken },
          },
        }) => {
          getOAuthToken(async (access_token) => {
            fetch(
              `https://api.spotify.com/v1/me/player/currently-playing?market=IN&additional_types=track`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${access_token}`,
                },
              }
            ).then((data) => console.log(data));
          });
        };
        if (this.playerInstance) {
          console.log("this.playerInstance: ", this.playerInstance);
          getCurrentPlayingTrack({
            playerInstance: this.playerInstance,
          });
        }
      } catch (error) {
        console.log("error: ", error);
      }
    },
    pauseBootify(track) {
      try {
        const pause = ({
          spotify_uri,
          playerInstance: {
            _options: { getOAuthToken },
          },
        }) => {
          getOAuthToken((access_token) => {
            fetch(
              `https://api.spotify.com/v1/me/player/pause?device_id=${this.deviceId}`,
              {
                method: "PUT",
                body: JSON.stringify({ uris: [spotify_uri] }),
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${access_token}`,
                },
              }
            );
          });
        };
        if (this.playerInstance) {
          pause({
            playerInstance: this.playerInstance,
            spotify_uri: track.uri,
          });
          this.music.play = false;
        }
      } catch (error) {
        console.log("error: ", error);
      }
    },
    skipToNextTrack() {
      try {
        const skipToNext = ({
          spotify_uri,
          playerInstance: {
            _options: { getOAuthToken },
          },
        }) => {
          getOAuthToken((access_token) => {
            fetch(
              `https://api.spotify.com/v1/me/player/next?device_id=${this.deviceId}`,
              {
                method: "POST",
                body: JSON.stringify({ uris: [spotify_uri] }),
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${access_token}`,
                },
              }
            );
          });
        };
        console.log("track: ", this.track);
        if (this.playerInstance) {
          skipToNext({
            playerInstance: this.playerInstance,
            spotify_uri: this.track.uri,
          });
          this.music.play = false;
        }
      } catch (error) {
        console.log("error: ", error);
      }
    },
    handlePlay() {
      if (this.music.play) {
        this.getCurrentPlayingTrackInfo();
        this.pauseBootify(this.track);
      } else {
        this.playBootify(this.track);
      }
    },
  },
  watch: {
    track(newTrack) {
      if (newTrack) {
        this.initialization();
        this.playBootify(newTrack);
      }
    },
  },
};
</script>

<style scoped>
.controller-container {
  background: #410000;
  display: grid;
  grid-template-columns: calc(100% / 3) auto auto;
  padding-left: 10px;
  height: 100%;
  align-items: center;
}

.track-info {
  display: grid;
  grid-template-columns: 70px auto;
  grid-template-rows: auto auto;
  height: 80%;
  min-width: 250px;
  align-content: center;
  column-gap: 10px;
}

.music-box-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
}
.play-button-wrapper {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.play-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ececec;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.play-button i {
  font-size: 25px;
}

.play-button:hover {
  width: 45px;
  height: 45px;
}

.skip-buttons {
  color: #ececec;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.skip-buttons i {
  font-size: 30px;
  opacity: 0.7;
}

.skip-buttons i:hover {
  opacity: 1;
}

.track-info .image {
  width: 70px;
  height: 70px;
  grid-row: 1 / span 2;
}

.image img {
  width: 100%;
  height: 100%;
}

.track-info .title,
.track-info .artists {
  overflow: scroll hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  overflow: hidden;
  justify-self: flex-start;
  max-width: calc(100%);
}
.track-info .title {
  font-size: 15px;
  color: #ececec;
  align-self: flex-end;
  font-weight: 900;
}

.track-info .artists {
  color: rgba(255, 255, 255, 0.5);
  align-self: flex-start;
  font-size: 12px;
}
</style>
