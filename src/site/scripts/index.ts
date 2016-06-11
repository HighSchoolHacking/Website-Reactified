declare var requirejs: any;

requirejs.config({
    paths: {
        "gls": "../../../node_modules/gls/packed/gls",
        "main": "bundled/main",
        "pluralize": "../../../node_modules/pluralize/pluralize",
        "react": "../../../node_modules/react/dist/react",
        "react-dom": "../../../node_modules/react-dom/dist/react-dom"
    }
});

requirejs(["main"]);
