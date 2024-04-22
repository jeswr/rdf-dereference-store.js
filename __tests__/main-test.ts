import path from 'path';
import fs from 'fs';
import rdfServe from 'rdf-serve';
import dereference, { parse } from '../lib';

it('should parse a stream', async () => {
  const { store, prefixes } = await dereference(path.join(__dirname, 'data', 'test.ttl'), { localFiles: true });
  expect(store.size).toBe(3);
  expect(prefixes).toEqual({
    ex: 'http://example.org/',
  });
});

it('should fetch a local document', async () => {
  const { store, prefixes } = await parse(fs.createReadStream(path.join(__dirname, 'data', 'test.ttl')), { contentType: 'text/turtle' });
  expect(store.size).toBe(3);
  expect(prefixes).toEqual({
    ex: 'http://example.org/',
  });
});

it('should fetch a remote document', async () => {
  const app = rdfServe(path.join(__dirname, 'data'));
  const server = app.listen(3005);
  await new Promise((resolve) => { server.on('listening', resolve); });

  const { store, prefixes } = await dereference('http://localhost:3005/test');
  expect(store.size).toBe(3);
  // Note no prefixes because the serve doesnt sent them
  expect(prefixes).toEqual({});

  server.close();
});
