export default function cartReducer(items, action) {
    switch (action.type) {
        case "ADD_TO_CART": {
            // console.log(action.item)
            return [
                ...items,
                {
                    ...action.item,
                    
                }
            ]

        }

        case "REMOVE_FROM_CART": {
            return items.filter((item) => item.id !== action.itemId)
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}