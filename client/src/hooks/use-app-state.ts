import { useSelector } from 'react-redux';
import { AppState } from '../store';

export default function useAppState<TSelected>(selector: (state: AppState) => TSelected) {
return useSelector<AppState, TSelected>(selector);
}