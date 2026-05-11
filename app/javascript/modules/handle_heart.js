import { $ as jquery } from "jquery"
import axios from "modules/axios"

const listenInactiveHeartEvent = (articleId) => {
  $('.inactive-heart').on('click', () => {
  axios.post(`/api/articles/${articleId}/like`)
      .then((response) => {
      if (response.data.status === 'ok') {
          $('.active-heart').removeClass('hidden')
          $('.inactive-heart').addClass('hidden')
      }
      })
      .catch((e) => {
      window.alert('NG')
      console.log(e)
      })
  })
}

const listenActiveHeartEvent = (articleId) => {
  $('.active-heart').on('click', () => {
  axios.delete(`/api/articles/${articleId}/like`)
      .then((response) => {
      if (response.data.status === 'ok') {
          $('.inactive-heart').removeClass('hidden')
          $('.active-heart').addClass('hidden')
      }
      })
      .catch((e) => {
      window.alert('NG')
      console.log(e)
      })
  })
}

export {
  listenInactiveHeartEvent,
  listenActiveHeartEvent
}
