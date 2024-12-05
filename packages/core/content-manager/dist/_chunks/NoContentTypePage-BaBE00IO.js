"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const strapiAdmin = require("@strapi/admin/strapi-admin");
const designSystem = require("@strapi/design-system");
const Icons = require("@strapi/icons");
const Symbols = require("@strapi/icons/symbols");
const reactIntl = require("react-intl");
const reactRouterDom = require("react-router-dom");
const index = require("./index-BN1pPa5v.js");
const NoContentType = () => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(strapiAdmin.Page.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      strapiAdmin.Layouts.Header,
      {
        title: formatMessage({
          id: index.getTranslation("header.name"),
          defaultMessage: "Content"
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.EmptyStateLayout,
      {
        action: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.LinkButton,
          {
            tag: reactRouterDom.NavLink,
            variant: "secondary",
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Plus, {}),
            to: "/plugins/content-type-builder/content-types/create-content-type",
            children: formatMessage({
              id: "app.components.HomePage.create",
              defaultMessage: "Create your first Content-type"
            })
          }
        ),
        content: formatMessage({
          id: "content-manager.pages.NoContentType.text",
          defaultMessage: "You don't have any content yet, we recommend you to create your first Content-Type."
        }),
        hasRadius: true,
        icon: /* @__PURE__ */ jsxRuntime.jsx(Symbols.EmptyDocuments, { width: "16rem" }),
        shadow: "tableShadow"
      }
    ) })
  ] });
};
exports.NoContentType = NoContentType;
//# sourceMappingURL=NoContentTypePage-BaBE00IO.js.map
