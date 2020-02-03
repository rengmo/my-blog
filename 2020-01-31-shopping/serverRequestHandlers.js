const USERS_LIST_API = '/api/shopping/users'; // 请求用户列表的接口
const COMMODITIES_LIST_API  = '/api/shopping/commodities_list'; // 请求商品列表的接口
const CREATE_ORDER_API  = '/api/shopping/create_order'; // 创建订单的接口
const ORDERS_LIST_API = '/api/shopping/orders_list'; // 查询订单列表的接口

/**
 * 对请求进行处理
 * @param {String} api 请求的api，此DEMO中有以上4个API
 * @param {Object} req node请求监听的回调函数中的request对象
 * @param {Object} res node请求监听的回调函数中的response对象
 * @param {Object} params 从请求体中整理出来的请求数据
 * @param {Function} createConnection 创建MySQL的connection实例的方法
 */
function handleRequest ({ api, req, res, params, createConnection }) {
  const paramsObj = { // 将传入的参数整合成一个对象
    req,
    res,
    params,
    createConnection
  };
  const handler = handlers[api];
  if (handler && typeof handler === 'function') {
    handler(paramsObj);
  }
}

var handlers = {
  [USERS_LIST_API]: getUsersList,
  [COMMODITIES_LIST_API]: getCommoditiesList,
  [ORDERS_LIST_API]: getOrdersList,
  [CREATE_ORDER_API]: createOrder,
};

// 获取用户列表
function getUsersList (paramsObj) {
  const { createConnection, res } = paramsObj;
  const connection = createConnection();
  connection.connect();
  connection.query('SELECT * FROM users', function (error, results, fields) {
    if (error) throw error;
    res.writeHead(200, {'Content-Type': 'text/palin; charset=utf-8'});
    res.end(JSON.stringify(results));
  });
  connection.end();
}

// 获取商品列表
function getCommoditiesList (paramsObj) {
  const { createConnection, res } = paramsObj;
  const connection = createConnection();
  connection.connect();
  const sqlCommand = `
    SELECT *
    FROM commodities
    LEFT JOIN commodities_statistics
    USING (commodity_id)
  `;
  connection.query(sqlCommand, function (error, results, fields) {
    if (error) throw error;
    res.writeHead(200, {'Content-Type': 'text/palin; charset=utf-8'});
    res.end(JSON.stringify(results));
  });
  connection.end();
}

// 获取订单列表
function getOrdersList (paramsObj) {
  const { params, createConnection, res } = paramsObj;
  const connection = createConnection();
  const { user_id } = params;
  const sqlCommand = `
    SELECT o.order_id, o.amount, o.user_id, o.created_time,
           oc.commodity_id, oc.commodities_quantity,
           c.title, c.price, c.image_url
    FROM orders AS o
    INNER JOIN orders_commodities AS oc
    ON o.order_id = oc.order_id
    INNER JOIN commodities AS c
    ON oc.commodity_id = c.commodity_id
    WHERE o.user_id = ${user_id}
  `;
  connection.connect();
  connection.query(sqlCommand, function (error, results, fields) {
    if (error) throw error;
    // 根据order_id将数据整理成订单列表
    let ordersList = [];
    let ordersInfo = {};
    results.forEach((item) => {
      const { order_id, amount, commodity_id, commodities_quantity, title, price, image_url, created_time } = item;
      if (!ordersInfo[order_id]) {
        ordersInfo[order_id] = {
          order_id, // 订单id
          amount, // 订单总价
          commodities: [], // 商品列表
          created_time, // 创建时间
        };
      }
      const commodity = {
        commodity_id,
        commodities_quantity,
        title,
        price,
        image_url
      };
      ordersInfo[order_id].commodities.push(commodity);
    });
    for (let key in ordersInfo) {
      ordersList.push(ordersInfo[key]);
    }
    res.writeHead(200, {'Content-Type': 'text/palin; charset=utf-8'});
    res.end(JSON.stringify(ordersList));
  });
  connection.end();
}

// 创建订单
function createOrder (paramsObj) {
  const { params, createConnection, res } = paramsObj;
  const connection = createConnection();
  let { user_id, amount, commodities } = params;
  // 整理修改售出商品数量的表的指令， 整理成以下这种指令，更改对应商品的数量
  /*
    UPDATE commodities_statistics 
    SET sales_volume = CASE commodity_id
    WHEN 1 THEN sales_volume + 1
    WHEN 2 THEN sales_volume + 2
    END
    WHERE commodity_id IN (1, 2);
  */
  let changeCommoditiesQuantity = ''; // 修改已售商品的数量
  let addOrderCommodity = ''; // 添加订单和商品之间的关系
  const commoditiesIds = commodities.map((item) => {
    const { commodity_id, commodities_quantity } = item;
    changeCommoditiesQuantity += ` WHEN ${commodity_id} THEN sales_volume + ${commodities_quantity} `;
    addOrderCommodity += ` INSERT INTO orders_commodities VALUES (@inserted_order_id, ${commodity_id}, ${commodities_quantity}); `;
    return item.commodity_id;
  });
  const commoditiesIdsString = commoditiesIds.join(', ');
  let createdTime = new Date();
  createdTime = formatDateTime(createdTime);
  let sqlCommand = `
    INSERT INTO orders (user_id, amount, created_time) VALUES (${user_id}, ${amount}, '${createdTime}');
    SET @inserted_order_id = LAST_INSERT_ID();
    ${addOrderCommodity}
    UPDATE commodities_statistics 
    SET sales_volume = CASE commodity_id
    ${changeCommoditiesQuantity}
    END
    WHERE commodity_id IN (${commoditiesIdsString});
    UPDATE users
    SET coins_quantity = coins_quantity - ${amount}
    WHERE user_id = ${user_id};
  `;
  connection.connect();
  connection.query(sqlCommand, function (error, results, fields) {
    if (error) throw error;
    res.writeHead(200, {'Content-Type': 'text/palin; charset=utf-8'});
    res.end(JSON.stringify({ code: 0 })); // 直接使用code为0表示创建成功
  });
  connection.end();
}

// 格式化时间
function formatDateTime (date) {
  if (!date) return;
  const year = date.getFullYear();
  const month = formatDateNumber(date.getMonth() + 1);
  const day = formatDateNumber(date.getDate());
  let hours = formatDateNumber(date.getHours());
  const minutes = formatDateNumber(date.getMinutes());
  const seconds = formatDateNumber(date.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 小于10的数字前面加上0
function formatDateNumber (number) {
  return number < 10 ? `0${number}` : number;
}

module.exports = handleRequest;