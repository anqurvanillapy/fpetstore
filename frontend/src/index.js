import React from 'react'
import ReactDom from 'react-dom'
import App from './App'

const app = React.createElement(App)
ReactDom.render(app, document.getElementById('app'))
