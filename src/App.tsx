
import { HashRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Layout from './components/Layout'
import ContentPage from './pages/ContentPage'
import About from './pages/About'
import Feedback from './pages/Feedback'
import SimpleGenerator from './pages/SimpleGenerator'

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generator" element={<SimpleGenerator />} />
          <Route path="/content/:category" element={<ContentPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}
