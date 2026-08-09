import { defineComponent, computed, ref, reactive, resolveComponent, resolveDirective, mergeProps, withCtx, openBlock, createBlock, createCommentVNode, createVNode, toDisplayString, createTextVNode, Fragment, renderList, unref, withDirectives, withKeys, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
import { u as useUserStore } from './user-OpFIMyWU.mjs';
import { ElMessage } from 'element-plus';
import { d as useRuntimeConfig, u as useNuxtApp } from './server.mjs';
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
  __name: "products",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    const uploadUrl = computed(() => {
      const config = useRuntimeConfig();
      return config.public.apiBase + "/upload";
    });
    const list = ref([]);
    const categories = ref([]);
    const total = ref(0);
    const page = ref(1);
    const keyword = ref("");
    const loading = ref(false);
    const dialogVisible = ref(false);
    const isEdit = ref(false);
    const editId = ref(null);
    const saving = ref(false);
    const formRef = ref();
    const form = reactive({
      name: "",
      price: 0,
      original_price: 0,
      stock: 0,
      category_id: null,
      description: "",
      cover: "",
      images: "",
      status: 1,
      is_hot: 0,
      is_new: 0
    });
    const formRules = {
      name: [{ required: true, message: "\u8BF7\u8F93\u5165\u5546\u54C1\u540D\u79F0", trigger: "blur" }],
      price: [{ required: true, message: "\u8BF7\u8F93\u5165\u4EF7\u683C", trigger: "blur" }]
    };
    async function load(p) {
      if (p) page.value = p;
      loading.value = true;
      const { $api } = useNuxtApp();
      const res = await $api.get("/products", {
        params: { page: page.value, pageSize: 10, keyword: keyword.value, _admin: 1, status: "" }
      });
      if (res.code === 200) {
        list.value = res.data.list;
        total.value = res.data.total;
      }
      loading.value = false;
    }
    function openDialog(row) {
      if (row) {
        isEdit.value = true;
        editId.value = row.id;
        Object.assign(form, {
          ...row
        });
      } else {
        isEdit.value = false;
        editId.value = null;
        Object.assign(form, {
          name: "",
          price: 0,
          original_price: 0,
          stock: 0,
          category_id: null,
          description: "",
          cover: "",
          images: "",
          status: 1,
          is_hot: 0,
          is_new: 0
        });
      }
      dialogVisible.value = true;
    }
    function handleUploadSuccess(res) {
      if (res.code === 200) {
        form.cover = res.data.url;
        ElMessage.success("\u4E0A\u4F20\u6210\u529F");
      }
    }
    async function handleSave() {
      await formRef.value.validate();
      saving.value = true;
      const { $api } = useNuxtApp();
      if (!form.cover && form.images) form.cover = form.images;
      const fn = isEdit.value ? $api.put("/products/" + editId.value, form) : $api.post("/products", form);
      const res = await fn;
      if (res.code === 200) {
        ElMessage.success(isEdit.value ? "\u66F4\u65B0\u6210\u529F" : "\u6DFB\u52A0\u6210\u529F");
        dialogVisible.value = false;
        load();
      } else {
        ElMessage.error(res.message || "\u64CD\u4F5C\u5931\u8D25");
      }
      saving.value = false;
    }
    async function handleDelete(id) {
      const { $api } = useNuxtApp();
      const res = await $api.delete("/products/" + id);
      if (res.code === 200) {
        ElMessage.success("\u5DF2\u5220\u9664");
        load();
      } else ElMessage.error(res.message || "\u5220\u9664\u5931\u8D25");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = resolveComponent("el-card");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_Plus = resolveComponent("Plus");
      const _component_el_table = resolveComponent("el-table");
      const _component_el_table_column = resolveComponent("el-table-column");
      const _component_el_image = resolveComponent("el-image");
      const _component_el_tag = resolveComponent("el-tag");
      const _component_el_popconfirm = resolveComponent("el-popconfirm");
      const _component_el_pagination = resolveComponent("el-pagination");
      const _component_el_dialog = resolveComponent("el-dialog");
      const _component_el_form = resolveComponent("el-form");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_row = resolveComponent("el-row");
      const _component_el_col = resolveComponent("el-col");
      const _component_el_input_number = resolveComponent("el-input-number");
      const _component_el_select = resolveComponent("el-select");
      const _component_el_option = resolveComponent("el-option");
      const _component_el_upload = resolveComponent("el-upload");
      const _component_el_switch = resolveComponent("el-switch");
      const _directive_loading = resolveDirective("loading");
      _push(ssrRenderComponent(_component_el_card, mergeProps({ shadow: "never" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "align-items": "center" })}"${_scopeId}><span style="${ssrRenderStyle({ "font-weight": "600" })}"${_scopeId}>\u5546\u54C1\u7BA1\u7406</span><div style="${ssrRenderStyle({ "display": "flex", "gap": "10px" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: keyword.value,
              "onUpdate:modelValue": ($event) => keyword.value = $event,
              placeholder: "\u641C\u7D22\u5546\u54C1...",
              clearable: "",
              style: { "width": "200px" },
              onKeydown: ($event) => load(1),
              onClear: ($event) => load(1)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: ($event) => openDialog()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Plus, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Plus)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(` \u6DFB\u52A0\u5546\u54C1 `);
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(_component_Plus)
                      ]),
                      _: 1
                    }),
                    createTextVNode(" \u6DFB\u52A0\u5546\u54C1 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { style: { "display": "flex", "justify-content": "space-between", "align-items": "center" } }, [
                createVNode("span", { style: { "font-weight": "600" } }, "\u5546\u54C1\u7BA1\u7406"),
                createVNode("div", { style: { "display": "flex", "gap": "10px" } }, [
                  createVNode(_component_el_input, {
                    modelValue: keyword.value,
                    "onUpdate:modelValue": ($event) => keyword.value = $event,
                    placeholder: "\u641C\u7D22\u5546\u54C1...",
                    clearable: "",
                    style: { "width": "200px" },
                    onKeydown: withKeys(($event) => load(1), ["enter"]),
                    onClear: ($event) => load(1)
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown", "onClear"]),
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: ($event) => openDialog()
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(_component_Plus)
                        ]),
                        _: 1
                      }),
                      createTextVNode(" \u6DFB\u52A0\u5546\u54C1 ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
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
                    label: "\u56FE\u7247",
                    width: "80"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (row.cover) {
                          _push4(ssrRenderComponent(_component_el_image, {
                            src: row.cover,
                            style: { "width": "50px", "height": "50px", "border-radius": "6px" },
                            fit: "cover"
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          row.cover ? (openBlock(), createBlock(_component_el_image, {
                            key: 0,
                            src: row.cover,
                            style: { "width": "50px", "height": "50px", "border-radius": "6px" },
                            fit: "cover"
                          }, null, 8, ["src"])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u5546\u54C1\u540D\u79F0",
                    prop: "name",
                    "min-width": "200",
                    "show-overflow-tooltip": ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u5206\u7C7B",
                    prop: "category_name",
                    width: "100"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u4EF7\u683C",
                    width: "100",
                    align: "center"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-price"${_scopeId3}>\xA5${ssrInterpolate(Number(row.price).toFixed(2))}</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-price" }, "\xA5" + toDisplayString(Number(row.price).toFixed(2)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u5E93\u5B58",
                    prop: "stock",
                    width: "80",
                    align: "center",
                    sortable: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u9500\u91CF",
                    prop: "sales",
                    width: "80",
                    align: "center",
                    sortable: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u72B6\u6001",
                    width: "80",
                    align: "center"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_tag, {
                          type: row.status ? "success" : "danger",
                          size: "small"
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(row.status ? "\u4E0A\u67B6" : "\u4E0B\u67B6")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(row.status ? "\u4E0A\u67B6" : "\u4E0B\u67B6"), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_tag, {
                            type: row.status ? "success" : "danger",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(row.status ? "\u4E0A\u67B6" : "\u4E0B\u67B6"), 1)
                            ]),
                            _: 2
                          }, 1032, ["type"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u6807\u7B7E",
                    width: "120",
                    align: "center"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (row.is_hot) {
                          _push4(ssrRenderComponent(_component_el_tag, {
                            type: "danger",
                            size: "small",
                            style: { "margin-right": "4px" }
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`\u70ED\u9500`);
                              } else {
                                return [
                                  createTextVNode("\u70ED\u9500")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (row.is_new) {
                          _push4(ssrRenderComponent(_component_el_tag, {
                            type: "success",
                            size: "small"
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`\u65B0\u54C1`);
                              } else {
                                return [
                                  createTextVNode("\u65B0\u54C1")
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
                          row.is_hot ? (openBlock(), createBlock(_component_el_tag, {
                            key: 0,
                            type: "danger",
                            size: "small",
                            style: { "margin-right": "4px" }
                          }, {
                            default: withCtx(() => [
                              createTextVNode("\u70ED\u9500")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          row.is_new ? (openBlock(), createBlock(_component_el_tag, {
                            key: 1,
                            type: "success",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("\u65B0\u54C1")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u64CD\u4F5C",
                    width: "160",
                    fixed: "right"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_button, {
                          type: "primary",
                          text: "",
                          size: "small",
                          onClick: ($event) => openDialog(row)
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`\u7F16\u8F91`);
                            } else {
                              return [
                                createTextVNode("\u7F16\u8F91")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_popconfirm, {
                          title: "\u786E\u5B9A\u5220\u9664\uFF1F",
                          onConfirm: ($event) => handleDelete(row.id)
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
                                    _push6(`\u5220\u9664`);
                                  } else {
                                    return [
                                      createTextVNode("\u5220\u9664")
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
                                    createTextVNode("\u5220\u9664")
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
                          createVNode(_component_el_button, {
                            type: "primary",
                            text: "",
                            size: "small",
                            onClick: ($event) => openDialog(row)
                          }, {
                            default: withCtx(() => [
                              createTextVNode("\u7F16\u8F91")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_el_popconfirm, {
                            title: "\u786E\u5B9A\u5220\u9664\uFF1F",
                            onConfirm: ($event) => handleDelete(row.id)
                          }, {
                            reference: withCtx(() => [
                              createVNode(_component_el_button, {
                                type: "danger",
                                text: "",
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("\u5220\u9664")
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
                      label: "\u56FE\u7247",
                      width: "80"
                    }, {
                      default: withCtx(({ row }) => [
                        row.cover ? (openBlock(), createBlock(_component_el_image, {
                          key: 0,
                          src: row.cover,
                          style: { "width": "50px", "height": "50px", "border-radius": "6px" },
                          fit: "cover"
                        }, null, 8, ["src"])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u5546\u54C1\u540D\u79F0",
                      prop: "name",
                      "min-width": "200",
                      "show-overflow-tooltip": ""
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u5206\u7C7B",
                      prop: "category_name",
                      width: "100"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u4EF7\u683C",
                      width: "100",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode("span", { class: "text-price" }, "\xA5" + toDisplayString(Number(row.price).toFixed(2)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u5E93\u5B58",
                      prop: "stock",
                      width: "80",
                      align: "center",
                      sortable: ""
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u9500\u91CF",
                      prop: "sales",
                      width: "80",
                      align: "center",
                      sortable: ""
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u72B6\u6001",
                      width: "80",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_tag, {
                          type: row.status ? "success" : "danger",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(row.status ? "\u4E0A\u67B6" : "\u4E0B\u67B6"), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u6807\u7B7E",
                      width: "120",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        row.is_hot ? (openBlock(), createBlock(_component_el_tag, {
                          key: 0,
                          type: "danger",
                          size: "small",
                          style: { "margin-right": "4px" }
                        }, {
                          default: withCtx(() => [
                            createTextVNode("\u70ED\u9500")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        row.is_new ? (openBlock(), createBlock(_component_el_tag, {
                          key: 1,
                          type: "success",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("\u65B0\u54C1")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u64CD\u4F5C",
                      width: "160",
                      fixed: "right"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_button, {
                          type: "primary",
                          text: "",
                          size: "small",
                          onClick: ($event) => openDialog(row)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("\u7F16\u8F91")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_el_popconfirm, {
                          title: "\u786E\u5B9A\u5220\u9664\uFF1F",
                          onConfirm: ($event) => handleDelete(row.id)
                        }, {
                          reference: withCtx(() => [
                            createVNode(_component_el_button, {
                              type: "danger",
                              text: "",
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("\u5220\u9664")
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
            _push2(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "center", "margin-top": "20px" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_pagination, {
              "current-page": page.value,
              "onUpdate:currentPage": ($event) => page.value = $event,
              "page-size": 10,
              total: total.value,
              layout: "total, prev, pager, next",
              onCurrentChange: load
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_el_dialog, {
              modelValue: dialogVisible.value,
              "onUpdate:modelValue": ($event) => dialogVisible.value = $event,
              title: isEdit.value ? "\u7F16\u8F91\u5546\u54C1" : "\u6DFB\u52A0\u5546\u54C1",
              width: "680px",
              "destroy-on-close": ""
            }, {
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    onClick: ($event) => dialogVisible.value = false
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u53D6\u6D88`);
                      } else {
                        return [
                          createTextVNode("\u53D6\u6D88")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_button, {
                    type: "primary",
                    loading: saving.value,
                    onClick: handleSave
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u4FDD\u5B58`);
                      } else {
                        return [
                          createTextVNode("\u4FDD\u5B58")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_button, {
                      onClick: ($event) => dialogVisible.value = false
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u53D6\u6D88")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      type: "primary",
                      loading: saving.value,
                      onClick: handleSave
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u4FDD\u5B58")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form, {
                    model: form,
                    "label-width": "80px",
                    rules: formRules,
                    ref_key: "formRef",
                    ref: formRef
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_form_item, {
                          label: "\u540D\u79F0",
                          prop: "name"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_input, {
                                modelValue: form.name,
                                "onUpdate:modelValue": ($event) => form.name = $event
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_input, {
                                  modelValue: form.name,
                                  "onUpdate:modelValue": ($event) => form.name = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_row, { gutter: 16 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_col, { span: 12 }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_form_item, {
                                      label: "\u552E\u4EF7",
                                      prop: "price"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_el_input_number, {
                                            modelValue: form.price,
                                            "onUpdate:modelValue": ($event) => form.price = $event,
                                            min: 0,
                                            precision: 2,
                                            style: { "width": "100%" }
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_el_input_number, {
                                              modelValue: form.price,
                                              "onUpdate:modelValue": ($event) => form.price = $event,
                                              min: 0,
                                              precision: 2,
                                              style: { "width": "100%" }
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_form_item, {
                                        label: "\u552E\u4EF7",
                                        prop: "price"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_el_input_number, {
                                            modelValue: form.price,
                                            "onUpdate:modelValue": ($event) => form.price = $event,
                                            min: 0,
                                            precision: 2,
                                            style: { "width": "100%" }
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_col, { span: 12 }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_form_item, { label: "\u539F\u4EF7" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_el_input_number, {
                                            modelValue: form.original_price,
                                            "onUpdate:modelValue": ($event) => form.original_price = $event,
                                            min: 0,
                                            precision: 2,
                                            style: { "width": "100%" }
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_el_input_number, {
                                              modelValue: form.original_price,
                                              "onUpdate:modelValue": ($event) => form.original_price = $event,
                                              min: 0,
                                              precision: 2,
                                              style: { "width": "100%" }
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_form_item, { label: "\u539F\u4EF7" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_el_input_number, {
                                            modelValue: form.original_price,
                                            "onUpdate:modelValue": ($event) => form.original_price = $event,
                                            min: 0,
                                            precision: 2,
                                            style: { "width": "100%" }
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                createVNode(_component_el_col, { span: 12 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_form_item, {
                                      label: "\u552E\u4EF7",
                                      prop: "price"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_el_input_number, {
                                          modelValue: form.price,
                                          "onUpdate:modelValue": ($event) => form.price = $event,
                                          min: 0,
                                          precision: 2,
                                          style: { "width": "100%" }
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_col, { span: 12 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_form_item, { label: "\u539F\u4EF7" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_el_input_number, {
                                          modelValue: form.original_price,
                                          "onUpdate:modelValue": ($event) => form.original_price = $event,
                                          min: 0,
                                          precision: 2,
                                          style: { "width": "100%" }
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_row, { gutter: 16 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_col, { span: 12 }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_form_item, { label: "\u5E93\u5B58" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_el_input_number, {
                                            modelValue: form.stock,
                                            "onUpdate:modelValue": ($event) => form.stock = $event,
                                            min: 0,
                                            style: { "width": "100%" }
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_el_input_number, {
                                              modelValue: form.stock,
                                              "onUpdate:modelValue": ($event) => form.stock = $event,
                                              min: 0,
                                              style: { "width": "100%" }
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_form_item, { label: "\u5E93\u5B58" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_el_input_number, {
                                            modelValue: form.stock,
                                            "onUpdate:modelValue": ($event) => form.stock = $event,
                                            min: 0,
                                            style: { "width": "100%" }
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_col, { span: 12 }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_form_item, { label: "\u5206\u7C7B" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_el_select, {
                                            modelValue: form.category_id,
                                            "onUpdate:modelValue": ($event) => form.category_id = $event,
                                            clearable: "",
                                            style: { "width": "100%" }
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<!--[-->`);
                                                ssrRenderList(categories.value, (c) => {
                                                  _push8(ssrRenderComponent(_component_el_option, {
                                                    key: c.id,
                                                    label: c.name,
                                                    value: c.id
                                                  }, null, _parent8, _scopeId7));
                                                });
                                                _push8(`<!--]-->`);
                                              } else {
                                                return [
                                                  (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (c) => {
                                                    return openBlock(), createBlock(_component_el_option, {
                                                      key: c.id,
                                                      label: c.name,
                                                      value: c.id
                                                    }, null, 8, ["label", "value"]);
                                                  }), 128))
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_el_select, {
                                              modelValue: form.category_id,
                                              "onUpdate:modelValue": ($event) => form.category_id = $event,
                                              clearable: "",
                                              style: { "width": "100%" }
                                            }, {
                                              default: withCtx(() => [
                                                (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (c) => {
                                                  return openBlock(), createBlock(_component_el_option, {
                                                    key: c.id,
                                                    label: c.name,
                                                    value: c.id
                                                  }, null, 8, ["label", "value"]);
                                                }), 128))
                                              ]),
                                              _: 1
                                            }, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_form_item, { label: "\u5206\u7C7B" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_el_select, {
                                            modelValue: form.category_id,
                                            "onUpdate:modelValue": ($event) => form.category_id = $event,
                                            clearable: "",
                                            style: { "width": "100%" }
                                          }, {
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (c) => {
                                                return openBlock(), createBlock(_component_el_option, {
                                                  key: c.id,
                                                  label: c.name,
                                                  value: c.id
                                                }, null, 8, ["label", "value"]);
                                              }), 128))
                                            ]),
                                            _: 1
                                          }, 8, ["modelValue", "onUpdate:modelValue"])
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
                                createVNode(_component_el_col, { span: 12 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_form_item, { label: "\u5E93\u5B58" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_el_input_number, {
                                          modelValue: form.stock,
                                          "onUpdate:modelValue": ($event) => form.stock = $event,
                                          min: 0,
                                          style: { "width": "100%" }
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_col, { span: 12 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_form_item, { label: "\u5206\u7C7B" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_el_select, {
                                          modelValue: form.category_id,
                                          "onUpdate:modelValue": ($event) => form.category_id = $event,
                                          clearable: "",
                                          style: { "width": "100%" }
                                        }, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (c) => {
                                              return openBlock(), createBlock(_component_el_option, {
                                                key: c.id,
                                                label: c.name,
                                                value: c.id
                                              }, null, 8, ["label", "value"]);
                                            }), 128))
                                          ]),
                                          _: 1
                                        }, 8, ["modelValue", "onUpdate:modelValue"])
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_form_item, { label: "\u63CF\u8FF0" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_input, {
                                modelValue: form.description,
                                "onUpdate:modelValue": ($event) => form.description = $event,
                                type: "textarea",
                                rows: 3
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_input, {
                                  modelValue: form.description,
                                  "onUpdate:modelValue": ($event) => form.description = $event,
                                  type: "textarea",
                                  rows: 3
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_form_item, { label: "\u5C01\u9762\u56FE" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div style="${ssrRenderStyle({ "display": "flex", "gap": "12px", "align-items": "flex-end" })}"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_el_input, {
                                modelValue: form.cover,
                                "onUpdate:modelValue": ($event) => form.cover = $event,
                                placeholder: "\u56FE\u7247URL",
                                style: { "width": "300px" }
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_upload, {
                                action: uploadUrl.value,
                                headers: { Authorization: "Bearer " + unref(userStore).token },
                                "show-file-list": false,
                                "on-success": handleUploadSuccess
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_button, { size: "small" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`\u4E0A\u4F20`);
                                        } else {
                                          return [
                                            createTextVNode("\u4E0A\u4F20")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_button, { size: "small" }, {
                                        default: withCtx(() => [
                                          createTextVNode("\u4E0A\u4F20")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                              if (form.cover) {
                                _push5(ssrRenderComponent(_component_el_image, {
                                  src: form.cover,
                                  style: { "width": "100px", "height": "100px", "border-radius": "8px", "margin-top": "8px" },
                                  fit: "cover"
                                }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                createVNode("div", { style: { "display": "flex", "gap": "12px", "align-items": "flex-end" } }, [
                                  createVNode(_component_el_input, {
                                    modelValue: form.cover,
                                    "onUpdate:modelValue": ($event) => form.cover = $event,
                                    placeholder: "\u56FE\u7247URL",
                                    style: { "width": "300px" }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode(_component_el_upload, {
                                    action: uploadUrl.value,
                                    headers: { Authorization: "Bearer " + unref(userStore).token },
                                    "show-file-list": false,
                                    "on-success": handleUploadSuccess
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_button, { size: "small" }, {
                                        default: withCtx(() => [
                                          createTextVNode("\u4E0A\u4F20")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["action", "headers"])
                                ]),
                                form.cover ? (openBlock(), createBlock(_component_el_image, {
                                  key: 0,
                                  src: form.cover,
                                  style: { "width": "100px", "height": "100px", "border-radius": "8px", "margin-top": "8px" },
                                  fit: "cover"
                                }, null, 8, ["src"])) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_row, { gutter: 16 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_col, { span: 8 }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_form_item, { label: "\u72B6\u6001" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_el_switch, {
                                            modelValue: form.status,
                                            "onUpdate:modelValue": ($event) => form.status = $event,
                                            "active-value": 1,
                                            "inactive-value": 0,
                                            "active-text": "\u4E0A\u67B6",
                                            "inactive-text": "\u4E0B\u67B6"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_el_switch, {
                                              modelValue: form.status,
                                              "onUpdate:modelValue": ($event) => form.status = $event,
                                              "active-value": 1,
                                              "inactive-value": 0,
                                              "active-text": "\u4E0A\u67B6",
                                              "inactive-text": "\u4E0B\u67B6"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_form_item, { label: "\u72B6\u6001" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_el_switch, {
                                            modelValue: form.status,
                                            "onUpdate:modelValue": ($event) => form.status = $event,
                                            "active-value": 1,
                                            "inactive-value": 0,
                                            "active-text": "\u4E0A\u67B6",
                                            "inactive-text": "\u4E0B\u67B6"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_col, { span: 8 }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_form_item, { label: "\u70ED\u9500" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_el_switch, {
                                            modelValue: form.is_hot,
                                            "onUpdate:modelValue": ($event) => form.is_hot = $event,
                                            "active-value": 1,
                                            "inactive-value": 0
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_el_switch, {
                                              modelValue: form.is_hot,
                                              "onUpdate:modelValue": ($event) => form.is_hot = $event,
                                              "active-value": 1,
                                              "inactive-value": 0
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_form_item, { label: "\u70ED\u9500" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_el_switch, {
                                            modelValue: form.is_hot,
                                            "onUpdate:modelValue": ($event) => form.is_hot = $event,
                                            "active-value": 1,
                                            "inactive-value": 0
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_col, { span: 8 }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_form_item, { label: "\u65B0\u54C1" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_el_switch, {
                                            modelValue: form.is_new,
                                            "onUpdate:modelValue": ($event) => form.is_new = $event,
                                            "active-value": 1,
                                            "inactive-value": 0
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_el_switch, {
                                              modelValue: form.is_new,
                                              "onUpdate:modelValue": ($event) => form.is_new = $event,
                                              "active-value": 1,
                                              "inactive-value": 0
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_form_item, { label: "\u65B0\u54C1" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_el_switch, {
                                            modelValue: form.is_new,
                                            "onUpdate:modelValue": ($event) => form.is_new = $event,
                                            "active-value": 1,
                                            "inactive-value": 0
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                createVNode(_component_el_col, { span: 8 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_form_item, { label: "\u72B6\u6001" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_el_switch, {
                                          modelValue: form.status,
                                          "onUpdate:modelValue": ($event) => form.status = $event,
                                          "active-value": 1,
                                          "inactive-value": 0,
                                          "active-text": "\u4E0A\u67B6",
                                          "inactive-text": "\u4E0B\u67B6"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_col, { span: 8 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_form_item, { label: "\u70ED\u9500" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_el_switch, {
                                          modelValue: form.is_hot,
                                          "onUpdate:modelValue": ($event) => form.is_hot = $event,
                                          "active-value": 1,
                                          "inactive-value": 0
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_col, { span: 8 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_form_item, { label: "\u65B0\u54C1" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_el_switch, {
                                          modelValue: form.is_new,
                                          "onUpdate:modelValue": ($event) => form.is_new = $event,
                                          "active-value": 1,
                                          "inactive-value": 0
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_form_item, {
                            label: "\u540D\u79F0",
                            prop: "name"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: form.name,
                                "onUpdate:modelValue": ($event) => form.name = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_row, { gutter: 16 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_col, { span: 12 }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_form_item, {
                                    label: "\u552E\u4EF7",
                                    prop: "price"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_input_number, {
                                        modelValue: form.price,
                                        "onUpdate:modelValue": ($event) => form.price = $event,
                                        min: 0,
                                        precision: 2,
                                        style: { "width": "100%" }
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_col, { span: 12 }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_form_item, { label: "\u539F\u4EF7" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_input_number, {
                                        modelValue: form.original_price,
                                        "onUpdate:modelValue": ($event) => form.original_price = $event,
                                        min: 0,
                                        precision: 2,
                                        style: { "width": "100%" }
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_row, { gutter: 16 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_col, { span: 12 }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_form_item, { label: "\u5E93\u5B58" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_input_number, {
                                        modelValue: form.stock,
                                        "onUpdate:modelValue": ($event) => form.stock = $event,
                                        min: 0,
                                        style: { "width": "100%" }
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_col, { span: 12 }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_form_item, { label: "\u5206\u7C7B" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_select, {
                                        modelValue: form.category_id,
                                        "onUpdate:modelValue": ($event) => form.category_id = $event,
                                        clearable: "",
                                        style: { "width": "100%" }
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (c) => {
                                            return openBlock(), createBlock(_component_el_option, {
                                              key: c.id,
                                              label: c.name,
                                              value: c.id
                                            }, null, 8, ["label", "value"]);
                                          }), 128))
                                        ]),
                                        _: 1
                                      }, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "\u63CF\u8FF0" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: form.description,
                                "onUpdate:modelValue": ($event) => form.description = $event,
                                type: "textarea",
                                rows: 3
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "\u5C01\u9762\u56FE" }, {
                            default: withCtx(() => [
                              createVNode("div", { style: { "display": "flex", "gap": "12px", "align-items": "flex-end" } }, [
                                createVNode(_component_el_input, {
                                  modelValue: form.cover,
                                  "onUpdate:modelValue": ($event) => form.cover = $event,
                                  placeholder: "\u56FE\u7247URL",
                                  style: { "width": "300px" }
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_component_el_upload, {
                                  action: uploadUrl.value,
                                  headers: { Authorization: "Bearer " + unref(userStore).token },
                                  "show-file-list": false,
                                  "on-success": handleUploadSuccess
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_button, { size: "small" }, {
                                      default: withCtx(() => [
                                        createTextVNode("\u4E0A\u4F20")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["action", "headers"])
                              ]),
                              form.cover ? (openBlock(), createBlock(_component_el_image, {
                                key: 0,
                                src: form.cover,
                                style: { "width": "100px", "height": "100px", "border-radius": "8px", "margin-top": "8px" },
                                fit: "cover"
                              }, null, 8, ["src"])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_row, { gutter: 16 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_col, { span: 8 }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_form_item, { label: "\u72B6\u6001" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_switch, {
                                        modelValue: form.status,
                                        "onUpdate:modelValue": ($event) => form.status = $event,
                                        "active-value": 1,
                                        "inactive-value": 0,
                                        "active-text": "\u4E0A\u67B6",
                                        "inactive-text": "\u4E0B\u67B6"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_col, { span: 8 }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_form_item, { label: "\u70ED\u9500" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_switch, {
                                        modelValue: form.is_hot,
                                        "onUpdate:modelValue": ($event) => form.is_hot = $event,
                                        "active-value": 1,
                                        "inactive-value": 0
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_col, { span: 8 }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_form_item, { label: "\u65B0\u54C1" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_switch, {
                                        modelValue: form.is_new,
                                        "onUpdate:modelValue": ($event) => form.is_new = $event,
                                        "active-value": 1,
                                        "inactive-value": 0
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })
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
                    createVNode(_component_el_form, {
                      model: form,
                      "label-width": "80px",
                      rules: formRules,
                      ref_key: "formRef",
                      ref: formRef
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_form_item, {
                          label: "\u540D\u79F0",
                          prop: "name"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              modelValue: form.name,
                              "onUpdate:modelValue": ($event) => form.name = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_row, { gutter: 16 }, {
                          default: withCtx(() => [
                            createVNode(_component_el_col, { span: 12 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, {
                                  label: "\u552E\u4EF7",
                                  prop: "price"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input_number, {
                                      modelValue: form.price,
                                      "onUpdate:modelValue": ($event) => form.price = $event,
                                      min: 0,
                                      precision: 2,
                                      style: { "width": "100%" }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_col, { span: 12 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, { label: "\u539F\u4EF7" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input_number, {
                                      modelValue: form.original_price,
                                      "onUpdate:modelValue": ($event) => form.original_price = $event,
                                      min: 0,
                                      precision: 2,
                                      style: { "width": "100%" }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_row, { gutter: 16 }, {
                          default: withCtx(() => [
                            createVNode(_component_el_col, { span: 12 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, { label: "\u5E93\u5B58" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input_number, {
                                      modelValue: form.stock,
                                      "onUpdate:modelValue": ($event) => form.stock = $event,
                                      min: 0,
                                      style: { "width": "100%" }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_col, { span: 12 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, { label: "\u5206\u7C7B" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_select, {
                                      modelValue: form.category_id,
                                      "onUpdate:modelValue": ($event) => form.category_id = $event,
                                      clearable: "",
                                      style: { "width": "100%" }
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (c) => {
                                          return openBlock(), createBlock(_component_el_option, {
                                            key: c.id,
                                            label: c.name,
                                            value: c.id
                                          }, null, 8, ["label", "value"]);
                                        }), 128))
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, { label: "\u63CF\u8FF0" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              modelValue: form.description,
                              "onUpdate:modelValue": ($event) => form.description = $event,
                              type: "textarea",
                              rows: 3
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, { label: "\u5C01\u9762\u56FE" }, {
                          default: withCtx(() => [
                            createVNode("div", { style: { "display": "flex", "gap": "12px", "align-items": "flex-end" } }, [
                              createVNode(_component_el_input, {
                                modelValue: form.cover,
                                "onUpdate:modelValue": ($event) => form.cover = $event,
                                placeholder: "\u56FE\u7247URL",
                                style: { "width": "300px" }
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_component_el_upload, {
                                action: uploadUrl.value,
                                headers: { Authorization: "Bearer " + unref(userStore).token },
                                "show-file-list": false,
                                "on-success": handleUploadSuccess
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_button, { size: "small" }, {
                                    default: withCtx(() => [
                                      createTextVNode("\u4E0A\u4F20")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["action", "headers"])
                            ]),
                            form.cover ? (openBlock(), createBlock(_component_el_image, {
                              key: 0,
                              src: form.cover,
                              style: { "width": "100px", "height": "100px", "border-radius": "8px", "margin-top": "8px" },
                              fit: "cover"
                            }, null, 8, ["src"])) : createCommentVNode("", true)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_row, { gutter: 16 }, {
                          default: withCtx(() => [
                            createVNode(_component_el_col, { span: 8 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, { label: "\u72B6\u6001" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_switch, {
                                      modelValue: form.status,
                                      "onUpdate:modelValue": ($event) => form.status = $event,
                                      "active-value": 1,
                                      "inactive-value": 0,
                                      "active-text": "\u4E0A\u67B6",
                                      "inactive-text": "\u4E0B\u67B6"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_col, { span: 8 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, { label: "\u70ED\u9500" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_switch, {
                                      modelValue: form.is_hot,
                                      "onUpdate:modelValue": ($event) => form.is_hot = $event,
                                      "active-value": 1,
                                      "inactive-value": 0
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_col, { span: 8 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, { label: "\u65B0\u54C1" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_switch, {
                                      modelValue: form.is_new,
                                      "onUpdate:modelValue": ($event) => form.is_new = $event,
                                      "active-value": 1,
                                      "inactive-value": 0
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["model"])
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
                    label: "\u56FE\u7247",
                    width: "80"
                  }, {
                    default: withCtx(({ row }) => [
                      row.cover ? (openBlock(), createBlock(_component_el_image, {
                        key: 0,
                        src: row.cover,
                        style: { "width": "50px", "height": "50px", "border-radius": "6px" },
                        fit: "cover"
                      }, null, 8, ["src"])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u5546\u54C1\u540D\u79F0",
                    prop: "name",
                    "min-width": "200",
                    "show-overflow-tooltip": ""
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u5206\u7C7B",
                    prop: "category_name",
                    width: "100"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u4EF7\u683C",
                    width: "100",
                    align: "center"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode("span", { class: "text-price" }, "\xA5" + toDisplayString(Number(row.price).toFixed(2)), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u5E93\u5B58",
                    prop: "stock",
                    width: "80",
                    align: "center",
                    sortable: ""
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u9500\u91CF",
                    prop: "sales",
                    width: "80",
                    align: "center",
                    sortable: ""
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u72B6\u6001",
                    width: "80",
                    align: "center"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode(_component_el_tag, {
                        type: row.status ? "success" : "danger",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(row.status ? "\u4E0A\u67B6" : "\u4E0B\u67B6"), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u6807\u7B7E",
                    width: "120",
                    align: "center"
                  }, {
                    default: withCtx(({ row }) => [
                      row.is_hot ? (openBlock(), createBlock(_component_el_tag, {
                        key: 0,
                        type: "danger",
                        size: "small",
                        style: { "margin-right": "4px" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u70ED\u9500")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      row.is_new ? (openBlock(), createBlock(_component_el_tag, {
                        key: 1,
                        type: "success",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u65B0\u54C1")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u64CD\u4F5C",
                    width: "160",
                    fixed: "right"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode(_component_el_button, {
                        type: "primary",
                        text: "",
                        size: "small",
                        onClick: ($event) => openDialog(row)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u7F16\u8F91")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_el_popconfirm, {
                        title: "\u786E\u5B9A\u5220\u9664\uFF1F",
                        onConfirm: ($event) => handleDelete(row.id)
                      }, {
                        reference: withCtx(() => [
                          createVNode(_component_el_button, {
                            type: "danger",
                            text: "",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("\u5220\u9664")
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
              createVNode(_component_el_dialog, {
                modelValue: dialogVisible.value,
                "onUpdate:modelValue": ($event) => dialogVisible.value = $event,
                title: isEdit.value ? "\u7F16\u8F91\u5546\u54C1" : "\u6DFB\u52A0\u5546\u54C1",
                width: "680px",
                "destroy-on-close": ""
              }, {
                footer: withCtx(() => [
                  createVNode(_component_el_button, {
                    onClick: ($event) => dialogVisible.value = false
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u53D6\u6D88")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    type: "primary",
                    loading: saving.value,
                    onClick: handleSave
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u4FDD\u5B58")
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ]),
                default: withCtx(() => [
                  createVNode(_component_el_form, {
                    model: form,
                    "label-width": "80px",
                    rules: formRules,
                    ref_key: "formRef",
                    ref: formRef
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_form_item, {
                        label: "\u540D\u79F0",
                        prop: "name"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: form.name,
                            "onUpdate:modelValue": ($event) => form.name = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_row, { gutter: 16 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_col, { span: 12 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, {
                                label: "\u552E\u4EF7",
                                prop: "price"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input_number, {
                                    modelValue: form.price,
                                    "onUpdate:modelValue": ($event) => form.price = $event,
                                    min: 0,
                                    precision: 2,
                                    style: { "width": "100%" }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_col, { span: 12 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { label: "\u539F\u4EF7" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input_number, {
                                    modelValue: form.original_price,
                                    "onUpdate:modelValue": ($event) => form.original_price = $event,
                                    min: 0,
                                    precision: 2,
                                    style: { "width": "100%" }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_row, { gutter: 16 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_col, { span: 12 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { label: "\u5E93\u5B58" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input_number, {
                                    modelValue: form.stock,
                                    "onUpdate:modelValue": ($event) => form.stock = $event,
                                    min: 0,
                                    style: { "width": "100%" }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_col, { span: 12 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { label: "\u5206\u7C7B" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_select, {
                                    modelValue: form.category_id,
                                    "onUpdate:modelValue": ($event) => form.category_id = $event,
                                    clearable: "",
                                    style: { "width": "100%" }
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (c) => {
                                        return openBlock(), createBlock(_component_el_option, {
                                          key: c.id,
                                          label: c.name,
                                          value: c.id
                                        }, null, 8, ["label", "value"]);
                                      }), 128))
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, { label: "\u63CF\u8FF0" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: form.description,
                            "onUpdate:modelValue": ($event) => form.description = $event,
                            type: "textarea",
                            rows: 3
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, { label: "\u5C01\u9762\u56FE" }, {
                        default: withCtx(() => [
                          createVNode("div", { style: { "display": "flex", "gap": "12px", "align-items": "flex-end" } }, [
                            createVNode(_component_el_input, {
                              modelValue: form.cover,
                              "onUpdate:modelValue": ($event) => form.cover = $event,
                              placeholder: "\u56FE\u7247URL",
                              style: { "width": "300px" }
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_el_upload, {
                              action: uploadUrl.value,
                              headers: { Authorization: "Bearer " + unref(userStore).token },
                              "show-file-list": false,
                              "on-success": handleUploadSuccess
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_el_button, { size: "small" }, {
                                  default: withCtx(() => [
                                    createTextVNode("\u4E0A\u4F20")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["action", "headers"])
                          ]),
                          form.cover ? (openBlock(), createBlock(_component_el_image, {
                            key: 0,
                            src: form.cover,
                            style: { "width": "100px", "height": "100px", "border-radius": "8px", "margin-top": "8px" },
                            fit: "cover"
                          }, null, 8, ["src"])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_row, { gutter: 16 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_col, { span: 8 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { label: "\u72B6\u6001" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_switch, {
                                    modelValue: form.status,
                                    "onUpdate:modelValue": ($event) => form.status = $event,
                                    "active-value": 1,
                                    "inactive-value": 0,
                                    "active-text": "\u4E0A\u67B6",
                                    "inactive-text": "\u4E0B\u67B6"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_col, { span: 8 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { label: "\u70ED\u9500" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_switch, {
                                    modelValue: form.is_hot,
                                    "onUpdate:modelValue": ($event) => form.is_hot = $event,
                                    "active-value": 1,
                                    "inactive-value": 0
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_col, { span: 8 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { label: "\u65B0\u54C1" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_switch, {
                                    modelValue: form.is_new,
                                    "onUpdate:modelValue": ($event) => form.is_new = $event,
                                    "active-value": 1,
                                    "inactive-value": 0
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["model"])
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "title"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/products.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=products-Ek2xxZLY.mjs.map
