import Table from './table.js'

export default class TagsTable extends Table {
  constructor (dispatcher, index, nodeId, nodeType) {
    super(dispatcher, index, 5000)
    this.nodeId = nodeId
    this.nodeType = nodeType
    this.columns = [
      { name: 'Tag',
        data: 'tag'
      },
      { name: 'Tag URI',
        data: 'tagUri'
      },
      { name: 'Description',
        data: 'description'
      },
      { name: 'Actor Category',
        data: 'actorCategory'
      },
      { name: 'Source',
        data: 'source'
      },
      { name: 'Timestamp',
        data: 'timestamp'
      }
    ]
    this.loadMessage = 'loadTags'
    this.resultMessage = 'resultTags'
    this.resultField = 'tags'
    this.loadParams = [this.nodeId, this.nodeType]
  }
  isSmall () {
    return true
  }
}