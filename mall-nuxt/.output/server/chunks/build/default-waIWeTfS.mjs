import { _ as __nuxt_component_0 } from './nuxt-link-iTsWrgYA.mjs';
import { _ as _export_sfc, j as __nuxt_component_1, d as useRuntimeConfig, n as navigateTo } from './server.mjs';
import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, unref, toDisplayString, createTextVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useUserStore } from './user-OpFIMyWU.mjs';
import { u as useCartStore } from './cart-D9jsw7kE.mjs';
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
import 'element-plus';
import 'element-plus/es/locale/lang/zh-cn';
import '@element-plus/icons-vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const userStore = useUserStore();
    const cartStore = useCartStore();
    const keyword = ref("");
    function doSearch() {
      if (keyword.value.trim()) {
        navigateTo({ path: "/products", query: { keyword: keyword.value.trim() } });
      }
    }
    function handleCommand(cmd) {
      if (cmd === "logout") {
        userStore.logout();
        cartStore.$reset();
        navigateTo("/");
      } else if (cmd === "admin") {
        navigateTo("/admin");
      } else {
        navigateTo("/" + cmd);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_el_icon = resolveComponent("el-icon");
      const _component_Shop = resolveComponent("Shop");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_button = resolveComponent("el-button");
      const _component_Search = resolveComponent("Search");
      const _component_el_badge = resolveComponent("el-badge");
      const _component_ShoppingCart = resolveComponent("ShoppingCart");
      const _component_el_dropdown = resolveComponent("el-dropdown");
      const _component_el_avatar = resolveComponent("el-avatar");
      const _component_el_dropdown_menu = resolveComponent("el-dropdown-menu");
      const _component_el_dropdown_item = resolveComponent("el-dropdown-item");
      const _component_Document = resolveComponent("Document");
      const _component_User = resolveComponent("User");
      const _component_Setting = resolveComponent("Setting");
      const _component_SwitchButton = resolveComponent("SwitchButton");
      const _component_NuxtPage = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "front-layout" }, _attrs))} data-v-b58fd6ef><header class="front-header" data-v-b58fd6ef><div class="header-inner" data-v-b58fd6ef>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "logo"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_icon, { size: 24 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Shop, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Shop)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<span data-v-b58fd6ef${_scopeId}>${ssrInterpolate(unref(config).public.appName)}</span>`);
          } else {
            return [
              createVNode(_component_el_icon, { size: 24 }, {
                default: withCtx(() => [
                  createVNode(_component_Shop)
                ]),
                _: 1
              }),
              createVNode("span", null, toDisplayString(unref(config).public.appName), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="search-wrap" data-v-b58fd6ef>`);
      _push(ssrRenderComponent(_component_el_input, {
        modelValue: keyword.value,
        "onUpdate:modelValue": ($event) => keyword.value = $event,
        placeholder: "\u641C\u7D22\u4F60\u60F3\u8981\u7684\u597D\u7269...",
        size: "large",
        clearable: "",
        onKeydown: doSearch
      }, {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, { onClick: doSearch }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Search, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Search)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(_component_Search)
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
              createVNode(_component_el_button, { onClick: doSearch }, {
                default: withCtx(() => [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(_component_Search)
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
      }, _parent));
      _push(`</div><div class="header-actions" data-v-b58fd6ef>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "action-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u9996\u9875`);
          } else {
            return [
              createTextVNode("\u9996\u9875")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products",
        class: "action-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u5546\u54C1`);
          } else {
            return [
              createTextVNode("\u5546\u54C1")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/cart",
        class: "action-link cart-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_badge, {
              value: unref(cartStore).totalCount,
              hidden: !unref(cartStore).totalCount,
              max: 99
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_icon, { size: 22 }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ShoppingCart, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ShoppingCart)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_icon, { size: 22 }, {
                      default: withCtx(() => [
                        createVNode(_component_ShoppingCart)
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
              createVNode(_component_el_badge, {
                value: unref(cartStore).totalCount,
                hidden: !unref(cartStore).totalCount,
                max: 99
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_icon, { size: 22 }, {
                    default: withCtx(() => [
                      createVNode(_component_ShoppingCart)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["value", "hidden"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(userStore).isLoggedIn) {
        _push(ssrRenderComponent(_component_el_dropdown, {
          trigger: "click",
          onCommand: handleCommand
        }, {
          dropdown: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_dropdown_menu, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_dropdown_item, { command: "orders" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_icon, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_Document, null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_Document)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(` \u6211\u7684\u8BA2\u5355 `);
                        } else {
                          return [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(_component_Document)
                              ]),
                              _: 1
                            }),
                            createTextVNode(" \u6211\u7684\u8BA2\u5355 ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_dropdown_item, { command: "profile" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_icon, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_User, null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_User)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(` \u4E2A\u4EBA\u4E2D\u5FC3 `);
                        } else {
                          return [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(_component_User)
                              ]),
                              _: 1
                            }),
                            createTextVNode(" \u4E2A\u4EBA\u4E2D\u5FC3 ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    if (unref(userStore).isAdmin) {
                      _push3(ssrRenderComponent(_component_el_dropdown_item, {
                        command: "admin",
                        divided: ""
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_el_icon, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(_component_Setting, null, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(_component_Setting)
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                            _push4(` \u540E\u53F0\u7BA1\u7406 `);
                          } else {
                            return [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(_component_Setting)
                                ]),
                                _: 1
                              }),
                              createTextVNode(" \u540E\u53F0\u7BA1\u7406 ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(_component_el_dropdown_item, {
                      command: "logout",
                      divided: ""
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_icon, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_SwitchButton, null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_SwitchButton)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(` \u9000\u51FA\u767B\u5F55 `);
                        } else {
                          return [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(_component_SwitchButton)
                              ]),
                              _: 1
                            }),
                            createTextVNode(" \u9000\u51FA\u767B\u5F55 ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_dropdown_item, { command: "orders" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(_component_Document)
                            ]),
                            _: 1
                          }),
                          createTextVNode(" \u6211\u7684\u8BA2\u5355 ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_dropdown_item, { command: "profile" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(_component_User)
                            ]),
                            _: 1
                          }),
                          createTextVNode(" \u4E2A\u4EBA\u4E2D\u5FC3 ")
                        ]),
                        _: 1
                      }),
                      unref(userStore).isAdmin ? (openBlock(), createBlock(_component_el_dropdown_item, {
                        key: 0,
                        command: "admin",
                        divided: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(_component_Setting)
                            ]),
                            _: 1
                          }),
                          createTextVNode(" \u540E\u53F0\u7BA1\u7406 ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode(_component_el_dropdown_item, {
                        command: "logout",
                        divided: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(_component_SwitchButton)
                            ]),
                            _: 1
                          }),
                          createTextVNode(" \u9000\u51FA\u767B\u5F55 ")
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
                createVNode(_component_el_dropdown_menu, null, {
                  default: withCtx(() => [
                    createVNode(_component_el_dropdown_item, { command: "orders" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(_component_Document)
                          ]),
                          _: 1
                        }),
                        createTextVNode(" \u6211\u7684\u8BA2\u5355 ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_dropdown_item, { command: "profile" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(_component_User)
                          ]),
                          _: 1
                        }),
                        createTextVNode(" \u4E2A\u4EBA\u4E2D\u5FC3 ")
                      ]),
                      _: 1
                    }),
                    unref(userStore).isAdmin ? (openBlock(), createBlock(_component_el_dropdown_item, {
                      key: 0,
                      command: "admin",
                      divided: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(_component_Setting)
                          ]),
                          _: 1
                        }),
                        createTextVNode(" \u540E\u53F0\u7BA1\u7406 ")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(_component_el_dropdown_item, {
                      command: "logout",
                      divided: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(_component_SwitchButton)
                          ]),
                          _: 1
                        }),
                        createTextVNode(" \u9000\u51FA\u767B\u5F55 ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b, _c, _d;
            if (_push2) {
              _push2(`<span class="user-trigger" data-v-b58fd6ef${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_avatar, {
                size: 32,
                style: { "background": "#c0392b" }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a2, _b2, _c2, _d2, _e, _f, _g, _h;
                  if (_push3) {
                    _push3(`${ssrInterpolate(((_b2 = (_a2 = unref(userStore).user) == null ? void 0 : _a2.nickname) == null ? void 0 : _b2[0]) || ((_d2 = (_c2 = unref(userStore).user) == null ? void 0 : _c2.username) == null ? void 0 : _d2[0]) || "U")}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(((_f = (_e = unref(userStore).user) == null ? void 0 : _e.nickname) == null ? void 0 : _f[0]) || ((_h = (_g = unref(userStore).user) == null ? void 0 : _g.username) == null ? void 0 : _h[0]) || "U"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<span class="user-name" data-v-b58fd6ef${_scopeId}>${ssrInterpolate(((_a = unref(userStore).user) == null ? void 0 : _a.nickname) || ((_b = unref(userStore).user) == null ? void 0 : _b.username))}</span></span>`);
            } else {
              return [
                createVNode("span", { class: "user-trigger" }, [
                  createVNode(_component_el_avatar, {
                    size: 32,
                    style: { "background": "#c0392b" }
                  }, {
                    default: withCtx(() => {
                      var _a2, _b2, _c2, _d2;
                      return [
                        createTextVNode(toDisplayString(((_b2 = (_a2 = unref(userStore).user) == null ? void 0 : _a2.nickname) == null ? void 0 : _b2[0]) || ((_d2 = (_c2 = unref(userStore).user) == null ? void 0 : _c2.username) == null ? void 0 : _d2[0]) || "U"), 1)
                      ];
                    }),
                    _: 1
                  }),
                  createVNode("span", { class: "user-name" }, toDisplayString(((_c = unref(userStore).user) == null ? void 0 : _c.nickname) || ((_d = unref(userStore).user) == null ? void 0 : _d.username)), 1)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/login" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_button, {
                type: "primary",
                round: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`\u767B\u5F55`);
                  } else {
                    return [
                      createTextVNode("\u767B\u5F55")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_button, {
                  type: "primary",
                  round: ""
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u767B\u5F55")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div></div></header><main class="front-main" data-v-b58fd6ef>`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</main><footer class="front-footer" data-v-b58fd6ef><p data-v-b58fd6ef>\xA9 2026 MallShop \xB7 Vue 3 + Element Plus + Express + MySQL \u5168\u6808\u5546\u57CE</p></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b58fd6ef"]]);

export { _default as default };
//# sourceMappingURL=default-waIWeTfS.mjs.map
