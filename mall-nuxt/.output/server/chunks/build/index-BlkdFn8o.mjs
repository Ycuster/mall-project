import { _ as __nuxt_component_0 } from './nuxt-link-iTsWrgYA.mjs';
import { defineComponent, withAsyncContext, resolveComponent, withCtx, createVNode, createTextVNode, unref, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { ElMessage } from 'element-plus';
import { P as ProductCard } from './ProductCard-cdcE9Wbf.mjs';
import { u as useSeoMeta } from './v3-DqToCt8T.mjs';
import { u as useAsyncData } from './asyncData-AFzbmsB9.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useSeoMeta({
      title: "MallShop - \u7CBE\u9009\u5168\u7403\u597D\u8D27\uFF0C\u54C1\u8D28\u751F\u6D3B",
      description: "MallShop \u5546\u57CE\u9996\u9875 - \u7CBE\u9009\u5168\u7403\u597D\u8D27\uFF0C\u54C1\u8D28\u751F\u6D3B\u4ECE\u8FD9\u91CC\u5F00\u59CB",
      keywords: "\u5546\u57CE,\u8D2D\u7269,\u7535\u5546,MallShop,\u9996\u9875"
    });
    const { data: categories } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("home-categories", () => {
      const { $api } = useNuxtApp();
      return $api.get("/categories").then((res) => res.data);
    })), __temp = await __temp, __restore(), __temp);
    const { data: hotProducts } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("home-hot", () => {
      const { $api } = useNuxtApp();
      return $api.get("/products?sort=sales&pageSize=8").then((res) => res.data.list);
    })), __temp = await __temp, __restore(), __temp);
    const { data: newProducts } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("home-new", () => {
      const { $api } = useNuxtApp();
      return $api.get("/products?sort=newest&pageSize=8").then((res) => res.data.list);
    })), __temp = await __temp, __restore(), __temp);
    function handleCategoryClick(id) {
      navigateTo({ path: "/products", query: { category: id } });
    }
    function handleProductClick(product) {
      navigateTo(`/product/${product.id}`);
    }
    function handleAddToCart(product) {
      ElMessage.success(`\u5DF2\u5C06\u300C${product.name}\u300D\u52A0\u5165\u8D2D\u7269\u8F66`);
    }
    function handleToggleFavorite(product, favorite) {
      ElMessage.success(favorite ? `\u5DF2\u6536\u85CF\u300C${product.name}\u300D` : `\u5DF2\u53D6\u6D88\u6536\u85CF\u300C${product.name}\u300D`);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_el_button = resolveComponent("el-button");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_ArrowRight = resolveComponent("ArrowRight");
      const _component_el_card = resolveComponent("el-card");
      const _component_el_link = resolveComponent("el-link");
      const _component_el_row = resolveComponent("el-row");
      const _component_el_col = resolveComponent("el-col");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-cef1ffed><section class="hero-banner" data-v-cef1ffed><div class="hero-content" data-v-cef1ffed><h1 data-v-cef1ffed>\u53D1\u73B0\u4F60\u5FC3\u4EEA\u7684\u597D\u7269</h1><p data-v-cef1ffed>\u7CBE\u9009\u5168\u7403\u597D\u8D27\uFF0C\u54C1\u8D28\u751F\u6D3B\u4ECE\u8FD9\u91CC\u5F00\u59CB</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/products" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              size: "large",
              round: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` \u7ACB\u5373\u9009\u8D2D `);
                  _push3(ssrRenderComponent(_component_el_icon, { class: "el-icon--right" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ArrowRight, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ArrowRight)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" \u7ACB\u5373\u9009\u8D2D "),
                    createVNode(_component_el_icon, { class: "el-icon--right" }, {
                      default: withCtx(() => [
                        createVNode(_component_ArrowRight)
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
              createVNode(_component_el_button, {
                type: "primary",
                size: "large",
                round: ""
              }, {
                default: withCtx(() => [
                  createTextVNode(" \u7ACB\u5373\u9009\u8D2D "),
                  createVNode(_component_el_icon, { class: "el-icon--right" }, {
                    default: withCtx(() => [
                      createVNode(_component_ArrowRight)
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
      _push(`</div></section><div class="page-container" data-v-cef1ffed>`);
      _push(ssrRenderComponent(_component_el_card, {
        shadow: "never",
        style: { "margin-bottom": "24px" }
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="section-header" data-v-cef1ffed${_scopeId}><span class="section-title" data-v-cef1ffed${_scopeId}>\u5546\u54C1\u5206\u7C7B</span></div>`);
          } else {
            return [
              createVNode("div", { class: "section-header" }, [
                createVNode("span", { class: "section-title" }, "\u5546\u54C1\u5206\u7C7B")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="category-grid" data-v-cef1ffed${_scopeId}><!--[-->`);
            ssrRenderList(unref(categories), (cat) => {
              _push2(`<div class="category-item" data-v-cef1ffed${_scopeId}><span class="cat-icon" data-v-cef1ffed${_scopeId}>${ssrInterpolate(cat.icon || "\u{1F4E6}")}</span><span data-v-cef1ffed${_scopeId}>${ssrInterpolate(cat.name)}</span></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "category-grid" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(categories), (cat) => {
                  return openBlock(), createBlock("div", {
                    key: cat.id,
                    class: "category-item",
                    onClick: ($event) => handleCategoryClick(cat.id)
                  }, [
                    createVNode("span", { class: "cat-icon" }, toDisplayString(cat.icon || "\u{1F4E6}"), 1),
                    createVNode("span", null, toDisplayString(cat.name), 1)
                  ], 8, ["onClick"]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_card, {
        shadow: "never",
        style: { "margin-bottom": "24px" }
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="section-header" data-v-cef1ffed${_scopeId}><span class="section-title" data-v-cef1ffed${_scopeId}>\u{1F525} \u70ED\u9500\u5546\u54C1</span>`);
            _push2(ssrRenderComponent(_component_NuxtLink, { to: "/products?sort=sales" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_link, { type: "primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u67E5\u770B\u66F4\u591A `);
                        _push4(ssrRenderComponent(_component_el_icon, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ArrowRight, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ArrowRight)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode("\u67E5\u770B\u66F4\u591A "),
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(_component_ArrowRight)
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
                    createVNode(_component_el_link, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("\u67E5\u770B\u66F4\u591A "),
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(_component_ArrowRight)
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
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "section-header" }, [
                createVNode("span", { class: "section-title" }, "\u{1F525} \u70ED\u9500\u5546\u54C1"),
                createVNode(_component_NuxtLink, { to: "/products?sort=sales" }, {
                  default: withCtx(() => [
                    createVNode(_component_el_link, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("\u67E5\u770B\u66F4\u591A "),
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(_component_ArrowRight)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_row, { gutter: 20 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(hotProducts), (p) => {
                    _push3(ssrRenderComponent(_component_el_col, {
                      key: p.id,
                      xs: 12,
                      sm: 8,
                      md: 6,
                      style: { "margin-bottom": "20px" }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(ProductCard), {
                            product: p,
                            "show-description": false,
                            onClick: handleProductClick,
                            onAddToCart: handleAddToCart,
                            onToggleFavorite: handleToggleFavorite
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(ProductCard), {
                              product: p,
                              "show-description": false,
                              onClick: handleProductClick,
                              onAddToCart: handleAddToCart,
                              onToggleFavorite: handleToggleFavorite
                            }, null, 8, ["product"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(hotProducts), (p) => {
                      return openBlock(), createBlock(_component_el_col, {
                        key: p.id,
                        xs: 12,
                        sm: 8,
                        md: 6,
                        style: { "margin-bottom": "20px" }
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ProductCard), {
                            product: p,
                            "show-description": false,
                            onClick: handleProductClick,
                            onAddToCart: handleAddToCart,
                            onToggleFavorite: handleToggleFavorite
                          }, null, 8, ["product"])
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_row, { gutter: 20 }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(hotProducts), (p) => {
                    return openBlock(), createBlock(_component_el_col, {
                      key: p.id,
                      xs: 12,
                      sm: 8,
                      md: 6,
                      style: { "margin-bottom": "20px" }
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ProductCard), {
                          product: p,
                          "show-description": false,
                          onClick: handleProductClick,
                          onAddToCart: handleAddToCart,
                          onToggleFavorite: handleToggleFavorite
                        }, null, 8, ["product"])
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_card, { shadow: "never" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="section-header" data-v-cef1ffed${_scopeId}><span class="section-title" data-v-cef1ffed${_scopeId}>\u{1F195} \u65B0\u54C1\u4E0A\u67B6</span>`);
            _push2(ssrRenderComponent(_component_NuxtLink, { to: "/products?sort=newest" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_link, { type: "primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u67E5\u770B\u66F4\u591A `);
                        _push4(ssrRenderComponent(_component_el_icon, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ArrowRight, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ArrowRight)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode("\u67E5\u770B\u66F4\u591A "),
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(_component_ArrowRight)
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
                    createVNode(_component_el_link, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("\u67E5\u770B\u66F4\u591A "),
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(_component_ArrowRight)
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
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "section-header" }, [
                createVNode("span", { class: "section-title" }, "\u{1F195} \u65B0\u54C1\u4E0A\u67B6"),
                createVNode(_component_NuxtLink, { to: "/products?sort=newest" }, {
                  default: withCtx(() => [
                    createVNode(_component_el_link, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("\u67E5\u770B\u66F4\u591A "),
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(_component_ArrowRight)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_row, { gutter: 20 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(newProducts), (p) => {
                    _push3(ssrRenderComponent(_component_el_col, {
                      key: p.id,
                      xs: 12,
                      sm: 8,
                      md: 6,
                      style: { "margin-bottom": "20px" }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(ProductCard), {
                            product: p,
                            "show-description": false,
                            onClick: handleProductClick,
                            onAddToCart: handleAddToCart,
                            onToggleFavorite: handleToggleFavorite
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(ProductCard), {
                              product: p,
                              "show-description": false,
                              onClick: handleProductClick,
                              onAddToCart: handleAddToCart,
                              onToggleFavorite: handleToggleFavorite
                            }, null, 8, ["product"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(newProducts), (p) => {
                      return openBlock(), createBlock(_component_el_col, {
                        key: p.id,
                        xs: 12,
                        sm: 8,
                        md: 6,
                        style: { "margin-bottom": "20px" }
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ProductCard), {
                            product: p,
                            "show-description": false,
                            onClick: handleProductClick,
                            onAddToCart: handleAddToCart,
                            onToggleFavorite: handleToggleFavorite
                          }, null, 8, ["product"])
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_row, { gutter: 20 }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(newProducts), (p) => {
                    return openBlock(), createBlock(_component_el_col, {
                      key: p.id,
                      xs: 12,
                      sm: 8,
                      md: 6,
                      style: { "margin-bottom": "20px" }
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ProductCard), {
                          product: p,
                          "show-description": false,
                          onClick: handleProductClick,
                          onAddToCart: handleAddToCart,
                          onToggleFavorite: handleToggleFavorite
                        }, null, 8, ["product"])
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cef1ffed"]]);

export { index as default };
//# sourceMappingURL=index-BlkdFn8o.mjs.map
