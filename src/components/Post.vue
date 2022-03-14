<template>
  <div class="post bg-white rounded shadow my-3 py-2">
    <div class="d-flex justify-content-between">
      <div class="d-flex p-2">
        <img
          @click="goTo"
          class="img-small rounded-circle selectable"
          :src="post.creator?.picture"
          alt=""
        />
        <div class="p-2 ms-3">
          <b class="mb-1 text-break">{{ post.creator?.name }}</b>
          <p class="mt-1">{{ date }}</p>
        </div>
      </div>
      <div class="mx-2">
        <i
          @click="remove"
          title="Delete Post"
          class="mdi mdi-delete text-danger selectable"
          v-if="post.creatorId == account.id"
        >
        </i>
      </div>
    </div>
    <div class="px-3">{{ post.body }}</div>
    <div class="py-2 d-flex justify-content-center" v-if="post.imgUrl">
      <img class="img-fluid" :src="post.imgUrl" alt="" />
    </div>

    <div class="d-flex justify-content-end pe-3">
      <i
        v-if="likeId"
        @click="submitLike"
        class="mdi mdi-heart text-danger selectable pe-2"
      ></i>
      <i
        v-else
        @click="submitLike"
        class="mdi mdi-heart-outline selectable pe-2"
      ></i>
      <div class="likes">
        {{ post.likes.length }}
        <span v-if="post.likes.length > 0" class="likestext">
          <ul v-for="(l, i) in post.likes" :key="l[i]">
            <li>{{ l.name }}</li>
          </ul>
        </span>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { watchEffect } from "@vue/runtime-core";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const likeId = ref("");
    watchEffect(() => {
      likeId.value = props.post.likeIds.includes(AppState.account.id);
    });
    const router = useRouter();
    let dateFormat = new Intl.DateTimeFormat("en", {
      timeStyle: "short",
      dateStyle: "short",
    });
    let date = dateFormat.format(new Date(props.post.createdAt));
    return {
      date,
      likeId,
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      goTo() {
        router.push({ name: "Profile", params: { id: props.post.creatorId } });
      },
      async submitLike() {
        try {
          if (this.user.isAuthenticated) {
            await postsService.submitLike(props.post.id);
          } else {
            Pop.toast("You must be logged in", "error", "top-end", 5000);
          }
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      async remove() {
        try {
          if (
            await Pop.confirm(
              "Remove Post",
              "Are you sure you want to delete this post?"
            )
          ) {
            await postsService.removePost(props.post.id);
            Pop.toast("Post deleted!", "success");
          }
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.img-small {
  height: 80px;
  width: 80px;
}
.likes {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}
.likes .likestext {
  visibility: hidden;
  width: 200px;
  background-color: #242222;
  color: #fff;
  text-align: start;
  padding: 5px 0;
  border-radius: 6px;
  top: 100%;
  left: 50%;
  margin-left: -100px;
  position: absolute;
  z-index: 1;
}
.likes:hover .likestext {
  visibility: visible;
}
.likes .likestext::after {
  content: " ";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #242222 transparent;
}
</style>