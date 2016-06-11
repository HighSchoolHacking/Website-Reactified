/// <reference path="../../../../../typings/react/index.d.ts" />

/* tslint:disable no-unused-variable */
import * as React from "react";
/* tslint:enable no-unused-variable */
import { Page } from "./page";

/**
 * The front page of the website.
 */
export class Index extends Page {
    /**
     * Renders the page's sections.
     * 
     * @returns The rendered sections.
     */
    public renderSections(): JSX.Element[][] {
        return [
            [
                <h4>{this.renderGlsSyntax([
                    `comment line : GLS is awesome`,
                    `print : ("Hello world!")`
                ])}</h4>,
            ],
            [
                <h1>Dev testing</h1>,
                <span>Page: </span>,
                <input type="button" value="language" onClick={() => this.props.setPage("Language")} />,
            ]
        ];
    }
}
