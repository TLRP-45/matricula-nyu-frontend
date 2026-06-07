export interface Toast {
  id: number;
  msg: string;
  type: 'success' | 'danger';
  visible: boolean;
}
