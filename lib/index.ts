import { Store } from 'n3';
import dereference from 'rdf-dereference';
import { promisifyEventEmitter } from 'event-emitter-promisify';
import { DatasetCore } from '@rdfjs/types';

export default async function dereferenceToStore(
  ...args: Awaited<Parameters<typeof dereference.dereference>>
): Promise<{ store: DatasetCore, prefixes: Record<string, string> }> {
  const store = new Store();
  const prefixes: Record<string, string> = {};
  const { data } = (await dereference.dereference(...args));
  data.on('prefix', (prefix, ns) => { prefixes[prefix] = typeof ns === 'string' ? ns : ns.value; });
  return { store: await promisifyEventEmitter(store.import(data), store), prefixes };
}
