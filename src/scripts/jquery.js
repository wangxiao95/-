import $ from 'jquery'

const config = {
  online: process.env.NODE_ENV === 'development' ? 1 : 2,
}

$.baseURI = function (url) {
  return (config.online === 1 ? 'http://bhxz.net:18007/' : '/chart/') + url;
}

$.ajaxSetup({
  contentType: 'application/json',
  error(xhr,status,error) {

  }
})

export default $
