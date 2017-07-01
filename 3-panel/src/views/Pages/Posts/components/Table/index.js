import Component from '../../../../../helpers/Component'

import Cell from './components/Cell'

export default class Table extends Component {
  beforeRender () {
    this.cells = []
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Gets desktop table.
   * @return {DekstopTable}
   */
  getDesktopTable = () => {
    return this
  }

  /**
   * Sets cells.
   * @param {Object} posts.
   */
  setCells = (posts) => {
    const tbody = this.elements.tbody

    for (var i = 0; i < posts.length; i++) {
      const cell = (
        <Cell data={posts[i]} getDesktopTable={this.getDesktopTable} />
      )

      this.renderComponents(cell, tbody)
    }
  }

  render () {
    return (
      <table className='material-table' ref='root'>
        <thead>
          <tr>
            <th />
            <th>
              ID
            </th>
            <th>
              Autor
            </th>
            <th>
              Data
            </th>
            <th>
              Komentarze
            </th>
            <th>
              Polubienia
            </th>
            <th>
              Tytuł
            </th>
            <th>
              Treść
            </th>
            <th />
          </tr>
        </thead>
        <tbody ref='tbody' />
      </table>
    )
  }
}
