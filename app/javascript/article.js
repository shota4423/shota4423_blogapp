import { $ as jquery } from "jquery"
import axios from "axios"

import Rails from "@rails/ujs"

axios.defaults.headers.common['X-CSRF-Token'] = Rails.csrfToken()

window.$ = jquery

const handleHeartDisplay = (hasLiked) => {
  if (hasLiked) {
    $('.active-heart').removeClass('hidden')
  } else {
    $('.inactive-heart').removeClass('hidden')
  }
}

document.addEventListener('turbo:load', () => {
    if (!$('#article-show').length) return
    const dataset = $('#article-show').data()
    const articleId = dataset.articleId
    axios.get(`/articles/${articleId}/like`)
      .then((response) => {
        const hasLiked = response.data.hasLiked
        handleHeartDisplay(hasLiked)
      })

  $('.inactive-heart').on('click', () => {
    axios.post(`/articles/${articleId}/like`)
      .then((response) => {
        if (response.data.status === 'ok') {
            $('.active-heart').removeClass('hidden')
            $('.inactive-heart').addClass('hidden')
        }
      })
      .catch((e) => {
        window.alert('NG')
        console.log('ngngng')
      })
  })

  $('.active-heart').on('click', () => {
    axios.delete(`/articles/${articleId}/like`)
      .then((response) => {
        if (response.data.status === 'ok') {
            $('.inactive-heart').removeClass('hidden')
            $('.active-heart').addClass('hidden')
        }
      })
      .catch((e) => {
        window.alert('NG')
        console.log('ngngng')
      })
  })
})
