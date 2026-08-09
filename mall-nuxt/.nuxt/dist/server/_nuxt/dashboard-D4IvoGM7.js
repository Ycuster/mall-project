import { defineComponent, ref, computed, resolveComponent, resolveDirective, mergeProps, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, toDisplayString, Fragment, renderList, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrRenderVNode, ssrInterpolate } from "vue/server-renderer";
import "echarts";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/unctx/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/h3/dist/index.mjs";
import "vue-router";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/defu/dist/defu.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/ufo/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/klona/dist/index.mjs";
import "axios";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/cookie-es/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/destr/dist/index.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/ohash/dist/index.mjs";
import "element-plus";
import "element-plus/es/locale/lang/zh-cn";
import "@element-plus/icons-vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dashboard",
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
    const loading = ref(true);
    const stats = ref({});
    const topProducts = ref([]);
    const recentOrders = ref([]);
    const revenueChartRef = ref(null);
    const statusChartRef = ref(null);
    const statCards = computed(() => [
      { label: "总营收", value: "¥" + Number(stats.value.totalRevenue || 0).toLocaleString(), icon: "Coin", color: "#f59e0b", bg: "#fffbeb" },
      { label: "总订单", value: String(stats.value.totalOrders || 0), icon: "Document", color: "#3b82f6", bg: "#eff6ff" },
      { label: "注册用户", value: String(stats.value.totalUsers || 0), icon: "User", color: "#10b981", bg: "#ecfdf5" },
      { label: "商品数量", value: String(stats.value.totalProducts || 0), icon: "Goods", color: "#ef4444", bg: "#fef2f2" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_row = resolveComponent("el-row");
      const _component_el_col = resolveComponent("el-col");
      const _component_el_card = resolveComponent("el-card");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_table = resolveComponent("el-table");
      const _component_el_table_column = resolveComponent("el-table-column");
      const _component_el_tag = resolveComponent("el-tag");
      const _directive_loading = resolveDirective("loading");
      _push(`<div${ssrRenderAttrs(mergeProps(_attrs, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-53e8c027>`);
      _push(ssrRenderComponent(_component_el_row, {
        gutter: 20,
        style: { "margin-bottom": "20px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(statCards.value, (item, i) => {
              _push2(ssrRenderComponent(_component_el_col, {
                span: 6,
                key: i
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_card, {
                      shadow: "hover",
                      class: "stat-card",
                      style: { borderTop: `3px solid ${item.color}` }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="stat-icon" style="${ssrRenderStyle({ background: item.bg, color: item.color })}" data-v-53e8c027${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_el_icon, { size: 24 }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                ssrRenderVNode(_push5, createVNode(resolveDynamicComponent(item.icon), null, null), _parent5, _scopeId4);
                              } else {
                                return [
                                  (openBlock(), createBlock(resolveDynamicComponent(item.icon)))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div><div class="stat-info" data-v-53e8c027${_scopeId3}><div class="stat-value" data-v-53e8c027${_scopeId3}>${ssrInterpolate(item.value)}</div><div class="stat-label" data-v-53e8c027${_scopeId3}>${ssrInterpolate(item.label)}</div></div>`);
                        } else {
                          return [
                            createVNode("div", {
                              class: "stat-icon",
                              style: { background: item.bg, color: item.color }
                            }, [
                              createVNode(_component_el_icon, { size: 24 }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(resolveDynamicComponent(item.icon)))
                                ]),
                                _: 2
                              }, 1024)
                            ], 4),
                            createVNode("div", { class: "stat-info" }, [
                              createVNode("div", { class: "stat-value" }, toDisplayString(item.value), 1),
                              createVNode("div", { class: "stat-label" }, toDisplayString(item.label), 1)
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_card, {
                        shadow: "hover",
                        class: "stat-card",
                        style: { borderTop: `3px solid ${item.color}` }
                      }, {
                        default: withCtx(() => [
                          createVNode("div", {
                            class: "stat-icon",
                            style: { background: item.bg, color: item.color }
                          }, [
                            createVNode(_component_el_icon, { size: 24 }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(resolveDynamicComponent(item.icon)))
                              ]),
                              _: 2
                            }, 1024)
                          ], 4),
                          createVNode("div", { class: "stat-info" }, [
                            createVNode("div", { class: "stat-value" }, toDisplayString(item.value), 1),
                            createVNode("div", { class: "stat-label" }, toDisplayString(item.label), 1)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["style"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(statCards.value, (item, i) => {
                return openBlock(), createBlock(_component_el_col, {
                  span: 6,
                  key: i
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_card, {
                      shadow: "hover",
                      class: "stat-card",
                      style: { borderTop: `3px solid ${item.color}` }
                    }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          class: "stat-icon",
                          style: { background: item.bg, color: item.color }
                        }, [
                          createVNode(_component_el_icon, { size: 24 }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(item.icon)))
                            ]),
                            _: 2
                          }, 1024)
                        ], 4),
                        createVNode("div", { class: "stat-info" }, [
                          createVNode("div", { class: "stat-value" }, toDisplayString(item.value), 1),
                          createVNode("div", { class: "stat-label" }, toDisplayString(item.label), 1)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["style"])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_row, {
        gutter: 20,
        style: { "margin-bottom": "20px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_col, { span: 16 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_card, { shadow: "never" }, {
                    header: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span style="${ssrRenderStyle({ "font-weight": "600" })}" data-v-53e8c027${_scopeId3}>近7天营收趋势</span>`);
                      } else {
                        return [
                          createVNode("span", { style: { "font-weight": "600" } }, "近7天营收趋势")
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div style="${ssrRenderStyle({ "height": "300px" })}" data-v-53e8c027${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", {
                            ref_key: "revenueChartRef",
                            ref: revenueChartRef,
                            style: { "height": "300px" }
                          }, null, 512)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_card, { shadow: "never" }, {
                      header: withCtx(() => [
                        createVNode("span", { style: { "font-weight": "600" } }, "近7天营收趋势")
                      ]),
                      default: withCtx(() => [
                        createVNode("div", {
                          ref_key: "revenueChartRef",
                          ref: revenueChartRef,
                          style: { "height": "300px" }
                        }, null, 512)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_col, { span: 8 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_card, { shadow: "never" }, {
                    header: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span style="${ssrRenderStyle({ "font-weight": "600" })}" data-v-53e8c027${_scopeId3}>订单状态分布</span>`);
                      } else {
                        return [
                          createVNode("span", { style: { "font-weight": "600" } }, "订单状态分布")
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div style="${ssrRenderStyle({ "height": "300px" })}" data-v-53e8c027${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", {
                            ref_key: "statusChartRef",
                            ref: statusChartRef,
                            style: { "height": "300px" }
                          }, null, 512)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_card, { shadow: "never" }, {
                      header: withCtx(() => [
                        createVNode("span", { style: { "font-weight": "600" } }, "订单状态分布")
                      ]),
                      default: withCtx(() => [
                        createVNode("div", {
                          ref_key: "statusChartRef",
                          ref: statusChartRef,
                          style: { "height": "300px" }
                        }, null, 512)
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
              createVNode(_component_el_col, { span: 16 }, {
                default: withCtx(() => [
                  createVNode(_component_el_card, { shadow: "never" }, {
                    header: withCtx(() => [
                      createVNode("span", { style: { "font-weight": "600" } }, "近7天营收趋势")
                    ]),
                    default: withCtx(() => [
                      createVNode("div", {
                        ref_key: "revenueChartRef",
                        ref: revenueChartRef,
                        style: { "height": "300px" }
                      }, null, 512)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_el_col, { span: 8 }, {
                default: withCtx(() => [
                  createVNode(_component_el_card, { shadow: "never" }, {
                    header: withCtx(() => [
                      createVNode("span", { style: { "font-weight": "600" } }, "订单状态分布")
                    ]),
                    default: withCtx(() => [
                      createVNode("div", {
                        ref_key: "statusChartRef",
                        ref: statusChartRef,
                        style: { "height": "300px" }
                      }, null, 512)
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
      _push(ssrRenderComponent(_component_el_row, { gutter: 20 }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_card, { shadow: "never" }, {
                    header: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span style="${ssrRenderStyle({ "font-weight": "600" })}" data-v-53e8c027${_scopeId3}>热销商品 TOP10</span>`);
                      } else {
                        return [
                          createVNode("span", { style: { "font-weight": "600" } }, "热销商品 TOP10")
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_table, {
                          data: topProducts.value,
                          size: "small"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_table_column, {
                                label: "商品",
                                prop: "name",
                                "show-overflow-tooltip": ""
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_table_column, {
                                label: "价格",
                                width: "100",
                                align: "center"
                              }, {
                                default: withCtx(({ row }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`¥${ssrInterpolate(Number(row.price).toFixed(2))}`);
                                  } else {
                                    return [
                                      createTextVNode("¥" + toDisplayString(Number(row.price).toFixed(2)), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_table_column, {
                                label: "销量",
                                prop: "sales",
                                width: "80",
                                align: "center",
                                sortable: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_table_column, {
                                  label: "商品",
                                  prop: "name",
                                  "show-overflow-tooltip": ""
                                }),
                                createVNode(_component_el_table_column, {
                                  label: "价格",
                                  width: "100",
                                  align: "center"
                                }, {
                                  default: withCtx(({ row }) => [
                                    createTextVNode("¥" + toDisplayString(Number(row.price).toFixed(2)), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_table_column, {
                                  label: "销量",
                                  prop: "sales",
                                  width: "80",
                                  align: "center",
                                  sortable: ""
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_table, {
                            data: topProducts.value,
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_table_column, {
                                label: "商品",
                                prop: "name",
                                "show-overflow-tooltip": ""
                              }),
                              createVNode(_component_el_table_column, {
                                label: "价格",
                                width: "100",
                                align: "center"
                              }, {
                                default: withCtx(({ row }) => [
                                  createTextVNode("¥" + toDisplayString(Number(row.price).toFixed(2)), 1)
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_table_column, {
                                label: "销量",
                                prop: "sales",
                                width: "80",
                                align: "center",
                                sortable: ""
                              })
                            ]),
                            _: 1
                          }, 8, ["data"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_card, { shadow: "never" }, {
                      header: withCtx(() => [
                        createVNode("span", { style: { "font-weight": "600" } }, "热销商品 TOP10")
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_el_table, {
                          data: topProducts.value,
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_table_column, {
                              label: "商品",
                              prop: "name",
                              "show-overflow-tooltip": ""
                            }),
                            createVNode(_component_el_table_column, {
                              label: "价格",
                              width: "100",
                              align: "center"
                            }, {
                              default: withCtx(({ row }) => [
                                createTextVNode("¥" + toDisplayString(Number(row.price).toFixed(2)), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_table_column, {
                              label: "销量",
                              prop: "sales",
                              width: "80",
                              align: "center",
                              sortable: ""
                            })
                          ]),
                          _: 1
                        }, 8, ["data"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_card, { shadow: "never" }, {
                    header: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span style="${ssrRenderStyle({ "font-weight": "600" })}" data-v-53e8c027${_scopeId3}>最近订单</span>`);
                      } else {
                        return [
                          createVNode("span", { style: { "font-weight": "600" } }, "最近订单")
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_table, {
                          data: recentOrders.value,
                          size: "small"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_table_column, {
                                label: "订单号",
                                prop: "order_no",
                                width: "160",
                                "show-overflow-tooltip": ""
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_table_column, { label: "用户" }, {
                                default: withCtx(({ row }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(row.nickname || row.username)}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(row.nickname || row.username), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_table_column, {
                                label: "金额",
                                width: "100",
                                align: "center"
                              }, {
                                default: withCtx(({ row }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`¥${ssrInterpolate(Number(row.total_amount).toFixed(2))}`);
                                  } else {
                                    return [
                                      createTextVNode("¥" + toDisplayString(Number(row.total_amount).toFixed(2)), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_table_column, {
                                label: "状态",
                                width: "80",
                                align: "center"
                              }, {
                                default: withCtx(({ row }, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_tag, {
                                      type: statusType[row.status],
                                      size: "small"
                                    }, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`${ssrInterpolate(statusMap[row.status])}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(statusMap[row.status]), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_tag, {
                                        type: statusType[row.status],
                                        size: "small"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(statusMap[row.status]), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["type"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_table_column, {
                                  label: "订单号",
                                  prop: "order_no",
                                  width: "160",
                                  "show-overflow-tooltip": ""
                                }),
                                createVNode(_component_el_table_column, { label: "用户" }, {
                                  default: withCtx(({ row }) => [
                                    createTextVNode(toDisplayString(row.nickname || row.username), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_table_column, {
                                  label: "金额",
                                  width: "100",
                                  align: "center"
                                }, {
                                  default: withCtx(({ row }) => [
                                    createTextVNode("¥" + toDisplayString(Number(row.total_amount).toFixed(2)), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_table_column, {
                                  label: "状态",
                                  width: "80",
                                  align: "center"
                                }, {
                                  default: withCtx(({ row }) => [
                                    createVNode(_component_el_tag, {
                                      type: statusType[row.status],
                                      size: "small"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(statusMap[row.status]), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["type"])
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
                          createVNode(_component_el_table, {
                            data: recentOrders.value,
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_table_column, {
                                label: "订单号",
                                prop: "order_no",
                                width: "160",
                                "show-overflow-tooltip": ""
                              }),
                              createVNode(_component_el_table_column, { label: "用户" }, {
                                default: withCtx(({ row }) => [
                                  createTextVNode(toDisplayString(row.nickname || row.username), 1)
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_table_column, {
                                label: "金额",
                                width: "100",
                                align: "center"
                              }, {
                                default: withCtx(({ row }) => [
                                  createTextVNode("¥" + toDisplayString(Number(row.total_amount).toFixed(2)), 1)
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_table_column, {
                                label: "状态",
                                width: "80",
                                align: "center"
                              }, {
                                default: withCtx(({ row }) => [
                                  createVNode(_component_el_tag, {
                                    type: statusType[row.status],
                                    size: "small"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(statusMap[row.status]), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["type"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["data"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_card, { shadow: "never" }, {
                      header: withCtx(() => [
                        createVNode("span", { style: { "font-weight": "600" } }, "最近订单")
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_el_table, {
                          data: recentOrders.value,
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_table_column, {
                              label: "订单号",
                              prop: "order_no",
                              width: "160",
                              "show-overflow-tooltip": ""
                            }),
                            createVNode(_component_el_table_column, { label: "用户" }, {
                              default: withCtx(({ row }) => [
                                createTextVNode(toDisplayString(row.nickname || row.username), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_table_column, {
                              label: "金额",
                              width: "100",
                              align: "center"
                            }, {
                              default: withCtx(({ row }) => [
                                createTextVNode("¥" + toDisplayString(Number(row.total_amount).toFixed(2)), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_table_column, {
                              label: "状态",
                              width: "80",
                              align: "center"
                            }, {
                              default: withCtx(({ row }) => [
                                createVNode(_component_el_tag, {
                                  type: statusType[row.status],
                                  size: "small"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(statusMap[row.status]), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["type"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["data"])
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
              createVNode(_component_el_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode(_component_el_card, { shadow: "never" }, {
                    header: withCtx(() => [
                      createVNode("span", { style: { "font-weight": "600" } }, "热销商品 TOP10")
                    ]),
                    default: withCtx(() => [
                      createVNode(_component_el_table, {
                        data: topProducts.value,
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_table_column, {
                            label: "商品",
                            prop: "name",
                            "show-overflow-tooltip": ""
                          }),
                          createVNode(_component_el_table_column, {
                            label: "价格",
                            width: "100",
                            align: "center"
                          }, {
                            default: withCtx(({ row }) => [
                              createTextVNode("¥" + toDisplayString(Number(row.price).toFixed(2)), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_table_column, {
                            label: "销量",
                            prop: "sales",
                            width: "80",
                            align: "center",
                            sortable: ""
                          })
                        ]),
                        _: 1
                      }, 8, ["data"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_el_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode(_component_el_card, { shadow: "never" }, {
                    header: withCtx(() => [
                      createVNode("span", { style: { "font-weight": "600" } }, "最近订单")
                    ]),
                    default: withCtx(() => [
                      createVNode(_component_el_table, {
                        data: recentOrders.value,
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_table_column, {
                            label: "订单号",
                            prop: "order_no",
                            width: "160",
                            "show-overflow-tooltip": ""
                          }),
                          createVNode(_component_el_table_column, { label: "用户" }, {
                            default: withCtx(({ row }) => [
                              createTextVNode(toDisplayString(row.nickname || row.username), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_table_column, {
                            label: "金额",
                            width: "100",
                            align: "center"
                          }, {
                            default: withCtx(({ row }) => [
                              createTextVNode("¥" + toDisplayString(Number(row.total_amount).toFixed(2)), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_table_column, {
                            label: "状态",
                            width: "80",
                            align: "center"
                          }, {
                            default: withCtx(({ row }) => [
                              createVNode(_component_el_tag, {
                                type: statusType[row.status],
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(statusMap[row.status]), 1)
                                ]),
                                _: 2
                              }, 1032, ["type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["data"])
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-53e8c027"]]);
export {
  dashboard as default
};
//# sourceMappingURL=dashboard-D4IvoGM7.js.map
