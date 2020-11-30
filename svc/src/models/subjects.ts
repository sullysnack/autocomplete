import MiniSearch from 'minisearch';
import subjectsdata = require('../data/subjects.json');

export class Subjects {

    private miniSearch: MiniSearch = new MiniSearch({
        idField: 'id',
        fields: ['s'], // fields to index for full-text search
        storeFields: ['s'], // fields to return with search results
        searchOptions: {
            fields: ['s'],
            prefix: true
        }
    });

    constructor() {
        this.miniSearch.addAll(subjectsdata);
    }

    public search(q: string): string[] {
        const resultsraw = this.miniSearch.search(q) || [];
        let results: string[] = [];
        resultsraw.forEach(result => {
            results.push(result['s']);
        });
        return results.sort();
    }
}
