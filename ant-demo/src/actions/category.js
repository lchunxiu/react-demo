
export const RECEIVE_LIST = "RECEIVE_LIST";

export function addReceiveList(list){
    return {
        type:RECEIVE_LIST,
        list
    };
}


export const FETCH_LIST= "FETCH_LIST";

 // 获取类型列表
export function addFetchList(){
    return (dispatch)=>{
        return fetch("/xhrcategory/list")
            .then(function(response) {
                return response.json()
            }).then(function(json) {
                dispatch(addReceiveList(json));
            }).catch(function(ex) {
                console.log('parsing failed', ex)
            });
    };
}

