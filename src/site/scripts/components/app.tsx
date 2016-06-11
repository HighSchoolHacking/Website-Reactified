/// <reference path="../../../../typings/react/index.d.ts" />

import * as React from "react";
import { ClassLoader } from "../loading/classloader";
import { IPageProps, Page } from "./pages/page";

/**
 * Properties for an App component.
 */
export interface IAppProps { }

/**
 * State for an App component.
 */
export interface IAppState {
    /**
     * The currently selected language.
     */
    language?: string;

    /**
     * Whether a page is loading.
     */
    loading?: boolean;

    /**
     * Which page to display.
     */
    page?: string;
}

/**
 * Default page to load and display initially.
 */
export const DefaultPage = "Index";

/**
 * Default language to render pages as.
 */
export const DefaultLanguage = "CSharp";

/**
 * A root application component.
 */
export class App extends React.Component<IAppProps, IAppState> {
    /**
     * State for the component.
     */
    public state: IAppState = {
        loading: true,
        language: DefaultLanguage
    };

    /**
     * Asynchronously loads and caches page component.
     */
    private pageLoader: ClassLoader<typeof Page> = new ClassLoader<typeof Page>();

    /**
     * Renders the component.
     * 
     * @returns The rendered component.
     */
    public render(): JSX.Element {
        return this.state.loading
            ? this.renderLoading()
            : this.renderLoaded();
    }

    /**
     * Handler for when the component has mounted.
     */
    protected componentDidMount(): void {
        this.setPage(DefaultPage);
    }

    /**
     * Renders the component as it's loading a new section.
     * 
     * @returns The rendered component.
     */
    private renderLoading(): JSX.Element {
        return <div>Loading...</div>;
    }

    /**
     * Renders the component after loading a section.
     * 
     * @returns The rendered component.
     */
    private renderLoaded(): JSX.Element {
        return React.createElement<IPageProps>(
            this.pageLoader.getClass(this.state.page) as any,
            // definitely a perf concern
            {
                gls: new Gls().setLanguage(this.state.language),
                languageName: this.state.language,
                setLanguage: (language: string): void => this.setState({ language }),
                setPage: (page: string): void => this.setPage(page)
            });
    }

    /**
     * Starts loading a page to be set as the current display.
     * 
     * @param page   The name of the page.
     */
    private setPage(page: string): void {
        this.pageLoader.load(page);

        this.setState(
            {
                loading: true,
                page: this.state.page
            },
            (): void => {
                this.pageLoader.onLoaded(
                    page,
                    (): void => {
                        this.setState({
                            loading: false,
                            page: page
                        });
                    });
            });
    }
}
