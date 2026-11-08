import test from 'node:test';
import assert from 'node:assert/strict';
import { determineBackAction, AppNavigationState } from './navigation';

test('determineBackAction closes product modal if open', () => {
  const state: AppNavigationState = {
    hasProductModal: true,
    hasOrderDrawer: false,
    hasDtfModal: false,
    hasSearchOpen: false,
    currentTab: 'catalog',
    activeCategory: 'hoodies',
  };
  assert.equal(determineBackAction(state), 'CLOSE_PRODUCT_MODAL');
});

test('determineBackAction closes order drawer if open and no product modal', () => {
  const state: AppNavigationState = {
    hasProductModal: false,
    hasOrderDrawer: true,
    hasDtfModal: false,
    hasSearchOpen: false,
    currentTab: 'home',
    activeCategory: 'all',
  };
  assert.equal(determineBackAction(state), 'CLOSE_ORDER_DRAWER');
});

test('determineBackAction closes DTF modal if open', () => {
  const state: AppNavigationState = {
    hasProductModal: false,
    hasOrderDrawer: false,
    hasDtfModal: true,
    hasSearchOpen: false,
    currentTab: 'dtf',
    activeCategory: 'all',
  };
  assert.equal(determineBackAction(state), 'CLOSE_DTF_MODAL');
});

test('determineBackAction navigates to home if in a sub-tab without modals', () => {
  const state: AppNavigationState = {
    hasProductModal: false,
    hasOrderDrawer: false,
    hasDtfModal: false,
    hasSearchOpen: false,
    currentTab: 'about',
    activeCategory: 'all',
  };
  assert.equal(determineBackAction(state), 'NAVIGATE_TO_HOME');
});

test('determineBackAction allows browser exit if already on home with all categories and no modals', () => {
  const state: AppNavigationState = {
    hasProductModal: false,
    hasOrderDrawer: false,
    hasDtfModal: false,
    hasSearchOpen: false,
    currentTab: 'home',
    activeCategory: 'all',
  };
  assert.equal(determineBackAction(state), 'ALLOW_BROWSER_EXIT');
});
