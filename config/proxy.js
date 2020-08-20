/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
    '/server': {
      target: 'https://erpapi.owodian.com', // 切换到本地后台
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
    },
  dev: {
    '/api': {
      target: 'https://erpapi.owodian.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
    'host':{
      target: 'https://erpapi.owodian.com',

    }
  },
  test: {
    '/api/': {
      target: 'https://erpapi.owodian.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
  pre: {
    '/api/': {
      target: 'https://erpapi.owodian.com',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
};
