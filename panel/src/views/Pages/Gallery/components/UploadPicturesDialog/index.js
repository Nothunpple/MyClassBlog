import Component from '../../../../../helpers/Component'
import DialogManager from '../../../../../helpers/DialogManager'

import Item from './components/Item'

import Preloader from '../../../../../imports/materialdesign/components/Preloader'

export default class UploadPicturesDialog extends Component {
  beforeRender () {
    this.input = null
    this.files = []
    this.items = []
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * Shows or hides dialog.
   * @param {Boolean}
   * @param {DOMElement} file input
   */
  toggle (flag, input) {
    const self = this
    const root = this.getRoot()

    const app = window.app

    app.toggleFAB(!flag)

    if (flag) {
      this.input = input
      this.files = []
      this.items = []

      this.elements.container.innerHTML = ''

      this.togglePreloader(true)

      let read = 0

      for (var i = 0; i < input.files.length; i++) {
        const file = input.files[i]
        const index = this.files.length

        this.files.push({
          fileName: file.name
        })

        let reader = new FileReader()

        reader.onload = function (e) {
          const src = e.target.result

          self.files[index].src = src

          read++
          if (read >= input.files.length) {
            for (var i = 0; i < self.files.length; i++) {
              self.addItem(self.files[i].fileName)
            }

            self.togglePreloader(false)

            setTimeout(function () {
              self.startUploading()
            }, 20)
          }
        }

        reader.readAsDataURL(file)
      }
    }

    DialogManager.toggleFullScreenDialog(flag, root)
  }

  /**
   * Starts uploading.
   */
  startUploading () {
    const self = this

    let index = 0

    function upload () {
      const item = self.items[index]
      const preloader = item.elements.preloader

      if (item.canceled) {
        index++

        if (index >= self.items.length) {
          self.onUpload()
        } else {
          upload()
        }
      } else {
        item.disableCancelIcon()

        self.upload('', function (progress) {
          preloader.setProgress(progress)
        }, function () {
          item.onUpload()
          index++

          if (index >= self.items.length) {
            self.onUpload()
          } else {
            upload()
          }
        })
      }
    }

    upload()
  }

  /**
   * On done uploading.
   */
  onUpload () {
    const app = window.app

    const gallery = app.getGalleryPage()
    const picturesDialog = gallery.elements.picturesDialog

    const index = gallery.categoriesData.indexOf((picturesDialog.toggled) ? picturesDialog.categoryData : gallery.clickedCategory.props.data)

    for (var i = 0; i < this.files.length; i++) {
      const src = this.files[i].src

      gallery.categoriesData[index].pictures.push(src)

      if (picturesDialog.toggled) {
        setTimeout(function () {
          picturesDialog.addPicture(src)
        }, (i + 1) * 10)
      }
    }

    if (index < 0) {
      console.log('Index is less than 0')
    }

    if (picturesDialog.toggled) picturesDialog.setPicturesCount()

    this.toggle(false)

    const snackbar = app.elements.addPicturesSnackbar

    snackbar.toggle(true)
    app.moveFAB(snackbar.getRoot().scrollHeight)
  }

  /**
   * Uploads image to server.
   * TODO.
   * @param {String} base 64
   * @param {Function} on progress
   * @param {Function} on upload
   */
  upload (src, onprogress, callback) {
    let progress = 0

    const timer = setInterval(function () {
      progress += 50

      onprogress(progress)

      if (progress >= 100) {
        clearInterval(timer)
        callback()
      }
    }, 200)
  }

  /**
   * Adds item.
   * @param {String} file name
   */
  addItem (fileName) {
    const element = (
      <Item fileName={fileName} getUploadPicturesDialog={() => { return this }} />
    )

    this.renderComponents(element, this.elements.container)
  }

  /**
   * Shows or hides preloader.
   * @param {Boolean}
   */
  togglePreloader (flag) {
    this.elements.preloader.getRoot().style.display = (flag) ? 'block' : 'none'
  }

  /**
   * Opens file input dialog.
   */
  triggerFileDialog = () => {
    this.elements.input.click()
  }

  onInputChange = (e) => {
    this.toggle(true, e.target)
  }

  render () {
    return (
      <div className='full-screen-dialog upload-pictures-dialog' ref='root'>
        <div className='upload-pictures-dialog-container' ref='container' />
        <Preloader className='upload-pictures-preloader' ref='preloader' />
        <input className='input' ref='input' type='file' name='pic' accept='image/*' onChange={this.onInputChange} multiple='true' />
      </div>
    )
  }
}
