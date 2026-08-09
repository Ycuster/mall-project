import { _ as __nuxt_component_0 } from "./nuxt-link-iTsWrgYA.js";
import { defineComponent, ref, reactive, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, withKeys, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/hookable/dist/index.mjs";
import { a as useSeoMeta } from "./v3-DqToCt8T.js";
import { a as useRoute, b as useCookie, n as navigateTo, _ as _export_sfc } from "../server.mjs";
import "#internal/nuxt/paths";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/defu/dist/defu.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/klona/dist/index.mjs";
import { u as useUserStore } from "./user-OpFIMyWU.js";
import { u as useCartStore } from "./cart-D9jsw7kE.js";
import { ElMessage } from "element-plus";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/ufo/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/@unhead/vue/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/ofetch/dist/node.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/unctx/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/h3/dist/index.mjs";
import "vue-router";
import "axios";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/cookie-es/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/destr/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/ohash/dist/index.mjs";
import "element-plus/es/locale/lang/zh-cn";
import "@element-plus/icons-vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const userStore = useUserStore();
    const cartStore = useCartStore();
    const formRef = ref();
    const loading = ref(false);
    useSeoMeta({
      title: "登录 - MallShop",
      description: "登录 MallShop 商城系统"
    });
    const form = reactive({ username: "", password: "" });
    const rules = {
      username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }]
    };
    async function handleLogin() {
      await formRef.value.validate();
      loading.value = true;
      const res = await userStore.login(form);
      if (res.code === 200) {
        useCookie("mall_token").value = res.data.token;
        useCookie("mall_user").value = JSON.stringify(res.data.user);
        ElMessage.success("登录成功");
        await cartStore.fetch();
        const redirect = route.query.redirect || (res.data.user.role === "admin" ? "/admin" : "/");
        navigateTo(redirect);
      } else {
        ElMessage.error(res.message || "登录失败");
      }
      loading.value = false;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = resolveComponent("el-card");
      const _component_el_form = resolveComponent("el-form");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_button = resolveComponent("el-button");
      const _component_NuxtLink = __nuxt_component_0;
      const _component_el_divider = resolveComponent("el-divider");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-page" }, _attrs))} data-v-02fd1193>`);
      _push(ssrRenderComponent(_component_el_card, {
        class: "login-card",
        shadow: "always"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 style="${ssrRenderStyle({ "text-align": "center", "margin-bottom": "8px" })}" data-v-02fd1193${_scopeId}>欢迎回来</h2><p style="${ssrRenderStyle({ "text-align": "center", "color": "#909399", "margin-bottom": "32px" })}" data-v-02fd1193${_scopeId}>MallShop 商城系统</p>`);
            _push2(ssrRenderComponent(_component_el_form, {
              model: form,
              rules,
              ref_key: "formRef",
              ref: formRef,
              onKeydown: handleLogin
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, { prop: "username" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.username,
                          "onUpdate:modelValue": ($event) => form.username = $event,
                          size: "large",
                          placeholder: "用户名",
                          "prefix-icon": "User"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.username,
                            "onUpdate:modelValue": ($event) => form.username = $event,
                            size: "large",
                            placeholder: "用户名",
                            "prefix-icon": "User"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { prop: "password" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.password,
                          "onUpdate:modelValue": ($event) => form.password = $event,
                          type: "password",
                          size: "large",
                          placeholder: "密码",
                          "prefix-icon": "Lock",
                          "show-password": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.password,
                            "onUpdate:modelValue": ($event) => form.password = $event,
                            type: "password",
                            size: "large",
                            placeholder: "密码",
                            "prefix-icon": "Lock",
                            "show-password": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_button, {
                          type: "primary",
                          size: "large",
                          style: { "width": "100%" },
                          loading: loading.value,
                          onClick: handleLogin
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` 登 录 `);
                            } else {
                              return [
                                createTextVNode(" 登 录 ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_button, {
                            type: "primary",
                            size: "large",
                            style: { "width": "100%" },
                            loading: loading.value,
                            onClick: handleLogin
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 登 录 ")
                            ]),
                            _: 1
                          }, 8, ["loading"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, { prop: "username" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.username,
                          "onUpdate:modelValue": ($event) => form.username = $event,
                          size: "large",
                          placeholder: "用户名",
                          "prefix-icon": "User"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { prop: "password" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.password,
                          "onUpdate:modelValue": ($event) => form.password = $event,
                          type: "password",
                          size: "large",
                          placeholder: "密码",
                          "prefix-icon": "Lock",
                          "show-password": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_button, {
                          type: "primary",
                          size: "large",
                          style: { "width": "100%" },
                          loading: loading.value,
                          onClick: handleLogin
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" 登 录 ")
                          ]),
                          _: 1
                        }, 8, ["loading"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div style="${ssrRenderStyle({ "text-align": "center", "font-size": "0.9rem", "color": "#606266" })}" data-v-02fd1193${_scopeId}> 还没有账号？ `);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/register",
              style: { "color": "#c0392b", "font-weight": "500" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`立即注册`);
                } else {
                  return [
                    createTextVNode("立即注册")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_el_divider, null, null, _parent2, _scopeId));
            _push2(`<div style="${ssrRenderStyle({ "text-align": "center", "font-size": "0.8rem", "color": "#c0c4cc" })}" data-v-02fd1193${_scopeId}> 管理员: admin / admin123  |  用户: test / test123 </div>`);
          } else {
            return [
              createVNode("h2", { style: { "text-align": "center", "margin-bottom": "8px" } }, "欢迎回来"),
              createVNode("p", { style: { "text-align": "center", "color": "#909399", "margin-bottom": "32px" } }, "MallShop 商城系统"),
              createVNode(_component_el_form, {
                model: form,
                rules,
                ref_key: "formRef",
                ref: formRef,
                onKeydown: withKeys(handleLogin, ["enter"])
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, { prop: "username" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.username,
                        "onUpdate:modelValue": ($event) => form.username = $event,
                        size: "large",
                        placeholder: "用户名",
                        "prefix-icon": "User"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { prop: "password" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.password,
                        "onUpdate:modelValue": ($event) => form.password = $event,
                        type: "password",
                        size: "large",
                        placeholder: "密码",
                        "prefix-icon": "Lock",
                        "show-password": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, null, {
                    default: withCtx(() => [
                      createVNode(_component_el_button, {
                        type: "primary",
                        size: "large",
                        style: { "width": "100%" },
                        loading: loading.value,
                        onClick: handleLogin
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" 登 录 ")
                        ]),
                        _: 1
                      }, 8, ["loading"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"]),
              createVNode("div", { style: { "text-align": "center", "font-size": "0.9rem", "color": "#606266" } }, [
                createTextVNode(" 还没有账号？ "),
                createVNode(_component_NuxtLink, {
                  to: "/register",
                  style: { "color": "#c0392b", "font-weight": "500" }
                }, {
                  default: withCtx(() => [
                    createTextVNode("立即注册")
                  ]),
                  _: 1
                })
              ]),
              createVNode(_component_el_divider),
              createVNode("div", { style: { "text-align": "center", "font-size": "0.8rem", "color": "#c0c4cc" } }, " 管理员: admin / admin123  |  用户: test / test123 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-02fd1193"]]);
export {
  login as default
};
//# sourceMappingURL=login-DvN8_R-3.js.map
