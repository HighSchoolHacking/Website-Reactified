/// <reference path="../../../typings/react/index.d.ts" />
/// <reference path="../../../typings/react-dom/index.d.ts" />

/* tslint:disable no-unused-variable */
import * as React from "react";
/* tslint:enable no-unused-variable */

import * as ReactDom from "react-dom";
import { App } from "./components/app";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

const appWrapper: HTMLElement = document.getElementById("app-wrapper");
const headerWrapper: HTMLElement = document.getElementById("header-wrapper");
const footerWrapper: HTMLElement = document.getElementById("footer-wrapper");

ReactDom.render(<Header />, headerWrapper);
ReactDom.render(<Footer />, footerWrapper);

ReactDom.render(<App />, appWrapper);

appWrapper.className = appWrapper.className.replace("loading", "");
