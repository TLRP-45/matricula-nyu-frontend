import { Injectable, signal } from '@angular/core';
import { Toast } from '../models/toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private seq = 0;

  toasts = signal<Toast[]>([]);

  show(msg: string, type: 'success' | 'danger') {
    const id = this.seq++;

    this.toasts.update((lista) => [
      ...lista,
      {
        id,
        msg,
        type,
        visible: true,
      },
    ]);

    setTimeout(() => {
      this.toasts.update((lista) => lista.map((t) => (t.id === id ? { ...t, visible: false } : t)));
    }, 2500);

    setTimeout(() => {
      this.toasts.update((lista) => lista.filter((t) => t.id !== id));
    }, 3000);
  }

  success(msg: string) {
    this.show(msg, 'success');
  }

  error(msg: string) {
    this.show(msg, 'danger');
  }
}
