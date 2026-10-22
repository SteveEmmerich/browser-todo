import {useEffect,useRef,useState} from 'react';
import {STORAGE_KEY,TodoStore} from './todos';
import './style.css';

export default function App() {
  const [store]=useState(()=>new TodoStore(()=>window.localStorage));
  const [state,setState]=useState(()=>store.snapshot());
  const [text,setText]=useState('');
  const [error,setError]=useState('');
  const [announcement,setAnnouncement]=useState('');
  const [confirmReset,setConfirmReset]=useState(false);
  const input=useRef<HTMLInputElement>(null);
  const resetButton=useRef<HTMLButtonElement>(null);
  const cancelButton=useRef<HTMLButtonElement>(null);
  useEffect(()=>{
    const changed=(event:StorageEvent)=>{if(event.key===STORAGE_KEY || event.key===null)setState(store.externalChange());};
    window.addEventListener('storage',changed);
    return ()=>window.removeEventListener('storage',changed);
  },[store]);
  useEffect(()=>{if(confirmReset)cancelButton.current?.focus();},[confirmReset]);
  const completed=state.todos.filter(todo=>todo.completed).length;
  const remaining=state.todos.length-completed;
  function closeReset() {setConfirmReset(false);resetButton.current?.focus();}
  return <main>
    <header><a className="brand" href="./" aria-label="Small wins home"><span className="brand-icon" aria-hidden="true">✓</span>small wins<span className="brand-period">.</span></a><span className="local-badge"><span aria-hidden="true">◉</span> Just this browser</span></header>
    <div className="intro"><p className="eyebrow">ONE THING AT A TIME</p><h1>A little less<br/>to do.</h1><p className="intro-copy">A quiet place for the things on your mind.</p></div>
    <section className="list-card" aria-labelledby="list-heading">
      <form onSubmit={event=>{
        event.preventDefault();
        try {setState(store.add(text,crypto.randomUUID()));setText('');setError('');setAnnouncement('Task added.');input.current?.focus();}
        catch(failure) {setError(failure instanceof Error?failure.message:'Could not add task.');input.current?.focus();}
      }}>
        <label htmlFor="new-task">What needs doing?</label>
        <div className="add-row"><input ref={input} id="new-task" value={text} onChange={event=>{setText(event.target.value);setError('');}} placeholder="Add a small task…" autoComplete="off" aria-describedby={error?'input-error':undefined} aria-invalid={!!error}/><button className="add-button" type="submit"><span aria-hidden="true">+</span> Add task</button></div>
        {error && <p id="input-error" className="input-error" role="alert">{error}</p>}
      </form>
      <div className="list-heading"><h2 id="list-heading">Your list <span className="total">{state.todos.length}</span></h2><span>{remaining} left to do</span></div>
      {state.todos.length===0?<div className="empty"><span className="empty-mark" aria-hidden="true">✓</span><h3>A fresh start.</h3><p>Add your first task. Small is a good place to begin.</p></div>:
        <ul className="todos">{state.todos.map(todo=><li key={todo.id} data-todo-id={todo.id} className={todo.completed?'done':''}>
          <label className="todo-label"><input type="checkbox" checked={todo.completed} onChange={()=>{setState(store.toggle(todo.id));setAnnouncement(todo.completed?'Task marked active.':'Task completed.');}}/><span className="task-text">{todo.text}</span><span className="sr-only">{todo.completed?' · completed':' · active'}</span></label>
          <button className="delete-button" type="button" aria-label={`Delete ${todo.text}`} onClick={()=>{setState(store.remove(todo.id));setAnnouncement('Task deleted.');input.current?.focus();}}><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 10v7m4-7v7"/></svg></button>
        </li>)}</ul>}
      <div className="list-footer"><p><span className={state.saved?'storage-dot':'storage-dot warning-dot'} aria-hidden="true"/>{state.saved?'Saved in this browser':'Not saved · this tab only'}</p><p>{completed} completed</p></div>
    </section>
    {state.message && <section className="storage-warning" aria-label="Storage warning"><h2>Keep this tab open</h2><p role="alert">{state.message}</p><button ref={resetButton} className="text-button" onClick={()=>setConfirmReset(true)}>Replace saved data with this list…</button>
      {confirmReset && <div className="reset-confirm" role="group" aria-labelledby="reset-heading"><h3 id="reset-heading">Replace previously saved data?</h3><p>This saves the list shown above in this browser. Previous saved data will be replaced.</p><div className="confirm-actions"><button ref={cancelButton} onClick={closeReset}>Cancel</button><button className="replace-button" onClick={()=>{setState(store.replaceSavedData());setConfirmReset(false);input.current?.focus();}}>Replace saved data</button></div></div>}
    </section>}
    <p className="page-footer">Your pace. Your list. <span>No account, no syncing.</span></p>
    <div className="sr-only" role="status" aria-live="polite">{announcement}</div>
  </main>;
}
