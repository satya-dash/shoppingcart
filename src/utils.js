export function callAPI(url,cb){
	fetch(url).then(el=>el.json()).then(elm=>{
		cb(elm);
	});
}

export function setInLS(item){
    let ls = localStorage.getItem('shopping_cart')||'{}';
    ls = JSON.parse(ls);
    if(!ls[item.id]){
        ls[item.id] = {
            id:item.id,
            name: item.name,
            price: item.price,
            discount: item.discount,
            type: item.type,
            img_url: item.img_url,
            quantity: 1
        };
    } else {
        ls[item.id].quantity++;
    }
    localStorage.setItem('shopping_cart',JSON.stringify(ls));
}

export function getInLS(){
    let ls = localStorage.getItem('shopping_cart')||'{}';
    return JSON.parse(ls);
}

export function removeInLS(id){
    let ls = localStorage.getItem('shopping_cart')||'{}';
    ls = JSON.parse(ls);
    if(ls.hasOwnProperty(id))
        delete ls[id];
    localStorage.setItem('shopping_cart',JSON.stringify(ls));
    if(Object.keys(ls).length === 0)
        window.history.back();
}
export function changeQtyInLS(id,type){
    let ls = localStorage.getItem('shopping_cart')||'{}';
    ls = JSON.parse(ls);
    if(ls.hasOwnProperty(id)){
        if(type === 'plus')
            ls[id].quantity++;
        else{
            ls[id].quantity--;
            if(ls[id].quantity <= 0)
                delete ls[id];
        }
    }
    localStorage.setItem('shopping_cart',JSON.stringify(ls));
    if(Object.keys(ls).length === 0)
        window.history.back();
}