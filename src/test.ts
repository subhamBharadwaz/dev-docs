import { getDocsCollection } from "./chroma/collections.js";

const collection = await getDocsCollection();

const count = await collection.count();

console.log(count);
