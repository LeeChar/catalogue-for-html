import $ from 'jquery';
import icon from './icon';
import { container, wrapper, id } from './container';

const catalogueForHtml = () => {
  if ($(`#${id}`).length) return false; // 防止重复创建

  let moving = false;

  // 菜单显示隐藏的按钮
  const trigger = $(icon).css({
    position: 'absolute',
    top: 10,
    left: -50,
    cursor: 'pointer'
  }).on('click', function () {
    if (moving) return false;
    moving = true;

    let opened = parseFloat(container.css('right')) === -330;

    container.animate({
      right: opened ? 0 : -330
    }, 'fast', () => {
      moving = false;
    });
  });

  $('html').append(container);

  // 生成目录 html 代码
  let titles = '';
  $('body').find('h1, h2, h3, h4, h5, h6').each((i, item) => {
    // 获取标题级别
    const level = +(item.tagName[1]);

    const style = `
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    cursor:pointer;
    color: gray;
    font-weight: normal;
    font-size:${16 - level / 2}px;
    text-indent: ${level * 12}px;
    `;

    const text = item.innerText.replace(/[\r\n]/g, '');
    if (text !== '') titles += `<h${level} style="${style}">${item.innerText}</h${level}>`;
  });

  // 插入目录到容器里，并绑定锚点
  wrapper.append(trigger, $(titles)).find('h1, h2, h3, h4, h5, h6').each((i, item) => {
    const level = +(item.tagName[1]);
    $(item).on('click', () => {
      $('body').find(`h${level}:contains('${item.innerText}')`)[0].scrollIntoView({ behavior: 'instant' }); //  smooth 可以平滑滚动
    });
  });

  $('body').on('click', function () {
    container.animate({
      right: -330
    }, 'fast', function () {
      moving = false;
    });
  });

};

export default catalogueForHtml;
