// Mock global para IntersectionObserver en tests

export class IntersectionObserverMock {
  constructor(public callback: any, public options?: any) {}
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn();
}

// Asigna el mock al objeto global si no existe
if (typeof global !== 'undefined') {
  (global as any).IntersectionObserver = IntersectionObserverMock;
}
if (typeof window !== 'undefined') {
  (window as any).IntersectionObserver = IntersectionObserverMock;
} 