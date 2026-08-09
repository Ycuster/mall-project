import { defineComponent, reactive, resolveComponent, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { u as useUserStore } from "./user-OpFIMyWU.js";
import { ElMessage } from "element-plus";
import { a as useSeoMeta } from "./v3-DqToCt8T.js";
import { u as useNuxtApp } from "../server.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/@unhead/vue/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/hookable/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/unctx/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/h3/dist/index.mjs";
import "vue-router";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/defu/dist/defu.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/ufo/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/klona/dist/index.mjs";
import "axios";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/cookie-es/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/destr/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/ohash/dist/index.mjs";
import "element-plus/es/locale/lang/zh-cn";
import "@element-plus/icons-vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    const form = reactive({ nickname: "", email: "", phone: "" });
    useSeoMeta({
      title: "个人中心 - MallShop",
      description: "管理个人信息"
    });
    async function handleSave() {
      const { $api } = useNuxtApp();
      const res = await $api.put("/auth/profile", form);
      if (res.code === 200) {
        ElMessage.success("保存成功");
        await userStore.fetchProfile();
      } else {
        ElMessage.error("保存失败");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = resolveComponent("el-card");
      const _component_el_avatar = resolveComponent("el-avatar");
      const _component_el_tag = resolveComponent("el-tag");
      const _component_el_form = resolveComponent("el-form");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_button = resolveComponent("el-button");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "page-container",
        style: { "max-width": "600px" }
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_el_card, { shadow: "never" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span style="${ssrRenderStyle({ "font-size": "1.2rem", "font-weight": "600" })}"${_scopeId}>个人中心</span>`);
          } else {
            return [
              createVNode("span", { style: { "font-size": "1.2rem", "font-weight": "600" } }, "个人中心")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "text-align": "center", "margin-bottom": "24px" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_avatar, {
              size: 80,
              style: { "background": "#c0392b", "font-size": "2rem", "margin-bottom": "12px" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(userStore).user?.nickname?.[0] || "U")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(userStore).user?.nickname?.[0] || "U"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3${_scopeId}>${ssrInterpolate(unref(userStore).user?.nickname || unref(userStore).user?.username)}</h3>`);
            _push2(ssrRenderComponent(_component_el_tag, {
              type: unref(userStore).isAdmin ? "danger" : "primary",
              size: "small"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(userStore).isAdmin ? "管理员" : "普通用户")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(userStore).isAdmin ? "管理员" : "普通用户"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_el_form, {
              model: form,
              "label-width": "60px"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "昵称" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.nickname,
                          "onUpdate:modelValue": ($event) => form.nickname = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.nickname,
                            "onUpdate:modelValue": ($event) => form.nickname = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "邮箱" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.email,
                          "onUpdate:modelValue": ($event) => form.email = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.email,
                            "onUpdate:modelValue": ($event) => form.email = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "手机" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.phone,
                          "onUpdate:modelValue": ($event) => form.phone = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.phone,
                            "onUpdate:modelValue": ($event) => form.phone = $event
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
                          onClick: handleSave
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`保存修改`);
                            } else {
                              return [
                                createTextVNode("保存修改")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_button, {
                            type: "primary",
                            onClick: handleSave
                          }, {
                            default: withCtx(() => [
                              createTextVNode("保存修改")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, { label: "昵称" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.nickname,
                          "onUpdate:modelValue": ($event) => form.nickname = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "邮箱" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.email,
                          "onUpdate:modelValue": ($event) => form.email = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "手机" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.phone,
                          "onUpdate:modelValue": ($event) => form.phone = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_button, {
                          type: "primary",
                          onClick: handleSave
                        }, {
                          default: withCtx(() => [
                            createTextVNode("保存修改")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { style: { "text-align": "center", "margin-bottom": "24px" } }, [
                createVNode(_component_el_avatar, {
                  size: 80,
                  style: { "background": "#c0392b", "font-size": "2rem", "margin-bottom": "12px" }
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(userStore).user?.nickname?.[0] || "U"), 1)
                  ]),
                  _: 1
                }),
                createVNode("h3", null, toDisplayString(unref(userStore).user?.nickname || unref(userStore).user?.username), 1),
                createVNode(_component_el_tag, {
                  type: unref(userStore).isAdmin ? "danger" : "primary",
                  size: "small"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(userStore).isAdmin ? "管理员" : "普通用户"), 1)
                  ]),
                  _: 1
                }, 8, ["type"])
              ]),
              createVNode(_component_el_form, {
                model: form,
                "label-width": "60px"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, { label: "昵称" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.nickname,
                        "onUpdate:modelValue": ($event) => form.nickname = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "邮箱" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.email,
                        "onUpdate:modelValue": ($event) => form.email = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "手机" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.phone,
                        "onUpdate:modelValue": ($event) => form.phone = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, null, {
                    default: withCtx(() => [
                      createVNode(_component_el_button, {
                        type: "primary",
                        onClick: handleSave
                      }, {
                        default: withCtx(() => [
                          createTextVNode("保存修改")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=profile-BfHVtxs6.js.map
