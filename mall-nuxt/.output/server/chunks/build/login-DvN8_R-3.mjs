import { _ as __nuxt_component_0 } from './nuxt-link-iTsWrgYA.mjs';
import { defineComponent, ref, reactive, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, withKeys, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { u as useSeoMeta } from './v3-DqToCt8T.mjs';
import { _ as _export_sfc, a as useRoute, b as useCookie, n as navigateTo } from './server.mjs';
import { u as useUserStore } from './user-OpFIMyWU.mjs';
import { u as useCartStore } from './cart-D9jsw7kE.mjs';
import { ElMessage } from 'element-plus';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const userStore = useUserStore();
    const cartStore = useCartStore();
    const formRef = ref();
    const loading = ref(false);
    useSeoMeta({
      title: "\u767B\u5F55 - MallShop",
      description: "\u767B\u5F55 MallShop \u5546\u57CE\u7CFB\u7EDF"
    });
    const form = reactive({ username: "", password: "" });
    const rules = {
      username: [{ required: true, message: "\u8BF7\u8F93\u5165\u7528\u6237\u540D", trigger: "blur" }],
      password: [{ required: true, message: "\u8BF7\u8F93\u5165\u5BC6\u7801", trigger: "blur" }]
    };
    async function handleLogin() {
      await formRef.value.validate();
      loading.value = true;
      const res = await userStore.login(form);
      if (res.code === 200) {
        useCookie("mall_token").value = res.data.token;
        useCookie("mall_user").value = JSON.stringify(res.data.user);
        ElMessage.success("\u767B\u5F55\u6210\u529F");
        await cartStore.fetch();
        const redirect = route.query.redirect || (res.data.user.role === "admin" ? "/admin" : "/");
        navigateTo(redirect);
      } else {
        ElMessage.error(res.message || "\u767B\u5F55\u5931\u8D25");
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
            _push2(`<h2 style="${ssrRenderStyle({ "text-align": "center", "margin-bottom": "8px" })}" data-v-02fd1193${_scopeId}>\u6B22\u8FCE\u56DE\u6765</h2><p style="${ssrRenderStyle({ "text-align": "center", "color": "#909399", "margin-bottom": "32px" })}" data-v-02fd1193${_scopeId}>MallShop \u5546\u57CE\u7CFB\u7EDF</p>`);
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
                          placeholder: "\u7528\u6237\u540D",
                          "prefix-icon": "User"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.username,
                            "onUpdate:modelValue": ($event) => form.username = $event,
                            size: "large",
                            placeholder: "\u7528\u6237\u540D",
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
                          placeholder: "\u5BC6\u7801",
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
                            placeholder: "\u5BC6\u7801",
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
                              _push5(` \u767B \u5F55 `);
                            } else {
                              return [
                                createTextVNode(" \u767B \u5F55 ")
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
                              createTextVNode(" \u767B \u5F55 ")
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
                          placeholder: "\u7528\u6237\u540D",
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
                          placeholder: "\u5BC6\u7801",
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
                            createTextVNode(" \u767B \u5F55 ")
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
            _push2(`<div style="${ssrRenderStyle({ "text-align": "center", "font-size": "0.9rem", "color": "#606266" })}" data-v-02fd1193${_scopeId}> \u8FD8\u6CA1\u6709\u8D26\u53F7\uFF1F `);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/register",
              style: { "color": "#c0392b", "font-weight": "500" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u7ACB\u5373\u6CE8\u518C`);
                } else {
                  return [
                    createTextVNode("\u7ACB\u5373\u6CE8\u518C")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_el_divider, null, null, _parent2, _scopeId));
            _push2(`<div style="${ssrRenderStyle({ "text-align": "center", "font-size": "0.8rem", "color": "#c0c4cc" })}" data-v-02fd1193${_scopeId}> \u7BA1\u7406\u5458: admin / admin123 \xA0|\xA0 \u7528\u6237: test / test123 </div>`);
          } else {
            return [
              createVNode("h2", { style: { "text-align": "center", "margin-bottom": "8px" } }, "\u6B22\u8FCE\u56DE\u6765"),
              createVNode("p", { style: { "text-align": "center", "color": "#909399", "margin-bottom": "32px" } }, "MallShop \u5546\u57CE\u7CFB\u7EDF"),
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
                        placeholder: "\u7528\u6237\u540D",
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
                        placeholder: "\u5BC6\u7801",
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
                          createTextVNode(" \u767B \u5F55 ")
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
                createTextVNode(" \u8FD8\u6CA1\u6709\u8D26\u53F7\uFF1F "),
                createVNode(_component_NuxtLink, {
                  to: "/register",
                  style: { "color": "#c0392b", "font-weight": "500" }
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u7ACB\u5373\u6CE8\u518C")
                  ]),
                  _: 1
                })
              ]),
              createVNode(_component_el_divider),
              createVNode("div", { style: { "text-align": "center", "font-size": "0.8rem", "color": "#c0c4cc" } }, " \u7BA1\u7406\u5458: admin / admin123 \xA0|\xA0 \u7528\u6237: test / test123 ")
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

export { login as default };
//# sourceMappingURL=login-DvN8_R-3.mjs.map
