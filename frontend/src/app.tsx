import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './app.css'

export function App() {
  const [count, setCount] = useState(0)

  // Sample notes data
  const notes = [
    { id: 1, title: 'First Note', content: 'This is the first note.' },
    { id: 2, title: 'Second Note', content: 'This is the second note.' },
    { id: 3, title: 'Third Note', content: 'This is the third note.' },
  ]

  return (
    <>
      <section id="center">
        <div class="hero">
          <img src={heroImg} class="base" width="170" height="179" alt="" />
          <img src={preactLogo} class="framework" alt="Preact logo" />
          <img src={viteLogo} class="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Notes Application</h1>
          <p>
            Edit <code>src/app.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button class="counter" onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
      </section>

      <div class="ticks"></div>

      <section id="notes">
        <h2>Notes</h2>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="next-steps">
        <div id="docs">
          <svg class="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img class="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://preactjs.com/" target="_blank">
                <img class="button-icon" src={preactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}
