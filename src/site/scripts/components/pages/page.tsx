/// <reference path="../../../../../typings/gls/index.d.ts" />
/// <reference path="../../../../../typings/react/index.d.ts" />

import * as React from "react";
import { IAppState } from "../app";
import { PageSettings } from "./pagesettings";

/**
 * Props for a Page component.
 */
export interface IPageProps {
    /**
     * Gls instance for syntax compilation.
     */
    gls: Gls;

    /**
     * The name of the current language.
     */
    languageName: string;

    /**
     * Hook to change the displayed language.
     */
    setLanguage: (state: IAppState) => void;

    /**
     * Hook to navigate to a new page.
     */
    setPage: (name: string) => void;
}

/**
 * A page displayed on the site, abstracted over a GLS language.
 */
export abstract class Page extends React.Component<IPageProps, void> {
    /**
     * Renders the page.
     * 
     * @returns The rendered page.
     */
    public render(): JSX.Element {
        return (
            <div id="page" className="content">
                {this.flattenSections(this.renderSections())
                    .map((section: JSX.Element, i: number): JSX.Element => {
                        return <section key={i}>{section}</section>;
                    })}
                <PageSettings
                    languageName={this.props.languageName}
                    setLanguage={this.props.setLanguage}
                    setPage={this.props.setPage} />
            </div>);
    }

    /**
     * Renders the page's sections.
     * 
     * @returns The rendered sections.
     */
    protected abstract renderSections(): JSX.Element[][];

    /**
     * Renders raw GLS syntax into a code block of the current language.
     * 
     * @param syntax   Raw GLS syntax.
     * @returns The rendered syntax.
     */
    protected renderGlsSyntax(syntax: string | string[]): JSX.Element {
        if (typeof syntax === "string") {
            syntax = (syntax as string).split("\n");
        }

        return (
            <pre className={`language-${this.props.languageName}`}>
                <code className={`language-${this.props.languageName}`}>
                    {this.props.gls.convert(syntax as string[]).join("\n")}
                </code>
            </pre>);
    }

    /**
     * Flattens rendered sections into a single array.
     * 
     * @param sections   Contents of rendered sections.
     * @returns An array of the sections.
     */
    private flattenSections(sections: JSX.Element[] | JSX.Element[][]): JSX.Element[] {
        const output: JSX.Element[] = [];

        for (let i: number = 0; i < sections.length; i += 1) {
            const item = sections[i];

            if (item instanceof Array) {
                output.push(...item);
            } else {
                output.push(item);
            }
        }

        return output;
    }
};
