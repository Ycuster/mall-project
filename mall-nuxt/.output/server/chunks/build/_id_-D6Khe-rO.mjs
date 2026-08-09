import { _ as __nuxt_component_0 } from './nuxt-link-iTsWrgYA.mjs';
import { defineComponent, ref, computed, withAsyncContext, resolveComponent, resolveDirective, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, a as useRoute, n as navigateTo, u as useNuxtApp } from './server.mjs';
import { u as useSeoMeta } from './v3-DqToCt8T.mjs';
import { u as useAsyncData } from './asyncData-AFzbmsB9.mjs';
import { u as useCartStore } from './cart-D9jsw7kE.mjs';
import { u as useUserStore } from './user-OpFIMyWU.mjs';
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

const defaultImg = "https://picsum.photos/seed/default/400/400";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const cartStore = useCartStore();
    const userStore = useUserStore();
    const product = ref(null);
    const loading = ref(true);
    const qty = ref(1);
    const productId = computed(() => route.params.id);
    useSeoMeta({
      title: "\u5546\u54C1\u8BE6\u60C5 - MallShop",
      description: "\u67E5\u770B\u5546\u54C1\u8BE6\u60C5",
      keywords: "\u5546\u54C1,MallShop,\u5546\u57CE"
    });
    [__temp, __restore] = withAsyncContext(async () => useAsyncData(`product-${productId.value}`, async () => {
      const { $api } = useNuxtApp();
      const res = await $api.get("/products/" + productId.value);
      if (res.code === 200) {
        product.value = res.data;
        useSeoMeta({
          title: `${res.data.name} - MallShop`,
          description: res.data.description || res.data.name,
          keywords: `\u5546\u54C1,MallShop,${res.data.name}`
        });
      }
      loading.value = false;
    })), await __temp, __restore();
    function handleAdd() {
      if (!userStore.isLoggedIn) {
        ElMessage.warning("\u8BF7\u5148\u767B\u5F55");
        navigateTo("/login");
        return;
      }
      if (product.value) {
        cartStore.add(product.value.id, qty.value);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = resolveComponent("el-card");
      const _component_el_row = resolveComponent("el-row");
      const _component_el_col = resolveComponent("el-col");
      const _component_el_text = resolveComponent("el-text");
      const _component_el_divider = resolveComponent("el-divider");
      const _component_el_input_number = resolveComponent("el-input-number");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_ShoppingCart = resolveComponent("ShoppingCart");
      const _component_Shield = resolveComponent("Shield");
      const _component_Van = resolveComponent("Van");
      const _component_RefreshRight = resolveComponent("RefreshRight");
      const _component_el_empty = resolveComponent("el-empty");
      const _component_NuxtLink = __nuxt_component_0;
      const _directive_loading = resolveDirective("loading");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container" }, _attrs, ssrGetDirectiveProps(_ctx, _directive_loading, !product.value && loading.value)))} data-v-37663d72>`);
      if (product.value) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_el_card, { shadow: "never" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_row, { gutter: 40 }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_col, {
                      md: 10,
                      sm: 24
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="detail-cover" data-v-37663d72${_scopeId3}><img${ssrRenderAttr("src", product.value.cover || defaultImg)}${ssrRenderAttr("alt", product.value.name)} data-v-37663d72${_scopeId3}></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "detail-cover" }, [
                              createVNode("img", {
                                src: product.value.cover || defaultImg,
                                alt: product.value.name
                              }, null, 8, ["src", "alt"])
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_col, {
                      md: 14,
                      sm: 24
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<h1 style="${ssrRenderStyle({ "font-size": "1.6rem", "font-weight": "600", "margin-bottom": "16px", "line-height": "1.4" })}" data-v-37663d72${_scopeId3}>${ssrInterpolate(product.value.name)}</h1><p style="${ssrRenderStyle({ "color": "#606266", "line-height": "1.8", "margin-bottom": "20px" })}" data-v-37663d72${_scopeId3}>${ssrInterpolate(product.value.description || "\u6682\u65E0\u63CF\u8FF0")}</p><div class="price-box" data-v-37663d72${_scopeId3}><div data-v-37663d72${_scopeId3}><span class="text-price" style="${ssrRenderStyle({ "font-size": "2rem" })}" data-v-37663d72${_scopeId3}> \xA5${ssrInterpolate(Number(product.value.price).toFixed(2))}</span>`);
                          if (product.value.original_price > product.value.price) {
                            _push4(`<span class="text-price-original" style="${ssrRenderStyle({ "font-size": "1.1rem" })}" data-v-37663d72${_scopeId3}> \xA5${ssrInterpolate(Number(product.value.original_price).toFixed(2))}</span>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</div>`);
                          _push4(ssrRenderComponent(_component_el_text, {
                            type: "info",
                            size: "small"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` \u9500\u91CF ${ssrInterpolate(product.value.sales)} \xB7 \u5E93\u5B58 ${ssrInterpolate(product.value.stock)} \xB7 ${ssrInterpolate(product.value.category_name || "\u672A\u5206\u7C7B")}`);
                              } else {
                                return [
                                  createTextVNode(" \u9500\u91CF " + toDisplayString(product.value.sales) + " \xB7 \u5E93\u5B58 " + toDisplayString(product.value.stock) + " \xB7 " + toDisplayString(product.value.category_name || "\u672A\u5206\u7C7B"), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                          _push4(ssrRenderComponent(_component_el_divider, null, null, _parent4, _scopeId3));
                          _push4(`<div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "16px", "margin-bottom": "24px" })}" data-v-37663d72${_scopeId3}><span style="${ssrRenderStyle({ "color": "#606266", "font-size": "0.9rem" })}" data-v-37663d72${_scopeId3}>\u6570\u91CF</span>`);
                          _push4(ssrRenderComponent(_component_el_input_number, {
                            modelValue: qty.value,
                            "onUpdate:modelValue": ($event) => qty.value = $event,
                            min: 1,
                            max: product.value.stock,
                            size: "large"
                          }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                          _push4(ssrRenderComponent(_component_el_button, {
                            type: "primary",
                            size: "large",
                            style: { "width": "240px", "height": "48px", "font-size": "1rem" },
                            onClick: handleAdd
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_icon, { size: 20 }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_ShoppingCart, null, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_ShoppingCart)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(` \u52A0\u5165\u8D2D\u7269\u8F66 `);
                              } else {
                                return [
                                  createVNode(_component_el_icon, { size: 20 }, {
                                    default: withCtx(() => [
                                      createVNode(_component_ShoppingCart)
                                    ]),
                                    _: 1
                                  }),
                                  createTextVNode(" \u52A0\u5165\u8D2D\u7269\u8F66 ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`<div style="${ssrRenderStyle({ "margin-top": "20px", "display": "flex", "gap": "24px" })}" data-v-37663d72${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_el_text, { type: "info" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_icon, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_Shield, null, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_Shield)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(` \u6B63\u54C1\u4FDD\u8BC1`);
                              } else {
                                return [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_Shield)
                                    ]),
                                    _: 1
                                  }),
                                  createTextVNode(" \u6B63\u54C1\u4FDD\u8BC1")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_text, { type: "info" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_icon, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_Van, null, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_Van)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(` \u5168\u573A\u5305\u90AE`);
                              } else {
                                return [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_Van)
                                    ]),
                                    _: 1
                                  }),
                                  createTextVNode(" \u5168\u573A\u5305\u90AE")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_text, { type: "info" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_icon, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_RefreshRight, null, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_RefreshRight)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(` 7\u5929\u9000\u6362`);
                              } else {
                                return [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_RefreshRight)
                                    ]),
                                    _: 1
                                  }),
                                  createTextVNode(" 7\u5929\u9000\u6362")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("h1", { style: { "font-size": "1.6rem", "font-weight": "600", "margin-bottom": "16px", "line-height": "1.4" } }, toDisplayString(product.value.name), 1),
                            createVNode("p", { style: { "color": "#606266", "line-height": "1.8", "margin-bottom": "20px" } }, toDisplayString(product.value.description || "\u6682\u65E0\u63CF\u8FF0"), 1),
                            createVNode("div", { class: "price-box" }, [
                              createVNode("div", null, [
                                createVNode("span", {
                                  class: "text-price",
                                  style: { "font-size": "2rem" }
                                }, " \xA5" + toDisplayString(Number(product.value.price).toFixed(2)), 1),
                                product.value.original_price > product.value.price ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "text-price-original",
                                  style: { "font-size": "1.1rem" }
                                }, " \xA5" + toDisplayString(Number(product.value.original_price).toFixed(2)), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode(_component_el_text, {
                                type: "info",
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" \u9500\u91CF " + toDisplayString(product.value.sales) + " \xB7 \u5E93\u5B58 " + toDisplayString(product.value.stock) + " \xB7 " + toDisplayString(product.value.category_name || "\u672A\u5206\u7C7B"), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode(_component_el_divider),
                            createVNode("div", { style: { "display": "flex", "align-items": "center", "gap": "16px", "margin-bottom": "24px" } }, [
                              createVNode("span", { style: { "color": "#606266", "font-size": "0.9rem" } }, "\u6570\u91CF"),
                              createVNode(_component_el_input_number, {
                                modelValue: qty.value,
                                "onUpdate:modelValue": ($event) => qty.value = $event,
                                min: 1,
                                max: product.value.stock,
                                size: "large"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                            ]),
                            createVNode(_component_el_button, {
                              type: "primary",
                              size: "large",
                              style: { "width": "240px", "height": "48px", "font-size": "1rem" },
                              onClick: handleAdd
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_el_icon, { size: 20 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_ShoppingCart)
                                  ]),
                                  _: 1
                                }),
                                createTextVNode(" \u52A0\u5165\u8D2D\u7269\u8F66 ")
                              ]),
                              _: 1
                            }),
                            createVNode("div", { style: { "margin-top": "20px", "display": "flex", "gap": "24px" } }, [
                              createVNode(_component_el_text, { type: "info" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_Shield)
                                    ]),
                                    _: 1
                                  }),
                                  createTextVNode(" \u6B63\u54C1\u4FDD\u8BC1")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_text, { type: "info" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_Van)
                                    ]),
                                    _: 1
                                  }),
                                  createTextVNode(" \u5168\u573A\u5305\u90AE")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_text, { type: "info" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_RefreshRight)
                                    ]),
                                    _: 1
                                  }),
                                  createTextVNode(" 7\u5929\u9000\u6362")
                                ]),
                                _: 1
                              })
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_col, {
                        md: 10,
                        sm: 24
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "detail-cover" }, [
                            createVNode("img", {
                              src: product.value.cover || defaultImg,
                              alt: product.value.name
                            }, null, 8, ["src", "alt"])
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_col, {
                        md: 14,
                        sm: 24
                      }, {
                        default: withCtx(() => [
                          createVNode("h1", { style: { "font-size": "1.6rem", "font-weight": "600", "margin-bottom": "16px", "line-height": "1.4" } }, toDisplayString(product.value.name), 1),
                          createVNode("p", { style: { "color": "#606266", "line-height": "1.8", "margin-bottom": "20px" } }, toDisplayString(product.value.description || "\u6682\u65E0\u63CF\u8FF0"), 1),
                          createVNode("div", { class: "price-box" }, [
                            createVNode("div", null, [
                              createVNode("span", {
                                class: "text-price",
                                style: { "font-size": "2rem" }
                              }, " \xA5" + toDisplayString(Number(product.value.price).toFixed(2)), 1),
                              product.value.original_price > product.value.price ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "text-price-original",
                                style: { "font-size": "1.1rem" }
                              }, " \xA5" + toDisplayString(Number(product.value.original_price).toFixed(2)), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode(_component_el_text, {
                              type: "info",
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" \u9500\u91CF " + toDisplayString(product.value.sales) + " \xB7 \u5E93\u5B58 " + toDisplayString(product.value.stock) + " \xB7 " + toDisplayString(product.value.category_name || "\u672A\u5206\u7C7B"), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(_component_el_divider),
                          createVNode("div", { style: { "display": "flex", "align-items": "center", "gap": "16px", "margin-bottom": "24px" } }, [
                            createVNode("span", { style: { "color": "#606266", "font-size": "0.9rem" } }, "\u6570\u91CF"),
                            createVNode(_component_el_input_number, {
                              modelValue: qty.value,
                              "onUpdate:modelValue": ($event) => qty.value = $event,
                              min: 1,
                              max: product.value.stock,
                              size: "large"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                          ]),
                          createVNode(_component_el_button, {
                            type: "primary",
                            size: "large",
                            style: { "width": "240px", "height": "48px", "font-size": "1rem" },
                            onClick: handleAdd
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_icon, { size: 20 }, {
                                default: withCtx(() => [
                                  createVNode(_component_ShoppingCart)
                                ]),
                                _: 1
                              }),
                              createTextVNode(" \u52A0\u5165\u8D2D\u7269\u8F66 ")
                            ]),
                            _: 1
                          }),
                          createVNode("div", { style: { "margin-top": "20px", "display": "flex", "gap": "24px" } }, [
                            createVNode(_component_el_text, { type: "info" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_Shield)
                                  ]),
                                  _: 1
                                }),
                                createTextVNode(" \u6B63\u54C1\u4FDD\u8BC1")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_text, { type: "info" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_Van)
                                  ]),
                                  _: 1
                                }),
                                createTextVNode(" \u5168\u573A\u5305\u90AE")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_text, { type: "info" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_RefreshRight)
                                  ]),
                                  _: 1
                                }),
                                createTextVNode(" 7\u5929\u9000\u6362")
                              ]),
                              _: 1
                            })
                          ])
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
                createVNode(_component_el_row, { gutter: 40 }, {
                  default: withCtx(() => [
                    createVNode(_component_el_col, {
                      md: 10,
                      sm: 24
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "detail-cover" }, [
                          createVNode("img", {
                            src: product.value.cover || defaultImg,
                            alt: product.value.name
                          }, null, 8, ["src", "alt"])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_col, {
                      md: 14,
                      sm: 24
                    }, {
                      default: withCtx(() => [
                        createVNode("h1", { style: { "font-size": "1.6rem", "font-weight": "600", "margin-bottom": "16px", "line-height": "1.4" } }, toDisplayString(product.value.name), 1),
                        createVNode("p", { style: { "color": "#606266", "line-height": "1.8", "margin-bottom": "20px" } }, toDisplayString(product.value.description || "\u6682\u65E0\u63CF\u8FF0"), 1),
                        createVNode("div", { class: "price-box" }, [
                          createVNode("div", null, [
                            createVNode("span", {
                              class: "text-price",
                              style: { "font-size": "2rem" }
                            }, " \xA5" + toDisplayString(Number(product.value.price).toFixed(2)), 1),
                            product.value.original_price > product.value.price ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "text-price-original",
                              style: { "font-size": "1.1rem" }
                            }, " \xA5" + toDisplayString(Number(product.value.original_price).toFixed(2)), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode(_component_el_text, {
                            type: "info",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" \u9500\u91CF " + toDisplayString(product.value.sales) + " \xB7 \u5E93\u5B58 " + toDisplayString(product.value.stock) + " \xB7 " + toDisplayString(product.value.category_name || "\u672A\u5206\u7C7B"), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(_component_el_divider),
                        createVNode("div", { style: { "display": "flex", "align-items": "center", "gap": "16px", "margin-bottom": "24px" } }, [
                          createVNode("span", { style: { "color": "#606266", "font-size": "0.9rem" } }, "\u6570\u91CF"),
                          createVNode(_component_el_input_number, {
                            modelValue: qty.value,
                            "onUpdate:modelValue": ($event) => qty.value = $event,
                            min: 1,
                            max: product.value.stock,
                            size: "large"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                        ]),
                        createVNode(_component_el_button, {
                          type: "primary",
                          size: "large",
                          style: { "width": "240px", "height": "48px", "font-size": "1rem" },
                          onClick: handleAdd
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_icon, { size: 20 }, {
                              default: withCtx(() => [
                                createVNode(_component_ShoppingCart)
                              ]),
                              _: 1
                            }),
                            createTextVNode(" \u52A0\u5165\u8D2D\u7269\u8F66 ")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { style: { "margin-top": "20px", "display": "flex", "gap": "24px" } }, [
                          createVNode(_component_el_text, { type: "info" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(_component_Shield)
                                ]),
                                _: 1
                              }),
                              createTextVNode(" \u6B63\u54C1\u4FDD\u8BC1")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_text, { type: "info" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(_component_Van)
                                ]),
                                _: 1
                              }),
                              createTextVNode(" \u5168\u573A\u5305\u90AE")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_text, { type: "info" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(_component_RefreshRight)
                                ]),
                                _: 1
                              }),
                              createTextVNode(" 7\u5929\u9000\u6362")
                            ]),
                            _: 1
                          })
                        ])
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
        if (product.value.detail) {
          _push(ssrRenderComponent(_component_el_card, {
            shadow: "never",
            style: { "margin-top": "20px" }
          }, {
            header: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span style="${ssrRenderStyle({ "font-weight": "600" })}" data-v-37663d72${_scopeId}>\u5546\u54C1\u8BE6\u60C5</span>`);
              } else {
                return [
                  createVNode("span", { style: { "font-weight": "600" } }, "\u5546\u54C1\u8BE6\u60C5")
                ];
              }
            }),
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              var _a;
              if (_push2) {
                _push2(`<div class="detail-content" data-v-37663d72${_scopeId}>${(_a = product.value.detail) != null ? _a : ""}</div>`);
              } else {
                return [
                  createVNode("div", {
                    class: "detail-content",
                    innerHTML: product.value.detail
                  }, null, 8, ["innerHTML"])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else if (!loading.value) {
        _push(ssrRenderComponent(_component_el_empty, { description: "\u5546\u54C1\u4E0D\u5B58\u5728" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_NuxtLink, { to: "/products" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, { type: "primary" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u8FD4\u56DE\u5546\u54C1\u5217\u8868`);
                        } else {
                          return [
                            createTextVNode("\u8FD4\u56DE\u5546\u54C1\u5217\u8868")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, { type: "primary" }, {
                        default: withCtx(() => [
                          createTextVNode("\u8FD4\u56DE\u5546\u54C1\u5217\u8868")
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
                createVNode(_component_NuxtLink, { to: "/products" }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, { type: "primary" }, {
                      default: withCtx(() => [
                        createTextVNode("\u8FD4\u56DE\u5546\u54C1\u5217\u8868")
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
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/product/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-37663d72"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-D6Khe-rO.mjs.map
