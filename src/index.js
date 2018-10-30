import './style.css'
import '@fortawesome/fontawesome-free/css/all.css'
import {dispatch} from './dispatch.js'
import Browser from './browser.js'
import Rest from './rest.js'
import Layout from './layout.js'
import Store from './store.js'
import NodeGraph from './nodeGraph.js'
import Config from './config.js'

const dispatcher = dispatch(IS_DEV,
  'search',
  'searchresult',
  'addNode',
  'loadNode',
  'loadClusterForAddress',
  'loadTags',
  'resultNode',
  'resultClusterForAddress',
  'selectNode',
  'applyTxFilters',
  'applyAddressFilters',
  'resultEgonet',
  'resultClusterAddresses',
  'initTransactionsTable',
  'loadTransactions',
  'resultTransactions'

)
const baseUrl = 'http://localhost:8000/btc'

let store = new Store()

let browser = new Browser(dispatcher, store)

let graph = new NodeGraph(dispatcher, store)

let config = new Config(dispatcher, graph)

let rest = new Rest(dispatcher, baseUrl)

let layout = new Layout(dispatcher, browser, graph, config)
document.body.append(layout.render())

if (module.hot) {
  module.hot.accept(['./browser.js', './browser/search.js', './browser/search.html', './browser/address.js', './browser/address.html'], () => {
    console.log('Updating browser module')
    dispatcher.on('.browser', null)
    browser = new Browser(dispatcher, store)
    layout.setBrowser(browser)
    dispatcher.replay('browser')
  })
  module.hot.accept(['./nodeGraph.js', './nodeGraph/layer.js', './nodeGraph/clusterNode.js'], () => {
    console.log('Updating graph module')
    dispatcher.on('.graph', null)
    graph = new NodeGraph(dispatcher, store)
    config = new Config(dispatcher, graph)
    layout.setGraph(graph)
    layout.setConfig(config)
    dispatcher.replay('graph')
  })
  module.hot.accept(['./config.js', './config/layout.html', './config/graph.html', './config/address.html', './config/cluster.html'], () => {
    console.log('Updating config module')
    dispatcher.on('.config', null)
    config = new Config(dispatcher, graph)
    layout.setConfig(config)
    dispatcher.replay('config')
  })
  module.hot.accept('./rest.js', () => {
    console.log('Updating rest module')
    rest = new Rest(dispatcher, baseUrl)
    dispatcher.replay('rest')
  })
}