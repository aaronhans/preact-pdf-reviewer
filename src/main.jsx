import { render } from 'preact'
import { App } from './app.jsx'

// Import Web Awesome styles and components
import '@awesome.me/webawesome/dist/styles/themes/default.css'
import '@awesome.me/webawesome/dist/styles/webawesome.css'
import '@awesome.me/webawesome/dist/styles/utilities.css'
import '@awesome.me/webawesome/dist/components/button/button.js'
import '@awesome.me/webawesome/dist/components/input/input.js'
import '@awesome.me/webawesome/dist/components/card/card.js'

// Import custom styles
import './styles.css'

render(<App />, document.getElementById('app'))