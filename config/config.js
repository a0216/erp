// https://umijs.org/config/
import {
  defineConfig
} from 'umi';
import defaultSettings from './defaultSettings';
// import proxy from './proxy';

const {
  REACT_APP_ENV
} = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [{
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [{
      name: 'login',
      path: '/user/login',
      component: './user/login',
    },],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [{
      path: '/',
      component: '../layouts/BasicLayout',
      authority: ['erp', 'admin'],
      routes: [{
        path: '/',
        redirect: '/welcome',
      },
      {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/buy',
        name: 'buy',
        icon: 'crown',
        routes: [{
          path: './buy/buyOrder',
          name: 'buyOrder',
          icon: 'smile',
          component: './buy/buyOrder',
        },
        {
          path: '/buy/detail/:id',
          name: 'detail',
          component: './buy/detail',
          hideInMenu: true,
        },
        // {
        //   path: './buy/payOrder',
        //   name: 'payOrder',
        //   icon: 'smile',
        //   component: './buy/payOrder',
        // },
        {
          path: './buy/bill',
          name: 'bill',
          icon: 'smile',
          component: './buy/bill',
        },
        ]
      },
      {
        path: '/warehouse',
        name: 'warehouse',
        icon: 'crown',
        routes: [
          {
            path: './warehouse/stock',
            name: 'stock',
            icon: 'smile',
            component: './warehouse/stock',
          },
          {
            path: './warehouse/warehousing',
            name: 'warehousing',
            icon: 'smile',
            component: './warehouse/warehousing',
          },
          {
            path: './warehouse/outbound',
            name: 'outbound',
            icon: 'smile',
            component: './warehouse/outbound',
          },
          // {
          //   path: './warehouse/loss',
          //   name: 'loss',
          //   icon: 'smile',
          //   component: './warehouse/loss',
          // },
          // {
          //   path: './warehouse/inventory',
          //   name: 'inventory',
          //   icon: 'smile',
          //   component: './warehouse/inventory',
          // },

        ]
      },
      {
        path: '/order',
        name: 'order',
        icon: 'crown',
        routes: [
          {
            path: './order/orderList',
            name: 'orderList',
            icon: 'smile',
            component: './order/orderList',
          },
          {
            path: './order/orderListb',
            name: 'orderListb',
            icon: 'smile',
            component: './order/orderListb',
          },
          {
            path: './order/sales',
            name: 'sales',
            icon: 'smile',
            component: './order/sales',
          },
          // {
          //   path: './order/salesReturn',
          //   name: 'salesReturn',
          //   icon: 'smile',
          //   component: './order/salesReturn',
          // },


        ]
      },

      {
        path: '/dataMsg',
        name: 'dataMsg',
        icon: 'crown',
        routes: [
          {
            path: './dataMsg/product',
            name: 'product',
            icon: 'smile',
            component: './dataMsg/product',
          },
          {
            path: './dataMsg/shop',
            name: 'shop',
            icon: 'smile',
            component: './dataMsg/shop',
          },
          {
            path: './dataMsg/supplier',
            name: 'supplier',
            icon: 'smile',
            component: './dataMsg/supplier',
          },
          {
            path: './dataMsg/warehouse',
            name: 'warehouse',
            icon: 'smile',
            component: './dataMsg/warehouse',
          },
          {
            path: './dataMsg/productMsg',
            name: 'productMsg',
            icon: 'smile',
            component: './dataMsg/productMsg',
          },
          
          {
            path: './dataMsg/warehouseMsg',
            name: 'warehouseMsg',
            icon: 'smile',
            component: './dataMsg/warehouseMsg',
          },

        ]
      },
      {
        path: '/staff',
        name: 'staff',
        icon: 'crown',
        routes: [
          {
            path: './staff/staffs',
            name: 'staffs',
            icon: 'smile',
            component: './staff/staffs',
          },
          {
            path: './staff/department',
            name: 'department',
            icon: 'smile',
            component: './staff/department',
          }
        ]
      },

      // dataMsg
      // Warehouse
      {
        name: 'list.table-list',
        icon: 'table',
        path: '/list',
        component: './ListTableList',
      },
      {
        component: './404',
      },
      ],
    },
    {
      component: './404',
    },
    ],
  },
  {
    component: './404',
  },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  // proxy: proxy[REACT_APP_ENV || 'dev'],
  // proxy: {
  //   '/server': {
  //     target: 'https://erpapi.owodian.com', // 切换到本地后台
  //     changeOrigin: true,
  //     pathRewrite: { '^/server': '' },
  //   },
  // },
  manifest: {
    basePath: '/',
  },
  // base: '/dist/',
  // publicPath: '/dist/',
  devtool: 'source-map'
});
