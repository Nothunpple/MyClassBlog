import Component from '../../../../../helpers/Component'
import CategoryDialog from '../../../../../helpers/CategoryDialog'

import Dialog from '../../../../../imports/materialdesign/components/Dialog'

import TextField from '../../../../../imports/materialdesign/components/TextField'
import Preloader from '../../../../../imports/materialdesign/components/Preloader'

export default class EditCategoryDialog extends Component {
  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * Shows dialog.
   */
  show (data) {
    this.categoryNameTextField.setValue(data.name)

    this.elements.dialog.toggle(true)
  }

  /**
   * Sets dialog action buttons.
   */
  setDialogItems () {
    const dialog = this.elements.dialog

    const items = [
      {
        text: 'ZAPISZ',
        onClick: this.onSaveButtonClick
      },
      {
        text: 'ANULUJ',
        onClick: function () {
          dialog.toggle(false)
        }
      }
    ]

    dialog.setItems(items)
  }

  /**
   * On dialog action button save category click event.
   * @param {Event}
   */
  onSaveButtonClick = (e) => {
    CategoryDialog.checkForErrors(this, function (error, title) {
      if (!error) {
        const app = window.app

        const gallery = app.getGalleryPage()

        const clickedCategory = gallery.clickedCategory
        const categoriesData = gallery.categoriesData

        const index = categoriesData.indexOf(clickedCategory.props.data)

        if (index < 0) {
          console.log('Index is less than 0')
        } else {
          const snackbar = app.elements.editedCategorySnackbar

          snackbar.toggle(true)

          categoriesData[index].name = title

          clickedCategory.elements.title.innerHTML = title
        }
      }
    })
  }

  render () {
    return (
      <div className='category-dialog' ref='root'>
        <Dialog title='Edytuj kategorię' ref='dialog'>
          <TextField ref={(e) => this.categoryNameTextField = e} hint='Nazwa' helperText='*Wymagane' maxLength={30} />
          <Preloader ref={(e) => this.preloader = e} />
        </Dialog>
      </div>
    )
  }

  afterRender () {
    this.setDialogItems()
  }
}
