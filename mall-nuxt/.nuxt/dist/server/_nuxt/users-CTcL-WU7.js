import { defineComponent, ref, reactive, resolveComponent, resolveDirective, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, withDirectives, openBlock, createBlock, withKeys, useSSRContext } from "vue";
import { ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
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
  __name: "users",
  __ssrInlineRender: true,
  setup(__props) {
    const list = ref([]);
    const total = ref(0);
    const page = ref(1);
    const keyword = ref("");
    const loading = ref(false);
    const dialogVisible = ref(false);
    const editId = ref(null);
    const saving = ref(false);
    const formRef = ref();
    const form = reactive({
      username: "",
      nickname: "",
      email: "",
      phone: "",
      role: "user",
      status: 1
    });
    const formRules = {
      nickname: [{ max: 50, message: "昵称不能超过50个字符", trigger: "blur" }],
      email: [{ type: "email", message: "请输入正确的邮箱", trigger: "blur" }]
    };
    async function load(p) {
      if (p) page.value = p;
      loading.value = true;
      const { $api } = useNuxtApp();
      const params = { page: page.value, pageSize: 10, _admin: 1 };
      if (keyword.value) params.keyword = keyword.value;
      const res = await $api.get("/users", { params });
      if (res.code === 200) {
        list.value = res.data.list;
        total.value = res.data.total;
      }
      loading.value = false;
    }
    function openDialog(row) {
      editId.value = row.id;
      form.username = row.username;
      form.nickname = row.nickname;
      form.email = row.email;
      form.phone = row.phone;
      form.role = row.role;
      form.status = row.status;
      dialogVisible.value = true;
    }
    async function handleSave() {
      await formRef.value?.validate();
      saving.value = true;
      const { $api } = useNuxtApp();
      const res = await $api.put(`/users/${editId.value}`, {
        nickname: form.nickname,
        email: form.email,
        phone: form.phone,
        role: form.role,
        status: form.status
      });
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
      const res = await $api.delete(`/users/${id}`);
      if (res.code === 200) {
        ElMessage.success("删除成功");
        await load();
      } else {
        ElMessage.error(res.message || "删除失败");
      }
    }
    async function toggleStatus(id, status) {
      const { $api } = useNuxtApp();
      const res = await $api.put(`/users/${id}`, { status });
      if (res.code !== 200) {
        ElMessage.error(res.message || "更新失败");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = resolveComponent("el-card");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_table = resolveComponent("el-table");
      const _component_el_table_column = resolveComponent("el-table-column");
      const _component_el_tag = resolveComponent("el-tag");
      const _component_el_switch = resolveComponent("el-switch");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_popconfirm = resolveComponent("el-popconfirm");
      const _component_el_pagination = resolveComponent("el-pagination");
      const _component_el_dialog = resolveComponent("el-dialog");
      const _component_el_form = resolveComponent("el-form");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_select = resolveComponent("el-select");
      const _component_el_option = resolveComponent("el-option");
      const _directive_loading = resolveDirective("loading");
      _push(ssrRenderComponent(_component_el_card, mergeProps({ shadow: "never" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "align-items": "center" })}"${_scopeId}><span style="${ssrRenderStyle({ "font-weight": "600" })}"${_scopeId}>用户管理</span>`);
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: keyword.value,
              "onUpdate:modelValue": ($event) => keyword.value = $event,
              placeholder: "搜索用户名/邮箱/手机...",
              clearable: "",
              style: { "width": "240px" },
              onKeydown: ($event) => load(1),
              onClear: ($event) => load(1)
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { style: { "display": "flex", "justify-content": "space-between", "align-items": "center" } }, [
                createVNode("span", { style: { "font-weight": "600" } }, "用户管理"),
                createVNode(_component_el_input, {
                  modelValue: keyword.value,
                  "onUpdate:modelValue": ($event) => keyword.value = $event,
                  placeholder: "搜索用户名/邮箱/手机...",
                  clearable: "",
                  style: { "width": "240px" },
                  onKeydown: withKeys(($event) => load(1), ["enter"]),
                  onClear: ($event) => load(1)
                }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown", "onClear"])
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
                    label: "ID",
                    prop: "id",
                    width: "60"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "用户名",
                    prop: "username",
                    width: "140"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "昵称",
                    prop: "nickname",
                    width: "140"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "邮箱",
                    prop: "email",
                    "min-width": "180",
                    "show-overflow-tooltip": ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "手机",
                    prop: "phone",
                    width: "130"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "角色",
                    width: "100",
                    align: "center"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_tag, {
                          type: row.role === "admin" ? "danger" : "",
                          size: "small"
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(row.role === "admin" ? "管理员" : "普通用户")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(row.role === "admin" ? "管理员" : "普通用户"), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_tag, {
                            type: row.role === "admin" ? "danger" : "",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(row.role === "admin" ? "管理员" : "普通用户"), 1)
                            ]),
                            _: 2
                          }, 1032, ["type"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
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
                    label: "注册时间",
                    prop: "created_at",
                    width: "170"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "操作",
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
                              _push5(`编辑`);
                            } else {
                              return [
                                createTextVNode("编辑")
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
                      label: "用户名",
                      prop: "username",
                      width: "140"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "昵称",
                      prop: "nickname",
                      width: "140"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "邮箱",
                      prop: "email",
                      "min-width": "180",
                      "show-overflow-tooltip": ""
                    }),
                    createVNode(_component_el_table_column, {
                      label: "手机",
                      prop: "phone",
                      width: "130"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "角色",
                      width: "100",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_tag, {
                          type: row.role === "admin" ? "danger" : "",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(row.role === "admin" ? "管理员" : "普通用户"), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
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
                      label: "注册时间",
                      prop: "created_at",
                      width: "170"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "操作",
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
                            createTextVNode("编辑")
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
              title: "编辑用户",
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
                        _push4(ssrRenderComponent(_component_el_form_item, { label: "用户名" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_input, {
                                modelValue: form.username,
                                "onUpdate:modelValue": ($event) => form.username = $event,
                                disabled: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_input, {
                                  modelValue: form.username,
                                  "onUpdate:modelValue": ($event) => form.username = $event,
                                  disabled: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_form_item, {
                          label: "昵称",
                          prop: "nickname"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_input, {
                                modelValue: form.nickname,
                                "onUpdate:modelValue": ($event) => form.nickname = $event
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_input, {
                                  modelValue: form.nickname,
                                  "onUpdate:modelValue": ($event) => form.nickname = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_form_item, {
                          label: "邮箱",
                          prop: "email"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_input, {
                                modelValue: form.email,
                                "onUpdate:modelValue": ($event) => form.email = $event
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_input, {
                                  modelValue: form.email,
                                  "onUpdate:modelValue": ($event) => form.email = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_form_item, {
                          label: "手机",
                          prop: "phone"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_input, {
                                modelValue: form.phone,
                                "onUpdate:modelValue": ($event) => form.phone = $event
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_input, {
                                  modelValue: form.phone,
                                  "onUpdate:modelValue": ($event) => form.phone = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_form_item, { label: "角色" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_select, {
                                modelValue: form.role,
                                "onUpdate:modelValue": ($event) => form.role = $event,
                                style: { "width": "100%" }
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_option, {
                                      label: "普通用户",
                                      value: "user"
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_el_option, {
                                      label: "管理员",
                                      value: "admin"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_option, {
                                        label: "普通用户",
                                        value: "user"
                                      }),
                                      createVNode(_component_el_option, {
                                        label: "管理员",
                                        value: "admin"
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_select, {
                                  modelValue: form.role,
                                  "onUpdate:modelValue": ($event) => form.role = $event,
                                  style: { "width": "100%" }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_option, {
                                      label: "普通用户",
                                      value: "user"
                                    }),
                                    createVNode(_component_el_option, {
                                      label: "管理员",
                                      value: "admin"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
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
                          createVNode(_component_el_form_item, { label: "用户名" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: form.username,
                                "onUpdate:modelValue": ($event) => form.username = $event,
                                disabled: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, {
                            label: "昵称",
                            prop: "nickname"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: form.nickname,
                                "onUpdate:modelValue": ($event) => form.nickname = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, {
                            label: "邮箱",
                            prop: "email"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: form.email,
                                "onUpdate:modelValue": ($event) => form.email = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, {
                            label: "手机",
                            prop: "phone"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: form.phone,
                                "onUpdate:modelValue": ($event) => form.phone = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "角色" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_select, {
                                modelValue: form.role,
                                "onUpdate:modelValue": ($event) => form.role = $event,
                                style: { "width": "100%" }
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_option, {
                                    label: "普通用户",
                                    value: "user"
                                  }),
                                  createVNode(_component_el_option, {
                                    label: "管理员",
                                    value: "admin"
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
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
                        createVNode(_component_el_form_item, { label: "用户名" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              modelValue: form.username,
                              "onUpdate:modelValue": ($event) => form.username = $event,
                              disabled: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, {
                          label: "昵称",
                          prop: "nickname"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              modelValue: form.nickname,
                              "onUpdate:modelValue": ($event) => form.nickname = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, {
                          label: "邮箱",
                          prop: "email"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              modelValue: form.email,
                              "onUpdate:modelValue": ($event) => form.email = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, {
                          label: "手机",
                          prop: "phone"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              modelValue: form.phone,
                              "onUpdate:modelValue": ($event) => form.phone = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, { label: "角色" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_select, {
                              modelValue: form.role,
                              "onUpdate:modelValue": ($event) => form.role = $event,
                              style: { "width": "100%" }
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_el_option, {
                                  label: "普通用户",
                                  value: "user"
                                }),
                                createVNode(_component_el_option, {
                                  label: "管理员",
                                  value: "admin"
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
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
                stripe: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_table_column, {
                    label: "ID",
                    prop: "id",
                    width: "60"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "用户名",
                    prop: "username",
                    width: "140"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "昵称",
                    prop: "nickname",
                    width: "140"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "邮箱",
                    prop: "email",
                    "min-width": "180",
                    "show-overflow-tooltip": ""
                  }),
                  createVNode(_component_el_table_column, {
                    label: "手机",
                    prop: "phone",
                    width: "130"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "角色",
                    width: "100",
                    align: "center"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode(_component_el_tag, {
                        type: row.role === "admin" ? "danger" : "",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(row.role === "admin" ? "管理员" : "普通用户"), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])
                    ]),
                    _: 1
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
                    label: "注册时间",
                    prop: "created_at",
                    width: "170"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "操作",
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
                          createTextVNode("编辑")
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
                title: "编辑用户",
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
                      createVNode(_component_el_form_item, { label: "用户名" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: form.username,
                            "onUpdate:modelValue": ($event) => form.username = $event,
                            disabled: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, {
                        label: "昵称",
                        prop: "nickname"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: form.nickname,
                            "onUpdate:modelValue": ($event) => form.nickname = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, {
                        label: "邮箱",
                        prop: "email"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: form.email,
                            "onUpdate:modelValue": ($event) => form.email = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, {
                        label: "手机",
                        prop: "phone"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: form.phone,
                            "onUpdate:modelValue": ($event) => form.phone = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, { label: "角色" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_select, {
                            modelValue: form.role,
                            "onUpdate:modelValue": ($event) => form.role = $event,
                            style: { "width": "100%" }
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_option, {
                                label: "普通用户",
                                value: "user"
                              }),
                              createVNode(_component_el_option, {
                                label: "管理员",
                                value: "admin"
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/users.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=users-CTcL-WU7.js.map
