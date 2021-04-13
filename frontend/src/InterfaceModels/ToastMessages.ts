export interface ToastMessages {
  id: string;
  type?: 'success' | 'info' | 'error';
  title: string;
  description?: string;
}
