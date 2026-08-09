import { defineComponent, ref, reactive, resolveComponent, resolveDirective, mergeProps, withCtx, createVNode, toDisplayString, createTextVNode, withDirectives, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrGetDirectiveProps, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { ElMessage } from "element-plus";
import { u as useNuxtApp } from "../server.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/hookable/dist/index.mjs";
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
import "element-plus/es/locale/lang/zh-cn";
import "@element-plus/icons-vue";
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
      name: [{ required: true, message: "请输入分类名称", trigger: "blur" }]
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
        ElMessage.success("保存成功");
        dialogVisible.value = false;
        await load();
      } else {
        ElMessage.error(res.message || "保存失败");
      }
      saving.value = false;
    }
    async function handleDelete(id) {
      const { $api } = useNuxtApp();
      const res = await $api.delete(`/categories/${id}`);
      if (res.code === 200) {
        ElMessage.success("删除成功");
        await load();
      } else {
        ElMessage.error(res.message || "删除失败");
      }
    }
    async function toggleStatus(id, status) {
      const { $api } = useNuxtApp();
      const res = await $api.put(`/categories/${id}`, { status });
      if (res.code !== 200) {
        ElMessage.error(res.message || "更新失败");
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
            _push2(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "align-items": "center" })}"${_scopeId}><span style="${ssrRenderStyle({ "font-weight": "600" })}"${_scopeId}>分类管理</span>`);
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
                  _push3(` 添加分类 `);
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(_component_Plus)
                      ]),
                      _: 1
                    }),
                    createTextVNode(" 添加分类 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { style: { "display": "flex", "justify-content": "space-between", "align-items": "center" } }, [
                createVNode("span", { style: { "font-weight": "600" } }, "分类管理"),
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
                    createTextVNode(" 添加分类 ")
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
                    label: "分类名称",
                    prop: "name",
                    "min-width": "140"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "图标",
                    width: "120"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span style="${ssrRenderStyle({ "font-size": "1.4rem" })}"${_scopeId3}>${ssrInterpolate(row.icon || "📦")}</span>`);
                      } else {
                        return [
                          createVNode("span", { style: { "font-size": "1.4rem" } }, toDisplayString(row.icon || "📦"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "排序",
                    prop: "sort_order",
                    width: "80",
                    align: "center"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "状态",
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
                    label: "操作",
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
                              _push5(`编辑`);
                            } else {
                              return [
                                createTextVNode("编辑")
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
                              _push5(`添加子分类`);
                            } else {
                              return [
                                createTextVNode("添加子分类")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_popconfirm, {
                          title: "确定删除？",
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
                                    _push6(`删除`);
                                  } else {
                                    return [
                                      createTextVNode("删除")
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
                                    createTextVNode("删除")
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
                              createTextVNode("编辑")
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
                              createTextVNode("添加子分类")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_el_popconfirm, {
                            title: "确定删除？",
                            onConfirm: ($event) => handleDelete(row.id)
                          }, {
                            reference: withCtx(() => [
                              createVNode(_component_el_button, {
                                type: "danger",
                                text: "",
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("删除")
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
                      label: "分类名称",
                      prop: "name",
                      "min-width": "140"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "图标",
                      width: "120"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode("span", { style: { "font-size": "1.4rem" } }, toDisplayString(row.icon || "📦"), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "排序",
                      prop: "sort_order",
                      width: "80",
                      align: "center"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "状态",
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
                      label: "操作",
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
                            createTextVNode("编辑")
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
                            createTextVNode("添加子分类")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_el_popconfirm, {
                          title: "确定删除？",
                          onConfirm: ($event) => handleDelete(row.id)
                        }, {
                          reference: withCtx(() => [
                            createVNode(_component_el_button, {
                              type: "danger",
                              text: "",
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("删除")
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
              title: isEdit.value ? "编辑分类" : "添加分类",
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
                        _push4(`取消`);
                      } else {
                        return [
                          createTextVNode("取消")
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
                        _push4(`保存`);
                      } else {
                        return [
                          createTextVNode("保存")
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
                        createTextVNode("取消")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      type: "primary",
                      loading: saving.value,
                      onClick: handleSave
                    }, {
                      default: withCtx(() => [
                        createTextVNode("保存")
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
                          label: "名称",
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
                        _push4(ssrRenderComponent(_component_el_form_item, { label: "图标" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_input, {
                                modelValue: form.icon,
                                "onUpdate:modelValue": ($event) => form.icon = $event,
                                placeholder: "emoji 或图标字符"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_input, {
                                  modelValue: form.icon,
                                  "onUpdate:modelValue": ($event) => form.icon = $event,
                                  placeholder: "emoji 或图标字符"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_form_item, { label: "排序" }, {
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
                        _push4(ssrRenderComponent(_component_el_form_item, { label: "状态" }, {
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
                            label: "名称",
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
                          createVNode(_component_el_form_item, { label: "图标" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: form.icon,
                                "onUpdate:modelValue": ($event) => form.icon = $event,
                                placeholder: "emoji 或图标字符"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "排序" }, {
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
                          createVNode(_component_el_form_item, { label: "状态" }, {
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
                          label: "名称",
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
                        createVNode(_component_el_form_item, { label: "图标" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              modelValue: form.icon,
                              "onUpdate:modelValue": ($event) => form.icon = $event,
                              placeholder: "emoji 或图标字符"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, { label: "排序" }, {
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
                        createVNode(_component_el_form_item, { label: "状态" }, {
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
                    label: "分类名称",
                    prop: "name",
                    "min-width": "140"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "图标",
                    width: "120"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode("span", { style: { "font-size": "1.4rem" } }, toDisplayString(row.icon || "📦"), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "排序",
                    prop: "sort_order",
                    width: "80",
                    align: "center"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "状态",
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
                    label: "操作",
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
                          createTextVNode("编辑")
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
                          createTextVNode("添加子分类")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_el_popconfirm, {
                        title: "确定删除？",
                        onConfirm: ($event) => handleDelete(row.id)
                      }, {
                        reference: withCtx(() => [
                          createVNode(_component_el_button, {
                            type: "danger",
                            text: "",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("删除")
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
                title: isEdit.value ? "编辑分类" : "添加分类",
                width: "480px",
                "destroy-on-close": ""
              }, {
                footer: withCtx(() => [
                  createVNode(_component_el_button, {
                    onClick: ($event) => dialogVisible.value = false
                  }, {
                    default: withCtx(() => [
                      createTextVNode("取消")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    type: "primary",
                    loading: saving.value,
                    onClick: handleSave
                  }, {
                    default: withCtx(() => [
                      createTextVNode("保存")
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
                        label: "名称",
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
                      createVNode(_component_el_form_item, { label: "图标" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: form.icon,
                            "onUpdate:modelValue": ($event) => form.icon = $event,
                            placeholder: "emoji 或图标字符"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, { label: "排序" }, {
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
                      createVNode(_component_el_form_item, { label: "状态" }, {
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
export {
  _sfc_main as default
};
//# sourceMappingURL=categories-DWuaktDM.js.map
