export const STORAGE_KEY = 'norse.browser-todo.v1';
export type Todo = { id:string; text:string; completed:boolean };
export type TodoState = { todos:Todo[]; saved:boolean; message:string|null };
export type StoragePort = { getItem(key:string):string|null; setItem(key:string,value:string):void };

function decode(raw:string|null):Todo[] {
  if(raw===null) return [];
  const data:unknown = JSON.parse(raw);
  if(!data || typeof data!=='object' || Array.isArray(data)) throw new Error('Invalid saved list');
  const record = data as Record<string,unknown>;
  if(record.version!==1 || !Array.isArray(record.todos) || Object.keys(record).some(key=>!['version','todos'].includes(key))) throw new Error('Unsupported saved list');
  const ids = new Set<string>();
  return record.todos.map((entry:unknown)=>{
    if(!entry || typeof entry!=='object' || Array.isArray(entry)) throw new Error('Invalid saved task');
    const todo=entry as Record<string,unknown>;
    if(typeof todo.id!=='string' || !todo.id.trim() || ids.has(todo.id) || typeof todo.text!=='string' || !todo.text.trim() || typeof todo.completed!=='boolean' || Object.keys(todo).some(key=>!['id','text','completed'].includes(key))) throw new Error('Invalid saved task');
    ids.add(todo.id);
    return {id:todo.id,text:todo.text,completed:todo.completed};
  });
}

// Storage is confined to this key. A failed read never enables an automatic write.
export class TodoStore {
  private storage:()=>StoragePort;
  private baseline:string|null=null;
  private writable=false;
  private state:TodoState={todos:[],saved:false,message:null};
  constructor(storage:()=>StoragePort) {
    this.storage=storage;
    try {
      this.baseline=storage().getItem(STORAGE_KEY);
      this.state={todos:decode(this.baseline),saved:true,message:null};
      this.writable=true;
    } catch {
      this.state.message='Saved data could not be read. Existing data has not been replaced. Changes will stay in this tab.';
    }
  }
  snapshot():TodoState { return this.state; }
  add(text:string,id:string):TodoState {
    const trimmed=text.trim();
    if(!trimmed) throw new Error('Enter a task before adding it.');
    if(!id.trim() || this.state.todos.some(todo=>todo.id===id)) throw new Error('Could not create a unique task. Please try again.');
    return this.commit([...this.state.todos,{id,text:trimmed,completed:false}]);
  }
  toggle(id:string):TodoState { return this.commit(this.state.todos.map(todo=>todo.id===id?{...todo,completed:!todo.completed}:todo)); }
  remove(id:string):TodoState { return this.commit(this.state.todos.filter(todo=>todo.id!==id)); }
  externalChange():TodoState {
    this.writable=false;
    this.state={...this.state,saved:false,message:'Saved data changed in another tab. Reload to see that list. Changes here will stay in this tab until you choose to replace the saved data.'};
    return this.state;
  }
  // Called only after the user's explicit replacement confirmation.
  replaceSavedData():TodoState {
    return this.write(this.state.todos,true);
  }
  private commit(todos:Todo[]):TodoState {
    if(!this.writable) {this.state={...this.state,todos};return this.state;}
    return this.write(todos,false);
  }
  private write(todos:Todo[],replace:boolean):TodoState {
    try {
      const storage=this.storage();
      if(!replace && storage.getItem(STORAGE_KEY)!==this.baseline) {
        this.state={...this.state,todos};return this.externalChange();
      }
      const raw=JSON.stringify({version:1,todos});
      storage.setItem(STORAGE_KEY,raw);
      this.baseline=raw;this.writable=true;this.state={todos,saved:true,message:null};
    } catch {
      this.writable=false;
      this.state={todos,saved:false,message:'Saving is unavailable. Changes stay in this tab and may be lost when you reload. Previously saved data has not been replaced.'};
    }
    return this.state;
  }
}
