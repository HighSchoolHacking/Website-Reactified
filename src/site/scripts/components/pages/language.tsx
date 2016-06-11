/// <reference path="../../../../../typings/pluralize/index.d.ts" />
/// <reference path="../../../../../typings/react/index.d.ts" />

import * as Pluralize from "pluralize";
/* tslint:disable no-unused-variable */
import * as React from "react";
/* tslint:enable no-unused-variable */
import { Page } from "./page";

/**
 * Homepage for a language.
 */
export class Language extends Page {
    /**
     * Renders the page's sections.
     * 
     * @returns The rendered sections.
     */
    protected renderSections(): JSX.Element[][] {
        return [
            this.renderIntroduction(),
            this.renderVariables(),
            this.renderComments(),
            this.renderStrings(),
            this.renderNumbers(),
            this.renderConditionals(),
            this.renderWhileLoops(),
            this.renderArrays(),
            this.renderForLoops(),
            this.renderDictionaries(),
            this.renderFunctions(),
            this.renderRecursion()
        ];
    }

    /**
     * Renders the introduction.
     * 
     * @returns The rendered introduction.
     */
    protected renderIntroduction(): JSX.Element[] {
        return [
            <h1>{this.props.languageName}</h1>,
            <p>
                {`We're going to spend the first few lessons getting you used to working in ${this.props.languageName}.`}
                If this is your first time coding you're in for a great ride.
                <br />
                Go through these lessons in order.
            </p>
        ];
    }

    /**
     * Renders the variables section.
     * 
     * @returns The rendered variables section.
     */
    protected renderVariables(): JSX.Element[] {
        return [
            <h2>Variables</h2>,
            <p>
                In code, a 'variable' stores value. Variables are called by their name, which is how you can set the value, get the value, and change the value.
            </p>
        ];
    }

    /**
     * Renders the comments section.
     * 
     * @returns The rendered comments section.
     */
    protected renderComments(): JSX.Element[] {
        return [
            <h2>Comments</h2>,
            <p>
                For the rest of the lessons we're going to be using a feature called 'comments' in code.
                Comments do literally nothing: they're just there to help explain.
            </p>
        ];
    }

    /**
     * Renders the 
     * 
     * @returns The rendered 
     */
    protected renderStrings(): JSX.Element[] {
        return [
            <h2>Strings</h2>,
            <p>
                hello world
            </p>
        ];
    }

    /**
     * Renders the 
     * 
     * @returns The rendered 
     */
    protected renderNumbers(): JSX.Element[] {
        return [
            <h2>Numbers</h2>,
            <p>
                hello world
            </p>
        ];
    }

    /**
     * Renders the 
     * 
     * @returns The rendered 
     */
    protected renderConditionals(): JSX.Element[] {
        return [
            <h2>Conditionals</h2>,
            <p>
                hello world
            </p>
        ];
    }

    /**
     * Renders the while loops section.
     * 
     * @returns The rendered while loops section.
     */
    protected renderWhileLoops(): JSX.Element[] {
        return [
            <h2>While Loops</h2>,
            <p>
                hello world
            </p>
        ];
    }

    /**
     * Renders the arrays section.
     * 
     * @returns The rendered arrays section.
     */
    protected renderArrays(): JSX.Element[] {
        return [
            <h2>{this.properize(this.props.gls.getLanguage().properties.arrays.className)}</h2>,
            <p>
                hello world
            </p>
        ];
    }

    /**
     * Renders the for loops section.
     * 
     * @returns The rendered for loops section.
     */
    protected renderForLoops(): JSX.Element[] {
        return [
            <h2>For Loops</h2>,
            <p>
                hello world
            </p>
        ];
    }

    /**
     * Renders the dictionaries section.
     * 
     * @returns The rendered dictionaries section.
     */
    protected renderDictionaries(): JSX.Element[] {
        return [
            <h2>{this.properize(this.props.gls.getLanguage().properties.dictionaries.className)}</h2>,
            <p>
                hello world
            </p>
        ];
    }

    /**
     * Renders the 
     * 
     * @returns The rendered 
     */
    protected renderFunctions(): JSX.Element[] {
        return [
            <h2>Functions</h2>,
            <p>
                hello world
            </p>
        ];
    }

    /**
     * Renders the 
     * 
     * @returns The rendered 
     */
    protected renderRecursion(): JSX.Element[] {
        return [
            <h2>Recursion</h2>,
            <p>
                hello world
            </p>
        ];
    }

    /**
     * 
     */
    private properize(title: string): string {
        const plural: string = Pluralize.plural(title);

        return plural[0].toUpperCase() + plural.substring(1);
    }
}
