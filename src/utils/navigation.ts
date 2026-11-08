/**
 * Pure logic helper for back button navigation in SPA
 */

export type BackActionType =
  | 'CLOSE_PRODUCT_MODAL'
  | 'CLOSE_ORDER_DRAWER'
  | 'CLOSE_DTF_MODAL'
  | 'CLOSE_SEARCH'
  | 'NAVIGATE_TO_HOME'
  | 'ALLOW_BROWSER_EXIT';

export interface AppNavigationState {
  hasProductModal: boolean;
  hasOrderDrawer: boolean;
  hasDtfModal: boolean;
  hasSearchOpen: boolean;
  currentTab: string;
  activeCategory: string;
}

/**
 * Determines what action should happen when the user presses the browser or mobile Back button.
 * - If any modal is open: closes the modal.
 * - If on an internal section/tab: navigates back to Inicio.
 * - If already on Inicio with no modals: allows the browser to exit naturally like a normal website.
 */
export function determineBackAction(state: AppNavigationState): BackActionType {
  if (state.hasProductModal) {
    return 'CLOSE_PRODUCT_MODAL';
  }
  if (state.hasOrderDrawer) {
    return 'CLOSE_ORDER_DRAWER';
  }
  if (state.hasDtfModal) {
    return 'CLOSE_DTF_MODAL';
  }
  if (state.hasSearchOpen) {
    return 'CLOSE_SEARCH';
  }
  if (state.currentTab !== 'home' || state.activeCategory !== 'all') {
    return 'NAVIGATE_TO_HOME';
  }
  return 'ALLOW_BROWSER_EXIT';
}
