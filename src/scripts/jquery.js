import $ from 'jquery'

const config = {
  online: 1,
}

$.baseURI = function (url) {
  return (config.online === 1 ? 'http://bhxz.net:18007/' : '') + url;
}

$.ajaxSetup({
  contentType: 'application/json',
  error(xhr,status,error) {

  }
})

export default $
