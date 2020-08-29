import React, { useState } from 'react'

import './App.css'
import useAuthStore from './useAuthStore'
import useTodoListStore from './useTodoListStore'
import { PersistGate } from '../lib/PersistGate'
import { purge } from '../lib/configurePersist'

function App() {
  const {
    user,
    isAuthenticated,
    isAuthenticating,
    logout,
    login,
  } = useAuthStore()

  const { data, create, update, remove } = useTodoListStore()

  const [text, setText] = useState('')

  return (
    <PersistGate>
      <div className='App'>
        {isAuthenticated ? (
          <div className='group'>
            <div>{user?.email}</div>
            <div>{user?.name}</div>
            <button onClick={logout}>Log out</button>
          </div>
        ) : (
          <div className='group'>
            <button onClick={login} disabled={isAuthenticating}>
              {isAuthenticating ? 'Logging in' : 'Log in'}
            </button>
          </div>
        )}
        <div
          className='group'
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          <input
            style={{
              width: 200,
              fontSize: 18,
              padding: 24,
              marginRight: 8,
            }}
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <button
            onClick={() => {
              setText('')
              create({
                text,
                completed: false,
                date: new Date().toISOString(),
              })
            }}>
            Create
          </button>
          <button onClick={() => purge()}>clear all</button>
        </div>

        {data.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 4,
            }}>
            <div
              style={{
                width: 100,
                marginRight: 8,
                height: '100%',
                fontSize: 18,
                marginBottom: 4,
              }}>
              {item.text}
            </div>
            <button onClick={() => remove(item.id)}>Remove</button>
            <button
              onClick={() =>
                update(item.id, {
                  ...item,
                  completed: !item.completed,
                })
              }>
              {item.completed ? 'Completed' : 'Undone'}
            </button>
          </div>
        ))}
      </div>
    </PersistGate>
  )
}

export default App
