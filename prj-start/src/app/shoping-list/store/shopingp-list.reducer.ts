
// import { Ingrediant } from "src/app/shared/ingrediant.model";
// import * as ShopingListActions from './shoping-list.action';

// const initialState={
//     ingredients:[
//         new Ingrediant("ground nut",300),
//         new Ingrediant("potato",60),
//     ]
// }

// export function shopingListReducer(state = initialState,action:ShopingListActions.AddIngredient){
//     switch(action.type){
//         case ShopingListActions.ADD_INGREDIENT:
//             return{
//                 ...state,
//                 ingredients:[...state.ingredients,action.payload]
//             };
//         default: return state;
//     }
// }