import { defineComponent, computed, ref, reactive, resolveComponent, resolveDirective, mergeProps, withCtx, openBlock, createBlock, createCommentVNode, createVNode, toDisplayString, createTextVNode, Fragment, renderList, unref, withDirectives, withKeys, useSSRContext } from "vue";
import { ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { u as useUserStore } from "./user-OpFIMyWU.js";
import { ElMessage } from "element-plus";
import { d as useRuntimeConfig, u as useNuxtApp } from "../server.mjs";
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
      name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
      price: [{ required: true, message: "请输入价格", trigger: "blur" }]
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
        ElMessage.success("上传成功");
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
        ElMessage.success(isEdit.value ? "更新成功" : "添加成功");
        dialogVisible.value = false;
        load();
      } else {
        ElMessage.error(res.message || "操作失败");
      }
      saving.value = false;
    }
    async function handleDelete(id) {
      const { $api } = useNuxtApp();
      const res = await $api.delete("/products/" + id);
      if (res.code === 200) {
        ElMessage.success("已删除");
        load();
      } else ElMessage.error(res.message || "删除失败");
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
            _push2(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "align-items": "center" })}"${_scopeId}><span style="${ssrRenderStyle({ "font-weight": "600" })}"${_scopeId}>商品管理</span><div style="${ssrRenderStyle({ "display": "flex", "gap": "10px" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: keyword.value,
              "onUpdate:modelValue": ($event) => keyword.value = $event,
              placeholder: "搜索商品...",
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
                  _push3(` 添加商品 `);
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(_component_Plus)
                      ]),
                      _: 1
                    }),
                    createTextVNode(" 添加商品 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { style: { "display": "flex", "justify-content": "space-between", "align-items": "center" } }, [
                createVNode("span", { style: { "font-weight": "600" } }, "商品管理"),
                createVNode("div", { style: { "display": "flex", "gap": "10px" } }, [
                  createVNode(_component_el_input, {
                    modelValue: keyword.value,
                    "onUpdate:modelValue": ($event) => keyword.value = $event,
                    placeholder: "搜索商品...",
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
                      createTextVNode(" 添加商品 ")
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
                    label: "图片",
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
                    label: "商品名称",
                    prop: "name",
                    "min-width": "200",
                    "show-overflow-tooltip": ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "分类",
                    prop: "category_name",
                    width: "100"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "价格",
                    width: "100",
                    align: "center"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-price"${_scopeId3}>¥${ssrInterpolate(Number(row.price).toFixed(2))}</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-price" }, "¥" + toDisplayString(Number(row.price).toFixed(2)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "库存",
                    prop: "stock",
                    width: "80",
                    align: "center",
                    sortable: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "销量",
                    prop: "sales",
                    width: "80",
                    align: "center",
                    sortable: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "状态",
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
                              _push5(`${ssrInterpolate(row.status ? "上架" : "下架")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(row.status ? "上架" : "下架"), 1)
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
                              createTextVNode(toDisplayString(row.status ? "上架" : "下架"), 1)
                            ]),
                            _: 2
                          }, 1032, ["type"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "标签",
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
                                _push5(`热销`);
                              } else {
                                return [
                                  createTextVNode("热销")
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
                                _push5(`新品`);
                              } else {
                                return [
                                  createTextVNode("新品")
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
                              createTextVNode("热销")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          row.is_new ? (openBlock(), createBlock(_component_el_tag, {
                            key: 1,
                            type: "success",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("新品")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
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
                      label: "图片",
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
                      label: "商品名称",
                      prop: "name",
                      "min-width": "200",
                      "show-overflow-tooltip": ""
                    }),
                    createVNode(_component_el_table_column, {
                      label: "分类",
                      prop: "category_name",
                      width: "100"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "价格",
                      width: "100",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode("span", { class: "text-price" }, "¥" + toDisplayString(Number(row.price).toFixed(2)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "库存",
                      prop: "stock",
                      width: "80",
                      align: "center",
                      sortable: ""
                    }),
                    createVNode(_component_el_table_column, {
                      label: "销量",
                      prop: "sales",
                      width: "80",
                      align: "center",
                      sortable: ""
                    }),
                    createVNode(_component_el_table_column, {
                      label: "状态",
                      width: "80",
                      align: "center"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_tag, {
                          type: row.status ? "success" : "danger",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(row.status ? "上架" : "下架"), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      label: "标签",
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
                            createTextVNode("热销")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        row.is_new ? (openBlock(), createBlock(_component_el_tag, {
                          key: 1,
                          type: "success",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("新品")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ]),
                      _: 1
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
              title: isEdit.value ? "编辑商品" : "添加商品",
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
                        _push4(ssrRenderComponent(_component_el_row, { gutter: 16 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_col, { span: 12 }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_form_item, {
                                      label: "售价",
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
                                        label: "售价",
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
                                    _push6(ssrRenderComponent(_component_el_form_item, { label: "原价" }, {
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
                                      createVNode(_component_el_form_item, { label: "原价" }, {
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
                                      label: "售价",
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
                                    createVNode(_component_el_form_item, { label: "原价" }, {
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
                                    _push6(ssrRenderComponent(_component_el_form_item, { label: "库存" }, {
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
                                      createVNode(_component_el_form_item, { label: "库存" }, {
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
                                    _push6(ssrRenderComponent(_component_el_form_item, { label: "分类" }, {
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
                                      createVNode(_component_el_form_item, { label: "分类" }, {
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
                                    createVNode(_component_el_form_item, { label: "库存" }, {
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
                                    createVNode(_component_el_form_item, { label: "分类" }, {
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
                        _push4(ssrRenderComponent(_component_el_form_item, { label: "描述" }, {
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
                        _push4(ssrRenderComponent(_component_el_form_item, { label: "封面图" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div style="${ssrRenderStyle({ "display": "flex", "gap": "12px", "align-items": "flex-end" })}"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_el_input, {
                                modelValue: form.cover,
                                "onUpdate:modelValue": ($event) => form.cover = $event,
                                placeholder: "图片URL",
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
                                          _push7(`上传`);
                                        } else {
                                          return [
                                            createTextVNode("上传")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_button, { size: "small" }, {
                                        default: withCtx(() => [
                                          createTextVNode("上传")
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
                                    placeholder: "图片URL",
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
                                          createTextVNode("上传")
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
                                    _push6(ssrRenderComponent(_component_el_form_item, { label: "状态" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_el_switch, {
                                            modelValue: form.status,
                                            "onUpdate:modelValue": ($event) => form.status = $event,
                                            "active-value": 1,
                                            "inactive-value": 0,
                                            "active-text": "上架",
                                            "inactive-text": "下架"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_el_switch, {
                                              modelValue: form.status,
                                              "onUpdate:modelValue": ($event) => form.status = $event,
                                              "active-value": 1,
                                              "inactive-value": 0,
                                              "active-text": "上架",
                                              "inactive-text": "下架"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_form_item, { label: "状态" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_el_switch, {
                                            modelValue: form.status,
                                            "onUpdate:modelValue": ($event) => form.status = $event,
                                            "active-value": 1,
                                            "inactive-value": 0,
                                            "active-text": "上架",
                                            "inactive-text": "下架"
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
                                    _push6(ssrRenderComponent(_component_el_form_item, { label: "热销" }, {
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
                                      createVNode(_component_el_form_item, { label: "热销" }, {
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
                                    _push6(ssrRenderComponent(_component_el_form_item, { label: "新品" }, {
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
                                      createVNode(_component_el_form_item, { label: "新品" }, {
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
                                    createVNode(_component_el_form_item, { label: "状态" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_el_switch, {
                                          modelValue: form.status,
                                          "onUpdate:modelValue": ($event) => form.status = $event,
                                          "active-value": 1,
                                          "inactive-value": 0,
                                          "active-text": "上架",
                                          "inactive-text": "下架"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_col, { span: 8 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_form_item, { label: "热销" }, {
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
                                    createVNode(_component_el_form_item, { label: "新品" }, {
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
                          createVNode(_component_el_row, { gutter: 16 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_col, { span: 12 }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_form_item, {
                                    label: "售价",
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
                                  createVNode(_component_el_form_item, { label: "原价" }, {
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
                                  createVNode(_component_el_form_item, { label: "库存" }, {
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
                                  createVNode(_component_el_form_item, { label: "分类" }, {
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
                          createVNode(_component_el_form_item, { label: "描述" }, {
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
                          createVNode(_component_el_form_item, { label: "封面图" }, {
                            default: withCtx(() => [
                              createVNode("div", { style: { "display": "flex", "gap": "12px", "align-items": "flex-end" } }, [
                                createVNode(_component_el_input, {
                                  modelValue: form.cover,
                                  "onUpdate:modelValue": ($event) => form.cover = $event,
                                  placeholder: "图片URL",
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
                                        createTextVNode("上传")
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
                                  createVNode(_component_el_form_item, { label: "状态" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_switch, {
                                        modelValue: form.status,
                                        "onUpdate:modelValue": ($event) => form.status = $event,
                                        "active-value": 1,
                                        "inactive-value": 0,
                                        "active-text": "上架",
                                        "inactive-text": "下架"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_col, { span: 8 }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_form_item, { label: "热销" }, {
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
                                  createVNode(_component_el_form_item, { label: "新品" }, {
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
                        createVNode(_component_el_row, { gutter: 16 }, {
                          default: withCtx(() => [
                            createVNode(_component_el_col, { span: 12 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, {
                                  label: "售价",
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
                                createVNode(_component_el_form_item, { label: "原价" }, {
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
                                createVNode(_component_el_form_item, { label: "库存" }, {
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
                                createVNode(_component_el_form_item, { label: "分类" }, {
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
                        createVNode(_component_el_form_item, { label: "描述" }, {
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
                        createVNode(_component_el_form_item, { label: "封面图" }, {
                          default: withCtx(() => [
                            createVNode("div", { style: { "display": "flex", "gap": "12px", "align-items": "flex-end" } }, [
                              createVNode(_component_el_input, {
                                modelValue: form.cover,
                                "onUpdate:modelValue": ($event) => form.cover = $event,
                                placeholder: "图片URL",
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
                                      createTextVNode("上传")
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
                                createVNode(_component_el_form_item, { label: "状态" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_switch, {
                                      modelValue: form.status,
                                      "onUpdate:modelValue": ($event) => form.status = $event,
                                      "active-value": 1,
                                      "inactive-value": 0,
                                      "active-text": "上架",
                                      "inactive-text": "下架"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_col, { span: 8 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, { label: "热销" }, {
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
                                createVNode(_component_el_form_item, { label: "新品" }, {
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
                    label: "图片",
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
                    label: "商品名称",
                    prop: "name",
                    "min-width": "200",
                    "show-overflow-tooltip": ""
                  }),
                  createVNode(_component_el_table_column, {
                    label: "分类",
                    prop: "category_name",
                    width: "100"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "价格",
                    width: "100",
                    align: "center"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode("span", { class: "text-price" }, "¥" + toDisplayString(Number(row.price).toFixed(2)), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "库存",
                    prop: "stock",
                    width: "80",
                    align: "center",
                    sortable: ""
                  }),
                  createVNode(_component_el_table_column, {
                    label: "销量",
                    prop: "sales",
                    width: "80",
                    align: "center",
                    sortable: ""
                  }),
                  createVNode(_component_el_table_column, {
                    label: "状态",
                    width: "80",
                    align: "center"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode(_component_el_tag, {
                        type: row.status ? "success" : "danger",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(row.status ? "上架" : "下架"), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    label: "标签",
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
                          createTextVNode("热销")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      row.is_new ? (openBlock(), createBlock(_component_el_tag, {
                        key: 1,
                        type: "success",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("新品")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
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
                title: isEdit.value ? "编辑商品" : "添加商品",
                width: "680px",
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
                      createVNode(_component_el_row, { gutter: 16 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_col, { span: 12 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, {
                                label: "售价",
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
                              createVNode(_component_el_form_item, { label: "原价" }, {
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
                              createVNode(_component_el_form_item, { label: "库存" }, {
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
                              createVNode(_component_el_form_item, { label: "分类" }, {
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
                      createVNode(_component_el_form_item, { label: "描述" }, {
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
                      createVNode(_component_el_form_item, { label: "封面图" }, {
                        default: withCtx(() => [
                          createVNode("div", { style: { "display": "flex", "gap": "12px", "align-items": "flex-end" } }, [
                            createVNode(_component_el_input, {
                              modelValue: form.cover,
                              "onUpdate:modelValue": ($event) => form.cover = $event,
                              placeholder: "图片URL",
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
                                    createTextVNode("上传")
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
                              createVNode(_component_el_form_item, { label: "状态" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_switch, {
                                    modelValue: form.status,
                                    "onUpdate:modelValue": ($event) => form.status = $event,
                                    "active-value": 1,
                                    "inactive-value": 0,
                                    "active-text": "上架",
                                    "inactive-text": "下架"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_col, { span: 8 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { label: "热销" }, {
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
                              createVNode(_component_el_form_item, { label: "新品" }, {
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
export {
  _sfc_main as default
};
//# sourceMappingURL=products-Ek2xxZLY.js.map
