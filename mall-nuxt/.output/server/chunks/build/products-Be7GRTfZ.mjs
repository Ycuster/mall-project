import { defineComponent, reactive, ref, watch, withAsyncContext, resolveComponent, resolveDirective, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, Fragment, renderList, createSlots, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderList, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { a as useRoute, u as useNuxtApp, _ as _export_sfc, n as navigateTo } from './server.mjs';
import { u as useSeoMeta } from './v3-DqToCt8T.mjs';
import { ElMessage } from 'element-plus';
import { P as ProductCard, _ as _sfc_main$1$1 } from './ProductCard-cdcE9Wbf.mjs';
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

const debounceTime = 300;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SearchBar",
  __ssrInlineRender: true,
  props: {
    modelValue: { default: "" },
    categoryId: { default: "" },
    sortBy: { default: "newest" },
    placeholder: { default: "\u641C\u7D22\u5546\u54C1..." },
    clearable: { type: Boolean, default: true },
    loading: { type: Boolean, default: false },
    showSearchButton: { type: Boolean, default: true },
    showFilters: { type: Boolean, default: false },
    showResultCount: { type: Boolean, default: false },
    total: { default: 0 },
    categories: { default: () => [] },
    sortOptions: { default: () => [
      { label: "\u6700\u65B0\u4E0A\u67B6", value: "newest" },
      { label: "\u9500\u91CF\u4F18\u5148", value: "sales" },
      { label: "\u4EF7\u683C\u2191", value: "price_asc" },
      { label: "\u4EF7\u683C\u2193", value: "price_desc" }
    ] },
    categoryPlaceholder: { default: "\u5168\u90E8\u5206\u7C7B" },
    sortPlaceholder: { default: "\u6392\u5E8F\u65B9\u5F0F" }
  },
  emits: ["update:modelValue", "update:categoryId", "update:sortBy", "search", "clear", "filter-change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const keyword = ref(props.modelValue);
    const filters = reactive({
      category_id: props.categoryId,
      sort: props.sortBy
    });
    watch(() => props.modelValue, (val) => {
      keyword.value = val;
    });
    watch(() => props.categoryId, (val) => {
      filters.category_id = val;
    });
    watch(() => props.sortBy, (val) => {
      filters.sort = val;
    });
    watch(keyword, (val) => {
      emit("update:modelValue", val);
    });
    let searchTimer = null;
    function handleInput() {
      if (searchTimer) clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        emit("search", keyword.value);
      }, debounceTime);
    }
    function handleSearch() {
      if (searchTimer) clearTimeout(searchTimer);
      emit("search", keyword.value);
    }
    function handleClear() {
      emit("clear");
    }
    function handleFilterChange() {
      emit("update:categoryId", filters.category_id);
      emit("filter-change", { ...filters });
    }
    function handleSortChange() {
      emit("update:sortBy", filters.sort);
      emit("filter-change", { ...filters });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_input = resolveComponent("el-input");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_Search = resolveComponent("Search");
      const _component_el_select = resolveComponent("el-select");
      const _component_el_option = resolveComponent("el-option");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "search-bar" }, _attrs))} data-v-4ba08e0e>`);
      _push(ssrRenderComponent(_component_el_input, {
        modelValue: keyword.value,
        "onUpdate:modelValue": ($event) => keyword.value = $event,
        placeholder: __props.placeholder,
        clearable: __props.clearable,
        class: "search-bar__input",
        onInput: handleInput,
        onKeyup: handleSearch,
        onClear: handleClear
      }, createSlots({
        prefix: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Search, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Search)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(_component_Search)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 2
      }, [
        __props.showSearchButton ? {
          name: "append",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1$1, {
                variant: "primary",
                loading: __props.loading,
                onClick: handleSearch
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` \u641C\u7D22 `);
                  } else {
                    return [
                      createTextVNode(" \u641C\u7D22 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$1$1, {
                  variant: "primary",
                  loading: __props.loading,
                  onClick: handleSearch
                }, {
                  default: withCtx(() => [
                    createTextVNode(" \u641C\u7D22 ")
                  ]),
                  _: 1
                }, 8, ["loading"])
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
      if (__props.showFilters) {
        _push(`<div class="search-bar__filters" data-v-4ba08e0e>`);
        _push(ssrRenderComponent(_component_el_select, {
          modelValue: filters.category_id,
          "onUpdate:modelValue": ($event) => filters.category_id = $event,
          placeholder: __props.categoryPlaceholder,
          clearable: "",
          onChange: handleFilterChange
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(__props.categories, (cat) => {
                _push2(ssrRenderComponent(_component_el_option, {
                  key: cat.id,
                  label: cat.name,
                  value: cat.id
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (cat) => {
                  return openBlock(), createBlock(_component_el_option, {
                    key: cat.id,
                    label: cat.name,
                    value: cat.id
                  }, null, 8, ["label", "value"]);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_select, {
          modelValue: filters.sort,
          "onUpdate:modelValue": ($event) => filters.sort = $event,
          placeholder: __props.sortPlaceholder,
          onChange: handleSortChange
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(__props.sortOptions, (opt) => {
                _push2(ssrRenderComponent(_component_el_option, {
                  key: opt.value,
                  label: opt.label,
                  value: opt.value
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.sortOptions, (opt) => {
                  return openBlock(), createBlock(_component_el_option, {
                    key: opt.value,
                    label: opt.label,
                    value: opt.value
                  }, null, 8, ["label", "value"]);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.showResultCount) {
        _push(`<div class="search-bar__count" data-v-4ba08e0e> \u5171 <span class="search-bar__count-num" data-v-4ba08e0e>${ssrInterpolate(__props.total)}</span> \u4EF6\u5546\u54C1 </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/business/product/SearchBar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SearchBar = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-4ba08e0e"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "products",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    useSeoMeta({
      title: "\u5546\u54C1\u5217\u8868 - MallShop",
      description: "\u6D4F\u89C8 MallShop \u6240\u6709\u5546\u54C1\uFF0C\u6309\u5206\u7C7B\u3001\u4EF7\u683C\u3001\u9500\u91CF\u7B5B\u9009",
      keywords: "\u5546\u54C1,\u8D2D\u7269,MallShop,\u5546\u57CE"
    });
    const sortOptions = [
      { label: "\u6700\u65B0\u4E0A\u67B6", value: "newest" },
      { label: "\u9500\u91CF\u4F18\u5148", value: "sales" },
      { label: "\u4EF7\u683C\u5347\u5E8F", value: "price_asc" },
      { label: "\u4EF7\u683C\u964D\u5E8F", value: "price_desc" }
    ];
    const filters = reactive({
      keyword: route.query.keyword || "",
      category_id: route.query.category ? Number(route.query.category) : "",
      sort: route.query.sort || "newest",
      page: 1,
      pageSize: 12
    });
    const products = ref([]);
    const categories = ref([]);
    const total = ref(0);
    const loading = ref(false);
    async function load(page) {
      if (page) filters.page = page;
      loading.value = true;
      const { $api } = useNuxtApp();
      const params = { ...filters };
      Object.keys(params).forEach((k) => {
        if (params[k] === "" || params[k] === null) delete params[k];
      });
      const res = await $api.get("/products", { params });
      if (res.code === 200) {
        products.value = res.data.list;
        total.value = res.data.total;
      }
      loading.value = false;
    }
    async function loadCategories() {
      const { $api } = useNuxtApp();
      const res = await $api.get("/categories");
      if (res.code === 200) categories.value = res.data;
    }
    watch(() => route.query, async (q) => {
      filters.keyword = q.keyword || "";
      filters.category_id = q.category ? Number(q.category) : "";
      filters.sort = q.sort || "newest";
      filters.page = 1;
      await load(1);
    });
    [__temp, __restore] = withAsyncContext(() => loadCategories()), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => load(1)), await __temp, __restore();
    function handleSearch(keyword) {
      filters.keyword = keyword;
      load(1);
    }
    function handleFilterChange(newFilters) {
      filters.category_id = newFilters.category_id;
      filters.sort = newFilters.sort;
      load(1);
    }
    function handleProductClick(product) {
      navigateTo(`/product/${product.id}`);
    }
    function handleAddToCart(product) {
      ElMessage.success(`\u5DF2\u5C06\u300C${product.name}\u300D\u52A0\u5165\u8D2D\u7269\u8F66`);
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_el_card = resolveComponent("el-card");
      const _component_el_row = resolveComponent("el-row");
      const _component_el_col = resolveComponent("el-col");
      const _component_el_empty = resolveComponent("el-empty");
      const _component_el_pagination = resolveComponent("el-pagination");
      const _directive_loading = resolveDirective("loading");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_el_card, {
        shadow: "never",
        style: { "margin-bottom": "20px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(SearchBar), {
              modelValue: filters.keyword,
              "onUpdate:modelValue": ($event) => filters.keyword = $event,
              "category-id": filters.category_id,
              "onUpdate:categoryId": ($event) => filters.category_id = $event,
              "sort-by": filters.sort,
              "onUpdate:sortBy": ($event) => filters.sort = $event,
              categories: categories.value,
              "sort-options": sortOptions,
              "show-filters": true,
              "show-result-count": true,
              total: total.value,
              onSearch: handleSearch,
              onFilterChange: handleFilterChange
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(SearchBar), {
                modelValue: filters.keyword,
                "onUpdate:modelValue": ($event) => filters.keyword = $event,
                "category-id": filters.category_id,
                "onUpdate:categoryId": ($event) => filters.category_id = $event,
                "sort-by": filters.sort,
                "onUpdate:sortBy": ($event) => filters.sort = $event,
                categories: categories.value,
                "sort-options": sortOptions,
                "show-filters": true,
                "show-result-count": true,
                total: total.value,
                onSearch: handleSearch,
                onFilterChange: handleFilterChange
              }, null, 8, ["modelValue", "onUpdate:modelValue", "category-id", "onUpdate:categoryId", "sort-by", "onUpdate:sortBy", "categories", "total"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_loading, loading.value))}>`);
      if (products.value.length) {
        _push(ssrRenderComponent(_component_el_row, { gutter: 20 }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(products.value, (p) => {
                _push2(ssrRenderComponent(_component_el_col, {
                  key: p.id,
                  xs: 12,
                  sm: 8,
                  md: 6,
                  style: { "margin-bottom": "20px" }
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(ProductCard), {
                        product: p,
                        onClick: handleProductClick,
                        onAddToCart: handleAddToCart
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(ProductCard), {
                          product: p,
                          onClick: handleProductClick,
                          onAddToCart: handleAddToCart
                        }, null, 8, ["product"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(products.value, (p) => {
                  return openBlock(), createBlock(_component_el_col, {
                    key: p.id,
                    xs: 12,
                    sm: 8,
                    md: 6,
                    style: { "margin-bottom": "20px" }
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(ProductCard), {
                        product: p,
                        onClick: handleProductClick,
                        onAddToCart: handleAddToCart
                      }, null, 8, ["product"])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_el_empty, { description: "\u6682\u65E0\u5546\u54C1" }, null, _parent));
      }
      _push(`</div>`);
      if (total.value > ((_a = filters.pageSize) != null ? _a : 0)) {
        _push(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "center", "margin-top": "24px" })}">`);
        _push(ssrRenderComponent(_component_el_pagination, {
          "current-page": filters.page,
          "onUpdate:currentPage": ($event) => filters.page = $event,
          "page-size": filters.pageSize,
          total: total.value,
          layout: "prev, pager, next, jumper",
          onCurrentChange: load
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=products-Be7GRTfZ.mjs.map
