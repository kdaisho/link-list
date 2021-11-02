import List from './components/List'
import Header from './components/Header'
import { content } from './app.module.css'

function App() {
  return (
    <>
      <Header />
      <main className={content}>
        <List />
      </main>
    </>
  )
}

export default App
