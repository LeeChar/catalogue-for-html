import $ from 'jquery';

const id = (new Date()).getTime();

// 目录容器
const wrapper = $('<div></div>').css({
  height: '100vh',
  overflow: 'scroll'
});

// 根容器
const container = $(`<div id=${id}></div>`).css({
  position: 'fixed',
  right: -330,
  top: 0,
  width: 300,
  height: '100%',
  padding: 10,
  backgroundColor: '#fff',
  boxShadow: '0 0 5px 5px #eee'
}).append(wrapper);

$(document).scroll(() => {
  console.log(1);
});

export { container, wrapper, id };