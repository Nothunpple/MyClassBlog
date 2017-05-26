import React from 'react'

import Post from './components/Post'

import MaterialButton from '../../../imports/materialdesign/components/MaterialButton'

export default class PostsTab extends React.Component {
  constructor () {
    super()

    this.state = {
      left: 0,
      display: 'none',
      defaultLeft: 0,
      posts: []
    }

    this.root = null

    this.postsObjects = []

    this.isFullScreen = false

    this.focusedPost = null

    this.loadPostsButton = null
  }

  componentDidMount () {
    this.root.addEventListener('scroll', this.onScroll)
    this.loadPostsButton = this.refs.loadPostsButton.refs.button
    this.loadPostsButton.style.display = 'block'
  }

  /**
   * Gets root.
   * @param {DomElement}
   */
  getRoot = () => {
    return this.root
  }

  /**
   * Loads posts.
   */
  loadPosts = () => {
    var self = this

    this.props.getApp().setState({
      dataPreloaderVisible: true
    })
    this.props.getApp().selected.posts = true

    setTimeout(function () {
      self.props.getApp().canSelectTab = false
    }, 50)

    // TODO: make request
    setTimeout(function () {
      self.props.getApp().setState({
        dataPreloaderVisible: false
      })
      self.props.getApp().canSelectTab = true
      this.canSelectTab = false
      setTimeout(function () {
        self.setState({
          postsOpacity: 1,
          posts: [
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
                  date: '14.04.2017 18:49',
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
            }
          ]
        })
      }, 1)
    }, 1000)
  }

  /**
   * Chechs that logged user likes the post
   * @param {Object} post likes data.
   * @return {Boolean}
   */
  isLikes = (data) => {
    const app = this.props.getApp()

    if (app.accountInfo) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].userID === app.accountInfo.userID) {
          return true
        }
      }
    }
    return false
  }

  getPostsTab = () => {
    return this
  }

  /**
   * Shows full screen post.
   * @param {DOMElement} post object.
   * @param {Object} post data.
   */
  enterFullScreen = (post, data) => {
    const self = this
    const app = this.props.getApp()
    var toolbar = app.getToolBar()
    const posts = this.postsObjects

    this.focusedPost = post

    if (this.isFullScreen === false) {
      this.isFullScreen = null
      for (var p = 0; p < posts.length; p++) {
        const main = posts[p]
        const object = main.refs.post

        if (object !== post) {
          object.style.height = object.scrollHeight + 'px'

          setTimeout(function () {
            object.style.height = '0px'

            setTimeout(function () {
              post.style.maxWidth = '100%'
              post.style.marginTop = '0px'
            }, 100)
            setTimeout(function () {
              object.style.display = 'none'
              self.isFullScreen = true
            }, 250)
          }, 10)
        } else {
          main.refs.content.style.userSelect = 'auto'
          main.ripple = false
        }
      }

      this.loadPostsButton.style.display = 'none'

      toolbar.refs.menuIcon.changeToArrow()

      var toolBarItems = app.state.toolbarItems
      var toolBarTitleIndex = 0

      // Get title index.
      for (var i = 0; i < toolBarItems.length; i++) {
        if (toolBarItems[i].type === 'Title') {
          toolBarTitleIndex = i
          break
        }
      }

      // Change title.
      toolBarItems[toolBarTitleIndex].title = data.title
      app.setState({
        toolbarItems: toolBarItems,
        tabLayoutHidden: true
      })

      // Hide tabbar.
      toolbar.setState({
        height: 64
      })
    }
  }

  /**
   * Hides full screen post.
   */
  exitFullScreen = () => {
    const self = this
    const app = this.props.getApp()
    var toolbar = app.getToolBar()
    const posts = this.postsObjects
    const post = this.focusedPost

    if (this.isFullScreen === true) {
      this.isFullScreen = null

      post.style.maxWidth = '550px'
      setTimeout(function () {
        for (var p = 0; p < posts.length; p++) {
          const main = posts[p]
          const object = main.refs.post

          if (object !== post) {
            object.style.display = 'block'
            setTimeout(function () {
              object.style.height = object.scrollHeight + 'px'
              post.style.marginTop = '32px'

              self.isFullScreen = false
              setTimeout(function () {
                object.style.height = 'auto'
                self.focusedPost.scrollIntoView({
                  block: 'end',
                  behavior: 'smooth'
                })
                self.loadPostsButton.style.display = 'block'
              }, 200)
            }, 10)
          } else {
            main.ripple = true
            main.refs.content.style.userSelect = 'none'
          }
        }
      }, 100)

      toolbar.refs.menuIcon.changeToDefault()

      var toolBarItems = app.state.toolbarItems
      var toolBarTitleIndex = 0

      // Get title index.
      for (var i = 0; i < toolBarItems.length; i++) {
        if (toolBarItems[i].type === 'Title') {
          toolBarTitleIndex = i
          break
        }
      }

      // Change title.
      toolBarItems[toolBarTitleIndex].title = app.props.toolbarTitle

      app.setState({
        toolbarItems: toolBarItems,
        tabLayoutHidden: false
      })

      // Hide tabbar.
      toolbar.setState({
        height: 128
      })
    }
  }

  /**
   * On posts tab scroll event.
   */
  onScroll = () => {
    console.log(isVisible(this.loadPostsButton))
  }

  render () {
    var self = this
    function onRest () {
      if (!self.isVisible) {
        self.setState({display: 'none'})
      }
    }

    // Styles.
    var index = -1
    return (
      <div className='posts-tab tab-page' ref={(t) => { this.root = t }}>
        <div className='posts'>
          {
            this.state.posts.map((data, i) => {
              index++
              return <Post key={i} data={data} index={index} getApp={this.props.getApp} isLikes={this.isLikes} getPostsTab={this.getPostsTab} enterFullScreen={this.enterFullScreen}>{data.content}</Post>
            })
          }
        </div>
        <MaterialButton ref='loadPostsButton' className='loadPosts'>
          ZAŁADUJ WIĘCEJ
        </MaterialButton>
      </div>
    )
  }
}
