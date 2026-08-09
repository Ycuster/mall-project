import { defineComponent, ref, reactive, resolveComponent, mergeProps, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { u as useCartStore } from "./cart-D9jsw7kE.js";
import { ElMessage } from "element-plus";
import { a as useSeoMeta } from "./v3-DqToCt8T.js";
import { u as useNuxtApp, n as navigateTo } from "../server.mjs";
import "D:/vuetest/mall-project/mall-nuxt/node_modules/@unhead/vue/dist/index.mjs";
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
  __name: "checkout",
  __ssrInlineRender: true,
  setup(__props) {
    const cartStore = useCartStore();
    const formRef = ref();
    const submitting = ref(false);
    useSeoMeta({
      title: "确认订单 - MallShop",
      description: "确认订单信息并提交"
    });
    const form = reactive({
      receiver_name: "",
      receiver_phone: "",
      receiver_address: "",
      remark: ""
    });
    const rules = {
      receiver_name: [{ required: true, message: "请输入收货人", trigger: "blur" }],
      receiver_phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
      receiver_address: [{ required: true, message: "请输入地址", trigger: "blur" }]
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
        ElMessage.success("下单成功！");
        await cartStore.fetch();
        navigateTo("/orders");
      } else {
        ElMessage.error(res.message || "下单失败");
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
            _push2(`<span style="${ssrRenderStyle({ "font-size": "1.2rem", "font-weight": "600" })}"${_scopeId}>确认订单</span>`);
          } else {
            return [
              createVNode("span", { style: { "font-size": "1.2rem", "font-weight": "600" } }, "确认订单")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_descriptions, {
              title: "商品明细",
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
                          _push4(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "width": "100%" })}"${_scopeId3}><span${_scopeId3}>x ${ssrInterpolate(item.quantity)}</span><span class="text-price"${_scopeId3}>¥${ssrInterpolate((item.price * item.quantity).toFixed(2))}</span></div>`);
                        } else {
                          return [
                            createVNode("div", { style: { "display": "flex", "justify-content": "space-between", "width": "100%" } }, [
                              createVNode("span", null, "x " + toDisplayString(item.quantity), 1),
                              createVNode("span", { class: "text-price" }, "¥" + toDisplayString((item.price * item.quantity).toFixed(2)), 1)
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
                            createVNode("span", { class: "text-price" }, "¥" + toDisplayString((item.price * item.quantity).toFixed(2)), 1)
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
            _push2(`<div style="${ssrRenderStyle({ "text-align": "right", "margin-bottom": "24px", "font-size": "1.1rem" })}"${_scopeId}> 总计: <span class="text-price" style="${ssrRenderStyle({ "font-size": "1.6rem" })}"${_scopeId}>¥${ssrInterpolate(unref(cartStore).totalAmount.toFixed(2))}</span></div>`);
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
                    label: "收货人",
                    prop: "receiver_name"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.receiver_name,
                          "onUpdate:modelValue": ($event) => form.receiver_name = $event,
                          placeholder: "请输入收货人姓名"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.receiver_name,
                            "onUpdate:modelValue": ($event) => form.receiver_name = $event,
                            placeholder: "请输入收货人姓名"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "手机号",
                    prop: "receiver_phone"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.receiver_phone,
                          "onUpdate:modelValue": ($event) => form.receiver_phone = $event,
                          placeholder: "请输入手机号"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.receiver_phone,
                            "onUpdate:modelValue": ($event) => form.receiver_phone = $event,
                            placeholder: "请输入手机号"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "地址",
                    prop: "receiver_address"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.receiver_address,
                          "onUpdate:modelValue": ($event) => form.receiver_address = $event,
                          type: "textarea",
                          rows: 2,
                          placeholder: "请输入详细收货地址"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.receiver_address,
                            "onUpdate:modelValue": ($event) => form.receiver_address = $event,
                            type: "textarea",
                            rows: 2,
                            placeholder: "请输入详细收货地址"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "备注" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.remark,
                          "onUpdate:modelValue": ($event) => form.remark = $event,
                          placeholder: "选填"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.remark,
                            "onUpdate:modelValue": ($event) => form.remark = $event,
                            placeholder: "选填"
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
                              _push5(` 提交订单 `);
                            } else {
                              return [
                                createTextVNode(" 提交订单 ")
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
                              createTextVNode(" 提交订单 ")
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
                      label: "收货人",
                      prop: "receiver_name"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.receiver_name,
                          "onUpdate:modelValue": ($event) => form.receiver_name = $event,
                          placeholder: "请输入收货人姓名"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "手机号",
                      prop: "receiver_phone"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.receiver_phone,
                          "onUpdate:modelValue": ($event) => form.receiver_phone = $event,
                          placeholder: "请输入手机号"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "地址",
                      prop: "receiver_address"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.receiver_address,
                          "onUpdate:modelValue": ($event) => form.receiver_address = $event,
                          type: "textarea",
                          rows: 2,
                          placeholder: "请输入详细收货地址"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "备注" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.remark,
                          "onUpdate:modelValue": ($event) => form.remark = $event,
                          placeholder: "选填"
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
                            createTextVNode(" 提交订单 ")
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
                title: "商品明细",
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
                          createVNode("span", { class: "text-price" }, "¥" + toDisplayString((item.price * item.quantity).toFixed(2)), 1)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["label"]);
                  }), 128))
                ]),
                _: 1
              }),
              createVNode("div", { style: { "text-align": "right", "margin-bottom": "24px", "font-size": "1.1rem" } }, [
                createTextVNode(" 总计: "),
                createVNode("span", {
                  class: "text-price",
                  style: { "font-size": "1.6rem" }
                }, "¥" + toDisplayString(unref(cartStore).totalAmount.toFixed(2)), 1)
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
                    label: "收货人",
                    prop: "receiver_name"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.receiver_name,
                        "onUpdate:modelValue": ($event) => form.receiver_name = $event,
                        placeholder: "请输入收货人姓名"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "手机号",
                    prop: "receiver_phone"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.receiver_phone,
                        "onUpdate:modelValue": ($event) => form.receiver_phone = $event,
                        placeholder: "请输入手机号"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "地址",
                    prop: "receiver_address"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.receiver_address,
                        "onUpdate:modelValue": ($event) => form.receiver_address = $event,
                        type: "textarea",
                        rows: 2,
                        placeholder: "请输入详细收货地址"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "备注" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.remark,
                        "onUpdate:modelValue": ($event) => form.remark = $event,
                        placeholder: "选填"
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
                          createTextVNode(" 提交订单 ")
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
export {
  _sfc_main as default
};
//# sourceMappingURL=checkout-Bb9gJhEh.js.map
