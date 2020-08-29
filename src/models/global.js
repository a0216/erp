import { queryNotices } from '@/services/user';

const GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: false,
    notices: [],
  },
  effects: {
    *fetchNotices(_, { call, put, select }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      });
    },

    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },

    *changeNoticeReadState({ payload }, { put, select }) {
      const notices = yield select(state =>
        state.global.notices.map(item => {
          const notice = { ...item };

          if (notice.id === payload) {
            notice.read = true;
          }

          return notice;
        }),
      );
      yield put({
        type: 'saveNotices',
        payload: notices,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter(item => !item.read).length,
        },
      });
    },
  },
  reducers: {
    changeLayoutCollapsed(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },

    saveNotices(state, { payload }) {
      return {
        collapsed: false,
        ...state,
        notices: payload,
      };
    },

    saveClearedNotices(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return {
        ...state,
        collapsed: false,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
  },
  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
const  route= [{
  path: '/',
  redirect: '/welcome',
},
{
  path: '/welcome',
  name: 'welcome',
  component: './Welcome',
},
{
  path: '/buy',
  name: 'buy',
  routes: [{
    path: './buy/buyOrder',
    name: 'buyOrder',
    component: './buy/buyOrder',
  },
  {
    path: '/buy/detail/:id',
    name: 'detail',
    component: './buy/detail',
    hideInMenu: true,
  },
  {
    path: './buy/bill',
    name: 'bill',
    component: './buy/bill',
  },
  ]
},
{
  path: '/warehouse',
  name: 'warehouse',
  routes: [
    {
      path: './warehouse/stock',
      name: 'stock',
      component: './warehouse/stock',
    },
    {
      path: './warehouse/warehousing',
      name: 'warehousing',
      component: './warehouse/warehousing',
    },
    {
      path: './warehouse/outbound',
      name: 'outbound',
      component: './warehouse/outbound',
    },
  ]
},
{
  path: '/order',
  name: 'order',
  routes: [
    {
      path: './order/orderList',
      name: 'orderList',
      component: './order/orderList',
    },
    {
      path: './order/orderListb',
      name: 'orderListb',
      component: './order/orderListb',
    },
    {
      path: './order/sales',
      name: 'sales',
      component: './order/sales',
    },
  ]
},

{
  path: '/dataMsg',
  name: 'dataMsg',
  routes: [
    {
      path: './dataMsg/product',
      name: 'product',
      component: './dataMsg/product',
    },
    {
      path: './dataMsg/shop',
      name: 'shop',
      component: './dataMsg/shop',
    },
    {
      path: './dataMsg/supplier',
      name: 'supplier',
      component: './dataMsg/supplier',
    },
    {
      path: './dataMsg/warehouse',
      name: 'warehouse',
      component: './dataMsg/warehouse',
    },
    {
      path: './dataMsg/productMsg',
      name: 'productMsg',
      component: './dataMsg/productMsg',
    },
    {
      path: './dataMsg/warehouseMsg',
      name: 'warehouseMsg',
      component: './dataMsg/warehouseMsg',
    },
  ]
},
{
  path: '/staff',
  name: 'staff',
  routes: [
    {
      path: './staff/staffs',
      name: 'staffs',
      component: './staff/staffs',
    },
    {
      path: './staff/department',
      name: 'department',
      component: './staff/department',
    }
  ]
},
]
export default GlobalModel;
