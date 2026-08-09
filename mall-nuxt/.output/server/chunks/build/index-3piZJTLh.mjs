import { defineComponent, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useUserStore } from './user-OpFIMyWU.mjs';
import { _ as _export_sfc } from './server.mjs';
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
import 'element-plus';
import 'element-plus/es/locale/lang/zh-cn';
import '@element-plus/icons-vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useUserStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = resolveComponent("el-icon");
      const _component_Loading = resolveComponent("Loading");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-redirect" }, _attrs))} data-v-d566dd01>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "spinning" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Loading, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Loading)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span data-v-d566dd01>\u6B63\u5728\u8DF3\u8F6C...</span></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d566dd01"]]);

export { index as default };
//# sourceMappingURL=index-3piZJTLh.mjs.map
