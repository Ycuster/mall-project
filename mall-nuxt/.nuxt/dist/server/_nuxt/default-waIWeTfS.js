import { _ as __nuxt_component_0 } from "./nuxt-link-iTsWrgYA.js";
import { j as __nuxt_component_1, d as useRuntimeConfig, n as navigateTo, _ as _export_sfc } from "../server.mjs";
import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, unref, toDisplayString, createTextVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/defu/dist/defu.mjs";
import { u as useUserStore } from "./user-OpFIMyWU.js";
import { u as useCartStore } from "./cart-D9jsw7kE.js";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/ufo/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/ofetch/dist/node.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/hookable/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/unctx/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/h3/dist/index.mjs";
import "vue-router";
import "axios";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/cookie-es/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/destr/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/ohash/dist/index.mjs";
import "element-plus";
import "element-plus/es/locale/lang/zh-cn";
import "@element-plus/icons-vue";
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
        placeholder: "搜索你想要的好物...",
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
            _push2(`首页`);
          } else {
            return [
              createTextVNode("首页")
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
            _push2(`商品`);
          } else {
            return [
              createTextVNode("商品")
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
                          _push4(` 我的订单 `);
                        } else {
                          return [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(_component_Document)
                              ]),
                              _: 1
                            }),
                            createTextVNode(" 我的订单 ")
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
                          _push4(` 个人中心 `);
                        } else {
                          return [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(_component_User)
                              ]),
                              _: 1
                            }),
                            createTextVNode(" 个人中心 ")
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
                            _push4(` 后台管理 `);
                          } else {
                            return [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(_component_Setting)
                                ]),
                                _: 1
                              }),
                              createTextVNode(" 后台管理 ")
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
                          _push4(` 退出登录 `);
                        } else {
                          return [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(_component_SwitchButton)
                              ]),
                              _: 1
                            }),
                            createTextVNode(" 退出登录 ")
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
                          createTextVNode(" 我的订单 ")
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
                          createTextVNode(" 个人中心 ")
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
                          createTextVNode(" 后台管理 ")
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
                          createTextVNode(" 退出登录 ")
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
                        createTextVNode(" 我的订单 ")
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
                        createTextVNode(" 个人中心 ")
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
                        createTextVNode(" 后台管理 ")
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
                        createTextVNode(" 退出登录 ")
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
            if (_push2) {
              _push2(`<span class="user-trigger" data-v-b58fd6ef${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_avatar, {
                size: 32,
                style: { "background": "#c0392b" }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(userStore).user?.nickname?.[0] || unref(userStore).user?.username?.[0] || "U")}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(userStore).user?.nickname?.[0] || unref(userStore).user?.username?.[0] || "U"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<span class="user-name" data-v-b58fd6ef${_scopeId}>${ssrInterpolate(unref(userStore).user?.nickname || unref(userStore).user?.username)}</span></span>`);
            } else {
              return [
                createVNode("span", { class: "user-trigger" }, [
                  createVNode(_component_el_avatar, {
                    size: 32,
                    style: { "background": "#c0392b" }
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(userStore).user?.nickname?.[0] || unref(userStore).user?.username?.[0] || "U"), 1)
                    ]),
                    _: 1
                  }),
                  createVNode("span", { class: "user-name" }, toDisplayString(unref(userStore).user?.nickname || unref(userStore).user?.username), 1)
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
                    _push3(`登录`);
                  } else {
                    return [
                      createTextVNode("登录")
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
                    createTextVNode("登录")
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
      _push(`</main><footer class="front-footer" data-v-b58fd6ef><p data-v-b58fd6ef>© 2026 MallShop · Vue 3 + Element Plus + Express + MySQL 全栈商城</p></footer></div>`);
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
export {
  _default as default
};
//# sourceMappingURL=default-waIWeTfS.js.map
