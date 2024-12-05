"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const browserslistToEsbuild = require("browserslist-to-esbuild");
const react = require("@vitejs/plugin-react-swc");
const config = require("../core/config.js");
const monorepo = require("../core/monorepo.js");
const aliases = require("../core/aliases.js");
const plugins = require("./plugins.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const browserslistToEsbuild__default = /* @__PURE__ */ _interopDefault(browserslistToEsbuild);
const react__default = /* @__PURE__ */ _interopDefault(react);
const resolveBaseConfig = async (ctx) => {
  const target = browserslistToEsbuild__default.default(ctx.target);
  return {
    root: ctx.cwd,
    build: {
      emptyOutDir: false,
      // Rely on CLI to do this
      outDir: ctx.distDir,
      target
    },
    cacheDir: "node_modules/.strapi/vite",
    configFile: false,
    define: {
      "process.env": ctx.env
    },
    envPrefix: "STRAPI_ADMIN_",
    optimizeDeps: {
      include: [
        // pre-bundle React dependencies to avoid React duplicates,
        // even if React dependencies are not direct dependencies
        // https://react.dev/warnings/invalid-hook-call-warning#duplicate-react
        "react",
        `react/jsx-runtime`,
        "react-dom/client",
        "styled-components",
        "react-router-dom"
      ]
    },
    resolve: {
      // https://react.dev/warnings/invalid-hook-call-warning#duplicate-react
      dedupe: ["react", "react-dom", "react-router-dom", "styled-components"]
    },
    plugins: [react__default.default(), plugins.buildFilesPlugin(ctx)]
  };
};
const resolveProductionConfig = async (ctx) => {
  const {
    options: { minify, sourcemaps }
  } = ctx;
  const baseConfig = await resolveBaseConfig(ctx);
  return {
    ...baseConfig,
    base: ctx.basePath,
    logLevel: "silent",
    mode: "production",
    build: {
      ...baseConfig.build,
      assetsDir: "",
      minify,
      sourcemap: sourcemaps,
      rollupOptions: {
        input: {
          strapi: ctx.entry
        }
      }
    }
  };
};
const resolveDevelopmentConfig = async (ctx) => {
  const monorepo$1 = await monorepo.loadStrapiMonorepo(ctx.cwd);
  const baseConfig = await resolveBaseConfig(ctx);
  return {
    ...baseConfig,
    mode: "development",
    resolve: {
      ...baseConfig.resolve,
      alias: {
        ...baseConfig.resolve?.alias,
        ...aliases.getMonorepoAliases({ monorepo: monorepo$1 })
      }
    },
    server: {
      middlewareMode: true,
      open: ctx.options.open,
      hmr: {
        server: ctx.options.hmrServer,
        clientPort: ctx.options.hmrClientPort
      }
    },
    appType: "custom"
  };
};
const USER_CONFIGS = ["vite.config.js", "vite.config.mjs", "vite.config.ts"];
const mergeConfigWithUserConfig = async (config$1, ctx) => {
  const userConfig = await config.getUserConfig(USER_CONFIGS, ctx);
  if (userConfig) {
    return userConfig(config$1);
  }
  return config$1;
};
exports.mergeConfigWithUserConfig = mergeConfigWithUserConfig;
exports.resolveDevelopmentConfig = resolveDevelopmentConfig;
exports.resolveProductionConfig = resolveProductionConfig;
//# sourceMappingURL=config.js.map