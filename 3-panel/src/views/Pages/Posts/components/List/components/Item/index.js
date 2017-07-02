import Component from '../../../../../../../helpers/Component'

import Cell from './components/Cell'

export default class Item extends Component {
  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Gets item.
   */
  getItem = () => {
    return this
  }

  render () {
    return (
      <div className='posts-table-list-item'>
        <Cell getMobileTable={this.props.getMobileTable} getItem={this.getItem} title='AKCJA' isAction='true' />
        <Cell getMobileTable={this.props.getMobileTable} getItem={this.getItem} title='ID' ref='id' />
        <Cell getMobileTable={this.props.getMobileTable} getItem={this.getItem} title='AUTOR' ref='author' />
        <Cell getMobileTable={this.props.getMobileTable} getItem={this.getItem} title='DATA' ref='date' />
        <Cell getMobileTable={this.props.getMobileTable} getItem={this.getItem} title='KOMENTARZE' ref='comments' />
        <Cell getMobileTable={this.props.getMobileTable} getItem={this.getItem} title='POLUBIENIA' ref='likes' />
        <Cell getMobileTable={this.props.getMobileTable} getItem={this.getItem} title='ZDJĘCIE' className='picture' ref='picture' />
        <Cell getMobileTable={this.props.getMobileTable} getItem={this.getItem} title='TYTUŁ' ref='title' />
        <Cell getMobileTable={this.props.getMobileTable} getItem={this.getItem} title='TREŚĆ' ref='content' />
      </div>
    )
  }

  afterRender () {
    const data = this.props.data

    this.elements.id.setText(data.id)
    this.elements.author.setText(data.author)
    this.elements.date.setText(data.date)
    this.elements.comments.setText(data.comments.length)
    this.elements.likes.setText(data.likes.length)
    this.elements.picture.setText((data.media != null) ? '<img src="' + data.media + '" >' : '')
    this.elements.title.setText(data.title)
    this.elements.content.setText(data.content)
  }
}
