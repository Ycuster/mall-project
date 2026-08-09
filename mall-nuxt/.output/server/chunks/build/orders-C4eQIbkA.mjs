import { defineComponent, ref, resolveComponent, resolveDirective, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, Fragment, withDirectives, withKeys, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { ElMessageBox, ElMessage } from 'element-plus';
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
    const list = ref([]);
    const total = ref(0);
    const page = ref(1);
    const keyword = ref("");
    const statusFilter = ref("");
    const loading = ref(false);
    const detailVisible = ref(false);
    const currentOrder = ref(null);
    async function load(p) {
      if (p) page.value = p;
      loading.value = true;
      const { $api } = useNuxtApp();
      const params = { page: page.value, pageSize: 10, _admin: 1 };
      if (keyword.value) params.keyword = keyword.value;
      if (statusFilter.value) params.status = statusFilter.value;
      const res = await $api.get("/orders", { params });
      if (res.code === 200) {
        list.value = res.data.list;
        total.value = res.data.total;
      }
      loading.value = false;
    }
    async function viewDetail(row) {
      const { $api } = useNuxtApp();
      const res = await $api.get(`/orders/${row.id}`);
      if (res.code === 200) {
        currentOrder.value = res.data;
        detailVisible.value = true;
      }
    }
    async function shipOrder(id) {
      await ElMessageBox.confirm("\u786E\u5B9A\u8981\u5C06\u6B64\u8BA2\u5355\u6807\u8BB0\u4E3A\u5DF2\u53D1\u8D27\uFF1F", "\u53D1\u8D27\u786E\u8BA4");
      const { $api } = useNuxtApp();
      const res = await $api.put(`/orders/${id}/ship`);
      if (res.code === 200) {
        ElMessage.success("\u53D1\u8D27\u6210\u529F");
        await load();
      } else {
        ElMessage.error(res.message || "\u64CD\u4F5C\u5931\u8D25");
      }
    }
    async function cancelOrder(id) {
      const { $api } = useNuxtApp();
      const res = await $api.put(`/orders/${id}/cancel`);
      if (res.code === 200) {
        ElMessage.success("\u8BA2\u5355\u5DF2\u53D6\u6D88");
        await load();
      } else {
        ElMessage.error(res.message || "\u64CD\u4F5C\u5931\u8D25");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = resolveComponent("el-card");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_select = resolveComponent("el-select");
      const _component_el_option = resolveComponent("el-option");
      const _component_el_table = resolveComponent("el-table");
      const _component_el_table_column = resolveComponent("el-table-column");
      const _component_el_tag = resolveComponent("el-tag");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_popconfirm = resolveComponent("el-popconfirm");
      const _component_el_pagination = resolveComponent("el-pagination");
      const _component_el_drawer = resolveComponent("el-drawer");
      const _component_el_descriptions = resolveComponent("el-descriptions");
      const _component_el_descriptions_item = resolveComponent("el-descriptions-item");
      const _directive_loading = resolveDirective("loading");
      _push(ssrRenderComponent(_component_el_card, mergeProps({ shadow: "never" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "align-items": "center" })}" data-v-e4cbf5d3${_scopeId}><span style="${ssrRenderStyle({ "font-weight": "600" })}" data-v-e4cbf5d3${_scopeId}>\u8BA2\u5355\u7BA1\u7406</span><div style="${ssrRenderStyle({ "display": "flex", "gap": "10px" })}" data-v-e4cbf5d3${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: keyword.value,
              "onUpdate:modelValue": ($event) => keyword.value = $event,
              placeholder: "\u641C\u7D22\u8BA2\u5355\u53F7/\u7528\u6237...",
              clearable: "",
              style: { "width": "220px" },
              onKeydown: ($event) => load(1),
              onClear: ($event) => load(1)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_select, {
              modelValue: statusFilter.value,
              "onUpdate:modelValue": ($event) => statusFilter.value = $event,
              placeholder: "\u72B6\u6001",
              clearable: "",
              style: { "width": "140px" },
              onChange: ($event) => load(1)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "\u5F85\u4ED8\u6B3E",
                    value: "pending"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "\u5DF2\u4ED8\u6B3E",
                    value: "paid"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "\u5DF2\u53D1\u8D27",
                    value: "shipped"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "\u5DF2\u5B8C\u6210",
                    value: "completed"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_option, {
                    label: "\u5DF2\u53D6\u6D88",
                    value: "cancelled"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_option, {
                      label: "\u5F85\u4ED8\u6B3E",
                      value: "pending"
                    }),
                    createVNode(_component_el_option, {
                      label: "\u5DF2\u4ED8\u6B3E",
                      value: "paid"
                    }),
                    createVNode(_component_el_option, {
                      label: "\u5DF2\u53D1\u8D27",
                      value: "shipped"
                    }),
                    createVNode(_component_el_option, {
                      label: "\u5DF2\u5B8C\u6210",
                      value: "completed"
                    }),
                    createVNode(_component_el_option, {
                      label: "\u5DF2\u53D6\u6D88",
                      value: "cancelled"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { style: { "display": "flex", "justify-content": "space-between", "align-items": "center" } }, [
                createVNode("span", { style: { "font-weight": "600" } }, "\u8BA2\u5355\u7BA1\u7406"),
                createVNode("div", { style: { "display": "flex", "gap": "10px" } }, [
                  createVNode(_component_el_input, {
                    modelValue: keyword.value,
                    "onUpdate:modelValue": ($event) => keyword.value = $event,
                    placeholder: "\u641C\u7D22\u8BA2\u5355\u53F7/\u7528\u6237...",
                    clearable: "",
                    style: { "width": "220px" },
                    onKeydown: withKeys(($event) => load(1), ["enter"]),
                    onClear: ($event) => load(1)
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown", "onClear"]),
                  createVNode(_component_el_select, {
                    modelValue: statusFilter.value,
                    "onUpdate:modelValue": ($event) => statusFilter.value = $event,
                    placeholder: "\u72B6\u6001",
                    clearable: "",
                    style: { "width": "140px" },
                    onChange: ($event) => load(1)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_option, {
                        label: "\u5F85\u4ED8\u6B3E",
                        value: "pending"
                      }),
                      createVNode(_component_el_option, {
                        label: "\u5DF2\u4ED8\u6B3E",
                        value: "paid"
                      }),
                      createVNode(_component_el_option, {
                        label: "\u5DF2\u53D1\u8D27",
                        value: "shipped"
                      }),
                      createVNode(_component_el_option, {
                        label: "\u5DF2\u5B8C\u6210",
                        value: "completed"
                      }),
                      createVNode(_component_el_option, {
                        label: "\u5DF2\u53D6\u6D88",
                        value: "cancelled"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table, mergeProps({
              data: list.value,
              stripe: ""
            }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u8BA2\u5355\u53F7",
                    prop: "order_no",
                    width: "180",
                    "show-overflow-tooltip": ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, { label: "\u7528\u6237" }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(row.nickname || row.username)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(row.nickname || row.username), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u6536\u4EF6\u4EBA",
                    prop: "receiver_name",
                    width: "100"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u6536\u4EF6\u7535\u8BDD",
                    prop: "receiver_phone",
                    width: "130"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u5730\u5740",
                    prop: "receiver_address",
                    "min-width": "200",
                    "show-overflow-tooltip": ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u91D1\u989D",
                    width: "100",
                    align: "center"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-price" data-v-e4cbf5d3${_scopeId3}>\xA5${ssrInterpolate(Number(row.total_amount).toFixed(2))}</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-price" }, "\xA5" + toDisplayString(Number(row.total_amount).toFixed(2)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u72B6\u6001",
                    width: "100",
                    align: "center"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_tag, {
                          type: statusType[row.status],
                          size: "small"
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(statusMap[row.status])}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(statusMap[row.status]), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u4E0B\u5355\u65F6\u95F4",
                    prop: "created_at",
                    width: "170"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u64CD\u4F5C",
                    width: "200",
                    fixed: "right"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_button, {
                          type: "primary",
                          text: "",
                          size: "small",
                          onClick: ($event) => viewDetail(row)
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`\u8BE6\u60C5`);
                            } else {
                              return [
                                createTextVNode("\u8BE6\u60C5")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        if (row.status === "paid") {
                          _push4(ssrRenderComponent(_component_el_button, {
                            type: "success",
                            text: "",
                            size: "small",
                            onClick: ($event) => shipOrder(row.id)
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` \u53D1\u8D27 `);
                              } else {
                                return [
                                  createTextVNode(" \u53D1\u8D27 ")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (row.status === "pending" || row.status === "paid") {
                          _push4(ssrRenderComponent(_component_el_popconfirm, {
                            title: "\u786E\u5B9A\u53D6\u6D88\u8BA2\u5355\uFF1F",
                            onConfirm: ($event) => cancelOrder(row.id)
                          }, {
                            reference: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_button, {
                                  type: "danger",
                                  text: "",
                                  size: "small"
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`\u53D6\u6D88`);
                                    } else {
                                      return [
                                        createTextVNode("\u53D6\u6D88")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_button, {
                                    type: "danger",
                                    text: "",
                                    size: "small"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("\u53D6\u6D88")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(_component_el_button, {
                            type: "primary",
                            text: "",
                            size: "small",
                            onClick: ($event) => viewDetail(row)
                          }, {
                            default: withCtx(() => [
                              createTextVNode("\u8BE6\u60C5")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          row.status === "paid" ? (openBlock(), createBlock(_component_el_button, {
                            key: 0,
                            type: "success",
                            text: "",
                            size: "small",
                            onClick: ($event) => shipOrder(row.id)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" \u53D1\u8D27 ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])) : createCommentVNode("", true),
                          row.status === "pending" || row.status === "paid" ? (openBlock(), createBlock(_component_el_popconfirm, {
                            key: 1,
                            title: "\u786E\u5B9A\u53D6\u6D88\u8BA2\u5355\uFF1F",
                            onConfirm: ($event) => cancelOrder(row.id)
                          }, {
                            reference: withCtx(() => [
                              createVNode(_component_el_button, {
                                type: "danger",
                                text: "",
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("\u53D6\u6D88")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["onConfirm"])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_table_column, {
                      label: "\u8BA2\u5355\u53F7",
                      prop: "order_no",
                      width: "180",
                      "show-overflow-tooltip": ""
                    }),
                    createVNode(_component_el_table_column, { label: "\u7528\u6237" }, {
                      default: withCtx(({ row }) => [
                        createTextVNode(toDisplayString(row.nickname || row.username), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u6536\u4EF6\u4EBA",
                      prop: "receiver_name",
                      width: "100"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u6536\u4EF6\u7535\u8BDD",
                      prop: "receiver_phone",
                      width: "130"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u5730\u5740",
                      prop: "receiver_address",
                      "min-width": "200",
                      "show-overflow-tooltip": ""
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u91D1\u989D",
                      width: "100",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode("span", { class: "text-price" }, "\xA5" + toDisplayString(Number(row.total_amount).toFixed(2)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u72B6\u6001",
                      width: "100",
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
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u4E0B\u5355\u65F6\u95F4",
                      prop: "created_at",
                      width: "170"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u64CD\u4F5C",
                      width: "200",
                      fixed: "right"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_button, {
                          type: "primary",
                          text: "",
                          size: "small",
                          onClick: ($event) => viewDetail(row)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("\u8BE6\u60C5")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        row.status === "paid" ? (openBlock(), createBlock(_component_el_button, {
                          key: 0,
                          type: "success",
                          text: "",
                          size: "small",
                          onClick: ($event) => shipOrder(row.id)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" \u53D1\u8D27 ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])) : createCommentVNode("", true),
                        row.status === "pending" || row.status === "paid" ? (openBlock(), createBlock(_component_el_popconfirm, {
                          key: 1,
                          title: "\u786E\u5B9A\u53D6\u6D88\u8BA2\u5355\uFF1F",
                          onConfirm: ($event) => cancelOrder(row.id)
                        }, {
                          reference: withCtx(() => [
                            createVNode(_component_el_button, {
                              type: "danger",
                              text: "",
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("\u53D6\u6D88")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["onConfirm"])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "center", "margin-top": "20px" })}" data-v-e4cbf5d3${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_pagination, {
              "current-page": page.value,
              "onUpdate:currentPage": ($event) => page.value = $event,
              "page-size": 10,
              total: total.value,
              layout: "total, prev, pager, next",
              onCurrentChange: load
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_el_drawer, {
              modelValue: detailVisible.value,
              "onUpdate:modelValue": ($event) => detailVisible.value = $event,
              title: "\u8BA2\u5355\u8BE6\u60C5",
              size: "560px"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (currentOrder.value) {
                    _push3(`<!--[-->`);
                    _push3(ssrRenderComponent(_component_el_descriptions, {
                      column: 2,
                      border: "",
                      size: "small",
                      style: { "margin-bottom": "20px" }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_descriptions_item, { label: "\u8BA2\u5355\u53F7" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(currentOrder.value.order_no)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(currentOrder.value.order_no), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_descriptions_item, { label: "\u72B6\u6001" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_tag, {
                                  type: statusType[currentOrder.value.status],
                                  size: "small"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(statusMap[currentOrder.value.status])}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(statusMap[currentOrder.value.status]), 1)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_tag, {
                                    type: statusType[currentOrder.value.status],
                                    size: "small"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(statusMap[currentOrder.value.status]), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["type"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_descriptions_item, { label: "\u6536\u4EF6\u4EBA" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(currentOrder.value.receiver_name)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(currentOrder.value.receiver_name), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_descriptions_item, { label: "\u7535\u8BDD" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(currentOrder.value.receiver_phone)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(currentOrder.value.receiver_phone), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_descriptions_item, {
                            label: "\u5730\u5740",
                            span: 2
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(currentOrder.value.receiver_address)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(currentOrder.value.receiver_address), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_descriptions_item, {
                            label: "\u5907\u6CE8",
                            span: 2
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(currentOrder.value.remark || "-")}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(currentOrder.value.remark || "-"), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_descriptions_item, {
                            label: "\u4E0B\u5355\u65F6\u95F4",
                            span: 2
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(currentOrder.value.created_at)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(currentOrder.value.created_at), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_descriptions_item, { label: "\u8BA2\u5355\u53F7" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(currentOrder.value.order_no), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_descriptions_item, { label: "\u72B6\u6001" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_tag, {
                                  type: statusType[currentOrder.value.status],
                                  size: "small"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(statusMap[currentOrder.value.status]), 1)
                                  ]),
                                  _: 1
                                }, 8, ["type"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_descriptions_item, { label: "\u6536\u4EF6\u4EBA" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(currentOrder.value.receiver_name), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_descriptions_item, { label: "\u7535\u8BDD" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(currentOrder.value.receiver_phone), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_descriptions_item, {
                              label: "\u5730\u5740",
                              span: 2
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(currentOrder.value.receiver_address), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_descriptions_item, {
                              label: "\u5907\u6CE8",
                              span: 2
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(currentOrder.value.remark || "-"), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_descriptions_item, {
                              label: "\u4E0B\u5355\u65F6\u95F4",
                              span: 2
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(currentOrder.value.created_at), 1)
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<h4 style="${ssrRenderStyle({ "margin-bottom": "12px" })}" data-v-e4cbf5d3${_scopeId2}>\u5546\u54C1\u6E05\u5355</h4>`);
                    _push3(ssrRenderComponent(_component_el_table, {
                      data: currentOrder.value.items || [],
                      size: "small",
                      border: ""
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_table_column, {
                            label: "\u5546\u54C1",
                            prop: "product_name"
                          }, null, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_table_column, {
                            label: "\u5355\u4EF7",
                            width: "100",
                            align: "center"
                          }, {
                            default: withCtx(({ row }, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`\xA5${ssrInterpolate(Number(row.price).toFixed(2))}`);
                              } else {
                                return [
                                  createTextVNode("\xA5" + toDisplayString(Number(row.price).toFixed(2)), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_table_column, {
                            label: "\u6570\u91CF",
                            prop: "quantity",
                            width: "80",
                            align: "center"
                          }, null, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_table_column, {
                            label: "\u5C0F\u8BA1",
                            width: "100",
                            align: "center"
                          }, {
                            default: withCtx(({ row }, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`\xA5${ssrInterpolate((Number(row.price) * row.quantity).toFixed(2))}`);
                              } else {
                                return [
                                  createTextVNode("\xA5" + toDisplayString((Number(row.price) * row.quantity).toFixed(2)), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_table_column, {
                              label: "\u5546\u54C1",
                              prop: "product_name"
                            }),
                            createVNode(_component_el_table_column, {
                              label: "\u5355\u4EF7",
                              width: "100",
                              align: "center"
                            }, {
                              default: withCtx(({ row }) => [
                                createTextVNode("\xA5" + toDisplayString(Number(row.price).toFixed(2)), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_table_column, {
                              label: "\u6570\u91CF",
                              prop: "quantity",
                              width: "80",
                              align: "center"
                            }),
                            createVNode(_component_el_table_column, {
                              label: "\u5C0F\u8BA1",
                              width: "100",
                              align: "center"
                            }, {
                              default: withCtx(({ row }) => [
                                createTextVNode("\xA5" + toDisplayString((Number(row.price) * row.quantity).toFixed(2)), 1)
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div style="${ssrRenderStyle({ "text-align": "right", "margin-top": "16px" })}" data-v-e4cbf5d3${_scopeId2}><span style="${ssrRenderStyle({ "font-size": "1rem" })}" data-v-e4cbf5d3${_scopeId2}>\u5408\u8BA1\uFF1A</span><span class="text-price" style="${ssrRenderStyle({ "font-size": "1.3rem" })}" data-v-e4cbf5d3${_scopeId2}>\xA5${ssrInterpolate(Number(currentOrder.value.total_amount).toFixed(2))}</span></div><!--]-->`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    currentOrder.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createVNode(_component_el_descriptions, {
                        column: 2,
                        border: "",
                        size: "small",
                        style: { "margin-bottom": "20px" }
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_descriptions_item, { label: "\u8BA2\u5355\u53F7" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(currentOrder.value.order_no), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_descriptions_item, { label: "\u72B6\u6001" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_tag, {
                                type: statusType[currentOrder.value.status],
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(statusMap[currentOrder.value.status]), 1)
                                ]),
                                _: 1
                              }, 8, ["type"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_descriptions_item, { label: "\u6536\u4EF6\u4EBA" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(currentOrder.value.receiver_name), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_descriptions_item, { label: "\u7535\u8BDD" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(currentOrder.value.receiver_phone), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_descriptions_item, {
                            label: "\u5730\u5740",
                            span: 2
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(currentOrder.value.receiver_address), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_descriptions_item, {
                            label: "\u5907\u6CE8",
                            span: 2
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(currentOrder.value.remark || "-"), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_descriptions_item, {
                            label: "\u4E0B\u5355\u65F6\u95F4",
                            span: 2
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(currentOrder.value.created_at), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("h4", { style: { "margin-bottom": "12px" } }, "\u5546\u54C1\u6E05\u5355"),
                      createVNode(_component_el_table, {
                        data: currentOrder.value.items || [],
                        size: "small",
                        border: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_table_column, {
                            label: "\u5546\u54C1",
                            prop: "product_name"
                          }),
                          createVNode(_component_el_table_column, {
                            label: "\u5355\u4EF7",
                            width: "100",
                            align: "center"
                          }, {
                            default: withCtx(({ row }) => [
                              createTextVNode("\xA5" + toDisplayString(Number(row.price).toFixed(2)), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_table_column, {
                            label: "\u6570\u91CF",
                            prop: "quantity",
                            width: "80",
                            align: "center"
                          }),
                          createVNode(_component_el_table_column, {
                            label: "\u5C0F\u8BA1",
                            width: "100",
                            align: "center"
                          }, {
                            default: withCtx(({ row }) => [
                              createTextVNode("\xA5" + toDisplayString((Number(row.price) * row.quantity).toFixed(2)), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["data"]),
                      createVNode("div", { style: { "text-align": "right", "margin-top": "16px" } }, [
                        createVNode("span", { style: { "font-size": "1rem" } }, "\u5408\u8BA1\uFF1A"),
                        createVNode("span", {
                          class: "text-price",
                          style: { "font-size": "1.3rem" }
                        }, "\xA5" + toDisplayString(Number(currentOrder.value.total_amount).toFixed(2)), 1)
                      ])
                    ], 64)) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              withDirectives((openBlock(), createBlock(_component_el_table, {
                data: list.value,
                stripe: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_table_column, {
                    label: "\u8BA2\u5355\u53F7",
                    prop: "order_no",
                    width: "180",
                    "show-overflow-tooltip": ""
                  }),
                  createVNode(_component_el_table_column, { label: "\u7528\u6237" }, {
                    default: withCtx(({ row }) => [
                      createTextVNode(toDisplayString(row.nickname || row.username), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u6536\u4EF6\u4EBA",
                    prop: "receiver_name",
                    width: "100"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u6536\u4EF6\u7535\u8BDD",
                    prop: "receiver_phone",
                    width: "130"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u5730\u5740",
                    prop: "receiver_address",
                    "min-width": "200",
                    "show-overflow-tooltip": ""
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u91D1\u989D",
                    width: "100",
                    align: "center"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode("span", { class: "text-price" }, "\xA5" + toDisplayString(Number(row.total_amount).toFixed(2)), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u72B6\u6001",
                    width: "100",
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
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u4E0B\u5355\u65F6\u95F4",
                    prop: "created_at",
                    width: "170"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u64CD\u4F5C",
                    width: "200",
                    fixed: "right"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode(_component_el_button, {
                        type: "primary",
                        text: "",
                        size: "small",
                        onClick: ($event) => viewDetail(row)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u8BE6\u60C5")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      row.status === "paid" ? (openBlock(), createBlock(_component_el_button, {
                        key: 0,
                        type: "success",
                        text: "",
                        size: "small",
                        onClick: ($event) => shipOrder(row.id)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" \u53D1\u8D27 ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])) : createCommentVNode("", true),
                      row.status === "pending" || row.status === "paid" ? (openBlock(), createBlock(_component_el_popconfirm, {
                        key: 1,
                        title: "\u786E\u5B9A\u53D6\u6D88\u8BA2\u5355\uFF1F",
                        onConfirm: ($event) => cancelOrder(row.id)
                      }, {
                        reference: withCtx(() => [
                          createVNode(_component_el_button, {
                            type: "danger",
                            text: "",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("\u53D6\u6D88")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["onConfirm"])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["data"])), [
                [_directive_loading, loading.value]
              ]),
              createVNode("div", { style: { "display": "flex", "justify-content": "center", "margin-top": "20px" } }, [
                createVNode(_component_el_pagination, {
                  "current-page": page.value,
                  "onUpdate:currentPage": ($event) => page.value = $event,
                  "page-size": 10,
                  total: total.value,
                  layout: "total, prev, pager, next",
                  onCurrentChange: load
                }, null, 8, ["current-page", "onUpdate:currentPage", "total"])
              ]),
              createVNode(_component_el_drawer, {
                modelValue: detailVisible.value,
                "onUpdate:modelValue": ($event) => detailVisible.value = $event,
                title: "\u8BA2\u5355\u8BE6\u60C5",
                size: "560px"
              }, {
                default: withCtx(() => [
                  currentOrder.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createVNode(_component_el_descriptions, {
                      column: 2,
                      border: "",
                      size: "small",
                      style: { "margin-bottom": "20px" }
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_descriptions_item, { label: "\u8BA2\u5355\u53F7" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(currentOrder.value.order_no), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_descriptions_item, { label: "\u72B6\u6001" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_tag, {
                              type: statusType[currentOrder.value.status],
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(statusMap[currentOrder.value.status]), 1)
                              ]),
                              _: 1
                            }, 8, ["type"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_descriptions_item, { label: "\u6536\u4EF6\u4EBA" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(currentOrder.value.receiver_name), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_descriptions_item, { label: "\u7535\u8BDD" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(currentOrder.value.receiver_phone), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_descriptions_item, {
                          label: "\u5730\u5740",
                          span: 2
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(currentOrder.value.receiver_address), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_descriptions_item, {
                          label: "\u5907\u6CE8",
                          span: 2
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(currentOrder.value.remark || "-"), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_descriptions_item, {
                          label: "\u4E0B\u5355\u65F6\u95F4",
                          span: 2
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(currentOrder.value.created_at), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("h4", { style: { "margin-bottom": "12px" } }, "\u5546\u54C1\u6E05\u5355"),
                    createVNode(_component_el_table, {
                      data: currentOrder.value.items || [],
                      size: "small",
                      border: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_table_column, {
                          label: "\u5546\u54C1",
                          prop: "product_name"
                        }),
                        createVNode(_component_el_table_column, {
                          label: "\u5355\u4EF7",
                          width: "100",
                          align: "center"
                        }, {
                          default: withCtx(({ row }) => [
                            createTextVNode("\xA5" + toDisplayString(Number(row.price).toFixed(2)), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_table_column, {
                          label: "\u6570\u91CF",
                          prop: "quantity",
                          width: "80",
                          align: "center"
                        }),
                        createVNode(_component_el_table_column, {
                          label: "\u5C0F\u8BA1",
                          width: "100",
                          align: "center"
                        }, {
                          default: withCtx(({ row }) => [
                            createTextVNode("\xA5" + toDisplayString((Number(row.price) * row.quantity).toFixed(2)), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["data"]),
                    createVNode("div", { style: { "text-align": "right", "margin-top": "16px" } }, [
                      createVNode("span", { style: { "font-size": "1rem" } }, "\u5408\u8BA1\uFF1A"),
                      createVNode("span", {
                        class: "text-price",
                        style: { "font-size": "1.3rem" }
                      }, "\xA5" + toDisplayString(Number(currentOrder.value.total_amount).toFixed(2)), 1)
                    ])
                  ], 64)) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/orders.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const orders = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e4cbf5d3"]]);

export { orders as default };
//# sourceMappingURL=orders-C4eQIbkA.mjs.map
