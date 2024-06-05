import { Store } from 'n3';
import dereference from 'rdf-dereference';
import parseStream from 'rdf-parse';
import { promisifyEventEmitter } from 'event-emitter-promisify';
import { DatasetCore, Stream, Quad } from '@rdfjs/types';
import streamify from 'streamify-string';

export interface StoreAndPrefixes {
  store: DatasetCore,
  prefixes: Record<string, string>
}

export function streamToStore(data: Stream<Quad>) {
  const res = { store: new Store(), prefixes: {} as Record<string, string> };
  data.on('prefix', (prefix, ns) => { res.prefixes[prefix] = typeof ns === 'string' ? ns : ns.value; });
  return promisifyEventEmitter(res.store.import(data), res);
}

export default async function dereferenceToStore(
  ...args: Parameters<typeof dereference.dereference>
) {
  return streamToStore((await dereference.dereference(...args)).data);
}

export async function parse(
  input: string | Parameters<typeof parseStream.parse>[0],
  options: Parameters<typeof parseStream.parse>[1],
) {
  return streamToStore(parseStream.parse(typeof input === 'string' ? streamify(input) : input, options));
}