<template>
  <div class="profile-form row">
    <div class="col-12">
      <form class="row" @submit.prevent="handleSubmit">
        <div class="col-6 mb-3">
          <label for="name" class="form-label">Profile Name</label>
          <input
            type="text"
            class="form-control"
            name="name"
            id="name"
            placeholder="Name..."
            v-model="editable.name"
          />
        </div>
        <div class="col-6 mb-3">
          <label for="picture" class="form-label">Profile Image Url</label>
          <input
            type="text"
            class="form-control"
            name="picture"
            id="picture"
            placeholder="Image Url..."
            v-model="editable.picture"
          />
        </div>
        <div class="col-6 mb-3">
          <label for="coverImg" class="form-label">Cover Image Url</label>
          <input
            type="text"
            class="form-control"
            name="coverImg"
            id="coverImg"
            placeholder="Image Url..."
            v-model="editable.coverImg"
          />
        </div>
        <div class="col-6 mb-3">
          <label for="email" class="form-label">Contact Email</label>
          <input
            type="text"
            class="form-control"
            name="email"
            id="email"
            placeholder="Email..."
            v-model="editable.email"
          />
        </div>
        <div class="col-6 mb-3">
          <label for="github" class="form-label">GitHub Account</label>
          <input
            type="text"
            class="form-control"
            name="github"
            id="github"
            placeholder="GitHub..."
            v-model="editable.github"
          />
        </div>
        <div class="col-6 mb-3">
          <label for="linkedin" class="form-label">LinkedIn Account</label>
          <input
            type="text"
            class="form-control"
            name="linkedin"
            id="linkedin"
            placeholder="LinkedIn..."
            v-model="editable.linkedin"
          />
        </div>
        <div class="col-6 mb-3">
          <label for="resume" class="form-label">Resume' Url</label>
          <input
            type="text"
            class="form-control"
            name="resume"
            id="resume"
            placeholder="Resume' Url..."
            v-model="editable.resume"
          />
        </div>
        <div class="col-6 mb-3">
          <label for="class" class="form-label">Class</label>
          <input
            type="text"
            class="form-control"
            name="class"
            id="class"
            placeholder="Which cohort..."
            v-model="editable.class"
          />
        </div>
        <div class="col-6 mb-3">
          <label for="bio" class="form-label">Bio</label>
          <input
            type="text"
            class="form-control"
            name="bio"
            id="bio"
            placeholder="Tell a little about you..."
            v-model="editable.bio"
          />
        </div>
        <div
          class="
            col-6
            form-check
            d-flex
            align-items-center
            justify-content-center
          "
        >
          <input
            type="checkbox"
            class="form-check-input"
            name="graduated"
            id="graduated"
            value="checkedValue"
            v-model="editable.graduated"
          />
          <label class="ps-2 form-check-label" for="graduated">
            Graduated?
          </label>
        </div>
        <div class="text-end">
          <button class="btn">
            <i title="Submit edit" class="mdi mdi-pencil selectable"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import { ref } from "@vue/reactivity";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { accountService } from "../services/AccountService";
import { Modal } from "bootstrap";
import { watchEffect } from "@vue/runtime-core";
import { AppState } from "../AppState";
export default {
  setup() {
    const editable = ref({});
    watchEffect(() => {
      editable.value = AppState.account;
    });
    return {
      editable,
      async handleSubmit() {
        try {
          await accountService.editAccount(editable.value);
          Modal.getOrCreateInstance(
            document.getElementById("edit-profile")
          ).hide();
          editable.value = {};
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
</style>