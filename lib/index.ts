import { Store } from 'n3';
import dereference from 'rdf-dereference';
import parseStream from 'rdf-parse';
import { promisifyEventEmitter } from 'event-emitter-promisify';
import { DatasetCore, Stream, Quad } from '@rdfjs/types';

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
  ...args: Awaited<Parameters<typeof dereference.dereference>>
) {
  return streamToStore((await dereference.dereference(...args)).data);
}

export async function parse(...args: Awaited<Parameters<typeof parseStream.parse>>) {
  return streamToStore(parseStream.parse(...args));
}
