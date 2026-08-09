import { _ as __nuxt_component_0 } from "./nuxt-link-iTsWrgYA.js";
import { defineComponent, ref, reactive, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, withKeys, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { ElMessage } from "element-plus";
import { a as useSeoMeta } from "./v3-DqToCt8T.js";
import { u as useNuxtApp, n as navigateTo, _ as _export_sfc } from "../server.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/ufo/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/defu/dist/defu.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/@unhead/vue/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/hookable/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/unctx/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/h3/dist/index.mjs";
import "vue-router";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/klona/dist/index.mjs";
import "axios";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/cookie-es/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/destr/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/ohash/dist/index.mjs";
import "element-plus/es/locale/lang/zh-cn";
import "@element-plus/icons-vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const formRef = ref();
    const loading = ref(false);
    useSeoMeta({
      title: "注册 - MallShop",
      description: "注册 MallShop 商城账号"
    });
    const form = reactive({ username: "", password: "", nickname: "" });
    const rules = {
      username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 3, max: 20, message: "长度3-20个字符", trigger: "blur" }
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, message: "密码不少于6位", trigger: "blur" }
      ]
    };
    async function handleRegister() {
      await formRef.value.validate();
      loading.value = true;
      const { $api } = useNuxtApp();
      const res = await $api.post("/auth/register", form);
      if (res.code === 200) {
        ElMessage.success("注册成功，请登录");
        navigateTo("/login");
      } else {
        ElMessage.error(res.message || "注册失败");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-page" }, _attrs))} data-v-b246f5ba>`);
      _push(ssrRenderComponent(_component_el_card, {
        class: "login-card",
        shadow: "always"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 style="${ssrRenderStyle({ "text-align": "center", "margin-bottom": "32px" })}" data-v-b246f5ba${_scopeId}>创建账号</h2>`);
            _push2(ssrRenderComponent(_component_el_form, {
              model: form,
              rules,
              ref_key: "formRef",
              ref: formRef,
              onKeydown: handleRegister
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
                          placeholder: "用户名 (3-20位)",
                          "prefix-icon": "User"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.username,
                            "onUpdate:modelValue": ($event) => form.username = $event,
                            size: "large",
                            placeholder: "用户名 (3-20位)",
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
                          placeholder: "密码 (不少于6位)",
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
                            placeholder: "密码 (不少于6位)",
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
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.nickname,
                          "onUpdate:modelValue": ($event) => form.nickname = $event,
                          size: "large",
                          placeholder: "昵称 (选填)",
                          "prefix-icon": "UserFilled"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.nickname,
                            "onUpdate:modelValue": ($event) => form.nickname = $event,
                            size: "large",
                            placeholder: "昵称 (选填)",
                            "prefix-icon": "UserFilled"
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
                          onClick: handleRegister
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` 注 册 `);
                            } else {
                              return [
                                createTextVNode(" 注 册 ")
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
                            onClick: handleRegister
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 注 册 ")
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
                          placeholder: "用户名 (3-20位)",
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
                          placeholder: "密码 (不少于6位)",
                          "prefix-icon": "Lock",
                          "show-password": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.nickname,
                          "onUpdate:modelValue": ($event) => form.nickname = $event,
                          size: "large",
                          placeholder: "昵称 (选填)",
                          "prefix-icon": "UserFilled"
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
                          onClick: handleRegister
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" 注 册 ")
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
            _push2(`<div style="${ssrRenderStyle({ "text-align": "center", "font-size": "0.9rem", "color": "#606266" })}" data-v-b246f5ba${_scopeId}> 已有账号？ `);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/login",
              style: { "color": "#c0392b", "font-weight": "500" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`去登录`);
                } else {
                  return [
                    createTextVNode("去登录")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("h2", { style: { "text-align": "center", "margin-bottom": "32px" } }, "创建账号"),
              createVNode(_component_el_form, {
                model: form,
                rules,
                ref_key: "formRef",
                ref: formRef,
                onKeydown: withKeys(handleRegister, ["enter"])
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, { prop: "username" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.username,
                        "onUpdate:modelValue": ($event) => form.username = $event,
                        size: "large",
                        placeholder: "用户名 (3-20位)",
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
                        placeholder: "密码 (不少于6位)",
                        "prefix-icon": "Lock",
                        "show-password": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, null, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.nickname,
                        "onUpdate:modelValue": ($event) => form.nickname = $event,
                        size: "large",
                        placeholder: "昵称 (选填)",
                        "prefix-icon": "UserFilled"
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
                        onClick: handleRegister
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" 注 册 ")
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
                createTextVNode(" 已有账号？ "),
                createVNode(_component_NuxtLink, {
                  to: "/login",
                  style: { "color": "#c0392b", "font-weight": "500" }
                }, {
                  default: withCtx(() => [
                    createTextVNode("去登录")
                  ]),
                  _: 1
                })
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const register = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b246f5ba"]]);
export {
  register as default
};
//# sourceMappingURL=register-CR1nT9nG.js.map
