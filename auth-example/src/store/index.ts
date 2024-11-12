import pick from 'lodash/pick';

export interface StoreState {}

export const store: StoreState = {};

type Params = keyof StoreState;

export function useStore<T extends Params>(stores: T[]): Pick<StoreState, T> {
    return pick(store, stores);
}
