import { defineComponent, reactive, resolveComponent, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { u as useUserStore } from './user-OpFIMyWU.mjs';
import { ElMessage } from 'element-plus';
import { u as useSeoMeta } from './v3-DqToCt8T.mjs';
import { u as useNuxtApp } from './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import 'axios';
import 'element-plus/es/locale/lang/zh-cn';
import '@element-plus/icons-vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    const form = reactive({ nickname: "", email: "", phone: "" });
    useSeoMeta({
      title: "\u4E2A\u4EBA\u4E2D\u5FC3 - MallShop",
      description: "\u7BA1\u7406\u4E2A\u4EBA\u4FE1\u606F"
    });
    async function handleSave() {
      const { $api } = useNuxtApp();
      const res = await $api.put("/auth/profile", form);
      if (res.code === 200) {
        ElMessage.success("\u4FDD\u5B58\u6210\u529F");
        await userStore.fetchProfile();
      } else {
        ElMessage.error("\u4FDD\u5B58\u5931\u8D25");
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
            _push2(`<span style="${ssrRenderStyle({ "font-size": "1.2rem", "font-weight": "600" })}"${_scopeId}>\u4E2A\u4EBA\u4E2D\u5FC3</span>`);
          } else {
            return [
              createVNode("span", { style: { "font-size": "1.2rem", "font-weight": "600" } }, "\u4E2A\u4EBA\u4E2D\u5FC3")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "text-align": "center", "margin-bottom": "24px" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_avatar, {
              size: 80,
              style: { "background": "#c0392b", "font-size": "2rem", "margin-bottom": "12px" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2, _c2, _d2;
                if (_push3) {
                  _push3(`${ssrInterpolate(((_b2 = (_a2 = unref(userStore).user) == null ? void 0 : _a2.nickname) == null ? void 0 : _b2[0]) || "U")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(((_d2 = (_c2 = unref(userStore).user) == null ? void 0 : _c2.nickname) == null ? void 0 : _d2[0]) || "U"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3${_scopeId}>${ssrInterpolate(((_a = unref(userStore).user) == null ? void 0 : _a.nickname) || ((_b = unref(userStore).user) == null ? void 0 : _b.username))}</h3>`);
            _push2(ssrRenderComponent(_component_el_tag, {
              type: unref(userStore).isAdmin ? "danger" : "primary",
              size: "small"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(userStore).isAdmin ? "\u7BA1\u7406\u5458" : "\u666E\u901A\u7528\u6237")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(userStore).isAdmin ? "\u7BA1\u7406\u5458" : "\u666E\u901A\u7528\u6237"), 1)
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
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u6635\u79F0" }, {
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
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u90AE\u7BB1" }, {
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
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u624B\u673A" }, {
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
                              _push5(`\u4FDD\u5B58\u4FEE\u6539`);
                            } else {
                              return [
                                createTextVNode("\u4FDD\u5B58\u4FEE\u6539")
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
                              createTextVNode("\u4FDD\u5B58\u4FEE\u6539")
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
                    createVNode(_component_el_form_item, { label: "\u6635\u79F0" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.nickname,
                          "onUpdate:modelValue": ($event) => form.nickname = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "\u90AE\u7BB1" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.email,
                          "onUpdate:modelValue": ($event) => form.email = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "\u624B\u673A" }, {
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
                            createTextVNode("\u4FDD\u5B58\u4FEE\u6539")
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
                  default: withCtx(() => {
                    var _a2, _b2;
                    return [
                      createTextVNode(toDisplayString(((_b2 = (_a2 = unref(userStore).user) == null ? void 0 : _a2.nickname) == null ? void 0 : _b2[0]) || "U"), 1)
                    ];
                  }),
                  _: 1
                }),
                createVNode("h3", null, toDisplayString(((_c = unref(userStore).user) == null ? void 0 : _c.nickname) || ((_d = unref(userStore).user) == null ? void 0 : _d.username)), 1),
                createVNode(_component_el_tag, {
                  type: unref(userStore).isAdmin ? "danger" : "primary",
                  size: "small"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(userStore).isAdmin ? "\u7BA1\u7406\u5458" : "\u666E\u901A\u7528\u6237"), 1)
                  ]),
                  _: 1
                }, 8, ["type"])
              ]),
              createVNode(_component_el_form, {
                model: form,
                "label-width": "60px"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, { label: "\u6635\u79F0" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.nickname,
                        "onUpdate:modelValue": ($event) => form.nickname = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "\u90AE\u7BB1" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.email,
                        "onUpdate:modelValue": ($event) => form.email = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "\u624B\u673A" }, {
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
                          createTextVNode("\u4FDD\u5B58\u4FEE\u6539")
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

export { _sfc_main as default };
//# sourceMappingURL=profile-BfHVtxs6.mjs.map
