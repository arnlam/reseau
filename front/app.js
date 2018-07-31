const express = require('express')
const path = require('path')
const history = require('connect-history-api-fallback')
var morgan = require('morgan')
const csp = require('express-csp-header');


const app = express()
const staticFileMiddleware = express.static(path.join(__dirname+ '/dist'))
morgan(':method :url :status :res[content-length] - :response-time ms')

app.use(staticFileMiddleware)
app.use(history())
app.use(staticFileMiddleware)

app.use(csp({
    policies: {
        'default-src': [csp.SELF],
        'script-src': [csp.SELF, csp.INLINE, 'somehost.com'],
        'style-src': [csp.SELF, 'mystyles.net'],
        'img-src': ['data:', 'images.com'],
        'worker-src': [csp.NONE],
        'block-all-mixed-content': true
    }
}));
app.get('/', function (req, res) {
  res.render(path.join(__dirname + '/dist/index.html'))
})

app.listen(80, function () {
  console.log( 'Express serving on 80!' )
})