import Vue from 'vue';
class ZoomUpDirective {
  constructor(el, binding) {
    this.originRect = {};
    this.timer = null;
    this.bottomTables = null;
    this.bind(el, binding);
  }

  bind(el, binding) {
    // 获取元素原始位置
    setTimeout(() => {
      const rect = el.getBoundingClientRect();
      for (let key in rect) {
        if (key === 'toJSON') continue;
        this.originRect[key] = rect[key];
      }
      if (binding && binding.arg === 'table-visible' && !binding.value) {
        this.bottomTables = document.querySelectorAll('.bottom-content .el-table');
      }
    }, 300);

    // 当屏幕大小发生变化时，取消放大效果
    window.addEventListener('resize', () => {
      const mask = document.querySelector('.mask');
      mask && mask.dispatchEvent(new Event('click'), {
        bubbles: false
      });
    });

    this.generateClickToCenterBtn(el, binding);
  }

  // 生成点击按钮
  generateClickToCenterBtn(el, binding) {
    el.style.position = 'relative';
    let mask = null;
    const createButton = () => {
      const button = document.createElement('button');
      button.classList.add('el-icon-zoom-in');
      button.style = `
        position: absolute;
        bottom: 10px;
        right: 10px;
        width: 30px;
        color: #fff;
        height: 30px;
        border: none;
        display: none;
        font-size: 20px;
        cursor: pointer;
        border-radius: 50%;
        transition: all 0.1s;
        background-color: rgba(0, 0, 0, 0.5);
      `;
      button.addEventListener('mouseenter', () => {
        button.style.color = '#1AB9EA';
        button.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
      });
      button.addEventListener('mouseleave', () => {
        button.style.color = '#fff';
        button.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      });
      return button;
    }

    const handleCloseClick = (e) => {
      el.style.zIndex = 'auto';

      this.bottomTables && [...this.bottomTables].forEach(table => table.classList.remove('is-header-transparent'));
      this.bottomTables = null;

      setTimeout(() => {
        mask.style.opacity = 0;
        el.style.left = 0 + 'px';
        el.style.top = 0 + 'px';
        el.style.transform = `scale(1)`;
        el.style.boxShadow = 'rgb(14 101 187) 0px 0px 40px inset';
        if (binding && binding.modifiers && binding.modifiers.normalShadow) {
          el.style.boxShadow = 'initial';
        };
        const canvas = document.querySelector('.line-canvas');
        canvas && document.body.removeChild(canvas);
      }, 0);

      setTimeout(() => {
        el.parentElement && el.parentElement.querySelector('.mask') && el.parentElement.removeChild(mask);
      }, 300);
    }

    const handleButtonClick = () => {
      button.style.display = 'none';
      mask = document.createElement('div');
      mask.classList.add('mask');
      mask.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        z-index: 9999;
        background-color: rgba(0, 0, 0, 0.5);
        transition: opacity 0.3s ease-in-out;
      `;
      el.parentElement.appendChild(mask);

      const rect = el.getBoundingClientRect();
      const [scaleWidth, scaleHeight] = [window.innerWidth / 2560, window.innerHeight / 1440];
      const [elOffsetLeft, elOffsetTop] = [el.offsetLeft || el.parentElement.offsetLeft, el.offsetTop || el.parentElement.offsetTop];
      const [diffX, diffY] = [(window.innerWidth - rect.width) / 2 / scaleWidth - elOffsetLeft, (window.innerHeight - rect.height) / 2 / scaleHeight - elOffsetTop];

      el.style.cssText += `
        position: relative;
        top: 0px;
        left: 0px;
        z-index: 99999;
        transition: all 0.3s ease-in-out;
      `;

      this.bottomTables && [...this.bottomTables].forEach(table => table.classList.add('is-header-transparent'));

      setTimeout(() => {
        mask.style.opacity = 1;
        el.style.left = diffX + 'px';
        el.style.top = diffY + 'px';
        if (binding && binding.value && binding.value.scaleDisabled) return;
        el.style.transform = `scale(1.35)`;
        el.style.boxShadow = 'rgb(14 101 187) 0px 0px 40px inset,rgb(14 101 187) 0px 0px 20px';
        el.addEventListener('transitionend', () => {
          if (el.style.transform === 'scale(1.35)') {
            this.generateCanvas(el, binding);
          }
        });
      }, 0);

      mask.addEventListener('click', handleCloseClick);
    }

    const handleMouseEnter = () => {
      if (!el.parentElement.querySelector('.mask')) {
        button.style.display = 'block';
        button.style.pointerEvents = 'none'; // 禁用按钮
        setTimeout(() => {
          const rect = el.getBoundingClientRect();
          for (let key in rect) {
            if (key === 'toJSON') continue;
            this.originRect[key] = rect[key];
          }
          button.style.pointerEvents = 'auto'; // 启用按钮
          if (binding && binding.arg === 'table-visible' && !binding.value) {
            this.bottomTables = document.querySelectorAll('.bottom-content .el-table');
          }
        }, 300);
      }
    }

    const handleMouseLeave = () => {
      button.style.display = 'none';
    }

    const button = createButton();
    button.addEventListener('click', handleButtonClick);

    el.appendChild(button);
    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);
  }

  // 生成canvas
  generateCanvas(el, binding) {
    const rect = el.getBoundingClientRect();
    const {
      left,
      right,
      top,
      bottom
    } = this.originRect;
    const originalPoint = {
      topLeft: [left, top],
      topRight: [right, top],
      bottomLeft: [left, bottom],
      bottomRight: [right, bottom],
    };
    const {
      left: targetLeft,
      right: targetRight,
      top: targetTop,
      bottom: targetBottom
    } = rect;
    const targetPoint = {
      topLeft: [targetLeft, targetTop],
      topRight: [targetRight, targetTop],
      bottomLeft: [targetLeft, targetBottom],
      bottomRight: [targetRight, targetBottom],
    };

    let canvas = document.querySelector('.line-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.classList.add('line-canvas');
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.zIndex = '9998';
    }

    const ctx = canvas.getContext('2d');
    const body = document.body;
    canvas.width = body.clientWidth;
    canvas.height = body.clientHeight;
    this.drawRect(ctx, originalPoint, targetPoint);
    body.appendChild(canvas);

    canvas.addEventListener('click', () => {
      body.querySelector('.line-canvas') && body.removeChild(canvas);
      const mask = document.querySelector('.mask');
      mask.dispatchEvent(new Event('click'), {
        bubbles: false
      });
    });
  }

  // 绘制矩形轮廓线和边缘线
  drawRect(ctx, originalPoint, targetPoint) {
    const scale = window.innerWidth / 2560;
    // 绘制原始位置矩形的边框
    ctx.beginPath();
    ctx.moveTo(...originalPoint.topLeft);
    ctx.lineTo(...originalPoint.topRight);
    ctx.lineTo(...originalPoint.bottomRight);
    ctx.lineTo(...originalPoint.bottomLeft);
    ctx.closePath();
    ctx.lineWidth = 3 * scale;
    ctx.strokeStyle = '#1989fa';
    ctx.shadowBlur = 15 * scale;
    ctx.shadowColor = '#fff';
    ctx.setLineDash([10 * scale, 2 * scale]);
    ctx.stroke();
    this.drawRectInLine(ctx, originalPoint);

    // 绘制起点和终点四个角的连线
    this.drawLine(ctx, originalPoint.topLeft, targetPoint.topLeft);
    this.drawLine(ctx, originalPoint.topRight, targetPoint.topRight);
    this.drawLine(ctx, originalPoint.bottomLeft, targetPoint.bottomLeft);
    this.drawLine(ctx, originalPoint.bottomRight, targetPoint.bottomRight);

    // 绘制目标位置矩形的边框
    ctx.beginPath();
    ctx.moveTo(...targetPoint.topLeft);
    ctx.lineTo(...targetPoint.topRight);
    ctx.lineTo(...targetPoint.bottomRight);
    ctx.lineTo(...targetPoint.bottomLeft);
    ctx.closePath();

    // 绘制线条和边缘阴影效果
    ctx.lineWidth = 3 * scale;
    ctx.strokeStyle = '#1989fa';
    ctx.shadowBlur = 15 * scale;
    ctx.shadowColor = '#fff';
    ctx.stroke();
  }

  // 绘制线条
  drawLine(ctx, startPoint, endPoint) {
    const scale = window.innerWidth / 2560;
    ctx.beginPath();
    ctx.moveTo(...startPoint);
    ctx.lineTo(...endPoint);
    ctx.closePath();
    ctx.lineWidth = 3 * scale;
    ctx.strokeStyle = '#1989fa';
    ctx.shadowBlur = 15 * scale;
    ctx.shadowColor = '#fff';
    ctx.stroke();
  }

  // 在线条内部绘制 10*10 的矩形
  drawRectInLine(ctx, originalPoint) {
    const scale = window.innerWidth / 2560;
    const off = 3 * scale; // 初始偏差
    const startPt = [originalPoint.topLeft[0] + off, originalPoint.topLeft[1] + off]; // 画矩形的起点
    const size = 10 * scale; // 一个矩形的大小
    const gap = 2 * scale; // 矩形之间的间隔
    const rows = Math.round((originalPoint.bottomLeft[1] - originalPoint.topLeft[1]) / (size + gap)); // 行数
    const cols = Math.round((originalPoint.topRight[0] - originalPoint.topLeft[0]) / (size + gap)); // 列数
    ctx.shadowBlur = 0;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        ctx.fillStyle = Math.random() > 0.5 ? '#1d4aab' : '#132f6e';
        const x = startPt[0] + j * (size + gap);
        const y = startPt[1] + i * (size + gap);
        let rectSizeX = size;
        let rectSizeY = size;

        if (j === cols - 1) {
          rectSizeX = Math.max(originalPoint.topRight[0] - x - off, 0);
        }

        if (i === rows - 1) {
          rectSizeY = Math.max(originalPoint.bottomLeft[1] - y - off, 0);
        }

        ctx.fillRect(x, y, rectSizeX, rectSizeY);
      }
    }
  }
}

Vue.directive('zoom-up', {
  bind(el, binding) {
    new ZoomUpDirective(el, binding);
  }
});
