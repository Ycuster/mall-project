import { _ as __nuxt_component_0 } from "./nuxt-link-iTsWrgYA.js";
import { defineComponent, ref, resolveComponent, resolveDirective, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, withDirectives, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderList, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { ElMessage } from "element-plus";
import { a as useSeoMeta } from "./v3-DqToCt8T.js";
import { u as useNuxtApp, _ as _export_sfc } from "../server.mjs";
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
const pageSize = 10;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "orders",
  __ssrInlineRender: true,
  setup(__props) {
    const statusMap = {
      pending: "待付款",
      paid: "已付款",
      shipped: "已发货",
      completed: "已完成",
      cancelled: "已取消"
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
      title: "我的订单 - MallShop",
      description: "查看我的订单"
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
        ElMessage.success("订单已取消");
        load();
      } else ElMessage.error(res.message || "操作失败");
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
            _push2(`<span style="${ssrRenderStyle({ "font-size": "1.2rem", "font-weight": "600" })}" data-v-c44a7a63${_scopeId}>我的订单</span>`);
          } else {
            return [
              createVNode("span", { style: { "font-size": "1.2rem", "font-weight": "600" } }, "我的订单")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_loading, loading.value))} data-v-c44a7a63${_scopeId}>`);
            if (!orders2.value.length && !loading.value) {
              _push2(ssrRenderComponent(_component_el_empty, { description: "暂无订单" }, {
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
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(orders2.value, (order) => {
              _push2(`<div class="order-item" data-v-c44a7a63${_scopeId}><div class="order-header" data-v-c44a7a63${_scopeId}><span data-v-c44a7a63${_scopeId}>订单号: ${ssrInterpolate(order.order_no)}</span><span data-v-c44a7a63${_scopeId}>${ssrInterpolate(new Date(order.created_at).toLocaleString())}</span></div><div class="order-body" data-v-c44a7a63${_scopeId}><div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "align-items": "center" })}" data-v-c44a7a63${_scopeId}>`);
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
              _push2(`<span class="text-price" style="${ssrRenderStyle({ "font-size": "1.2rem" })}" data-v-c44a7a63${_scopeId}> ¥${ssrInterpolate(Number(order.total_amount).toFixed(2))}</span></div>`);
              _push2(ssrRenderComponent(_component_el_text, {
                type: "info",
                size: "small"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` 收货人: ${ssrInterpolate(order.receiver_name)} · ${ssrInterpolate(order.receiver_phone)} · ${ssrInterpolate(order.receiver_address)}`);
                  } else {
                    return [
                      createTextVNode(" 收货人: " + toDisplayString(order.receiver_name) + " · " + toDisplayString(order.receiver_phone) + " · " + toDisplayString(order.receiver_address), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
              if (order.status === "pending") {
                _push2(`<div class="order-footer" data-v-c44a7a63${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_popconfirm, {
                  title: "确定取消该订单？库存将恢复",
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
                            _push4(`取消订单`);
                          } else {
                            return [
                              createTextVNode("取消订单")
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
                            createTextVNode("取消订单")
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
                      _push3(`去支付`);
                    } else {
                      return [
                        createTextVNode("去支付")
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
                  description: "暂无订单"
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
                })) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList(orders2.value, (order) => {
                  return openBlock(), createBlock("div", {
                    key: order.id,
                    class: "order-item"
                  }, [
                    createVNode("div", { class: "order-header" }, [
                      createVNode("span", null, "订单号: " + toDisplayString(order.order_no), 1),
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
                        }, " ¥" + toDisplayString(Number(order.total_amount).toFixed(2)), 1)
                      ]),
                      createVNode(_component_el_text, {
                        type: "info",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" 收货人: " + toDisplayString(order.receiver_name) + " · " + toDisplayString(order.receiver_phone) + " · " + toDisplayString(order.receiver_address), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    order.status === "pending" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "order-footer"
                    }, [
                      createVNode(_component_el_popconfirm, {
                        title: "确定取消该订单？库存将恢复",
                        onConfirm: ($event) => cancelOrder(order.id)
                      }, {
                        reference: withCtx(() => [
                          createVNode(_component_el_button, {
                            size: "small",
                            type: "danger",
                            plain: ""
                          }, {
                            default: withCtx(() => [
                              createTextVNode("取消订单")
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
                          createTextVNode("去支付")
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
export {
  orders as default
};
//# sourceMappingURL=orders-KPOCsYfs.js.map
