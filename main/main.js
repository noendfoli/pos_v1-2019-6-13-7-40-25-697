'use strict';

function printReceipt(inputs) {
    const allItem = loadAllItems();
    const promotes = loadPromotions();
    const itemSameCount = getCountOfBarcodes(inputs)
    const costItem = getCostItem(itemSameCount,promotes,allItem);
    const receipt = createReceipt(costItem);
    console.log(receipt)
  }
  
  function getCountOfBarcodes(inputs){
    var countInput = [];
       inputs.forEach(value =>{
          if(value.split("-").length == 1){
            countInput.push({
                barcode:value.split("-")[0],
                count: 1
            })
          }else{
            countInput.push({
            barcode:value.split("-")[0],
            count: value.split("-")[1]
            })
           }
       })
       var same =[];
       for (var i = 0; i < countInput.length;) {
          var count = 0;
          var number = 0;
           for (var j = i; j < countInput.length; j++) {
              if(countInput[i].barcode == countInput[j].barcode){
                    count += Number(countInput[j].count);
                    number ++ ;
              }
           }
          same.push({
              item: countInput[i].barcode,
              count: count
           })
          i = i + number;
       }
       return same;
 }

  function getCostItem(same,promotion,allItems){
    var costItem = [];
        var item = {};
        costItem =  same.map((vaule) =>{
            item = {
              name:allItems.find((item) =>{
                 return item.barcode == vaule.item;
              }).name,
              price:allItems.find((item) =>{
                 return item.barcode == vaule.item;
              }).price,
              count:vaule.count,
              unit:allItems.find((item) =>{
                 return item.barcode == vaule.item;
              }).unit,
              discouTotal:promotion[0].barcodes.includes(vaule.item)?(Number(vaule.count)-Math.floor(Number(vaule.count/3)))*allItems.find((item) =>{
                 return item.barcode == vaule.item;
              }).price:Number(vaule.count)*allItems.find((item) =>{
                 return item.barcode == vaule.item;
              }).price,
              subTotal:Number(vaule.count)*allItems.find((item) =>{
                 return item.barcode == vaule.item;
              }).price
           };
           return item
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