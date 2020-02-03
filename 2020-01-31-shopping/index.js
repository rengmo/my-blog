(function () {
  const host = 'http://localhost:8080';
  const appData = {
    shoppingCart: {
      selectedCommodities: [],
      amount: 0, // 商品总价
    },
    currentUser: {},
    currentPart: '', // shop、cart、orders
    requstApis: {
      getUsersInfo: `${host}/api/shopping/users`,
      getCommoditiesList: `${host}/api/shopping/commodities_list`,
      getOrderList: `${host}/api/shopping/orders_list`,
      createOrder: `${host}/api/shopping/create_order`,
    },
    commoditiesList: [],
    usersInfo: [],
    createOrderLoading: false,
  };
  window.onload = function () {
    init();
    getUsesInfo();
    displayShop();
    handleTabsChange();
  };
  function init () {
    const cartButton = document.getElementById('cartButton');
    cartButton.onclick = () => {
      changTab(null, 'cart');
    };
    const purchaseButton = document.getElementById('purchaseButton');
    purchaseButton.onclick = () => {
      createOrder();
    };
  }

  // 切换标签
  function handleTabsChange () {
    const tabs = document.querySelectorAll('.tabs .tab');
    const { currentPart } = appData;
    if (!currentPart) {
      appData.currentPart = 'shop';
      const shopTabElement = document.getElementById('shop');
      shopTabElement.className += ' selected';
      const shopContentElement = document.getElementById('shopContent');
      shopContentElement.className += ' current';
    }
    tabs.forEach((tabElement) => {
      tabElement.onclick = function (event) {
        const element = event.target;
        const dataset = element.dataset;
        const tabName = dataset.tab;
        changTab(element, tabName);
      };
    });
  }

  function changTab (tabElement, tabName) {
    const nextTag = tabElement || document.getElementById(tabName);
    const previousPart = appData.currentPart;
    if (previousPart && previousPart === tabName) return;
    const previousPartTabElement = document.getElementById(previousPart);
    previousPartTabElement.className = previousPartTabElement.className.slice(0, -9);
    appData.currentPart = tabName;
    nextTag.className += ' selected';
    changeContent(previousPart, tabName);
  }
  // 根据不同的标签切换内容
  function changeContent (previousPart, nextPart) {
    const previousContentElement = document.getElementById(previousPart + 'Content');
    const nextContentElement = document.getElementById(nextPart + 'Content');
    previousContentElement.className = previousContentElement.className.slice(0, -8);
    nextContentElement.className += ' current';
    switch (nextPart) {
      case 'shop':
        displayShop();
        break;
      case 'cart':
        displayCart();
        break;
      case 'orders':
        displayOrders();
        break;
    }
  }
  // 获取用户信息并创建下拉组件
  async function getUsesInfo () {
    const { requstApis } = appData;
    const users = await request({ url: requstApis.getUsersInfo });
    appData.usersInfo = users;
    appData.currentUser = users[0];
    const selectUserElement = document.getElementById('selectUser');
    const fragment = document.createDocumentFragment();
    users.forEach((user) => {
      const { user_id, name } = user;
      const option = document.createElement('option');
      option.value = user_id;
      option.textContent = name;
      fragment.appendChild(option)
    });
    selectUserElement.append(fragment);
    appData.currentUser = users[0];
    selectUserElement.value = users[0].user_id;
    selectUserElement.onchange = (event) => {
      appData.currentUser = appData.usersInfo.find((item) => item.user_id === parseInt(event.target.value));
    };
  }
  // 获取商品信息并创建商品列表
  async function displayShop() {
    const { requstApis } = appData;
    const data = await request({ url: requstApis.getCommoditiesList });
    appData.commoditiesList = data;
    const commoditiesListElement = document.getElementById('commoditiesList');
    commoditiesListElement.innerHTML = '';
    const fragment = document.createDocumentFragment();
    data.forEach((item) => {
      const commodityCard = createCommonCommidityCard(item);
      fragment.append(commodityCard);
    });
    commoditiesListElement.append(fragment);
  }

  // 创建“商店”的商品卡片
  function createCommonCommidityCard (cardData) {
    const { commodity_id, title, price, image_url, sales_volume } = cardData;
    const commodityCard = document.createElement('div');
    commodityCard.className = 'commodity-card';
    // 图片部分
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    const commodityImage = document.createElement('img');
    commodityImage.className = 'commodity-image';
    commodityImage.src = image_url;
    imageContainer.append(commodityImage);
    // 内容部分
    const commodityContent = document.createElement('div');
    commodityContent.className = 'commodity-content';
    // 商品标题
    const commodityTitle = document.createElement('div');
    commodityTitle.className = 'commodity-title';
    commodityTitle.textContent = title;
    // 商品价格和已售件数
    const commodityNumberContainer = document.createElement('div');
    commodityNumberContainer.className = 'commodity-number-container';
    const commodityPriceNumber = document.createElement('span');
    commodityPriceNumber.className = 'commodity-number price';
    commodityPriceNumber.textContent = `${price}金币`;
    const commoditySaledNumber = document.createElement('span');
    commoditySaledNumber.className = 'commodity-number';
    commoditySaledNumber.textContent = `已售${sales_volume}件`;
    commodityNumberContainer.append(commodityPriceNumber);
    commodityNumberContainer.append(commoditySaledNumber);
    // 底部的加入购物车按钮
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    const addCartButton = document.createElement('div');
    addCartButton.className = 'add-cart';
    addCartButton.textContent = '加入购物车';
    buttonContainer.append(addCartButton);
    buttonContainer.onclick = handleAddToCart.bind(null, commodity_id);

    commodityContent.append(commodityTitle);
    commodityContent.append(commodityNumberContainer);
    commodityContent.append(buttonContainer);

    commodityCard.append(imageContainer);
    commodityCard.append(commodityContent);
    return commodityCard;
  }
  // 加入购物车的处理
  function handleAddToCart (id) {
    const { shoppingCart } = appData;
    let selectedCommodities = shoppingCart.selectedCommodities;
    if (selectedCommodities.length < 1 || !selectedCommodities.find((item) => item.commodity_id === id)) {
      const commodity = {
        commodity_id: id,
        commodities_quantity: 1,
      }
      selectedCommodities.push(commodity);
    } else {
      selectedCommodities.forEach((item, index) => {
        const { commodity_id, commodities_quantity } = item;
        if (commodity_id === id) {
          const newCommodity = {
            commodity_id,
            commodities_quantity: commodities_quantity + 1,
          };
          selectedCommodities[index] = newCommodity;
        }
      });
    }
    const sum = selectedCommodities.reduce((accumulator, currentValue) => { 
      return accumulator + currentValue.commodities_quantity 
    }, 0);
    const commoditiesQantity = document.querySelector('#cartButton .commodities-quantity');
    commoditiesQantity.textContent = sum;
  }
  // 展示购物车页面
  function displayCart () {
    const { shoppingCart, commoditiesList } = appData;
    const selectedCommodities = shoppingCart.selectedCommodities;

    const receiverInfo = document.getElementById('receiverInfo');
    receiverInfo.innerHTML = '';
    const userInfoFragment = createUserInfoCard();
    receiverInfo.append(userInfoFragment);

    // 商品列表
    const cartCommoditiesList = document.getElementById('cartCommoditiesList');
    cartCommoditiesList.innerHTML = '';

    if (selectedCommodities.length < 1) {
      caculateTotalPrice();
      return;
    };

    const cardsData = selectedCommodities.map((item) => {
      const { commodity_id, commodities_quantity } = item;
      const commodity = commoditiesList.find(commodity => commodity.commodity_id === commodity_id);
      return {
        ...commodity,
        commodities_quantity,
      };
    });
    caculateTotalPrice();
    const fragment = document.createDocumentFragment();
    cardsData.forEach((cardData) => {
      const commodityCard = createRectangularCommodityCard(cardData, 'withQuantityInput');
      fragment.append(commodityCard);
    });
    cartCommoditiesList.append(fragment);
  }
  // 展示用户信息
  function createUserInfoCard () {
    const fragment = document.createDocumentFragment();
    const currentUser = appData.currentUser;
    const { name, telephone_number, address } = currentUser;
    const userName = document.createElement('div');
    userName.textContent = `收货人：${name}`;
    const telephoneNumber = document.createElement('div');
    telephoneNumber.textContent = `收货人电话：${telephone_number}`;
    const addressElement = document.createElement('div');
    addressElement.textContent = `收货人地址：${address}`;
    fragment.append(userName);
    fragment.append(telephoneNumber);
    fragment.append(addressElement);
    return fragment;
  }
  // 创建“购物车”或“我的订单”中的商品卡片，type 为 withQuantityInput 表示是购物车中包含加号的商品卡片
  function createRectangularCommodityCard (cardData, type) {
    const { commodity_id, title, price, image_url, sales_volume, commodities_quantity } = cardData;
    const commodityCard = document.createElement('div');
    commodityCard.className = 'commodity-rectangle-card';
    // 商品图片
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    const commodityImage = document.createElement('img');
    commodityImage.className = 'commodity-image';
    commodityImage.src = image_url;
    imageContainer.append(commodityImage);
    // 商品内容
    const commodityContent = document.createElement('div');
    commodityContent.className = 'commodity-content';
    // 商品标题
    const commodityTitle = document.createElement('div');
    commodityTitle.textContent = title;
    commodityTitle.className = 'commodity-title';
    // 商品价格和已售数量
    const commodityNumber = document.createElement('div');
    commodityNumber.className = 'commodity-number-container';
    const commodityPriceNumber = document.createElement('span');
    commodityPriceNumber.textContent = `${price}金币`;
    commodityPriceNumber.className = 'commodity-number price';
    commodityNumber.append(commodityPriceNumber);
    if (type === 'withQuantityInput') {
      const commoditySaledNumber = document.createElement('span');
      commoditySaledNumber.textContent = `已售${sales_volume}件`;
      commoditySaledNumber.className = 'commodity-number';
      commodityNumber.append(commoditySaledNumber);
    }
    // 购买的数量
    const purchaseQuantity = document.createElement('div');
    purchaseQuantity.className = 'purchase-quantity';
    const purchaseQuantityLabel = document.createElement('label');
    purchaseQuantityLabel.textContent = '购买数量：';
    purchaseQuantity.append(purchaseQuantityLabel);
    if (type === 'withQuantityInput') {
      const purchaseQuantityInputContainer = document.createElement('div');
      const purchaseQuantitySubtractButton= document.createElement('span');
      purchaseQuantitySubtractButton.className = 'quantity-adjust-button';
      purchaseQuantitySubtractButton.textContent = '-';
      purchaseQuantitySubtractButton.onclick = () => {
        changeCommodityQuantity({
          type: 'substract',
          price,
          commodityId: commodity_id
        });
      };
      const purchaseQuantityInput = document.createElement('input');
      purchaseQuantityInput.type = 'number';
      purchaseQuantityInput.min = '1';
      purchaseQuantityInput.className = 'quantity-input';
      purchaseQuantityInput.value = commodities_quantity;
      purchaseQuantityInput.id = `quantityInput${commodity_id}`;
      purchaseQuantityInput.onchange = (event) => {
        const value = event.target.value;
        changeCommodityQuantity({
          price,
          commodityId: commodity_id,
          commodities_quantity: parseInt(value),
        });
      };
      const purchaseQuantityAddButton= document.createElement('span');
      purchaseQuantityAddButton.className = 'quantity-adjust-button';
      purchaseQuantityAddButton.textContent = '+';
      purchaseQuantityAddButton.onclick = () => {
        changeCommodityQuantity({
          type: 'add',
          price,
          commodityId: commodity_id
        });
      };
      purchaseQuantityInputContainer.append(purchaseQuantitySubtractButton);
      purchaseQuantityInputContainer.append(purchaseQuantityInput);
      purchaseQuantityInputContainer.append(purchaseQuantityAddButton);

      purchaseQuantity.append(purchaseQuantityInputContainer);
    } else {
      const purchaseQuantityReadOnly = document.createElement('span');
      purchaseQuantityReadOnly.textContent = commodities_quantity;
      purchaseQuantityReadOnly.className = 'purchase-quantity-number';
      purchaseQuantity.append(purchaseQuantityReadOnly);
    }
    // 总价格
    const totalPriceContainer = document.createElement('div');
    totalPriceContainer.className = 'total-price';
    const totalPriceLabel = document.createElement('label');
    totalPriceLabel.textContent = '总价格：';
    const totalPriceNumberContainer = document.createElement('span');
    totalPriceNumberContainer.className = 'total-price-number';
    const totalPriceNumber = document.createElement('span');
    totalPriceNumber.id = `commodityTotalPrice${commodity_id}`;
    totalPriceNumber.textContent = commodities_quantity * price;
    const totalPriceUnit = document.createElement('span');
    totalPriceUnit.className = 'price-unit';
    totalPriceUnit.textContent = '金币';
    totalPriceNumberContainer.append(totalPriceNumber);
    totalPriceNumberContainer.append(totalPriceUnit);
    totalPriceContainer.append(totalPriceLabel);
    totalPriceContainer.append(totalPriceNumberContainer);

    commodityContent.append(commodityTitle);
    commodityContent.append(commodityNumber);
    commodityContent.append(purchaseQuantity);
    commodityContent.append(totalPriceContainer);

    commodityCard.append(imageContainer);
    commodityCard.append(commodityContent);

    return commodityCard;
  }
  // 改变商品数量，type为add 表示加1，为subtract表示减1；commodityId是商品id；price是商品的价格；commodities_quantity是直接改变输入框的值的时候传入的内容；
  function changeCommodityQuantity ({ type, price, commodityId, commodities_quantity }) {
    const { shoppingCart } = appData;
    let selectedCommodities = shoppingCart.selectedCommodities;
    let purchaseQuantityInput = document.getElementById(`quantityInput${commodityId}`);
    let commodityTotalPrice = document.getElementById(`commodityTotalPrice${commodityId}`);
    if (type) {
      if (type === 'add') {
        selectedCommodities.forEach((item, index) => {
          if (item.commodity_id === commodityId ) {
            const quantityResult = item.commodities_quantity + 1;
            selectedCommodities[index].commodities_quantity  = quantityResult;
            purchaseQuantityInput.value = quantityResult;
            commodityTotalPrice.textContent = quantityResult * price;
          }
        });
      } else {
        selectedCommodities.forEach((item, index) => {
          if (item.commodity_id === commodityId ) {
            const quantityResult = item.commodities_quantity - 1;
            if (quantityResult < 1) return;
            selectedCommodities[index].commodities_quantity  = quantityResult;
            purchaseQuantityInput.value = quantityResult;
            commodityTotalPrice.textContent = quantityResult * price;
          }
        });
      }
      caculateTotalPrice();
      return;
    }
    selectedCommodities.forEach((item, index) => {
      if (item.commodity_id === commodityId ) {
        selectedCommodities[index].commodities_quantity  = commodities_quantity;
        purchaseQuantityInput.value = commodities_quantity;
        commodityTotalPrice.textContent = commodities_quantity * price;
      }
    });
    caculateTotalPrice();
  }
  // 计算总价
  function caculateTotalPrice () {
    const { shoppingCart, commoditiesList } = appData;
    let selectedCommodities = shoppingCart.selectedCommodities;
    let sum = 0;
    selectedCommodities.forEach((selectedCommodity) => {
      const { commodity_id, commodities_quantity } = selectedCommodity;
      const price = commoditiesList.find(commodity => commodity.commodity_id === commodity_id).price;
      sum += price * commodities_quantity;
    });
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    cartTotalPrice.textContent = `总价：${sum}金币`;
    appData.shoppingCart.amount = sum;
  }
  // 创建订单
  async function createOrder () {
    const { requstApis, currentUser, shoppingCart, createOrderLoading } = appData;
    const currentUserId = currentUser.user_id;
    const shoppingCartAmount = shoppingCart.amount;
    const selectedCommodities = shoppingCart.selectedCommodities;
    if (createOrderLoading) return;
    if (!currentUserId || !shoppingCartAmount || selectedCommodities.length < 1) {
      alert('参数不正确！');
      return;
    }
    const fetchParams = {
      url: requstApis.createOrder,
      method: 'POST',
      params: {
        user_id: currentUser.user_id,
        amount: shoppingCart.amount,
        commodities: shoppingCart.selectedCommodities
      },
    };
    appData.createOrderLoading = true;
    const data = await request(fetchParams);
    appData.createOrderLoading = false;
    if (data.code === 0) {
      alert('购买成功');
      appData.shoppingCart = {
        selectedCommodities: [],
        amount: 0,
      };
      const commoditiesQantity = document.querySelector('#cartButton .commodities-quantity');
      commoditiesQantity.textContent = 0;
      displayCart();
    }
  }
  // 订单部分
  function displayOrders () {
    const receiverInfo = document.getElementById('orderReceiverInfo');
    receiverInfo.innerHTML = '';
    const userInfoFragment = createUserInfoCard();
    receiverInfo.append(userInfoFragment);
    getOrdersList();
  }
  // 获取订单列表
  async function getOrdersList () {
    const { requstApis, currentUser } = appData;
    const requestParams = {
      url: requstApis.getOrderList,
      params: {
        user_id: currentUser.user_id
      }
    };
    const ordersList = document.getElementById('ordersList');
    ordersList.innerHTML = '';
    const cardsData = await request(requestParams);
    const fragment = document.createDocumentFragment();
    cardsData.forEach((cardData) => {
      const orderCard = createOrderCard(cardData);
      fragment.append(orderCard);
    });
    ordersList.append(fragment);
  }
  // 创建订单卡片
  function createOrderCard (orderData) {
    const { order_id, amount, commodities, created_time } = orderData;
    const orderCard = document.createElement('div');
    orderCard.className = 'order-card';
    // 订单编号和创建时间
    const orderInfo = document.createElement('div');
    orderInfo.className = 'order-info';
    const orderNumber = document.createElement('div');
    orderNumber.textContent = `订单编号：${order_id}`;
    const orderCreatedTime = document.createElement('div');
    const orderCreatedDateTime = new Date(created_time);
    const orderCreatedYear = orderCreatedDateTime.getFullYear();
    const orderCreatedMonth = formatDateNumber(orderCreatedDateTime.getMonth() + 1);
    const orderCreatedDate = formatDateNumber(orderCreatedDateTime.getDate());
    const orderCreatedHours = formatDateNumber(orderCreatedDateTime.getHours());
    const orderCreatedMinutes = formatDateNumber(orderCreatedDateTime.getMinutes());
    const orderCreatedSeconds = formatDateNumber(orderCreatedDateTime.getSeconds()); 
    const orderCreatedTimeStr = `${orderCreatedYear}-${orderCreatedMonth}-${orderCreatedDate} ${orderCreatedHours}:${orderCreatedMinutes}:${orderCreatedSeconds}`;
    orderCreatedTime.textContent =`创建时间：${orderCreatedTimeStr}`;
    orderInfo.append(orderNumber);
    orderInfo.append(orderCreatedTime);
    // 商品列表
    const commoditiesList = document.createElement('div');
    commoditiesList.className = 'rectangle-commodities-list';
    commodities.forEach((commodity) => {
      const commodityCard = createRectangularCommodityCard(commodity);
      commoditiesList.append(commodityCard);
    });
    // 总共消费
    const totalConsumption = document.createElement('div');
    totalConsumption.className = 'total-consumption';
    const totalConsumptionLabel = document.createElement('div');
    totalConsumptionLabel.textContent = '总共消费：';
    const totalConsumptionNumber = document.createElement('div');
    const priceNumber = document.createElement('span');
    priceNumber.className = 'total-consumption-number';
    priceNumber.textContent = amount;
    const priceUnit = document.createElement('span');
    priceUnit.className = 'total-consumption-number-unit';
    priceUnit.textContent = '金币';
    totalConsumptionNumber.append(priceNumber);
    totalConsumptionNumber.append(priceUnit);
    totalConsumption.append(totalConsumptionLabel);
    totalConsumption.append(totalConsumptionNumber);

    orderCard.append(orderInfo);
    orderCard.append(commoditiesList);
    orderCard.append(totalConsumption);
    return orderCard;
  }
  /**
   * 一个简陋的请求方法
   * 传递的参数的格式是：{
   *  url: 'http://localhost:8080/api/shopping/users',
   *  method: 'GET',
   *  params: {
   *    a: 1
   *  }
   * }
   * 当没有method属性的时候，默认为GET请求
   */
  function request ({url, method, params}) {
    if (!method || method === 'GET' ) { // GET请求
      let queryString = '';
      if (params) {
        for (let key in params) {
          queryString += `${key}=${params[key]}&`
        }
      }
      queryString = queryString.slice(0, -1);
      const requestUrl = `${url}?${queryString}`;
      return fetch(requestUrl)
        .then(function(response) {
          return response.json();
        })
    }
    if (method === 'POST') {
      return fetch(url, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          'content-type': 'application/json'
        },
      })
      .then(function(response) {
        return response.json();
      })
    }
  }
  // 小于10的数字前面加上0
  function formatDateNumber (number) {
    return number < 10 ? `0${number}` : number;
  }
})();

