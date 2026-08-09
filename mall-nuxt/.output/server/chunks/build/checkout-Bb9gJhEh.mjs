import { defineComponent, ref, reactive, resolveComponent, mergeProps, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { u as useCartStore } from './cart-D9jsw7kE.mjs';
import { ElMessage } from 'element-plus';
import { u as useSeoMeta } from './v3-DqToCt8T.mjs';
import { u as useNuxtApp, n as navigateTo } from './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import 'axios';
import 'element-plus/es/locale/lang/zh-cn';
import '@element-plus/icons-vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "checkout",
  __ssrInlineRender: true,
  setup(__props) {
    const cartStore = useCartStore();
    const formRef = ref();
    const submitting = ref(false);
    useSeoMeta({
      title: "\u786E\u8BA4\u8BA2\u5355 - MallShop",
      description: "\u786E\u8BA4\u8BA2\u5355\u4FE1\u606F\u5E76\u63D0\u4EA4"
    });
    const form = reactive({
      receiver_name: "",
      receiver_phone: "",
      receiver_address: "",
      remark: ""
    });
    const rules = {
      receiver_name: [{ required: true, message: "\u8BF7\u8F93\u5165\u6536\u8D27\u4EBA", trigger: "blur" }],
      receiver_phone: [{ required: true, message: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7", trigger: "blur" }],
      receiver_address: [{ required: true, message: "\u8BF7\u8F93\u5165\u5730\u5740", trigger: "blur" }]
    };
    async function handleSubmit() {
      await formRef.value.validate();
      submitting.value = true;
      const { $api } = useNuxtApp();
      const res = await $api.post("/orders", {
        items: cartStore.items.map((i) => ({ product_id: i.product_id, quantity: i.quantity })),
        ...form
      });
      if (res.code === 200) {
        ElMessage.success("\u4E0B\u5355\u6210\u529F\uFF01");
        await cartStore.fetch();
        navigateTo("/orders");
      } else {
        ElMessage.error(res.message || "\u4E0B\u5355\u5931\u8D25");
      }
      submitting.value = false;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = resolveComponent("el-card");
      const _component_el_descriptions = resolveComponent("el-descriptions");
      const _component_el_descriptions_item = resolveComponent("el-descriptions-item");
      const _component_el_divider = resolveComponent("el-divider");
      const _component_el_form = resolveComponent("el-form");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_button = resolveComponent("el-button");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "page-container",
        style: { "max-width": "800px" }
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_el_card, { shadow: "never" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span style="${ssrRenderStyle({ "font-size": "1.2rem", "font-weight": "600" })}"${_scopeId}>\u786E\u8BA4\u8BA2\u5355</span>`);
          } else {
            return [
              createVNode("span", { style: { "font-size": "1.2rem", "font-weight": "600" } }, "\u786E\u8BA4\u8BA2\u5355")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_descriptions, {
              title: "\u5546\u54C1\u660E\u7EC6",
              column: 1,
              border: "",
              style: { "margin-bottom": "24px" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(cartStore).items, (item) => {
                    _push3(ssrRenderComponent(_component_el_descriptions_item, {
                      key: item.id,
                      label: item.name
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "width": "100%" })}"${_scopeId3}><span${_scopeId3}>x ${ssrInterpolate(item.quantity)}</span><span class="text-price"${_scopeId3}>\xA5${ssrInterpolate((item.price * item.quantity).toFixed(2))}</span></div>`);
                        } else {
                          return [
                            createVNode("div", { style: { "display": "flex", "justify-content": "space-between", "width": "100%" } }, [
                              createVNode("span", null, "x " + toDisplayString(item.quantity), 1),
                              createVNode("span", { class: "text-price" }, "\xA5" + toDisplayString((item.price * item.quantity).toFixed(2)), 1)
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(cartStore).items, (item) => {
                      return openBlock(), createBlock(_component_el_descriptions_item, {
                        key: item.id,
                        label: item.name
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { style: { "display": "flex", "justify-content": "space-between", "width": "100%" } }, [
                            createVNode("span", null, "x " + toDisplayString(item.quantity), 1),
                            createVNode("span", { class: "text-price" }, "\xA5" + toDisplayString((item.price * item.quantity).toFixed(2)), 1)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["label"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div style="${ssrRenderStyle({ "text-align": "right", "margin-bottom": "24px", "font-size": "1.1rem" })}"${_scopeId}> \u603B\u8BA1: <span class="text-price" style="${ssrRenderStyle({ "font-size": "1.6rem" })}"${_scopeId}>\xA5${ssrInterpolate(unref(cartStore).totalAmount.toFixed(2))}</span></div>`);
            _push2(ssrRenderComponent(_component_el_divider, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form, {
              model: form,
              rules,
              ref_key: "formRef",
              ref: formRef,
              "label-width": "80px"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "\u6536\u8D27\u4EBA",
                    prop: "receiver_name"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.receiver_name,
                          "onUpdate:modelValue": ($event) => form.receiver_name = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u6536\u8D27\u4EBA\u59D3\u540D"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.receiver_name,
                            "onUpdate:modelValue": ($event) => form.receiver_name = $event,
                            placeholder: "\u8BF7\u8F93\u5165\u6536\u8D27\u4EBA\u59D3\u540D"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "\u624B\u673A\u53F7",
                    prop: "receiver_phone"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.receiver_phone,
                          "onUpdate:modelValue": ($event) => form.receiver_phone = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.receiver_phone,
                            "onUpdate:modelValue": ($event) => form.receiver_phone = $event,
                            placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "\u5730\u5740",
                    prop: "receiver_address"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.receiver_address,
                          "onUpdate:modelValue": ($event) => form.receiver_address = $event,
                          type: "textarea",
                          rows: 2,
                          placeholder: "\u8BF7\u8F93\u5165\u8BE6\u7EC6\u6536\u8D27\u5730\u5740"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.receiver_address,
                            "onUpdate:modelValue": ($event) => form.receiver_address = $event,
                            type: "textarea",
                            rows: 2,
                            placeholder: "\u8BF7\u8F93\u5165\u8BE6\u7EC6\u6536\u8D27\u5730\u5740"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u5907\u6CE8" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.remark,
                          "onUpdate:modelValue": ($event) => form.remark = $event,
                          placeholder: "\u9009\u586B"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.remark,
                            "onUpdate:modelValue": ($event) => form.remark = $event,
                            placeholder: "\u9009\u586B"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_button, {
                          type: "primary",
                          size: "large",
                          loading: submitting.value,
                          style: { "width": "200px" },
                          onClick: handleSubmit
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` \u63D0\u4EA4\u8BA2\u5355 `);
                            } else {
                              return [
                                createTextVNode(" \u63D0\u4EA4\u8BA2\u5355 ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_button, {
                            type: "primary",
                            size: "large",
                            loading: submitting.value,
                            style: { "width": "200px" },
                            onClick: handleSubmit
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" \u63D0\u4EA4\u8BA2\u5355 ")
                            ]),
                            _: 1
                          }, 8, ["loading"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, {
                      label: "\u6536\u8D27\u4EBA",
                      prop: "receiver_name"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.receiver_name,
                          "onUpdate:modelValue": ($event) => form.receiver_name = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u6536\u8D27\u4EBA\u59D3\u540D"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "\u624B\u673A\u53F7",
                      prop: "receiver_phone"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.receiver_phone,
                          "onUpdate:modelValue": ($event) => form.receiver_phone = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "\u5730\u5740",
                      prop: "receiver_address"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.receiver_address,
                          "onUpdate:modelValue": ($event) => form.receiver_address = $event,
                          type: "textarea",
                          rows: 2,
                          placeholder: "\u8BF7\u8F93\u5165\u8BE6\u7EC6\u6536\u8D27\u5730\u5740"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "\u5907\u6CE8" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.remark,
                          "onUpdate:modelValue": ($event) => form.remark = $event,
                          placeholder: "\u9009\u586B"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_button, {
                          type: "primary",
                          size: "large",
                          loading: submitting.value,
                          style: { "width": "200px" },
                          onClick: handleSubmit
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" \u63D0\u4EA4\u8BA2\u5355 ")
                          ]),
                          _: 1
                        }, 8, ["loading"])
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
              createVNode(_component_el_descriptions, {
                title: "\u5546\u54C1\u660E\u7EC6",
                column: 1,
                border: "",
                style: { "margin-bottom": "24px" }
              }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(cartStore).items, (item) => {
                    return openBlock(), createBlock(_component_el_descriptions_item, {
                      key: item.id,
                      label: item.name
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { style: { "display": "flex", "justify-content": "space-between", "width": "100%" } }, [
                          createVNode("span", null, "x " + toDisplayString(item.quantity), 1),
                          createVNode("span", { class: "text-price" }, "\xA5" + toDisplayString((item.price * item.quantity).toFixed(2)), 1)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["label"]);
                  }), 128))
                ]),
                _: 1
              }),
              createVNode("div", { style: { "text-align": "right", "margin-bottom": "24px", "font-size": "1.1rem" } }, [
                createTextVNode(" \u603B\u8BA1: "),
                createVNode("span", {
                  class: "text-price",
                  style: { "font-size": "1.6rem" }
                }, "\xA5" + toDisplayString(unref(cartStore).totalAmount.toFixed(2)), 1)
              ]),
              createVNode(_component_el_divider),
              createVNode(_component_el_form, {
                model: form,
                rules,
                ref_key: "formRef",
                ref: formRef,
                "label-width": "80px"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, {
                    label: "\u6536\u8D27\u4EBA",
                    prop: "receiver_name"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.receiver_name,
                        "onUpdate:modelValue": ($event) => form.receiver_name = $event,
                        placeholder: "\u8BF7\u8F93\u5165\u6536\u8D27\u4EBA\u59D3\u540D"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "\u624B\u673A\u53F7",
                    prop: "receiver_phone"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.receiver_phone,
                        "onUpdate:modelValue": ($event) => form.receiver_phone = $event,
                        placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "\u5730\u5740",
                    prop: "receiver_address"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.receiver_address,
                        "onUpdate:modelValue": ($event) => form.receiver_address = $event,
                        type: "textarea",
                        rows: 2,
                        placeholder: "\u8BF7\u8F93\u5165\u8BE6\u7EC6\u6536\u8D27\u5730\u5740"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "\u5907\u6CE8" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.remark,
                        "onUpdate:modelValue": ($event) => form.remark = $event,
                        placeholder: "\u9009\u586B"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, null, {
                    default: withCtx(() => [
                      createVNode(_component_el_button, {
                        type: "primary",
                        size: "large",
                        loading: submitting.value,
                        style: { "width": "200px" },
                        onClick: handleSubmit
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" \u63D0\u4EA4\u8BA2\u5355 ")
                        ]),
                        _: 1
                      }, 8, ["loading"])
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
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=checkout-Bb9gJhEh.mjs.map
