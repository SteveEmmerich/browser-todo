import {test} from 'node:test';
import assert from 'node:assert/strict';
import {STORAGE_KEY,TodoStore} from '../src/todos.ts';

function fixture(initial:string|null=null) {
  const entries=new Map<string,string>();if(initial!==null)entries.set(STORAGE_KEY,initial);
  let writes=0;
  return {entries,get writes(){return writes;},getItem:(key:string)=>entries.get(key)??null,setItem:(key:string,value:string)=>{writes++;entries.set(key,value);}};
}

test('add, complete, delete and reopen retain stable independent identities, including duplicate text',()=>{
  const storage=fixture();const store=new TodoStore(()=>storage);
  store.add('  Buy milk  ','first');store.add('Buy milk','second');store.add('Temporary','third');
  store.toggle('first');store.remove('third');
  assert.deepEqual(new TodoStore(()=>storage).snapshot().todos,[{id:'first',text:'Buy milk',completed:true},{id:'second',text:'Buy milk',completed:false}]);
  store.toggle('first');store.remove('first');store.remove('second');
  assert.deepEqual(new TodoStore(()=>storage).snapshot().todos,[]);
});

test('blank text and reused IDs do not write or alter the existing list',()=>{
  const storage=fixture();const store=new TodoStore(()=>storage);
  store.add('Keep me','id');const writes=storage.writes;
  assert.throws(()=>store.add(' \n ','other'));assert.throws(()=>store.add('Other','id'));
  assert.equal(storage.writes,writes);assert.equal(store.snapshot().todos.length,1);
});

test('unreadable, malformed and newer saved records are preserved during in-memory editing',()=>{
  for(const raw of ['{broken','null','[]','{"version":2,"todos":[]}','{"version":1,"todos":[{"id":"a","text":"X","completed":"false"}]}','{"version":1,"todos":[],"newField":true}','{"version":1,"todos":[{"id":"a","text":"X","completed":false},{"id":"a","text":"Y","completed":true}]}']) {
    const storage=fixture(raw);const store=new TodoStore(()=>storage);
    assert.equal(store.snapshot().saved,false);store.add('In memory','new');store.toggle('new');
    assert.equal(storage.getItem(STORAGE_KEY),raw);assert.equal(storage.writes,0);
    assert.equal(store.snapshot().todos[0].completed,true);
  }
});

test('storage getter/read failure leaves usable memory state and does not attempt a write',()=>{
  const blocked=new TodoStore(()=>{throw new Error('Access denied');});
  assert.equal(blocked.add('In memory','id').saved,false);assert.equal(blocked.snapshot().todos.length,1);
  let writes=0;const failedRead=new TodoStore(()=>({getItem(){throw new Error('Denied');},setItem(){writes++;}}));
  failedRead.add('Memory','id');assert.equal(writes,0);
});

test('write failures preserve the last saved value and keep later edits only in memory until explicit recovery',()=>{
  const storage=fixture();let blocked=false;
  const provider=()=>({getItem:storage.getItem,setItem(key:string,value:string){if(blocked)throw new Error('Quota exceeded');storage.setItem(key,value);}});
  const store=new TodoStore(provider);store.add('Saved','saved');const previous=storage.getItem(STORAGE_KEY);
  blocked=true;store.add('Unsaved','unsaved');assert.equal(store.snapshot().saved,false);assert.equal(store.snapshot().todos.length,2);
  store.remove('saved');assert.equal(storage.getItem(STORAGE_KEY),previous);
  blocked=false;store.toggle('unsaved');assert.equal(storage.getItem(STORAGE_KEY),previous);
  assert.equal(store.replaceSavedData().saved,true);
  assert.deepEqual(new TodoStore(()=>storage).snapshot().todos,[{id:'unsaved',text:'Unsaved',completed:true}]);
});

test('another tab changing or corrupting stored data is not silently overwritten',()=>{
  const storage=fixture();const first=new TodoStore(()=>storage);const second=new TodoStore(()=>storage);
  first.add('First tab','first');second.add('Second tab','second');
  assert.equal(second.snapshot().saved,false);assert.match(second.snapshot().message??'',/another tab/);
  assert.equal(new TodoStore(()=>storage).snapshot().todos[0].text,'First tab');
  const current=new TodoStore(()=>storage);storage.entries.set(STORAGE_KEY,'{broken');current.toggle('first');
  assert.equal(storage.getItem(STORAGE_KEY),'{broken');assert.equal(current.snapshot().saved,false);
});

test('explicit replacement recovers malformed data without touching unrelated storage keys',()=>{
  const storage=fixture('{broken');storage.entries.set('unrelated','keep');
  const store=new TodoStore(()=>storage);store.add('My new list','new');store.replaceSavedData();
  assert.equal(new TodoStore(()=>storage).snapshot().todos[0].text,'My new list');
  assert.equal(storage.entries.get('unrelated'),'keep');
});

test('HTML-looking todo text round-trips as literal text data',()=>{
  const storage=fixture();const store=new TodoStore(()=>storage);const text='<img src=x onerror="alert(1)">';
  store.add(text,'literal');assert.equal(new TodoStore(()=>storage).snapshot().todos[0].text,text);
});
