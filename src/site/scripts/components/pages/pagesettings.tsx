/// <reference path="../../../../../typings/gls/index.d.ts" />
/// <reference path="../../../../../typings/react/index.d.ts" />

import * as React from "react";
import { IAppState } from "../app";

/**
 * Props for a PageSettings component.
 */
export interface IPageSettingsProps {
    /**
     * Name of the current language.
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
export const PageSettings: React.StatelessComponent<IPageSettingsProps> = (props: IPageSettingsProps): JSX.Element => {
    return (
        <div id="page-settings">
            <span>View in:</span>
            <select onChange={(event) => props.setLanguage((event.target as any).value)} value={props.languageName}>
                {["CSharp", "Java", "Python", "TypeScript", "Ruby"].map((languageName: string): JSX.Element => {
                    return <option key={languageName} value={languageName}>{languageName}</option>;
                })}
            </select>
        </div>);
};
