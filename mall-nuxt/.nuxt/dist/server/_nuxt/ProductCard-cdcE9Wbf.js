import { defineComponent, computed, resolveComponent, mergeProps, withCtx, renderSlot, useSSRContext, createTextVNode, createVNode, toDisplayString } from "vue";
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BaseButton",
  __ssrInlineRender: true,
  props: {
    variant: { default: "default" },
    size: { default: "default" },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    icon: { default: "" }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const elType = computed(() => {
      const map = {
        primary: "primary",
        danger: "danger",
        success: "success",
        warning: "warning",
        text: "text",
        default: "default"
      };
      return map[props.variant] || "default";
    });
    function handleClick(event) {
      if (props.loading || props.disabled) return;
      emit("click", event);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = resolveComponent("el-button");
      _push(ssrRenderComponent(_component_el_button, mergeProps({
        type: elType.value,
        size: __props.size,
        loading: __props.loading,
        disabled: __props.disabled,
        block: __props.block,
        icon: __props.icon
      }, _ctx.$attrs, { onClick: handleClick }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/business/base/BaseButton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    product: {},
    clickable: { type: Boolean, default: true },
    showDescription: { type: Boolean, default: false },
    showSales: { type: Boolean, default: true },
    showAddCart: { type: Boolean, default: true },
    showFavorite: { type: Boolean, default: false },
    isFavorite: { type: Boolean, default: false },
    defaultImg: { default: "https://picsum.photos/seed/default/400/400" }
  },
  emits: ["click", "add-to-cart", "toggle-favorite"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const hasDiscount = computed(() => props.product.original_price > props.product.price);
    const discountPercent = computed(() => {
      if (!hasDiscount.value) return 0;
      return Math.round((1 - props.product.price / props.product.original_price) * 100);
    });
    function formatPrice(price) {
      return Number(price).toFixed(2);
    }
    function handleAddCart() {
      emit("add-to-cart", props.product);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_tag = resolveComponent("el-tag");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_Heart = resolveComponent("Heart");
      const _component_ShoppingCart = resolveComponent("ShoppingCart");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["product-card", { "product-card--clickable": __props.clickable }]
      }, _attrs))} data-v-1b9d6bc8><div class="product-card__cover" data-v-1b9d6bc8><img${ssrRenderAttr("src", __props.product.cover || __props.defaultImg)}${ssrRenderAttr("alt", __props.product.name)} data-v-1b9d6bc8><div class="product-card__tags" data-v-1b9d6bc8>`);
      if (__props.product.is_hot) {
        _push(ssrRenderComponent(_component_el_tag, {
          type: "danger",
          size: "small",
          effect: "dark"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`热销`);
            } else {
              return [
                createTextVNode("热销")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (__props.product.is_new) {
        _push(ssrRenderComponent(_component_el_tag, {
          type: "success",
          size: "small",
          effect: "dark"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`新品`);
            } else {
              return [
                createTextVNode("新品")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.showFavorite) {
        _push(`<div class="product-card__favorite" data-v-1b9d6bc8>`);
        _push(ssrRenderComponent(_component_el_icon, {
          class: { "product-card__favorite--active": __props.isFavorite }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Heart, null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Heart)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="product-card__body" data-v-1b9d6bc8><div class="product-card__title"${ssrRenderAttr("title", __props.product.name)} data-v-1b9d6bc8>${ssrInterpolate(__props.product.name)}</div>`);
      if (__props.showDescription && __props.product.description) {
        _push(`<div class="product-card__desc" data-v-1b9d6bc8>${ssrInterpolate(__props.product.description)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="product-card__price-row" data-v-1b9d6bc8><div class="product-card__price" data-v-1b9d6bc8><span class="product-card__price-current" data-v-1b9d6bc8>¥${ssrInterpolate(formatPrice(__props.product.price))}</span>`);
      if (hasDiscount.value) {
        _push(`<span class="product-card__price-original" data-v-1b9d6bc8> ¥${ssrInterpolate(formatPrice(__props.product.original_price))}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (hasDiscount.value) {
        _push(ssrRenderComponent(_component_el_tag, {
          type: "warning",
          size: "small",
          class: "product-card__discount"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` -${ssrInterpolate(discountPercent.value)}% `);
            } else {
              return [
                createTextVNode(" -" + toDisplayString(discountPercent.value) + "% ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.showSales) {
        _push(`<span class="product-card__sales" data-v-1b9d6bc8>已售${ssrInterpolate(__props.product.sales)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="product-card__footer" data-v-1b9d6bc8>`);
      ssrRenderSlot(_ctx.$slots, "actions", {}, () => {
        if (__props.showAddCart) {
          _push(ssrRenderComponent(_sfc_main$1, {
            variant: "primary",
            size: "small",
            block: "",
            disabled: __props.product.stock <= 0,
            onClick: handleAddCart
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_el_icon, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_ShoppingCart, null, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_ShoppingCart)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(__props.product.stock <= 0 ? "已售罄" : "加入购物车")}`);
              } else {
                return [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(_component_ShoppingCart)
                    ]),
                    _: 1
                  }),
                  createTextVNode(" " + toDisplayString(__props.product.stock <= 0 ? "已售罄" : "加入购物车"), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
      }, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/business/product/ProductCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ProductCard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1b9d6bc8"]]);
export {
  ProductCard as P,
  _sfc_main$1 as _
};
//# sourceMappingURL=ProductCard-cdcE9Wbf.js.map
