const fs = require('fs');

const pluginName = 'ApiClean';
const rowSymbol = '\n';
const regx1 = /(?<=const ).*(?= = `)/g;
const regx2 = /(?<=const ).*(?= = ')/g;

const getRowKey = (rowStr) => {
  if (rowStr.match(regx1)) {
    return rowStr.match(regx1)[0];
  }

  if (rowStr.match(regx2)) {
    return rowStr.match(regx2)[0];
  }

  return '';
};

const getRowKeys = (fileStr) => {
  const api1 = fileStr.match(regx1) || [];
  const api2 = fileStr.match(regx2) || [];
  return api1.concat(api2);
};

class ApiClean {
  constructor(options) {
    this.options = options;
    this.fileRows = [];
    this.apiArray = [];
  }

  apply(compiler) {
    console.warn('api clean=======================================start');
    const { fileSrc } = this.options;

    fs.readFile(fileSrc, (err, data) => {
      const fileStr = data.toString();
      this.fileRows = fileStr.split(rowSymbol);
      this.apiArray = getRowKeys(fileStr);
    });

    compiler.hooks.make.tap(pluginName, (compilation) => {
      let s = '';
      const arr = [];

      compilation.hooks.succeedModule.tap(pluginName, (m) => {
        // eslint-disable-next-line
        s += m._source ? m._source._value : '';
      });

      compilation.hooks.finishModules.tap(pluginName, () => {
        // 筛选使用过的API
        this.apiArray.forEach((a) => {
          if (s.includes(`API.${a}`)) {
            arr.push(a);
          }
        });

        // 生成新的API文件
        const arrStr = arr.join(rowSymbol);
        const filterRow = this.fileRows.reduce((acc, cur) => {
          if (cur && !cur.includes('export const ')) {
            return acc.concat([cur]);
          }

          if (getRowKey(cur) && arrStr.includes(getRowKey(cur))) {
            return acc.concat([cur]);
          }
          return acc;
        }, []);

        fs.writeFile('./api.js', filterRow.join(rowSymbol), () => {});
        console.warn('api clean=======================================end');
      });
    });
  }
}

module.exports = ApiClean;
