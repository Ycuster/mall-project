import { defineComponent, ref, reactive, resolveComponent, resolveDirective, mergeProps, withCtx, createVNode, toDisplayString, createTextVNode, withDirectives, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrGetDirectiveProps, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { ElMessage } from 'element-plus';
import { u as useNuxtApp } from './server.mjs';
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
  __name: "categories",
  __ssrInlineRender: true,
  setup(__props) {
    const list = ref([]);
    const loading = ref(false);
    const dialogVisible = ref(false);
    const isEdit = ref(false);
    const editId = ref(null);
    const saving = ref(false);
    const formRef = ref();
    const form = reactive({
      name: "",
      icon: "",
      sort_order: 0,
      status: 1,
      parent_id: null
    });
    const formRules = {
      name: [{ required: true, message: "\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0", trigger: "blur" }]
    };
    async function load() {
      loading.value = true;
      const { $api } = useNuxtApp();
      const res = await $api.get("/categories", { params: { _admin: 1 } });
      if (res.code === 200) list.value = res.data;
      loading.value = false;
    }
    function openDialog(row, asChild = false) {
      isEdit.value = !!row && !asChild;
      editId.value = row && !asChild ? row.id : null;
      form.name = row && !asChild ? row.name : "";
      form.icon = row && !asChild ? row.icon : "";
      form.sort_order = row && !asChild ? row.sort_order : 0;
      form.status = row && !asChild ? row.status : 1;
      form.parent_id = asChild && row ? row.id : null;
      dialogVisible.value = true;
    }
    async function handleSave() {
      await formRef.value.validate();
      saving.value = true;
      const { $api } = useNuxtApp();
      let res;
      if (isEdit.value && editId.value) {
        res = await $api.put(`/categories/${editId.value}`, form);
      } else {
        res = await $api.post("/categories", form);
      }
      if (res.code === 200) {
        ElMessage.success("\u4FDD\u5B58\u6210\u529F");
        dialogVisible.value = false;
        await load();
      } else {
        ElMessage.error(res.message || "\u4FDD\u5B58\u5931\u8D25");
      }
      saving.value = false;
    }
    async function handleDelete(id) {
      const { $api } = useNuxtApp();
      const res = await $api.delete(`/categories/${id}`);
      if (res.code === 200) {
        ElMessage.success("\u5220\u9664\u6210\u529F");
        await load();
      } else {
        ElMessage.error(res.message || "\u5220\u9664\u5931\u8D25");
      }
    }
    async function toggleStatus(id, status) {
      const { $api } = useNuxtApp();
      const res = await $api.put(`/categories/${id}`, { status });
      if (res.code !== 200) {
        ElMessage.error(res.message || "\u66F4\u65B0\u5931\u8D25");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = resolveComponent("el-card");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_Plus = resolveComponent("Plus");
      const _component_el_table = resolveComponent("el-table");
      const _component_el_table_column = resolveComponent("el-table-column");
      const _component_el_switch = resolveComponent("el-switch");
      const _component_el_popconfirm = resolveComponent("el-popconfirm");
      const _component_el_dialog = resolveComponent("el-dialog");
      const _component_el_form = resolveComponent("el-form");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_input_number = resolveComponent("el-input-number");
      const _directive_loading = resolveDirective("loading");
      _push(ssrRenderComponent(_component_el_card, mergeProps({ shadow: "never" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "align-items": "center" })}"${_scopeId}><span style="${ssrRenderStyle({ "font-weight": "600" })}"${_scopeId}>\u5206\u7C7B\u7BA1\u7406</span>`);
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
                  _push3(` \u6DFB\u52A0\u5206\u7C7B `);
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(_component_Plus)
                      ]),
                      _: 1
                    }),
                    createTextVNode(" \u6DFB\u52A0\u5206\u7C7B ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { style: { "display": "flex", "justify-content": "space-between", "align-items": "center" } }, [
                createVNode("span", { style: { "font-weight": "600" } }, "\u5206\u7C7B\u7BA1\u7406"),
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
                    createTextVNode(" \u6DFB\u52A0\u5206\u7C7B ")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table, mergeProps({
              data: list.value,
              "row-key": "id",
              "default-expand-all": ""
            }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "ID",
                    prop: "id",
                    width: "60"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u5206\u7C7B\u540D\u79F0",
                    prop: "name",
                    "min-width": "140"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u56FE\u6807",
                    width: "120"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span style="${ssrRenderStyle({ "font-size": "1.4rem" })}"${_scopeId3}>${ssrInterpolate(row.icon || "\u{1F4E6}")}</span>`);
                      } else {
                        return [
                          createVNode("span", { style: { "font-size": "1.4rem" } }, toDisplayString(row.icon || "\u{1F4E6}"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u6392\u5E8F",
                    prop: "sort_order",
                    width: "80",
                    align: "center"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u72B6\u6001",
                    width: "100",
                    align: "center"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_switch, {
                          modelValue: row.status,
                          "onUpdate:modelValue": ($event) => row.status = $event,
                          "active-value": 1,
                          "inactive-value": 0,
                          onChange: (val) => toggleStatus(row.id, val)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_switch, {
                            modelValue: row.status,
                            "onUpdate:modelValue": ($event) => row.status = $event,
                            "active-value": 1,
                            "inactive-value": 0,
                            onChange: (val) => toggleStatus(row.id, val)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u64CD\u4F5C",
                    width: "180",
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
                        _push4(ssrRenderComponent(_component_el_button, {
                          type: "success",
                          text: "",
                          size: "small",
                          onClick: ($event) => openDialog(row, true)
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`\u6DFB\u52A0\u5B50\u5206\u7C7B`);
                            } else {
                              return [
                                createTextVNode("\u6DFB\u52A0\u5B50\u5206\u7C7B")
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
                          createVNode(_component_el_button, {
                            type: "success",
                            text: "",
                            size: "small",
                            onClick: ($event) => openDialog(row, true)
                          }, {
                            default: withCtx(() => [
                              createTextVNode("\u6DFB\u52A0\u5B50\u5206\u7C7B")
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
                      label: "ID",
                      prop: "id",
                      width: "60"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u5206\u7C7B\u540D\u79F0",
                      prop: "name",
                      "min-width": "140"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u56FE\u6807",
                      width: "120"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode("span", { style: { "font-size": "1.4rem" } }, toDisplayString(row.icon || "\u{1F4E6}"), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u6392\u5E8F",
                      prop: "sort_order",
                      width: "80",
                      align: "center"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u72B6\u6001",
                      width: "100",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_switch, {
                          modelValue: row.status,
                          "onUpdate:modelValue": ($event) => row.status = $event,
                          "active-value": 1,
                          "inactive-value": 0,
                          onChange: (val) => toggleStatus(row.id, val)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u64CD\u4F5C",
                      width: "180",
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
                        createVNode(_component_el_button, {
                          type: "success",
                          text: "",
                          size: "small",
                          onClick: ($event) => openDialog(row, true)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("\u6DFB\u52A0\u5B50\u5206\u7C7B")
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
            _push2(ssrRenderComponent(_component_el_dialog, {
              modelValue: dialogVisible.value,
              "onUpdate:modelValue": ($event) => dialogVisible.value = $event,
              title: isEdit.value ? "\u7F16\u8F91\u5206\u7C7B" : "\u6DFB\u52A0\u5206\u7C7B",
              width: "480px",
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
                        _push4(ssrRenderComponent(_component_el_form_item, { label: "\u56FE\u6807" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_input, {
                                modelValue: form.icon,
                                "onUpdate:modelValue": ($event) => form.icon = $event,
                                placeholder: "emoji \u6216\u56FE\u6807\u5B57\u7B26"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_input, {
                                  modelValue: form.icon,
                                  "onUpdate:modelValue": ($event) => form.icon = $event,
                                  placeholder: "emoji \u6216\u56FE\u6807\u5B57\u7B26"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_form_item, { label: "\u6392\u5E8F" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_input_number, {
                                modelValue: form.sort_order,
                                "onUpdate:modelValue": ($event) => form.sort_order = $event,
                                min: 0,
                                max: 999
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_input_number, {
                                  modelValue: form.sort_order,
                                  "onUpdate:modelValue": ($event) => form.sort_order = $event,
                                  min: 0,
                                  max: 999
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_form_item, { label: "\u72B6\u6001" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_switch, {
                                modelValue: form.status,
                                "onUpdate:modelValue": ($event) => form.status = $event,
                                "active-value": 1,
                                "inactive-value": 0
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_switch, {
                                  modelValue: form.status,
                                  "onUpdate:modelValue": ($event) => form.status = $event,
                                  "active-value": 1,
                                  "inactive-value": 0
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                          createVNode(_component_el_form_item, { label: "\u56FE\u6807" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: form.icon,
                                "onUpdate:modelValue": ($event) => form.icon = $event,
                                placeholder: "emoji \u6216\u56FE\u6807\u5B57\u7B26"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "\u6392\u5E8F" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input_number, {
                                modelValue: form.sort_order,
                                "onUpdate:modelValue": ($event) => form.sort_order = $event,
                                min: 0,
                                max: 999
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "\u72B6\u6001" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_switch, {
                                modelValue: form.status,
                                "onUpdate:modelValue": ($event) => form.status = $event,
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
                        createVNode(_component_el_form_item, { label: "\u56FE\u6807" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              modelValue: form.icon,
                              "onUpdate:modelValue": ($event) => form.icon = $event,
                              placeholder: "emoji \u6216\u56FE\u6807\u5B57\u7B26"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, { label: "\u6392\u5E8F" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input_number, {
                              modelValue: form.sort_order,
                              "onUpdate:modelValue": ($event) => form.sort_order = $event,
                              min: 0,
                              max: 999
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, { label: "\u72B6\u6001" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_switch, {
                              modelValue: form.status,
                              "onUpdate:modelValue": ($event) => form.status = $event,
                              "active-value": 1,
                              "inactive-value": 0
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                "row-key": "id",
                "default-expand-all": ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_table_column, {
                    label: "ID",
                    prop: "id",
                    width: "60"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u5206\u7C7B\u540D\u79F0",
                    prop: "name",
                    "min-width": "140"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u56FE\u6807",
                    width: "120"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode("span", { style: { "font-size": "1.4rem" } }, toDisplayString(row.icon || "\u{1F4E6}"), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u6392\u5E8F",
                    prop: "sort_order",
                    width: "80",
                    align: "center"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u72B6\u6001",
                    width: "100",
                    align: "center"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode(_component_el_switch, {
                        modelValue: row.status,
                        "onUpdate:modelValue": ($event) => row.status = $event,
                        "active-value": 1,
                        "inactive-value": 0,
                        onChange: (val) => toggleStatus(row.id, val)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u64CD\u4F5C",
                    width: "180",
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
                      createVNode(_component_el_button, {
                        type: "success",
                        text: "",
                        size: "small",
                        onClick: ($event) => openDialog(row, true)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u6DFB\u52A0\u5B50\u5206\u7C7B")
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
              createVNode(_component_el_dialog, {
                modelValue: dialogVisible.value,
                "onUpdate:modelValue": ($event) => dialogVisible.value = $event,
                title: isEdit.value ? "\u7F16\u8F91\u5206\u7C7B" : "\u6DFB\u52A0\u5206\u7C7B",
                width: "480px",
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
                      createVNode(_component_el_form_item, { label: "\u56FE\u6807" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: form.icon,
                            "onUpdate:modelValue": ($event) => form.icon = $event,
                            placeholder: "emoji \u6216\u56FE\u6807\u5B57\u7B26"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, { label: "\u6392\u5E8F" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input_number, {
                            modelValue: form.sort_order,
                            "onUpdate:modelValue": ($event) => form.sort_order = $event,
                            min: 0,
                            max: 999
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, { label: "\u72B6\u6001" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_switch, {
                            modelValue: form.status,
                            "onUpdate:modelValue": ($event) => form.status = $event,
                            "active-value": 1,
                            "inactive-value": 0
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/categories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=categories-DWuaktDM.mjs.map
