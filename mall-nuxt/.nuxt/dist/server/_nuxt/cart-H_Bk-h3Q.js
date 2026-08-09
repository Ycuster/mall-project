import { _ as __nuxt_component_0 } from "./nuxt-link-iTsWrgYA.js";
import { defineComponent, resolveComponent, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { u as useCartStore } from "./cart-D9jsw7kE.js";
import { ElMessage } from "element-plus";
import { a as useSeoMeta } from "./v3-DqToCt8T.js";
import { _ as _export_sfc } from "../server.mjs";
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
const defaultImg = "https://picsum.photos/seed/default/400/400";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    const cartStore = useCartStore();
    useSeoMeta({
      title: "购物车 - MallShop",
      description: "查看和管理您的购物车"
    });
    function handleQtyChange(id, qty) {
      if (qty < 1) return;
      cartStore.updateQuantity(id, qty);
    }
    async function handleClear() {
      await cartStore.clear();
      ElMessage.success("购物车已清空");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = resolveComponent("el-card");
      const _component_el_empty = resolveComponent("el-empty");
      const _component_NuxtLink = __nuxt_component_0;
      const _component_el_button = resolveComponent("el-button");
      const _component_el_table = resolveComponent("el-table");
      const _component_el_table_column = resolveComponent("el-table-column");
      const _component_el_image = resolveComponent("el-image");
      const _component_el_input_number = resolveComponent("el-input-number");
      const _component_el_popconfirm = resolveComponent("el-popconfirm");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_Delete = resolveComponent("Delete");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container" }, _attrs))} data-v-70569e4e>`);
      _push(ssrRenderComponent(_component_el_card, { shadow: "never" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span style="${ssrRenderStyle({ "font-size": "1.2rem", "font-weight": "600" })}" data-v-70569e4e${_scopeId}>购物车 (${ssrInterpolate(unref(cartStore).totalCount)} 件商品)</span>`);
          } else {
            return [
              createVNode("span", { style: { "font-size": "1.2rem", "font-weight": "600" } }, "购物车 (" + toDisplayString(unref(cartStore).totalCount) + " 件商品)", 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!unref(cartStore).items.length) {
              _push2(ssrRenderComponent(_component_el_empty, { description: "购物车是空的" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtLink, { to: "/products" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_button, { type: "primary" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`去选购`);
                              } else {
                                return [
                                  createTextVNode("去选购")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_button, { type: "primary" }, {
                              default: withCtx(() => [
                                createTextVNode("去选购")
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
                      createVNode(_component_NuxtLink, { to: "/products" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_button, { type: "primary" }, {
                            default: withCtx(() => [
                              createTextVNode("去选购")
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
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(_component_el_table, {
                data: unref(cartStore).items,
                style: { "width": "100%" }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_table_column, {
                      label: "商品",
                      "min-width": "300"
                    }, {
                      default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "12px" })}" data-v-70569e4e${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_el_image, {
                            src: row.cover || defaultImg,
                            style: { "width": "80px", "height": "80px", "border-radius": "8px", "flex-shrink": "0" },
                            fit: "cover"
                          }, null, _parent4, _scopeId3));
                          _push4(`<div data-v-70569e4e${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_NuxtLink, {
                            to: "/product/" + row.product_id,
                            style: { "font-weight": "500" }
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(row.name)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(row.name), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          if (!row.product_status) {
                            _push4(`<div style="${ssrRenderStyle({ "color": "#f56c6c", "font-size": "0.8rem" })}" data-v-70569e4e${_scopeId3}>商品已下架</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</div></div>`);
                        } else {
                          return [
                            createVNode("div", { style: { "display": "flex", "align-items": "center", "gap": "12px" } }, [
                              createVNode(_component_el_image, {
                                src: row.cover || defaultImg,
                                style: { "width": "80px", "height": "80px", "border-radius": "8px", "flex-shrink": "0" },
                                fit: "cover"
                              }, null, 8, ["src"]),
                              createVNode("div", null, [
                                createVNode(_component_NuxtLink, {
                                  to: "/product/" + row.product_id,
                                  style: { "font-weight": "500" }
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["to"]),
                                !row.product_status ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  style: { "color": "#f56c6c", "font-size": "0.8rem" }
                                }, "商品已下架")) : createCommentVNode("", true)
                              ])
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_table_column, {
                      label: "单价",
                      width: "120",
                      align: "center"
                    }, {
                      default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="text-price" data-v-70569e4e${_scopeId3}>¥${ssrInterpolate(Number(row.price).toFixed(2))}</span>`);
                        } else {
                          return [
                            createVNode("span", { class: "text-price" }, "¥" + toDisplayString(Number(row.price).toFixed(2)), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_table_column, {
                      label: "数量",
                      width: "160",
                      align: "center"
                    }, {
                      default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_input_number, {
                            "model-value": row.quantity,
                            min: 1,
                            max: row.stock,
                            size: "small",
                            onChange: (val) => handleQtyChange(row.id, val)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_input_number, {
                              "model-value": row.quantity,
                              min: 1,
                              max: row.stock,
                              size: "small",
                              onChange: (val) => handleQtyChange(row.id, val)
                            }, null, 8, ["model-value", "max", "onChange"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_table_column, {
                      label: "小计",
                      width: "120",
                      align: "center"
                    }, {
                      default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="text-price" data-v-70569e4e${_scopeId3}>¥${ssrInterpolate((row.price * row.quantity).toFixed(2))}</span>`);
                        } else {
                          return [
                            createVNode("span", { class: "text-price" }, "¥" + toDisplayString((row.price * row.quantity).toFixed(2)), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_table_column, {
                      label: "操作",
                      width: "80",
                      align: "center"
                    }, {
                      default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_popconfirm, {
                            title: "确定移除该商品？",
                            onConfirm: ($event) => unref(cartStore).remove(row.id)
                          }, {
                            reference: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_button, {
                                  type: "danger",
                                  text: ""
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_el_icon, null, {
                                        default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_Delete, null, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_Delete)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_el_icon, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_Delete)
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_button, {
                                    type: "danger",
                                    text: ""
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_icon, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_Delete)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_popconfirm, {
                              title: "确定移除该商品？",
                              onConfirm: ($event) => unref(cartStore).remove(row.id)
                            }, {
                              reference: withCtx(() => [
                                createVNode(_component_el_button, {
                                  type: "danger",
                                  text: ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_icon, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_Delete)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["onConfirm"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_table_column, {
                        label: "商品",
                        "min-width": "300"
                      }, {
                        default: withCtx(({ row }) => [
                          createVNode("div", { style: { "display": "flex", "align-items": "center", "gap": "12px" } }, [
                            createVNode(_component_el_image, {
                              src: row.cover || defaultImg,
                              style: { "width": "80px", "height": "80px", "border-radius": "8px", "flex-shrink": "0" },
                              fit: "cover"
                            }, null, 8, ["src"]),
                            createVNode("div", null, [
                              createVNode(_component_NuxtLink, {
                                to: "/product/" + row.product_id,
                                style: { "font-weight": "500" }
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["to"]),
                              !row.product_status ? (openBlock(), createBlock("div", {
                                key: 0,
                                style: { "color": "#f56c6c", "font-size": "0.8rem" }
                              }, "商品已下架")) : createCommentVNode("", true)
                            ])
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_table_column, {
                        label: "单价",
                        width: "120",
                        align: "center"
                      }, {
                        default: withCtx(({ row }) => [
                          createVNode("span", { class: "text-price" }, "¥" + toDisplayString(Number(row.price).toFixed(2)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_table_column, {
                        label: "数量",
                        width: "160",
                        align: "center"
                      }, {
                        default: withCtx(({ row }) => [
                          createVNode(_component_el_input_number, {
                            "model-value": row.quantity,
                            min: 1,
                            max: row.stock,
                            size: "small",
                            onChange: (val) => handleQtyChange(row.id, val)
                          }, null, 8, ["model-value", "max", "onChange"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_table_column, {
                        label: "小计",
                        width: "120",
                        align: "center"
                      }, {
                        default: withCtx(({ row }) => [
                          createVNode("span", { class: "text-price" }, "¥" + toDisplayString((row.price * row.quantity).toFixed(2)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_table_column, {
                        label: "操作",
                        width: "80",
                        align: "center"
                      }, {
                        default: withCtx(({ row }) => [
                          createVNode(_component_el_popconfirm, {
                            title: "确定移除该商品？",
                            onConfirm: ($event) => unref(cartStore).remove(row.id)
                          }, {
                            reference: withCtx(() => [
                              createVNode(_component_el_button, {
                                type: "danger",
                                text: ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_Delete)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["onConfirm"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="cart-footer" data-v-70569e4e${_scopeId}><div data-v-70569e4e${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_button, {
                text: "",
                onClick: handleClear
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`清空购物车`);
                  } else {
                    return [
                      createTextVNode("清空购物车")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="cart-total" data-v-70569e4e${_scopeId}><span data-v-70569e4e${_scopeId}>合计: </span><span class="text-price" style="${ssrRenderStyle({ "font-size": "1.6rem" })}" data-v-70569e4e${_scopeId}>¥${ssrInterpolate(unref(cartStore).totalAmount.toFixed(2))}</span>`);
              _push2(ssrRenderComponent(_component_NuxtLink, { to: "/checkout" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      type: "primary",
                      size: "large",
                      style: { "margin-left": "20px", "padding": "12px 40px" }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` 去结算 (${ssrInterpolate(unref(cartStore).totalCount)}) `);
                        } else {
                          return [
                            createTextVNode(" 去结算 (" + toDisplayString(unref(cartStore).totalCount) + ") ", 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        type: "primary",
                        size: "large",
                        style: { "margin-left": "20px", "padding": "12px 40px" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" 去结算 (" + toDisplayString(unref(cartStore).totalCount) + ") ", 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div><!--]-->`);
            }
          } else {
            return [
              !unref(cartStore).items.length ? (openBlock(), createBlock(_component_el_empty, {
                key: 0,
                description: "购物车是空的"
              }, {
                default: withCtx(() => [
                  createVNode(_component_NuxtLink, { to: "/products" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_button, { type: "primary" }, {
                        default: withCtx(() => [
                          createTextVNode("去选购")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                createVNode(_component_el_table, {
                  data: unref(cartStore).items,
                  style: { "width": "100%" }
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_table_column, {
                      label: "商品",
                      "min-width": "300"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode("div", { style: { "display": "flex", "align-items": "center", "gap": "12px" } }, [
                          createVNode(_component_el_image, {
                            src: row.cover || defaultImg,
                            style: { "width": "80px", "height": "80px", "border-radius": "8px", "flex-shrink": "0" },
                            fit: "cover"
                          }, null, 8, ["src"]),
                          createVNode("div", null, [
                            createVNode(_component_NuxtLink, {
                              to: "/product/" + row.product_id,
                              style: { "font-weight": "500" }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(row.name), 1)
                              ]),
                              _: 2
                            }, 1032, ["to"]),
                            !row.product_status ? (openBlock(), createBlock("div", {
                              key: 0,
                              style: { "color": "#f56c6c", "font-size": "0.8rem" }
                            }, "商品已下架")) : createCommentVNode("", true)
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "单价",
                      width: "120",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode("span", { class: "text-price" }, "¥" + toDisplayString(Number(row.price).toFixed(2)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "数量",
                      width: "160",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_input_number, {
                          "model-value": row.quantity,
                          min: 1,
                          max: row.stock,
                          size: "small",
                          onChange: (val) => handleQtyChange(row.id, val)
                        }, null, 8, ["model-value", "max", "onChange"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "小计",
                      width: "120",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode("span", { class: "text-price" }, "¥" + toDisplayString((row.price * row.quantity).toFixed(2)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "操作",
                      width: "80",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_popconfirm, {
                          title: "确定移除该商品？",
                          onConfirm: ($event) => unref(cartStore).remove(row.id)
                        }, {
                          reference: withCtx(() => [
                            createVNode(_component_el_button, {
                              type: "danger",
                              text: ""
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_Delete)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["onConfirm"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["data"]),
                createVNode("div", { class: "cart-footer" }, [
                  createVNode("div", null, [
                    createVNode(_component_el_button, {
                      text: "",
                      onClick: handleClear
                    }, {
                      default: withCtx(() => [
                        createTextVNode("清空购物车")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "cart-total" }, [
                    createVNode("span", null, "合计: "),
                    createVNode("span", {
                      class: "text-price",
                      style: { "font-size": "1.6rem" }
                    }, "¥" + toDisplayString(unref(cartStore).totalAmount.toFixed(2)), 1),
                    createVNode(_component_NuxtLink, { to: "/checkout" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_button, {
                          type: "primary",
                          size: "large",
                          style: { "margin-left": "20px", "padding": "12px 40px" }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" 去结算 (" + toDisplayString(unref(cartStore).totalCount) + ") ", 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ])
              ], 64))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const cart = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-70569e4e"]]);
export {
  cart as default
};
//# sourceMappingURL=cart-H_Bk-h3Q.js.map
