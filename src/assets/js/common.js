import { ElMessageBox } from 'element-plus'

export default {
  install(app, options) {
    app.provide('confirm_Pop', (message, success) => {
      ElMessageBox.confirm(message, 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          closeOnClickModal: false,
          type: 'warning',
          callback: (info) => {
            if (info === 'confirm') {
              success()
            }
          }
        }
      )
    })

    // app.config.globalProperties.confirm_Pop = (message, success) => {
    //   ElMessageBox.confirm(message, 'Warning', {
    //     confirmButtonText: 'OK',
    //     cancelButtonText: 'Cancel',
    //     closeOnClickModal: false,
    //     type: 'warning',
    //     callback: (info) => {
    //       if (info === 'confirm') {
    //         success()
    //       }
    //     }
    //   })
    // }
  }
}