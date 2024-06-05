# RDF Dereference Store

Dereference a remote dataset to a store using [rdf-dereference](https://www.npmjs.com/package/rdf-dereference).

[![GitHub license](https://img.shields.io/github/license/jeswr/rdf-dereference-store.js.svg)](https://github.com/jeswr/rdf-dereference-store.js/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/rdf-dereference-store.svg)](https://www.npmjs.com/package/rdf-dereference-store)
[![build](https://img.shields.io/github/actions/workflow/status/jeswr/rdf-dereference-store.js/nodejs.yml?branch=main)](https://github.com/jeswr/rdf-dereference-store.js/tree/main/)
[![Dependabot](https://badgen.net/badge/Dependabot/enabled/green?icon=dependabot)](https://dependabot.com/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Usage
```ts
import fs from 'fs';
import dereference, { parse } from 'rdf-dereference-store';

// Fetch store from a remote document
const { store } = await dereference('https://www.jeswr.org/#me');

// Fetch store from a local document
const { store } = await dereference('/path/to/file.ttl', { localFiles: true });

// Fetch store from an input stream
const { store } = await parse(fs.createReadStream('/path/to/file.ttl'), { contentType: 'text/turtle' });

// Fetch store from an input string
const { store } = await parse(fs.readFileSync('/path/to/file.ttl').toString(), { contentType: 'text/turtle' });
```

## License
©2024–present
[Jesse Wright](https://github.com/jeswr),
[MIT License](https://github.com/jeswr/rdf-dereference-store.js/blob/master/LICENSE).
