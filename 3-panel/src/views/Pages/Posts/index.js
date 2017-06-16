import Component from '../../../helpers/Component'

import DekstopTable from './components/DekstopTable'
import MobileTable from './components/MobileTable'

export default class PostsPage extends Component {
  beforeRender () {
    this.postsData = [
      {
        id: 11,
        title: 'Post with style',
        author: 'Mikołaj Palkiewicz',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in neque turpis. Aenean tincidunt nunc nec ligula cursus iaculis. Pellentesque nisl nulla, malesuada a est a, tempor dapibus eros. Sed facilisis porta',
        date: '15.06.2017 13:02',
        avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
        likes: [],
        comments: [
          {
            author: 'Mikołaj Palkiewicz',
            userID: 1,
            content: 'Warto wiedzieć',
            date: '31.05.2017 18:14',
            avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281'
          }
        ],
        style: {
          background: '#2196F3',
          light: true,
          ripple: true
        }
      },
      {
        id: 10,
        title: 'Test',
        author: 'Mikołaj Palkiewicz',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in neque turpis. Aenean tincidunt nunc nec ligula cursus iaculis. Pellentesque nisl nulla, malesuada a est a, tempor dapibus eros. Sed facilisis porta auctor.',
        date: '14.04.2017 20:38',
        avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
        likes: [
          {
            userName: 'Mikołaj Palkiewicz',
            userID: 1
          },
          {
            userName: 'Eryk Rakowsky',
            userID: 15
          }
        ],
        comments: [
          {
            author: 'Mikołaj Palkiewicz',
            userID: 1,
            content: 'Lorem ipsum dolor sit amet',
            date: '31.05.2017 18:14',
            avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281'
          }
        ]
      },
      {
        id: 9,
        media: 'http://img11.deviantart.net/a66d/i/2015/109/3/b/forest_wallpaper_16_9_by_iorgudesign-d8qa67w.jpg',
        title: 'Test',
        author: 'Mikołaj Palkiewicz',
        content: 'Card with picture test',
        date: '14.04.2017 10:38',
        avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
        likes: [],
        comments: []
      },
      {
        id: 8,
        media: 'https://images.alphacoders.com/120/120313.jpg',
        title: 'Rain',
        author: 'Mikołaj Palkiewicz',
        content: 'Rainy day',
        date: '14.04.2017 9:45',
        avatar: 'https://images.alphacoders.com/120/thumb-1920-120313.jpg',
        likes: [],
        comments: []
      },
      {
        id: 7,
        title: 'HTML TAGS TEST',
        author: 'Mikołaj Palkiewicz',
        content: '<div id="tag-test-margin"></div><div id="tag-test"></div><style>#tag-test-margin {height:128px;} #tag-test{width:48px;height:48px;background-color:#2196f3;border-radius:100%;animation-name:tag-test-animation;animation-duration:2s;animation-iteration-count:infinite;animation-timing-function:ease-in-out;position:absolute;top:0;left:0;right:0;margin:0 auto;}</style><style>@keyframes tag-test-animation {0% {border-radius:100%;width:48px; height:48px;background-color:#2196f3;}25% {border-radius:0%;width:152px;height:152px;background-color:#90CAF9;}100%{border-radius:100%;width:48px;height:48px;background-color:#2196f3;}}</style>',
        date: '14.04.2017 8:07',
        avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
        likes: [],
        comments: []
      },
      {
        id: 6,
        title: 'Test 2',
        author: 'Mikołaj Palkiewicz',
        content: '6',
        date: '14.04.2017 10:38',
        avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
        likes: [],
        comments: []
      },
      {
        id: 5,
        title: 'Test 2',
        author: 'Mikołaj Palkiewicz',
        content: '6',
        date: '14.04.2017 10:38',
        avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
        likes: [],
        comments: []
      }
    ]
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Loads posts.
   */
  load = () => {
    const self = this
    const app = window.app
    const tables = this.elements.tables
    const desktopTable = this.elements.desktopTable
    const desktopTableRoot = desktopTable.getRoot()

    app.loadedPages.posts = true

    setTimeout(function () {
      app.togglePreloader(false)
      app.isLoading = false

      desktopTable.setCells(self.postsData)
      desktopTableRoot.style.display = 'block'

      tables.style.opacity = '1'
    }, 1000)
  }

  /**
   * Changes to list.
   */
  changeToList = () => {
    const self = this
    const app = window.app

    app.isTable = false

    const desktopTable = this.elements.desktopTable
    const desktopTableRoot = desktopTable.getRoot()

    const mobileTable = this.elements.mobileTable
    const mobileTableRoot = this.elements.mobileTable.getRoot()

    desktopTableRoot.style.display = 'none'
    setTimeout(function () {
      mobileTable.setCells(self.postsData)

      mobileTableRoot.style.display = 'block'
    }, 20)
  }

  /**
   * Changes to table.
   */
  changeToTable = () => {
    const self = this
    const app = window.app

    app.isTable = true

    const desktopTable = this.elements.desktopTable
    const desktopTableRoot = desktopTable.getRoot()

    const mobileTable = this.elements.mobileTable
    const mobileTableRoot = this.elements.mobileTable.getRoot()

    mobileTableRoot.style.display = 'none'
    setTimeout(function () {
      desktopTableRoot.style.display = 'block'
    }, 20)
  }

  render () {
    return (
      <div className='page page-posts' ref='root'>
        <div className='page-posts-tables' ref='tables'>
          <DekstopTable ref='desktopTable' />
          <MobileTable ref='mobileTable' />
        </div>
      </div>
    )
  }
}
