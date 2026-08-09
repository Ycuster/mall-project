import { _ as __nuxt_component_0 } from './nuxt-link-iTsWrgYA.mjs';
import { _ as _export_sfc, a as useRoute, j as __nuxt_component_1, n as navigateTo } from './server.mjs';
import { defineComponent, ref, computed, resolveComponent, mergeProps, withCtx, createVNode, unref, createTextVNode, withDirectives, vShow, resolveDynamicComponent, openBlock, createBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderStyle, ssrRenderVNode, ssrInterpolate } from 'vue/server-renderer';
import { u as useUserStore } from './user-OpFIMyWU.mjs';
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
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const userStore = useUserStore();
    const isCollapse = ref(false);
    const titleMap = {
      "/admin/dashboard": "\u6570\u636E\u770B\u677F",
      "/admin/products": "\u5546\u54C1\u7BA1\u7406",
      "/admin/categories": "\u5206\u7C7B\u7BA1\u7406",
      "/admin/orders": "\u8BA2\u5355\u7BA1\u7406",
      "/admin/users": "\u7528\u6237\u7BA1\u7406"
    };
    const currentTitle = computed(() => titleMap[route.path] || "");
    function handleCommand(cmd) {
      if (cmd === "logout") {
        userStore.logout();
        navigateTo("/login");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_container = resolveComponent("el-container");
      const _component_el_aside = resolveComponent("el-aside");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_Shop = resolveComponent("Shop");
      const _component_el_menu = resolveComponent("el-menu");
      const _component_el_menu_item = resolveComponent("el-menu-item");
      const _component_DataAnalysis = resolveComponent("DataAnalysis");
      const _component_Goods = resolveComponent("Goods");
      const _component_Menu = resolveComponent("Menu");
      const _component_Document = resolveComponent("Document");
      const _component_User = resolveComponent("User");
      const _component_el_header = resolveComponent("el-header");
      const _component_el_breadcrumb = resolveComponent("el-breadcrumb");
      const _component_el_breadcrumb_item = resolveComponent("el-breadcrumb-item");
      const _component_NuxtLink = __nuxt_component_0;
      const _component_HomeFilled = resolveComponent("HomeFilled");
      const _component_el_dropdown = resolveComponent("el-dropdown");
      const _component_el_avatar = resolveComponent("el-avatar");
      const _component_el_dropdown_menu = resolveComponent("el-dropdown-menu");
      const _component_el_dropdown_item = resolveComponent("el-dropdown-item");
      const _component_SwitchButton = resolveComponent("SwitchButton");
      const _component_el_main = resolveComponent("el-main");
      const _component_NuxtPage = __nuxt_component_1;
      _push(ssrRenderComponent(_component_el_container, mergeProps({ class: "admin-layout" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_aside, {
              width: isCollapse.value ? "64px" : "220px",
              class: "admin-aside"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="${ssrRenderClass([{ collapsed: isCollapse.value }, "aside-logo"])}" data-v-fb04caa5${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_icon, { size: 24 }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Shop, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Shop)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<span style="${ssrRenderStyle(!isCollapse.value ? null : { display: "none" })}" data-v-fb04caa5${_scopeId2}>MallShop</span></div>`);
                  _push3(ssrRenderComponent(_component_el_menu, {
                    "default-active": unref(route).path,
                    collapse: isCollapse.value,
                    "collapse-transition": false,
                    class: "aside-menu",
                    "background-color": "#001529",
                    "text-color": "rgba(255,255,255,0.65)",
                    "active-text-color": "#fff"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_menu_item, { index: "/admin/dashboard" }, {
                          title: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`\u6570\u636E\u770B\u677F`);
                            } else {
                              return [
                                createTextVNode("\u6570\u636E\u770B\u677F")
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_icon, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_DataAnalysis, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_DataAnalysis)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_DataAnalysis)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_menu_item, { index: "/admin/products" }, {
                          title: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`\u5546\u54C1\u7BA1\u7406`);
                            } else {
                              return [
                                createTextVNode("\u5546\u54C1\u7BA1\u7406")
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_icon, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_Goods, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_Goods)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_Goods)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_menu_item, { index: "/admin/categories" }, {
                          title: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`\u5206\u7C7B\u7BA1\u7406`);
                            } else {
                              return [
                                createTextVNode("\u5206\u7C7B\u7BA1\u7406")
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_icon, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_Menu, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_Menu)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_Menu)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_menu_item, { index: "/admin/orders" }, {
                          title: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`\u8BA2\u5355\u7BA1\u7406`);
                            } else {
                              return [
                                createTextVNode("\u8BA2\u5355\u7BA1\u7406")
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_icon, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_Document, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_Document)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_Document)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_menu_item, { index: "/admin/users" }, {
                          title: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`\u7528\u6237\u7BA1\u7406`);
                            } else {
                              return [
                                createTextVNode("\u7528\u6237\u7BA1\u7406")
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_icon, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_User, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_User)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_User)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_menu_item, { index: "/admin/dashboard" }, {
                            title: withCtx(() => [
                              createTextVNode("\u6570\u636E\u770B\u677F")
                            ]),
                            default: withCtx(() => [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(_component_DataAnalysis)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_menu_item, { index: "/admin/products" }, {
                            title: withCtx(() => [
                              createTextVNode("\u5546\u54C1\u7BA1\u7406")
                            ]),
                            default: withCtx(() => [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(_component_Goods)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_menu_item, { index: "/admin/categories" }, {
                            title: withCtx(() => [
                              createTextVNode("\u5206\u7C7B\u7BA1\u7406")
                            ]),
                            default: withCtx(() => [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(_component_Menu)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_menu_item, { index: "/admin/orders" }, {
                            title: withCtx(() => [
                              createTextVNode("\u8BA2\u5355\u7BA1\u7406")
                            ]),
                            default: withCtx(() => [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(_component_Document)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_menu_item, { index: "/admin/users" }, {
                            title: withCtx(() => [
                              createTextVNode("\u7528\u6237\u7BA1\u7406")
                            ]),
                            default: withCtx(() => [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(_component_User)
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", {
                      class: ["aside-logo", { collapsed: isCollapse.value }]
                    }, [
                      createVNode(_component_el_icon, { size: 24 }, {
                        default: withCtx(() => [
                          createVNode(_component_Shop)
                        ]),
                        _: 1
                      }),
                      withDirectives(createVNode("span", null, "MallShop", 512), [
                        [vShow, !isCollapse.value]
                      ])
                    ], 2),
                    createVNode(_component_el_menu, {
                      "default-active": unref(route).path,
                      collapse: isCollapse.value,
                      "collapse-transition": false,
                      class: "aside-menu",
                      "background-color": "#001529",
                      "text-color": "rgba(255,255,255,0.65)",
                      "active-text-color": "#fff"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_menu_item, { index: "/admin/dashboard" }, {
                          title: withCtx(() => [
                            createTextVNode("\u6570\u636E\u770B\u677F")
                          ]),
                          default: withCtx(() => [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(_component_DataAnalysis)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_menu_item, { index: "/admin/products" }, {
                          title: withCtx(() => [
                            createTextVNode("\u5546\u54C1\u7BA1\u7406")
                          ]),
                          default: withCtx(() => [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(_component_Goods)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_menu_item, { index: "/admin/categories" }, {
                          title: withCtx(() => [
                            createTextVNode("\u5206\u7C7B\u7BA1\u7406")
                          ]),
                          default: withCtx(() => [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(_component_Menu)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_menu_item, { index: "/admin/orders" }, {
                          title: withCtx(() => [
                            createTextVNode("\u8BA2\u5355\u7BA1\u7406")
                          ]),
                          default: withCtx(() => [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(_component_Document)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_menu_item, { index: "/admin/users" }, {
                          title: withCtx(() => [
                            createTextVNode("\u7528\u6237\u7BA1\u7406")
                          ]),
                          default: withCtx(() => [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(_component_User)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["default-active", "collapse"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_container, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_header, { class: "admin-header" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "16px" })}" data-v-fb04caa5${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_el_icon, {
                          size: 20,
                          style: { "cursor": "pointer", "color": "#606266" },
                          onClick: ($event) => isCollapse.value = !isCollapse.value
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              ssrRenderVNode(_push5, createVNode(resolveDynamicComponent(isCollapse.value ? "Expand" : "Fold"), null, null), _parent5, _scopeId4);
                            } else {
                              return [
                                (openBlock(), createBlock(resolveDynamicComponent(isCollapse.value ? "Expand" : "Fold")))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_breadcrumb, { separator: "/" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_breadcrumb_item, { to: { path: "/admin/dashboard" } }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`\u9996\u9875`);
                                  } else {
                                    return [
                                      createTextVNode("\u9996\u9875")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_breadcrumb_item, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(currentTitle.value)}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(currentTitle.value), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_breadcrumb_item, { to: { path: "/admin/dashboard" } }, {
                                  default: withCtx(() => [
                                    createTextVNode("\u9996\u9875")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_breadcrumb_item, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(currentTitle.value), 1)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "16px" })}" data-v-fb04caa5${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_NuxtLink, {
                          to: "/",
                          style: { "color": "#606266", "font-size": "0.85rem" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_icon, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_HomeFilled, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_HomeFilled)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(` \u56DE\u5230\u524D\u53F0 `);
                            } else {
                              return [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_HomeFilled)
                                  ]),
                                  _: 1
                                }),
                                createTextVNode(" \u56DE\u5230\u524D\u53F0 ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_dropdown, {
                          trigger: "click",
                          onCommand: handleCommand
                        }, {
                          dropdown: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_dropdown_menu, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_dropdown_item, { command: "logout" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_el_icon, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_SwitchButton, null, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_SwitchButton)
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(` \u9000\u51FA\u767B\u5F55 `);
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
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_dropdown_item, { command: "logout" }, {
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_dropdown_menu, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_dropdown_item, { command: "logout" }, {
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
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            var _a, _b;
                            if (_push5) {
                              _push5(`<span style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "8px", "cursor": "pointer" })}" data-v-fb04caa5${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_el_avatar, {
                                size: 32,
                                style: { "background": "#c0392b" }
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  var _a2, _b2, _c, _d, _e, _f;
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(((_c = (_b2 = (_a2 = unref(userStore).user) == null ? void 0 : _a2.username) == null ? void 0 : _b2[0]) == null ? void 0 : _c.toUpperCase()) || "A")}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(((_f = (_e = (_d = unref(userStore).user) == null ? void 0 : _d.username) == null ? void 0 : _e[0]) == null ? void 0 : _f.toUpperCase()) || "A"), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<span style="${ssrRenderStyle({ "font-size": "0.9rem" })}" data-v-fb04caa5${_scopeId4}>${ssrInterpolate((_a = unref(userStore).user) == null ? void 0 : _a.username)}</span></span>`);
                            } else {
                              return [
                                createVNode("span", { style: { "display": "flex", "align-items": "center", "gap": "8px", "cursor": "pointer" } }, [
                                  createVNode(_component_el_avatar, {
                                    size: 32,
                                    style: { "background": "#c0392b" }
                                  }, {
                                    default: withCtx(() => {
                                      var _a2, _b2, _c;
                                      return [
                                        createTextVNode(toDisplayString(((_c = (_b2 = (_a2 = unref(userStore).user) == null ? void 0 : _a2.username) == null ? void 0 : _b2[0]) == null ? void 0 : _c.toUpperCase()) || "A"), 1)
                                      ];
                                    }),
                                    _: 1
                                  }),
                                  createVNode("span", { style: { "font-size": "0.9rem" } }, toDisplayString((_b = unref(userStore).user) == null ? void 0 : _b.username), 1)
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { style: { "display": "flex", "align-items": "center", "gap": "16px" } }, [
                            createVNode(_component_el_icon, {
                              size: 20,
                              style: { "cursor": "pointer", "color": "#606266" },
                              onClick: ($event) => isCollapse.value = !isCollapse.value
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(resolveDynamicComponent(isCollapse.value ? "Expand" : "Fold")))
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(_component_el_breadcrumb, { separator: "/" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_breadcrumb_item, { to: { path: "/admin/dashboard" } }, {
                                  default: withCtx(() => [
                                    createTextVNode("\u9996\u9875")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_breadcrumb_item, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(currentTitle.value), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { style: { "display": "flex", "align-items": "center", "gap": "16px" } }, [
                            createVNode(_component_NuxtLink, {
                              to: "/",
                              style: { "color": "#606266", "font-size": "0.85rem" }
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_HomeFilled)
                                  ]),
                                  _: 1
                                }),
                                createTextVNode(" \u56DE\u5230\u524D\u53F0 ")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_dropdown, {
                              trigger: "click",
                              onCommand: handleCommand
                            }, {
                              dropdown: withCtx(() => [
                                createVNode(_component_el_dropdown_menu, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_dropdown_item, { command: "logout" }, {
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
                              ]),
                              default: withCtx(() => {
                                var _a;
                                return [
                                  createVNode("span", { style: { "display": "flex", "align-items": "center", "gap": "8px", "cursor": "pointer" } }, [
                                    createVNode(_component_el_avatar, {
                                      size: 32,
                                      style: { "background": "#c0392b" }
                                    }, {
                                      default: withCtx(() => {
                                        var _a2, _b, _c;
                                        return [
                                          createTextVNode(toDisplayString(((_c = (_b = (_a2 = unref(userStore).user) == null ? void 0 : _a2.username) == null ? void 0 : _b[0]) == null ? void 0 : _c.toUpperCase()) || "A"), 1)
                                        ];
                                      }),
                                      _: 1
                                    }),
                                    createVNode("span", { style: { "font-size": "0.9rem" } }, toDisplayString((_a = unref(userStore).user) == null ? void 0 : _a.username), 1)
                                  ])
                                ];
                              }),
                              _: 1
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_main, { class: "admin-main" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtPage, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtPage)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_header, { class: "admin-header" }, {
                      default: withCtx(() => [
                        createVNode("div", { style: { "display": "flex", "align-items": "center", "gap": "16px" } }, [
                          createVNode(_component_el_icon, {
                            size: 20,
                            style: { "cursor": "pointer", "color": "#606266" },
                            onClick: ($event) => isCollapse.value = !isCollapse.value
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(isCollapse.value ? "Expand" : "Fold")))
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_el_breadcrumb, { separator: "/" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_breadcrumb_item, { to: { path: "/admin/dashboard" } }, {
                                default: withCtx(() => [
                                  createTextVNode("\u9996\u9875")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_breadcrumb_item, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(currentTitle.value), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { style: { "display": "flex", "align-items": "center", "gap": "16px" } }, [
                          createVNode(_component_NuxtLink, {
                            to: "/",
                            style: { "color": "#606266", "font-size": "0.85rem" }
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(_component_HomeFilled)
                                ]),
                                _: 1
                              }),
                              createTextVNode(" \u56DE\u5230\u524D\u53F0 ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_dropdown, {
                            trigger: "click",
                            onCommand: handleCommand
                          }, {
                            dropdown: withCtx(() => [
                              createVNode(_component_el_dropdown_menu, null, {
                                default: withCtx(() => [
                                  createVNode(_component_el_dropdown_item, { command: "logout" }, {
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
                            ]),
                            default: withCtx(() => {
                              var _a;
                              return [
                                createVNode("span", { style: { "display": "flex", "align-items": "center", "gap": "8px", "cursor": "pointer" } }, [
                                  createVNode(_component_el_avatar, {
                                    size: 32,
                                    style: { "background": "#c0392b" }
                                  }, {
                                    default: withCtx(() => {
                                      var _a2, _b, _c;
                                      return [
                                        createTextVNode(toDisplayString(((_c = (_b = (_a2 = unref(userStore).user) == null ? void 0 : _a2.username) == null ? void 0 : _b[0]) == null ? void 0 : _c.toUpperCase()) || "A"), 1)
                                      ];
                                    }),
                                    _: 1
                                  }),
                                  createVNode("span", { style: { "font-size": "0.9rem" } }, toDisplayString((_a = unref(userStore).user) == null ? void 0 : _a.username), 1)
                                ])
                              ];
                            }),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_main, { class: "admin-main" }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtPage)
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
              createVNode(_component_el_aside, {
                width: isCollapse.value ? "64px" : "220px",
                class: "admin-aside"
              }, {
                default: withCtx(() => [
                  createVNode("div", {
                    class: ["aside-logo", { collapsed: isCollapse.value }]
                  }, [
                    createVNode(_component_el_icon, { size: 24 }, {
                      default: withCtx(() => [
                        createVNode(_component_Shop)
                      ]),
                      _: 1
                    }),
                    withDirectives(createVNode("span", null, "MallShop", 512), [
                      [vShow, !isCollapse.value]
                    ])
                  ], 2),
                  createVNode(_component_el_menu, {
                    "default-active": unref(route).path,
                    collapse: isCollapse.value,
                    "collapse-transition": false,
                    class: "aside-menu",
                    "background-color": "#001529",
                    "text-color": "rgba(255,255,255,0.65)",
                    "active-text-color": "#fff"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_menu_item, { index: "/admin/dashboard" }, {
                        title: withCtx(() => [
                          createTextVNode("\u6570\u636E\u770B\u677F")
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(_component_DataAnalysis)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_menu_item, { index: "/admin/products" }, {
                        title: withCtx(() => [
                          createTextVNode("\u5546\u54C1\u7BA1\u7406")
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(_component_Goods)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_menu_item, { index: "/admin/categories" }, {
                        title: withCtx(() => [
                          createTextVNode("\u5206\u7C7B\u7BA1\u7406")
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(_component_Menu)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_menu_item, { index: "/admin/orders" }, {
                        title: withCtx(() => [
                          createTextVNode("\u8BA2\u5355\u7BA1\u7406")
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(_component_Document)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_menu_item, { index: "/admin/users" }, {
                        title: withCtx(() => [
                          createTextVNode("\u7528\u6237\u7BA1\u7406")
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(_component_User)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["default-active", "collapse"])
                ]),
                _: 1
              }, 8, ["width"]),
              createVNode(_component_el_container, null, {
                default: withCtx(() => [
                  createVNode(_component_el_header, { class: "admin-header" }, {
                    default: withCtx(() => [
                      createVNode("div", { style: { "display": "flex", "align-items": "center", "gap": "16px" } }, [
                        createVNode(_component_el_icon, {
                          size: 20,
                          style: { "cursor": "pointer", "color": "#606266" },
                          onClick: ($event) => isCollapse.value = !isCollapse.value
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(resolveDynamicComponent(isCollapse.value ? "Expand" : "Fold")))
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_el_breadcrumb, { separator: "/" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_breadcrumb_item, { to: { path: "/admin/dashboard" } }, {
                              default: withCtx(() => [
                                createTextVNode("\u9996\u9875")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_breadcrumb_item, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(currentTitle.value), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { style: { "display": "flex", "align-items": "center", "gap": "16px" } }, [
                        createVNode(_component_NuxtLink, {
                          to: "/",
                          style: { "color": "#606266", "font-size": "0.85rem" }
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(_component_HomeFilled)
                              ]),
                              _: 1
                            }),
                            createTextVNode(" \u56DE\u5230\u524D\u53F0 ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_dropdown, {
                          trigger: "click",
                          onCommand: handleCommand
                        }, {
                          dropdown: withCtx(() => [
                            createVNode(_component_el_dropdown_menu, null, {
                              default: withCtx(() => [
                                createVNode(_component_el_dropdown_item, { command: "logout" }, {
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
                          ]),
                          default: withCtx(() => {
                            var _a;
                            return [
                              createVNode("span", { style: { "display": "flex", "align-items": "center", "gap": "8px", "cursor": "pointer" } }, [
                                createVNode(_component_el_avatar, {
                                  size: 32,
                                  style: { "background": "#c0392b" }
                                }, {
                                  default: withCtx(() => {
                                    var _a2, _b, _c;
                                    return [
                                      createTextVNode(toDisplayString(((_c = (_b = (_a2 = unref(userStore).user) == null ? void 0 : _a2.username) == null ? void 0 : _b[0]) == null ? void 0 : _c.toUpperCase()) || "A"), 1)
                                    ];
                                  }),
                                  _: 1
                                }),
                                createVNode("span", { style: { "font-size": "0.9rem" } }, toDisplayString((_a = unref(userStore).user) == null ? void 0 : _a.username), 1)
                              ])
                            ];
                          }),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_main, { class: "admin-main" }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtPage)
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const admin = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fb04caa5"]]);

export { admin as default };
//# sourceMappingURL=admin-a7zFH7-M.mjs.map
