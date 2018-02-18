import { RouteReuseStrategy, DefaultUrlSerializer, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class CustomReuseStrategy implements RouteReuseStrategy {

  handlers: {[key: string]: DetachedRouteHandle} = {};
  scrollPositions: {[key: string]: number} = {};

  calcKey(route: ActivatedRouteSnapshot) {
    let next = route;
    let url = '';
    while(next) {
      if (next.url) {
        url = next.url.join('/');
      }
      next = next.firstChild;
    }
    // console.debug('url', url);
    return url;
  }

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // console.debug('CustomReuseStrategy:shouldDetach', route);
    if ((route.data as any).shouldDetach) {
      this.scrollPositions[this.calcKey(route)] = document.documentElement.scrollTop;
      // console.log('[SAVE] ' + this.calcKey(route) + ': ' + this.scrollPositions[this.calcKey(route)]);
    }
    return route.data && (route.data as any).shouldDetach;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    // console.debug('CustomReuseStrategy:store', route, handle);
    this.handlers[this.calcKey(route)] = handle;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // console.debug('CustomReuseStrategy:shouldAttach', route);
    setTimeout(() => {
      if (this.scrollPositions[this.calcKey(route)] != null) {
        document.documentElement.scrollTop = this.scrollPositions[this.calcKey(route)];
        // console.log('[LOAD] ' + this.calcKey(route) + ': ' + this.scrollPositions[this.calcKey(route)]);
      } else {
        document.documentElement.scrollTop = 0;
        // console.log('[INIT] ' + this.calcKey(route) + ': ' + 0);
      }
    });

    return !!route.routeConfig && !!this.handlers[this.calcKey(route)];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    // console.debug('CustomReuseStrategy:retrieve', route);
    if (!route.routeConfig) return null;
    return this.handlers[this.calcKey(route)];
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // console.debug('CustomReuseStrategy:shouldReuseRoute', future, curr);
    return this.calcKey(curr) === this.calcKey(future);
  }

}
