import path from 'path';
import fs from 'fs';
import rdfServe from 'rdf-serve';
import dereference, { parse, dereferenceToStore } from '../lib';

it('should fetch a local document', async () => {
  const { store, prefixes } = await dereference(path.join(__dirname, 'data', 'test.ttl'), { localFiles: true });
  expect(store.size).toBe(3);
  expect(prefixes).toEqual({
    ex: 'http://example.org/',
  });
});

it('should fetch a local document - testing named export', async () => {
  const { store, prefixes } = await dereferenceToStore(path.join(__dirname, 'data', 'test.ttl'), { localFiles: true });
  expect(store.size).toBe(3);
  expect(prefixes).toEqual({
    ex: 'http://example.org/',
  });
});

it('should fetch 2 local documents', async () => {
  const { store, prefixes } = await dereference([path.join(__dirname, 'data', 'test.ttl'), path.join(__dirname, 'data', 'test2.ttl')], { localFiles: true });
  expect(store.size).toBe(4);
  expect(prefixes).toEqual({
    ex: 'http://example.org/',
  });
});

it('should parse a stream', async () => {
  const { store, prefixes } = await parse(fs.createReadStream(path.join(__dirname, 'data', 'test.ttl')), { contentType: 'text/turtle' });
  expect(store.size).toBe(3);
  expect(prefixes).toEqual({
    ex: 'http://example.org/',
  });
});

it('should parse a string', async () => {
  const { store, prefixes } = await parse(
    fs.readFileSync(path.join(__dirname, 'data', 'test.ttl')).toString(),
    { contentType: 'text/turtle' },
  );
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
