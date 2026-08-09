import { g as defineStore, b as useCookie, u as useNuxtApp } from "../server.mjs";
import { ref, computed } from "vue";
const useUserStore = defineStore("user", () => {
  const token = ref("");
  const user = ref(null);
  const isLoggedIn = computed(() => !!token.value);
  const isAdmin = computed(() => user.value?.role === "admin");
  function setAuth(t, u) {
    token.value = t;
    user.value = u;
  }
  function logout() {
    token.value = "";
    user.value = null;
    useCookie("mall_token").value = "";
    useCookie("mall_user").value = "";
  }
  async function fetchProfile() {
    const { $api } = useNuxtApp();
    const res = await $api.get("/auth/profile");
    if (res.code === 200) {
      user.value = res.data;
    }
    return res;
  }
  async function login(form) {
    const { $api } = useNuxtApp();
    const res = await $api.post("/auth/login", form);
    if (res.code === 200) {
      setAuth(res.data.token, res.data.user);
    }
    return res;
  }
  return { token, user, isLoggedIn, isAdmin, setAuth, logout, fetchProfile, login };
});
export {
  useUserStore as u
};
//# sourceMappingURL=user-OpFIMyWU.js.map
