export type Action = {
  type: 'SET_HOVER';
  payload: number | null;
};

export const setHover = (id: number | null): Action => ({
  type: 'SET_HOVER',
  payload: id
});
