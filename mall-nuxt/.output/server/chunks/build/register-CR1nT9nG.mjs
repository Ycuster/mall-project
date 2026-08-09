import { _ as __nuxt_component_0 } from './nuxt-link-iTsWrgYA.mjs';
import { defineComponent, ref, reactive, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, withKeys, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { ElMessage } from 'element-plus';
import { u as useSeoMeta } from './v3-DqToCt8T.mjs';
import { _ as _export_sfc, u as useNuxtApp, n as navigateTo } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import 'axios';
import 'element-plus/es/locale/lang/zh-cn';
import '@element-plus/icons-vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const formRef = ref();
    const loading = ref(false);
    useSeoMeta({
      title: "\u6CE8\u518C - MallShop",
      description: "\u6CE8\u518C MallShop \u5546\u57CE\u8D26\u53F7"
    });
    const form = reactive({ username: "", password: "", nickname: "" });
    const rules = {
      username: [
        { required: true, message: "\u8BF7\u8F93\u5165\u7528\u6237\u540D", trigger: "blur" },
        { min: 3, max: 20, message: "\u957F\u5EA63-20\u4E2A\u5B57\u7B26", trigger: "blur" }
      ],
      password: [
        { required: true, message: "\u8BF7\u8F93\u5165\u5BC6\u7801", trigger: "blur" },
        { min: 6, message: "\u5BC6\u7801\u4E0D\u5C11\u4E8E6\u4F4D", trigger: "blur" }
      ]
    };
    async function handleRegister() {
      await formRef.value.validate();
      loading.value = true;
      const { $api } = useNuxtApp();
      const res = await $api.post("/auth/register", form);
      if (res.code === 200) {
        ElMessage.success("\u6CE8\u518C\u6210\u529F\uFF0C\u8BF7\u767B\u5F55");
        navigateTo("/login");
      } else {
        ElMessage.error(res.message || "\u6CE8\u518C\u5931\u8D25");
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
            _push2(`<h2 style="${ssrRenderStyle({ "text-align": "center", "margin-bottom": "32px" })}" data-v-b246f5ba${_scopeId}>\u521B\u5EFA\u8D26\u53F7</h2>`);
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
                          placeholder: "\u7528\u6237\u540D (3-20\u4F4D)",
                          "prefix-icon": "User"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.username,
                            "onUpdate:modelValue": ($event) => form.username = $event,
                            size: "large",
                            placeholder: "\u7528\u6237\u540D (3-20\u4F4D)",
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
                          placeholder: "\u5BC6\u7801 (\u4E0D\u5C11\u4E8E6\u4F4D)",
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
                            placeholder: "\u5BC6\u7801 (\u4E0D\u5C11\u4E8E6\u4F4D)",
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
                          placeholder: "\u6635\u79F0 (\u9009\u586B)",
                          "prefix-icon": "UserFilled"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.nickname,
                            "onUpdate:modelValue": ($event) => form.nickname = $event,
                            size: "large",
                            placeholder: "\u6635\u79F0 (\u9009\u586B)",
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
                              _push5(` \u6CE8 \u518C `);
                            } else {
                              return [
                                createTextVNode(" \u6CE8 \u518C ")
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
                              createTextVNode(" \u6CE8 \u518C ")
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
                          placeholder: "\u7528\u6237\u540D (3-20\u4F4D)",
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
                          placeholder: "\u5BC6\u7801 (\u4E0D\u5C11\u4E8E6\u4F4D)",
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
                          placeholder: "\u6635\u79F0 (\u9009\u586B)",
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
                            createTextVNode(" \u6CE8 \u518C ")
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
            _push2(`<div style="${ssrRenderStyle({ "text-align": "center", "font-size": "0.9rem", "color": "#606266" })}" data-v-b246f5ba${_scopeId}> \u5DF2\u6709\u8D26\u53F7\uFF1F `);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/login",
              style: { "color": "#c0392b", "font-weight": "500" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u53BB\u767B\u5F55`);
                } else {
                  return [
                    createTextVNode("\u53BB\u767B\u5F55")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("h2", { style: { "text-align": "center", "margin-bottom": "32px" } }, "\u521B\u5EFA\u8D26\u53F7"),
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
                        placeholder: "\u7528\u6237\u540D (3-20\u4F4D)",
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
                        placeholder: "\u5BC6\u7801 (\u4E0D\u5C11\u4E8E6\u4F4D)",
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
                        placeholder: "\u6635\u79F0 (\u9009\u586B)",
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
                          createTextVNode(" \u6CE8 \u518C ")
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
                createTextVNode(" \u5DF2\u6709\u8D26\u53F7\uFF1F "),
                createVNode(_component_NuxtLink, {
                  to: "/login",
                  style: { "color": "#c0392b", "font-weight": "500" }
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u53BB\u767B\u5F55")
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

export { register as default };
//# sourceMappingURL=register-CR1nT9nG.mjs.map
