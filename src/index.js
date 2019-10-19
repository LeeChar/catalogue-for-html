import $ from 'jquery';
import icon from './trigger';

let id = 'test';

function catalogueForHtml() {
  if ($(`#${id}`).length) return false; // 防止重复创建

  let moving = false;

  const trigger = $(icon).css({
    fontSize: 12,
    color: 'blue',
    position: 'absolute',
    left: -40,
    cursor: 'pointer'
  }).on('click', function () {
    if (moving) return false;
    moving = true;

    let opened = $(this).hasClass('opened');
    if (opened) {
      $(this).removeClass('el-icon-s-unfold opened').addClass('el-icon-s-fold');
    } else {
      $(this).addClass('el-icon-s-unfold opened').removeClass('el-icon-s-fold');
    }

    container.animate({
      right: opened ? -300 : 0
    }, 'fast', () => {
      moving = false;
    });
  });

  const container = $(`<div id=${id}></div>`).css({
    position: 'fixed',
    right: -310,
    top: 0,
    width: 300,
    backgroundColor: '#fff',
    boxShadow: '0 0 5px 5px #eee'
  }).append(trigger);


  $('html').append(container);

  // 生成目录 html 代码
  let titles = '';
  $('body').find('h1, h2, h3, h4, h5, h6').each((i, item) => {
    const level = +(item.tagName[1]);
    titles += `<h${level} style="cursor:pointer; color: #7765ff;font-size:${16 + level * 1 / 2}px;text-indent: ${level * 12}px;">${item.innerText}</h${level}>`;
  });

  // 插入目录到容器里，并绑定锚点
  container.append($(titles)).find('h1, h2, h3, h4, h5, h6').each((i, item) => {
    const level = +(item.tagName[1]);
    $(item).on('click', () => {
      $('body').find(`h${level}:contains('${item.innerText}')`)[0].scrollIntoView({ behavior: 'smooth' });
    });
  });


  $('body').on('click', function () {
    container.animate({
      right: -300
    }, 'fast', function () {
      trigger.removeClass('el-icon-s-unfold opened').addClass('el-icon-s-fold');
      moving = false;
    });
  });
}

export default catalogueForHtml;
