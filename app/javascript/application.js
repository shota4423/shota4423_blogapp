// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

import "trix"
import "@rails/actiontext"

import { $ as jquery } from "jquery"
import axios from "axios"

window.$ = jquery

document.addEventListener('turbo:load', () => {
    const dataset = $('#article-show').data()
    const articleId = dataset.articleId
    axios.get(`/articles/${articleId}/like`)
      .then((response) => {
        console.log(response)
      })
})
