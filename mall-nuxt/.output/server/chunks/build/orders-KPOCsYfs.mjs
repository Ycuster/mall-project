import { _ as __nuxt_component_0 } from './nuxt-link-iTsWrgYA.mjs';
import { defineComponent, ref, resolveComponent, resolveDirective, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, withDirectives, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderList, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { ElMessage } from 'element-plus';
import { u as useSeoMeta } from './v3-DqToCt8T.mjs';
import { _ as _export_sfc, u as useNuxtApp } from './server.mjs';
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

const pageSize = 10;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "orders",
  __ssrInlineRender: true,
  setup(__props) {
    const statusMap = {
      pending: "\u5F85\u4ED8\u6B3E",
      paid: "\u5DF2\u4ED8\u6B3E",
      shipped: "\u5DF2\u53D1\u8D27",
      completed: "\u5DF2\u5B8C\u6210",
      cancelled: "\u5DF2\u53D6\u6D88"
    };
    const statusType = {
      pending: "warning",
      paid: "primary",
      shipped: "success",
      completed: "",
      cancelled: "info"
    };
    const orders2 = ref([]);
    const loading = ref(true);
    const page = ref(1);
    const total = ref(0);
    useSeoMeta({
      title: "\u6211\u7684\u8BA2\u5355 - MallShop",
      description: "\u67E5\u770B\u6211\u7684\u8BA2\u5355"
    });
    async function load(p) {
      if (p) page.value = p;
      loading.value = true;
      const { $api } = useNuxtApp();
      const res = await $api.get("/orders", { params: { page: page.value, pageSize } });
      if (res.code === 200) {
        orders2.value = res.data.list;
        total.value = res.data.total;
      }
      loading.value = false;
    }
    async function cancelOrder(id) {
      const { $api } = useNuxtApp();
      const res = await $api.put(`/orders/${id}/status`, { status: "cancelled" });
      if (res.code === 200) {
        ElMessage.success("\u8BA2\u5355\u5DF2\u53D6\u6D88");
        load();
      } else ElMessage.error(res.message || "\u64CD\u4F5C\u5931\u8D25");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = resolveComponent("el-card");
      const _component_el_empty = resolveComponent("el-empty");
      const _component_NuxtLink = __nuxt_component_0;
      const _component_el_button = resolveComponent("el-button");
      const _component_el_tag = resolveComponent("el-tag");
      const _component_el_text = resolveComponent("el-text");
      const _component_el_popconfirm = resolveComponent("el-popconfirm");
      const _component_el_pagination = resolveComponent("el-pagination");
      const _directive_loading = resolveDirective("loading");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container" }, _attrs))} data-v-c44a7a63>`);
      _push(ssrRenderComponent(_component_el_card, { shadow: "never" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span style="${ssrRenderStyle({ "font-size": "1.2rem", "font-weight": "600" })}" data-v-c44a7a63${_scopeId}>\u6211\u7684\u8BA2\u5355</span>`);
          } else {
            return [
              createVNode("span", { style: { "font-size": "1.2rem", "font-weight": "600" } }, "\u6211\u7684\u8BA2\u5355")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_loading, loading.value))} data-v-c44a7a63${_scopeId}>`);
            if (!orders2.value.length && !loading.value) {
              _push2(ssrRenderComponent(_component_el_empty, { description: "\u6682\u65E0\u8BA2\u5355" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtLink, { to: "/products" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_button, { type: "primary" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`\u53BB\u9009\u8D2D`);
                              } else {
                                return [
                                  createTextVNode("\u53BB\u9009\u8D2D")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_button, { type: "primary" }, {
                              default: withCtx(() => [
                                createTextVNode("\u53BB\u9009\u8D2D")
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
                              createTextVNode("\u53BB\u9009\u8D2D")
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
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(orders2.value, (order) => {
              _push2(`<div class="order-item" data-v-c44a7a63${_scopeId}><div class="order-header" data-v-c44a7a63${_scopeId}><span data-v-c44a7a63${_scopeId}>\u8BA2\u5355\u53F7: ${ssrInterpolate(order.order_no)}</span><span data-v-c44a7a63${_scopeId}>${ssrInterpolate(new Date(order.created_at).toLocaleString())}</span></div><div class="order-body" data-v-c44a7a63${_scopeId}><div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "align-items": "center" })}" data-v-c44a7a63${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_tag, {
                type: statusType[order.status],
                effect: "dark",
                round: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(statusMap[order.status])}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(statusMap[order.status]), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<span class="text-price" style="${ssrRenderStyle({ "font-size": "1.2rem" })}" data-v-c44a7a63${_scopeId}> \xA5${ssrInterpolate(Number(order.total_amount).toFixed(2))}</span></div>`);
              _push2(ssrRenderComponent(_component_el_text, {
                type: "info",
                size: "small"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` \u6536\u8D27\u4EBA: ${ssrInterpolate(order.receiver_name)} \xB7 ${ssrInterpolate(order.receiver_phone)} \xB7 ${ssrInterpolate(order.receiver_address)}`);
                  } else {
                    return [
                      createTextVNode(" \u6536\u8D27\u4EBA: " + toDisplayString(order.receiver_name) + " \xB7 " + toDisplayString(order.receiver_phone) + " \xB7 " + toDisplayString(order.receiver_address), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
              if (order.status === "pending") {
                _push2(`<div class="order-footer" data-v-c44a7a63${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_popconfirm, {
                  title: "\u786E\u5B9A\u53D6\u6D88\u8BE5\u8BA2\u5355\uFF1F\u5E93\u5B58\u5C06\u6062\u590D",
                  onConfirm: ($event) => cancelOrder(order.id)
                }, {
                  reference: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_button, {
                        size: "small",
                        type: "danger",
                        plain: ""
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`\u53D6\u6D88\u8BA2\u5355`);
                          } else {
                            return [
                              createTextVNode("\u53D6\u6D88\u8BA2\u5355")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_button, {
                          size: "small",
                          type: "danger",
                          plain: ""
                        }, {
                          default: withCtx(() => [
                            createTextVNode("\u53D6\u6D88\u8BA2\u5355")
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_el_button, {
                  size: "small",
                  type: "primary"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`\u53BB\u652F\u4ED8`);
                    } else {
                      return [
                        createTextVNode("\u53BB\u652F\u4ED8")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div>`);
            if (total.value > pageSize) {
              _push2(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "center", "margin-top": "20px" })}" data-v-c44a7a63${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_pagination, {
                "current-page": page.value,
                "onUpdate:currentPage": ($event) => page.value = $event,
                "page-size": pageSize,
                total: total.value,
                layout: "prev, pager, next",
                onCurrentChange: load
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              withDirectives((openBlock(), createBlock("div", null, [
                !orders2.value.length && !loading.value ? (openBlock(), createBlock(_component_el_empty, {
                  key: 0,
                  description: "\u6682\u65E0\u8BA2\u5355"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtLink, { to: "/products" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_button, { type: "primary" }, {
                          default: withCtx(() => [
                            createTextVNode("\u53BB\u9009\u8D2D")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList(orders2.value, (order) => {
                  return openBlock(), createBlock("div", {
                    key: order.id,
                    class: "order-item"
                  }, [
                    createVNode("div", { class: "order-header" }, [
                      createVNode("span", null, "\u8BA2\u5355\u53F7: " + toDisplayString(order.order_no), 1),
                      createVNode("span", null, toDisplayString(new Date(order.created_at).toLocaleString()), 1)
                    ]),
                    createVNode("div", { class: "order-body" }, [
                      createVNode("div", { style: { "display": "flex", "justify-content": "space-between", "align-items": "center" } }, [
                        createVNode(_component_el_tag, {
                          type: statusType[order.status],
                          effect: "dark",
                          round: ""
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(statusMap[order.status]), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"]),
                        createVNode("span", {
                          class: "text-price",
                          style: { "font-size": "1.2rem" }
                        }, " \xA5" + toDisplayString(Number(order.total_amount).toFixed(2)), 1)
                      ]),
                      createVNode(_component_el_text, {
                        type: "info",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" \u6536\u8D27\u4EBA: " + toDisplayString(order.receiver_name) + " \xB7 " + toDisplayString(order.receiver_phone) + " \xB7 " + toDisplayString(order.receiver_address), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    order.status === "pending" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "order-footer"
                    }, [
                      createVNode(_component_el_popconfirm, {
                        title: "\u786E\u5B9A\u53D6\u6D88\u8BE5\u8BA2\u5355\uFF1F\u5E93\u5B58\u5C06\u6062\u590D",
                        onConfirm: ($event) => cancelOrder(order.id)
                      }, {
                        reference: withCtx(() => [
                          createVNode(_component_el_button, {
                            size: "small",
                            type: "danger",
                            plain: ""
                          }, {
                            default: withCtx(() => [
                              createTextVNode("\u53D6\u6D88\u8BA2\u5355")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["onConfirm"]),
                      createVNode(_component_el_button, {
                        size: "small",
                        type: "primary"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u53BB\u652F\u4ED8")
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true)
                  ]);
                }), 128))
              ])), [
                [_directive_loading, loading.value]
              ]),
              total.value > pageSize ? (openBlock(), createBlock("div", {
                key: 0,
                style: { "display": "flex", "justify-content": "center", "margin-top": "20px" }
              }, [
                createVNode(_component_el_pagination, {
                  "current-page": page.value,
                  "onUpdate:currentPage": ($event) => page.value = $event,
                  "page-size": pageSize,
                  total: total.value,
                  layout: "prev, pager, next",
                  onCurrentChange: load
                }, null, 8, ["current-page", "onUpdate:currentPage", "total"])
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/orders.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const orders = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c44a7a63"]]);

export { orders as default };
//# sourceMappingURL=orders-KPOCsYfs.mjs.map
