'use strict';

function printReceipt(inputs) {
    const allItem = loadAllItems();
    const promotes = loadPromotions()[0].barcodes;
    const itemSameCount = getCountOfBarcodes(inputs)
    const costItem = getCostItem(itemSameCount,promotes,allItem);
    const receipt = createReceipt(costItem);
    console.log(receipt)
  }
  
  function getCountOfBarcodes(inputs){
    return Object.entries(inputs.reduce((m, item) => {
         let barcode = item, count = 1
         if (item.includes('-')) {
         [barcode, count] = item.split('-')
         count = Number(count)
         }
         m[barcode] ? m[barcode].count += count : m[barcode] = {barcode, count}
         return m
      }, {})).map(item => item[1])
 }

  function getCostItem(same,promotion,allItems){
     var costItem = [];
        var row = {};
        costItem =  same.map((vaule) =>{
         row = {
              name:allItems.find((item) =>{
                 return item.barcode == vaule.barcode;
              }).name,
              price:allItems.find((item) =>{
                 return item.barcode == vaule.barcode;
              }).price,
              count:vaule.count,
              unit:allItems.find((item) =>{
                 return item.barcode == vaule.barcode;
              }).unit,
              discouTotal:promotion.includes(vaule.barcode)?(Number(vaule.count)-Math.floor(Number(vaule.count/3)))*allItems.find((item) =>{
                 return item.barcode == vaule.barcode;
              }).price:Number(vaule.count)*allItems.find((item) =>{
                 return item.barcode == vaule.barcode;
              }).price,
              subTotal:Number(vaule.count)*allItems.find((item) =>{
                 return item.barcode == vaule.barcode;
              }).price
           };
           return row
        });
        return costItem;
 }

  function createReceipt(costItem){
    let content = ''
    const title = '***<没钱赚商店>收据***'
    const split = '----------------------'
    const end   = '**********************'
    content = content.concat(title, '\n')
    costItem.forEach(item => {
      content = content.concat(`名称：${item.name}，数量：${item.count}${item.unit}，单价：${item.price.toFixed(2)}(元)，小计：${(item.discouTotal).toFixed(2)}(元)`, '\n')
    })
    content = content.concat(split, '\n')
    var total = costItem.reduce((pre,value) =>{
        return pre += value.subTotal
    },0)
    var discountTotal = costItem.reduce((pre,value) =>{
      return pre += value.discouTotal
    },0)
    var dicount = Number(total) - Number(discountTotal)
    content = content.concat(`总计：${discountTotal.toFixed(2)}(元)`, '\n')
    content = content.concat(`节省：${dicount.toFixed(2)}(元)`, '\n')
    
    content = content.concat(end)
    return content

  }
