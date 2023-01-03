<template>
  <div class="main-container">
    <CommanNavBar :isVisible="false" />
    <div class="new-release-container">
      <div class="album-list">
        <div
          class="album-card"
          v-for="album in listOfAlbums"
          :key="album.id"
          @click="goToAlbumSongsPage(album)"
        >
          <div class="album-img">
            <img :src="album.imageUrl" alt="" />
          </div>
          <div class="album-info">
            <div class="title">{{ album.name }}</div>
            <div class="artist">{{ album.artistNames }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommanNavBar from "@/components/CommanNavBar.vue";
export default {
  name: "NewRelease",
  components: {
    CommanNavBar,
  },
  data() {
    return {
      listOfAlbums: [],
    };
  },
  async created() {
    try {
      const url = "https://api.spotify.com/v1/browse/new-releases";
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
        data: {
          albums: { items: albumList },
        },
      } = data;

      this.listOfAlbums = albumList.map((album) => {
        const { id, images, name, artists } = album;
        const { url } = images[1];
        return {
          id,
          name,
          imageUrl: url,
          artistNames: this.$extractArtistNames(artists),
        };
      });
    } catch (error) {
      console.log("error: ", error);
    }
  },
  methods: {
    goToAlbumSongsPage({ id, name, artistNames, imageUrl }) {
      this.$router.push({
        name: "album",
        params: { id },
      });
    },
  },
};
</script>

<style scoped>
.main-container {
  box-sizing: border-box;
  width: 80%;
  height: 100%;
  background: linear-gradient(180deg, #4c0000 0%, #0a0a0a 100%);
}

.new-release-container {
  overflow: hidden scroll;
  height: 90%;
}

.album-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
  width: 95%;
  gap: 20px;
  justify-items: center;
  margin: 30px;
}

.album-card {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 10px;
  border-radius: 10px;
  background: #671a1a;
  transition: background-color 0.5s ease;
  width: 220px;
  cursor: pointer;
}

.album-card a {
  text-decoration: none;
}

.album-card:hover {
  background-color: #982525;
}

.album-card .album-info {
  border-radius: 10px;
  color: #ececec;
  padding: 10px;
}

.album-info .title,
.album-info .artist {
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
}

.album-info .title {
  white-space: nowrap;
  font-size: 16px;
  font-weight: 900;
}

.album-info .artist {
  font-size: 14px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
}
.album-img img {
  height: 200px;
  width: 200px;
  border-radius: 10px;
  object-fit: cover;
  margin-top: 10px;
}
</style>
