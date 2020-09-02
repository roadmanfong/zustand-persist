import React, { useState } from 'react'

import './App.css'
import useAuthStore from './stores/useAuthStore'
import useTodoListStore from './stores/useTodoListStore'
import { PersistGate } from '../../lib'
import { purge } from './utils/persist'

function App() {
  const {
    user,
    isAuthenticated,
    isAuthenticating,
    logout,
    login,
  } = useAuthStore()

  const { data, create, update, remove, clear } = useTodoListStore()

  const [text, setText] = useState('')
  const onSubmit = () => {
    create({
      text,
      completed: false,
      date: new Date().toISOString(),
    })
    setText('')
  }

  return (
    <PersistGate>
      <div className="App">
        <div className="section">
          <div className="auth">
            {isAuthenticated ? (
              <React.Fragment>
                <button onClick={logout}>Logout</button>
                <div>
                  {user?.name} {user?.email}
                </div>
              </React.Fragment>
            ) : (
              <button onClick={login} disabled={isAuthenticating}>
                {isAuthenticating ? 'loading...' : 'Login'}
              </button>
            )}
          </div>
        </div>
        <div className="section">
          <button
            onClick={() => {
              clear()
              purge()
            }}>
            clear
          </button>
        </div>
        <div className="section">
          <form
            className="todo-item new"
            onSubmit={(event) => {
              event.preventDefault()
              onSubmit()
            }}>
            <input
              type="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <input type="submit" />
          </form>

          {data.map((item, index) => (
            <div
              key={index}
              className={`todo-item ${item.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                onClick={() => {
                  update(item.id, {
                    ...item,
                    completed: !item.completed,
                  })
                }}
                id={`checkbox-${index}`}
              />
              <label className="todo-item-text" htmlFor={`checkbox-${index}`}>
                {item.text}
              </label>
              <button onClick={() => remove(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </PersistGate>
  )
}

export default App
