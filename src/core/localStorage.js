// @flow

function loadItem(key: string): any | typeof undefined {
  try {
    const serializedState = localStorage.getItem(key);

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState || '{}');
  } catch (e) {
    return undefined;
  }
}

function saveItem(state: {}, key): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    // silently fail
  }
}

function removeItem(key: string) {
  localStorage.removeItem(key);
}

export function loadState(): {} | typeof undefined {
  return loadItem('ThymeState');
}

export function saveState(state: {}): void {
  saveItem(state, 'ThymeState');
}

export function loadTemporaryItem(): tempTimePropertyType | typeof undefined {
  return loadItem('ThymeTempItem');
}

export function saveTemporaryItem(state: tempTimePropertyType): void {
  saveItem(state, 'ThymeTempItem');
}

export function clearTemporaryItem() {
  removeItem('ThymeTempItem');
}
