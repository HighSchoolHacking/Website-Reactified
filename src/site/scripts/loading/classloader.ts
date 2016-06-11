declare var require: any;

/**
 * Callback for a class being loaded.
 * 
 * @param classContainer   The loaded class.
 * @param className   The name of the loaded class.
 */
export interface ILoadedCallback<T> {
    (classContainer: IClassContainer<T>, className: string): void;
}

/**
 * Holds a class stored under its name.
 */
interface IClassContainer<T> {
    [i: string]: T;
}

/**
 * Holds a class and any callbacks for when it's loaded.
 */
interface IClassListing<T> {
    /**
     * Callbacks to be run when the class is loaded.
     */
    callbacks?: ILoadedCallback<T>[];

    /**
     * Holds the class once it's loaded.
     */
    loadedClassContainer?: T;
}

/**
 * Class listings, keyed by class name.
 */
interface IClasses<T> {
    [i: string]: IClassListing<T>;
}

/**
 * Loads and caches classes.
 * 
 * @type T   The `typeof` class being loaded.
 */
export class ClassLoader<T> {
    /**
     * Class listings, keyed by class name.
     */
    private classes: IClasses<T> = {};

    /**
     * 
     */
    public getClass(className: string): T {
        if (!(className in this.classes)) {
            throw new Error(`Class '${className}' does not exist.`);
        }

        const listing = this.classes[className];
        if (!listing.loadedClassContainer) {
            throw new Error(`Class '${className}' is not yet loaded.`);
        }

        return listing.loadedClassContainer[className];
    }

    /**
     * Loads a class if it hasn't been already.
     * 
     * @param className   The name of the class.
     * @returns Whether the class was already loaded.
     */
    public load(className: string): boolean {
        if (className in this.classes) {
            return false;
        }

        const listing: IClassListing<T> = this.classes[className] = {
            callbacks: []
        };

        const classNamePath = this.formatClassNamePath(className);
        require([classNamePath], (classContainer: T): void => {
            listing.loadedClassContainer = classContainer;

            listing.callbacks.forEach((callback: ILoadedCallback<T>): void => {
                callback(classContainer[className], className);
            });
            delete this.classes[className].callbacks;
        });

        return true;
    }

    /**
     * Adds a callback for when a class is loaded.
     * 
     * @param className   The name of the class.
     * @param callback   A callback for when the class is loaded.
     */
    public onLoaded(className: string, callback: ILoadedCallback<T>): void {
        if (!(className in this.classes)) {
            throw new Error(`'${className}' is not a known class name.'`);
        }

        const listing: IClassListing<T> = this.classes[className];

        if (listing.loadedClassContainer) {
            callback(listing.loadedClassContainer[className], className);
        } else {
            listing.callbacks.push(callback);
        }
    }

    /**
     * 
     */
    private formatClassNamePath(className: string): string {
        return `../components/pages/${className.toLowerCase()}`;
    }
}
