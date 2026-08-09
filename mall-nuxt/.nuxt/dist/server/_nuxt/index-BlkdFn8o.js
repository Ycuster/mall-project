import { _ as __nuxt_component_0 } from "./nuxt-link-iTsWrgYA.js";
import { defineComponent, withAsyncContext, resolveComponent, withCtx, createVNode, createTextVNode, unref, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { ElMessage } from "element-plus";
import { P as ProductCard } from "./ProductCard-cdcE9Wbf.js";
import { a as useSeoMeta } from "./v3-DqToCt8T.js";
import { u as useAsyncData } from "./asyncData-AFzbmsB9.js";
import { n as navigateTo, u as useNuxtApp, _ as _export_sfc } from "../server.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/ufo/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/defu/dist/defu.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/@unhead/vue/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/perfect-debounce/dist/index.mjs";
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
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useSeoMeta({
      title: "MallShop - 精选全球好货，品质生活",
      description: "MallShop 商城首页 - 精选全球好货，品质生活从这里开始",
      keywords: "商城,购物,电商,MallShop,首页"
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
      ElMessage.success(`已将「${product.name}」加入购物车`);
    }
    function handleToggleFavorite(product, favorite) {
      ElMessage.success(favorite ? `已收藏「${product.name}」` : `已取消收藏「${product.name}」`);
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
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-cef1ffed><section class="hero-banner" data-v-cef1ffed><div class="hero-content" data-v-cef1ffed><h1 data-v-cef1ffed>发现你心仪的好物</h1><p data-v-cef1ffed>精选全球好货，品质生活从这里开始</p>`);
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
                  _push3(` 立即选购 `);
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
                    createTextVNode(" 立即选购 "),
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
                  createTextVNode(" 立即选购 "),
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
            _push2(`<div class="section-header" data-v-cef1ffed${_scopeId}><span class="section-title" data-v-cef1ffed${_scopeId}>商品分类</span></div>`);
          } else {
            return [
              createVNode("div", { class: "section-header" }, [
                createVNode("span", { class: "section-title" }, "商品分类")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="category-grid" data-v-cef1ffed${_scopeId}><!--[-->`);
            ssrRenderList(unref(categories), (cat) => {
              _push2(`<div class="category-item" data-v-cef1ffed${_scopeId}><span class="cat-icon" data-v-cef1ffed${_scopeId}>${ssrInterpolate(cat.icon || "📦")}</span><span data-v-cef1ffed${_scopeId}>${ssrInterpolate(cat.name)}</span></div>`);
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
                    createVNode("span", { class: "cat-icon" }, toDisplayString(cat.icon || "📦"), 1),
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
            _push2(`<div class="section-header" data-v-cef1ffed${_scopeId}><span class="section-title" data-v-cef1ffed${_scopeId}>🔥 热销商品</span>`);
            _push2(ssrRenderComponent(_component_NuxtLink, { to: "/products?sort=sales" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_link, { type: "primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`查看更多 `);
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
                          createTextVNode("查看更多 "),
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
                        createTextVNode("查看更多 "),
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
                createVNode("span", { class: "section-title" }, "🔥 热销商品"),
                createVNode(_component_NuxtLink, { to: "/products?sort=sales" }, {
                  default: withCtx(() => [
                    createVNode(_component_el_link, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("查看更多 "),
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
            _push2(`<div class="section-header" data-v-cef1ffed${_scopeId}><span class="section-title" data-v-cef1ffed${_scopeId}>🆕 新品上架</span>`);
            _push2(ssrRenderComponent(_component_NuxtLink, { to: "/products?sort=newest" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_link, { type: "primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`查看更多 `);
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
                          createTextVNode("查看更多 "),
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
                        createTextVNode("查看更多 "),
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
                createVNode("span", { class: "section-title" }, "🆕 新品上架"),
                createVNode(_component_NuxtLink, { to: "/products?sort=newest" }, {
                  default: withCtx(() => [
                    createVNode(_component_el_link, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("查看更多 "),
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
export {
  index as default
};
//# sourceMappingURL=index-BlkdFn8o.js.map
