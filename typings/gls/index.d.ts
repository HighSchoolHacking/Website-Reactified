/**
 * Driving object to convert GLS syntax into real language code.
 */
declare class Gls {
    /**
     * Sets a new language to be used for conversion.
     *
     * @param name   The name of the language.
     * @returns this
     */
    setLanguage(name: string): Gls;
    /**
     * Converts raw GLS syntax into language code.
     *
     * @param input   GLS syntax to be converted.
     * @returns Language code from the input.
     */
    convert(input: string[]): string[];

    /**
     * (manual addition)
     */
    getLanguage(): any;
}
