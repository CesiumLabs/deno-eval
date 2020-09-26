const BASE_URL = "https://emkc.org/api/v1/piston";
const Store = {};

class OpenEval {

    constructor() {
        this.fetchLanguages();
    }

    /**
     * Returns available languages.
     */
    get languages() {
        const langs = Object.keys(Store);
        if (!langs.length) return null;
        return langs;
    }

    /**
     * Fetches available languages
     */
    async fetchLanguages() {
        try {
            // fetch languages
            const res = await fetch(`${BASE_URL}/versions`);
            const data = await res.json();

            // cache languages
            data.forEach(x => {
                Store[x.name] = x.version;
            });
            console.log(`[OpenEval] Cached ${data.length} languages!`);
            return Store;
        } catch(e) {
            throw new Error(`Couldn't parse data! ${e}`);
        }
    }

    /**
     * Evaluates a code
     * @param {string} language Language
     * @param {string} code Code to eval
     * @param [args=[]] Args
     */
    async eval(language, code, args=[]) {
        if (typeof language !== "string") throw new Error("Language may not be empty!");
        if (typeof code !== "string") return;

        const payload = {
            language: language,
            source: code,
            args: args && Array.isArray(args) ? args : []
        };

        try {
            const res = await fetch(`${BASE_URL}/execute`, {
                method: "POST",
                body: JSON.stringify(payload)
            });
            const data = await res.json();

            return data;
        } catch(e) {
            throw new Error(`Couldn't execute data! ${e}`);
        }
    }

}

export default OpenEval;