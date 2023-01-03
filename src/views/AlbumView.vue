<template>
  <div class="album-container">
    <div class="album-header">
      <div class="album-img">
        <img :src="album.imageUrl" alt="" />
      </div>
      <div class="album-info">
        <div class="title">
          {{ album.name }}
        </div>
        <div class="artist">{{ this.$extractArtistNames(album.artists) }}</div>
      </div>
    </div>
    <div class="album-songs">
      <div class="track-list">
        <div class="songs-header">
          <div class="track-number">#</div>
          <div>TITLE</div>
          <div class="time">TIME</div>
        </div>
        <div
          class="song"
          v-for="track in album.tracks"
          :key="track.id"
          @click="passTrackInfo(track)"
        >
          <div class="track-number">{{ track.track_number }}</div>
          <div class="song-info">
            <div class="title">{{ track.name }}</div>
            <div class="artist">
              {{ this.$extractArtistNames(track.artists) }}
            </div>
          </div>
          <div class="time">
            {{ millisToMinsAndSeconds(track.duration_ms) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
  },
  data() {
    return {
      album: {
        name: "",
        artists: [],
        imageUrl: "",
        tracks: [],
      },
      // playerInstance: new Spotify.Player({
      //   name: "Bootify",
      //   getOAuthToken: (cb) => {
      //     cb(this.$sdkToken);
      //   },
      //   volume: 0.5,
      // }),
    };
  },
  async created() {
    try {
      const url = `https://api.spotify.com/v1/albums/${this.id}`;
      const token = sessionStorage.getItem("accessToken");
      const config = {
        params: {
          limit: 50,
          offset: 0,
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const data = await this.axios.get(url, config);
      const {
        data: { name, images, artists, tracks },
      } = data;
      this.album = { name, artists, tracks: tracks.items };
      console.log("====> ", data.data);
      this.album.imageUrl = images[1].url;
    } catch (error) {
      console.log("error: ", error);
    }
  },
  methods: {
    millisToMinsAndSeconds(millis) {
      const minutes = Math.floor((millis / 1000 / 60) << 0);
      const seconds = Math.floor((millis / 1000) % 60);
      return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    },
    passTrackInfo(track) {
      this.$emit("playerInfo", { ...track, imageUrl: this.album.imageUrl });
    },
  },
};
</script>

<style scoped>
.album-container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: linear-gradient(#4c0000 0%, #0a0a0a 100%);
  overflow: scroll;
}

.album-header {
  height: 40%;
  display: grid;
  grid-template-columns: 300px auto;
  justify-content: start;
  align-items: end;
}

.album-img {
  width: 300px;
  padding: 20px;
}

.album-img img {
  height: 250px;
  width: 250px;
  object-fit: cover;
}

.album-info {
  display: grid;
  grid-template-rows: auto auto;
  color: #ececec;
  margin-left: 25px;
  margin-bottom: 30px;
  text-align: left;
}

.album-info .title,
.album-info .artist {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.album-info .title {
  font-size: 27px;
  font-weight: 900;
}

.album-info .artist {
  font-size: 15px;
}
.album-songs {
  background: rgba(0, 0, 0, 0.2);
  min-height: calc(60%);
  padding: 30px;
}
.track-list {
  display: grid;
  align-items: flex-start;
  grid-template-rows: 50px repeat(auto-fill, 1fr);
  gap: 15px;
}
.song,
.songs-header {
  display: grid;
  grid-template-columns: 40px auto 150px;
  grid-template-rows: auto;
  color: #ececec;
  text-align: left;
  height: 50px;
  align-items: center;
  transition: background-color ease;
}

.song {
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
}
.song:hover {
  background: #4a0100;
}
.track-number {
  text-align: center;
}
.song-info {
  display: grid;
  grid-template-rows: 25px 25px;
}

.song-info .title,
.song-info .artist {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.song-info .title {
  font-size: 16px;
  font-weight: 900;
}
.song-info .artist {
  font-size: 12px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
}
.songs-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  color: rgba(255, 255, 255, 0.5);
}
.time {
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 1px;
}
</style>
