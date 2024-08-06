import { delRateApi, getRatesApi, getRatesByIdApi } from './ratesApi';
import { IModule, IRate } from "./../../types/index";
import { createAppSlice } from "@/lib/createAppSlice";

interface RateSliceState {
    rates: IRate[];
    rate: IRate;
}

const initialState: RateSliceState = {
    rates: [],
    rate: {} as IRate,
};

export const ratingSlice = createAppSlice({
    name: "rate",
    initialState,
    reducers: (create) => ({
        getRatesData: create.asyncThunk(
            async () => {
                return await getRatesApi();
            },
            {
                fulfilled: (state, action) => {
                    state.rates = action.payload;
                },
            }
        ),

        getRateByIdData: create.asyncThunk(
            async (id: number) => {
                return await getRatesByIdApi(id);
            },
            {
                fulfilled: (state, action) => {
                    state.rate = action.payload;
                },
            }
        ),

        delRateData :create.asyncThunk(
            async ({studentId, homeworkId}:{studentId:number, homeworkId:number})=>{
                return await delRateApi(studentId, homeworkId)
            }
        )
    }),
    selectors: {
        selectRates: (rates) => rates.rates,
        selectRate: (rates) => rates.rate,
    },
});

export const {
    getRatesData,
    getRateByIdData,
    delRateData
} = ratingSlice.actions;
export const { selectRates, selectRate,  } = ratingSlice.selectors;
